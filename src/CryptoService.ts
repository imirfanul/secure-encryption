import * as crypto from "crypto"

class CryptoService {
	private static readonly algorithm: string = "aes-256-ctr"
	private static readonly keyLength: number = 32 // aes-256 requires a 32-byte key
	private static readonly nonceLength: number = 16

	private static getKey(key: string | undefined): Buffer {
		if (!key) {
			throw new Error("Key not set in environment variables.")
		}
		const buffer = Buffer.from(key, "base64")
		if (buffer.length !== CryptoService.keyLength) {
			throw new Error(
				`Invalid key length. Key must be ${CryptoService.keyLength} bytes long.`
			)
		}
		return buffer
	}

	public static encrypt(plaintext: string): string {
		const encryptionKey = CryptoService.getKey(
			process.env.CRYPTO_SERVICE_KEY
		)
		const macKey = CryptoService.getKey(process.env.CRYPTO_SERVICE_MAC_KEY)

		const nonce = crypto.randomBytes(CryptoService.nonceLength)
		const cipher = crypto.createCipheriv(
			CryptoService.algorithm,
			encryptionKey,
			nonce
		)
		let ciphertext = cipher.update(plaintext, "utf8")
		ciphertext = Buffer.concat([ciphertext, cipher.final()])

		const mac = crypto
			.createHmac("sha512", macKey)
			.update(Buffer.concat([nonce, ciphertext]))
			.digest()

		return Buffer.concat([mac, nonce, ciphertext]).toString("base64")
	}

	public static decrypt(message: string): string {
		const encryptionKey = CryptoService.getKey(
			process.env.CRYPTO_SERVICE_KEY
		)
		const macKey = CryptoService.getKey(process.env.CRYPTO_SERVICE_MAC_KEY)

		const decoded = Buffer.from(message, "base64")
		const mac = decoded.subarray(0, 64)
		const nonce = decoded.subarray(64, 80)
		const ciphertext = decoded.subarray(80)

		const calc = crypto
			.createHmac("sha512", macKey)
			.update(Buffer.concat([nonce, ciphertext]))
			.digest()

		if (!crypto.timingSafeEqual(mac, calc)) {
			throw new Error("Invalid MAC")
		}

		const decipher = crypto.createDecipheriv(
			CryptoService.algorithm,
			encryptionKey,
			nonce
		)
		let plainText = decipher.update(ciphertext, "binary", "utf8")
		plainText += decipher.final("utf8")

		return plainText
	}
}

export default CryptoService
