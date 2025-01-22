import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilter } from './global-filter/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.FRONTEND_URL });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
