import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
class AuthorizationGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    let bearerToken: string;
    let token: string;

    try {
      bearerToken = request.headers.authorization;
      [, token] = bearerToken.split(' ');
    } catch {
      throw new BadRequestException('Token format is invalid!');
    }

    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      return true;
    } catch {
      throw new UnauthorizedException('You do not permissions to access this content!');
    }
  }
}

export default AuthorizationGuard;