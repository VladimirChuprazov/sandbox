import { HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class UserAlreadyExistsError extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST;
  message = 'User already exists';

  constructor() {
    super('User already exists');

    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
