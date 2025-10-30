import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugsController } from './bugs.controller';
import { BugsService } from './bugs.service';
import { CommonModule } from '../common/common.module';
import { Bug } from './entities/bug.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Bug])],
  controllers: [BugsController],
  providers: [BugsService],
  exports: [BugsService, TypeOrmModule]
})
export class BugsModule {}
