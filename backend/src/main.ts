import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // Strip properties that do not have any decorators
    whitelist: true,
    // Throw an error if non-whitelisted properties are present in the request
    forbidNonWhitelisted: true,
    // Automatically transform payloads to be objects typed according to their DTO classes
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
