import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

@Injectable()
export class EncrypterService {
  private async hashPassword(password: string, salt: string): Promise<string> {
    const buffer = await pbkdf2Async(password, salt, 1000, 64, `sha512`);
    return buffer.toString(`hex`);
  }

  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = await this.hashPassword(password, salt);
    return `${hashedPassword}.${salt}`;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const [, salt] = hashedPassword.split('.');
    const hash = await this.hashPassword(password, salt);
    return hashedPassword === hash;
  }
}
