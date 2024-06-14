import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
class LogginInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now: number = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        console.log(`Method: ${method} | URL: ${url} | Response Time: ${responseTime}`);
      })
    );

  }

}

export default LogginInterceptor;