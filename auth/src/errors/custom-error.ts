import { HttpStatus } from '@nestjs/common';

export abstract class CustomError extends Error {
  abstract statusCode: HttpStatus;
  abstract message: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
