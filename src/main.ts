import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';
import LogginInterceptor from './common/interceptor/LoggerInterceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = new ConfigService();
  app.useGlobalInterceptors(new LogginInterceptor());
  await app.listen(configService.get<number>('SERVER_PORT'));
};

bootstrap();