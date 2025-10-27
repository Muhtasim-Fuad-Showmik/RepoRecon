import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BugsModule } from './bugs/bugs.module';
import { CommonModule } from './common/common.module';
import { LoggerService } from './common/logger.service';
import { LoggingMiddleware } from './common/logging.middleware';
import { ValidationMiddleware } from './common/validation.middleware';
import { corsMiddleware } from './common/cors.middleware';

@Module({
  imports: [CommonModule, BugsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply CORS middleware to all routes
    consumer
      .apply(corsMiddleware)
      .forRoutes('*');
    
    // Apply logging middleware to all routes
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
    
    // Apply validation middleware to specific routes
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'bugs', method: RequestMethod.POST },
        { path: 'bugs/:id', method: RequestMethod.PUT }
      );
  }
}
