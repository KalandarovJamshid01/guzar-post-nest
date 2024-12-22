import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ResponseInterCeptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterCeptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
