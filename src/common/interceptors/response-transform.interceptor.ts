import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as Res, Request } from 'express';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { MyRequestContext } from '../context/my-request-context';

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
    RequestContext.get<MyRequestContext>().body = req.body;
    RequestContext.get<MyRequestContext>().params = req.params;
    RequestContext.get<MyRequestContext>().query = req.query;
    return next.handle().pipe(
      map((response) => {
        res.status(response?.code || 200);
        return {
          code: response?.code || 200,
          message: response?.message,
          data: response?.data || response,
        };
      }),
    );
  }
}
