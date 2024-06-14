import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class ActionObjectFormater implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { action, players } = request.body;

    for (const key in action) {
      const newKey = players[key];
      action[newKey] = action[key];
      delete action[key];
    }

    return next.handle().pipe(
      map(data => data)
    );

  }

}

export default ActionObjectFormater;