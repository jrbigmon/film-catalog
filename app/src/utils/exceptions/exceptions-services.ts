import { HttpStatus } from '@nestjs/common';

export class ExceptionsServices {
  constructor(
    public message: string,
    public statusCode: HttpStatus,
    public fieldError: string,
  ) {}
}
