import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { configValidationSchema } from './config/config.validation';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
      envFilePath: process.env.NODE_ENV === 'production' 
        ? '.env.production' 
        : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get<boolean>('database.logging'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret') || 'your-super-secret-jwt-key',
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') || '1h' }
      }) as any,
      inject: [ConfigService],
    }),
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
