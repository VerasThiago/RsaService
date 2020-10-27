import * as crypto from 'crypto'

export class RsaService {
  private static singleton: RsaService

  public static getSingleton(algorithm?: string, key?: string, ivLength?: string): RsaService {
    if (RsaService.singleton) {
      return RsaService.singleton
    }

    RsaService.singleton = new RsaService(algorithm, key, ivLength)

    return RsaService.singleton
  }

  private cipherAlgorithm: string
  private cipherKey: Buffer
  private ivLength: number

  constructor(algorithm: string, key: string, ivLength: string) {
    this.cipherAlgorithm = algorithm
    this.cipherKey = Buffer.from(key, 'base64')
    this.ivLength = parseInt(ivLength, 10)
  }

  public encrypt(text: string): string {
    try {
      const iv: Buffer = crypto.randomBytes(this.ivLength)
      const cipher: crypto.Cipher = crypto.createCipheriv(this.cipherAlgorithm, this.cipherKey, iv)
      let encrypted: Buffer = cipher.update(text)

      encrypted = Buffer.concat([encrypted, cipher.final()])

      return `${iv.toString('hex')}:${encrypted.toString('hex')}`
    } catch (err) {
      console.error('Failed to encrypt: ', err.message)
    }
  }

  public decrypt(text: string): string {
    try {
      const textParts: string[] = text.split(':')
      const iv: Buffer = Buffer.from(textParts.shift(), 'hex')
      const encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex')
      const decipher: crypto.Decipher = crypto.createDecipheriv(this.cipherAlgorithm, this.cipherKey, iv)
      let decrypted: Buffer = decipher.update(encryptedText)

      decrypted = Buffer.concat([decrypted, decipher.final()])

      return decrypted.toString()
    } catch (err) {
      console.log('Failed to decrypt', err.message)
    }
  }
}
