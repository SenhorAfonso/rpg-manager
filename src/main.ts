import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import LogginInterceptor from './common/interceptor/LoggerInterceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LogginInterceptor())
  await app.listen(3000);
};

bootstrap();