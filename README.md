# secure-encryption

[![npm version](https://badge.fury.io/js/secure-encryption.svg)](https://badge.fury.io/js/secure-encryption)
[![license](https://img.shields.io/npm/l/secure-encryption.svg)](https://www.npmjs.com/package/secure-encryption)

A simple and secure encryption and decryption service using AES-256-CTR and HMAC-SHA512.

## Installation

Install the package via npm:

```bash
npm install @imirfanul/secure-encryption
```

## Usage

### Importing the Package

Import the `CryptoService` class in your TypeScript or JavaScript file:

```typescript
import CryptoService from '@imirfanul/secure-encryption';
```

### Environment Variables

Ensure you have the following environment variables set:

- `CRYPTO_SERVICE_KEY`: Base64 encoded 32-byte encryption key.
- `CRYPTO_SERVICE_MAC_KEY`: Base64 encoded 32-byte MAC key.

### Encrypting Text

To encrypt plaintext:

```typescript
const plainText = 'Hello, World!';
const encryptedText = CryptoService.encrypt(plainText);
console.log('Encrypted Text:', encryptedText);
```

### Decrypting Text

To decrypt encrypted text:

```typescript
const decryptedText = CryptoService.decrypt(encryptedText);
console.log('Decrypted Text:', decryptedText);
```

### Example

Here's a complete example:

```typescript
import CryptoService from '@imirfanul/secure-encryption';

process.env.CRYPTO_SERVICE_KEY = 'your_base64_encoded_32_byte_encryption_key';
process.env.CRYPTO_SERVICE_MAC_KEY = 'your_base64_encoded_32_byte_mac_key';

const plainText = 'Hello, World!';

// Encrypt the plaintext
const encryptedText = CryptoService.encrypt(plainText);
console.log('Encrypted Text:', encryptedText);

// Decrypt the encrypted text
const decryptedText = CryptoService.decrypt(encryptedText);
console.log('Decrypted Text:', decryptedText);
```

## API

### `encrypt(plaintext: string): string`

Encrypts the given plaintext using the encryption key and MAC key.

- **Parameters**:
  - `plaintext` (string): The text to be encrypted.
- **Returns**:
  - `string`: The base64 encoded encrypted text.

### `decrypt(message: string): string`

Decrypts the given encrypted message using the encryption key and MAC key.

- **Parameters**:
  - `message` (string): The base64 encoded encrypted text.
- **Returns**:
  - `string`: The decrypted plaintext.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Acknowledgments

Inspired by various encryption tutorials and documentation.
