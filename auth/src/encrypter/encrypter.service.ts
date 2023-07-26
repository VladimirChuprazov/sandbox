import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

@Injectable()
export class EncrypterService {
  private async hashStr(str: string, salt: string): Promise<string> {
    const buffer = await pbkdf2Async(str, salt, 1000, 64, `sha512`);
    return buffer.toString(`hex`);
  }

  async hash(str: string): Promise<{ salt: string; hashedStr: string }> {
    const salt = randomBytes(16).toString('hex');
    const hashedStr = await this.hashStr(str, salt);
    return { salt, hashedStr };
  }

  async compare(
    str: string,
    hashedStr: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await this.hashStr(str, salt);
    return hashedStr === hash;
  }
}
