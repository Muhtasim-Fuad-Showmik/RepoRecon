import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BugsModule } from './bugs/bugs.module';
import { CommonModule } from './common/common.module';
import { LoggerService } from './common/logger.service';
import { LoggingMiddleware } from './common/logging.middleware';
import { ValidationMiddleware } from './common/validation.middleware';
import { corsMiddleware } from './common/cors.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TechnicalDebtModule } from './technical-debt/technical-debt.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CommonModule, 
    BugsModule, 
    AuthModule, 
    UsersModule, 
    ProjectsModule, 
    TechnicalDebtModule
  ],
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
