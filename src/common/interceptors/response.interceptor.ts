import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { paginationHelper } from '../helpers/pagination.helper';

@Injectable()
export class ResponseInterCeptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        // const request = context.switchToHttp().getRequest();
        const statusCode = response.statusCode || 200;
        // const { page, limit } = paginationHelper(request);
        return {
          status: 'Success',
          code: statusCode,
          meta: data.count
            ? {
                total: data.count,
                // page,
                // limit,
              }
            : {},
          data: data.count ? data.data : data,
        };
      }),
    );
  }
}
