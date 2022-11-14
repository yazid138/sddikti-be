import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Res>();

    let responseData: {
      code: number;
      message?: string;
    } = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Terjadi kesalahan pada server',
    };

    if (exception.code === 'P2025') {
      responseData = {
        ...responseData,
        code: HttpStatus.NOT_FOUND,
        message: 'Error! Data tidak ada',
      };
    }

    response.status(responseData.code).json(responseData);
  }
}
