import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as Res, Request } from 'express';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { MyContext } from '../context/my-context';

export interface Response<T> {
  code: number;
  message?: string;
  data?: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Res>();
    const req = ctx.getRequest<Request>();
    const reqCtx = RequestContext.get<MyContext>();
    reqCtx.body = req.body;
    reqCtx.params = req.params;
    reqCtx.query = req.query;
    return next.handle().pipe(
      map((response: any) => {
        const { code = HttpStatus.OK, message, data } = response;
        res.status(code);
        return {
          code,
          message,
          data,
        };
      }),
    );
  }
}
