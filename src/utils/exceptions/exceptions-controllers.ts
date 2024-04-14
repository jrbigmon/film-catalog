import { Response } from 'express';
import { ExceptionsServices } from './exceptions-services';
import { HttpStatus, Logger } from '@nestjs/common';

export class ExceptionsControllers {
  public static getException(error: Error | ExceptionsServices, res: Response) {
    Logger.error(error.message);

    if (error instanceof ExceptionsServices) {
      return res.status(error.statusCode).json({
        message: error.message,
        field: error.fieldError,
        statusCode: error.statusCode,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      field: 'UNKNOWN',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
