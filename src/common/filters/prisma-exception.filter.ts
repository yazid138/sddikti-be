import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
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
      code: 500,
      message: 'Terjadi kesalahan pada server',
    };

    if (exception.code === 'P2025') {
      responseData = {
        ...responseData,
        code: 404,
        message: 'Error! Data tidak ada',
      };
    }

    response.status(responseData.code).json(responseData);
  }
}
