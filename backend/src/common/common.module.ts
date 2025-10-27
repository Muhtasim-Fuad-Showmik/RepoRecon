import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggingMiddleware } from './logging.middleware';
import { ValidationMiddleware } from './validation.middleware';

@Module({
  providers: [LoggerService, LoggingMiddleware, ValidationMiddleware],
  exports: [LoggerService, LoggingMiddleware, ValidationMiddleware],
})
export class CommonModule {}
