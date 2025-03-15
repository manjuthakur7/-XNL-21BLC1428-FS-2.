import * as crypto from 'crypto';

export class SecurityService {
  private algorithm = 'aes-256-cbc';
  private key: Buffer;
  private iv = Buffer.alloc(16, 0);

  constructor() {
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY is not defined');
    }
    this.key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
