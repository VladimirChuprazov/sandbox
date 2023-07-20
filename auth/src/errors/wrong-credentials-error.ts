import { HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class WrongCredentialsError extends CustomError {
  statusCode = HttpStatus.UNAUTHORIZED;
  message = 'Wrong credentials';

  constructor() {
    super('Wrong credentials');

    Object.setPrototypeOf(this, WrongCredentialsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
