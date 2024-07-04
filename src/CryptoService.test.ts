import { expect } from "chai"
import CryptoService from "./test/CryptoService"

process.env.CRYPTO_SERVICE_KEY = "cGFzc3dvcmRwYXNzd29yZGhlcmVzdGV0aGVyZXN0ZXI="
process.env.CRYPTO_SERVICE_MAC_KEY =
	"bWFja2V5bWFja2V5bWFja2V5bWFja2VleW1hY2tleQ=="

describe("CryptoService", () => {
	const plainText = "Hello, World!"

	it("should encrypt and decrypt the text correctly", () => {
		const encryptedText = CryptoService.encrypt(plainText)
		expect(encryptedText).to.not.equal(plainText)

		const decryptedText = CryptoService.decrypt(encryptedText)
		expect(decryptedText).to.equal(plainText)
	})

	it("should throw an error with invalid MAC", () => {
		const encryptedText = CryptoService.encrypt(plainText)
		const tamperedText =
			encryptedText.slice(0, -1) +
			(encryptedText.slice(-1) === "A" ? "B" : "A")

		expect(() => CryptoService.decrypt(tamperedText)).to.throw(
			"Invalid MAC"
		)
	})

	it("should throw an error with invalid encryption key", () => {
		const originalKey = process.env.CRYPTO_SERVICE_KEY
		process.env.CRYPTO_SERVICE_KEY =
			"invalidinvalidinvalidinvalidinvalidinv"
		const encryptedText = CryptoService.encrypt(plainText)

		process.env.CRYPTO_SERVICE_KEY = originalKey // Restore the correct key

		expect(() => CryptoService.decrypt(encryptedText)).to.throw()
	})

	it("should throw an error with invalid MAC key", () => {
		const originalMacKey = process.env.CRYPTO_SERVICE_MAC_KEY
		process.env.CRYPTO_SERVICE_MAC_KEY =
			"invalidinvalidinvalidinvalidinvalidinv"
		const encryptedText = CryptoService.encrypt(plainText)

		process.env.CRYPTO_SERVICE_MAC_KEY = originalMacKey // Restore the correct MAC key

		expect(() => CryptoService.decrypt(encryptedText)).to.throw()
	})
})
