import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BugsModule } from './bugs/bugs.module';
import { CommonModule } from './common/common.module';
import { LoggerService } from './common/logger.service';

@Module({
  imports: [CommonModule, BugsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
