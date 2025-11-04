import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugsController } from './bugs.controller';
import { BugsService } from './bugs.service';
import { CommonModule } from '../common/common.module';
import { Bug } from './entities/bug.entity';
import { BugsRepository } from './repositories/bugs.repository';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Bug])],
  controllers: [BugsController],
  providers: [
    BugsService,
    BugsRepository
  ],
  exports: [
    BugsService, 
    TypeOrmModule,
    BugsRepository
  ]
})
export class BugsModule {}
