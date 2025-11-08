import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalDebtController } from './technical-debt.controller';
import { TechnicalDebtService } from './technical-debt.service';
import { TechnicalDebt } from './entities/technical-debt.entity';
import { TechnicalDebtComment } from './entities/technical-debt-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalDebt, TechnicalDebtComment])],
  controllers: [TechnicalDebtController],
  providers: [TechnicalDebtService],
  exports: [TechnicalDebtService, TypeOrmModule]
})
export class TechnicalDebtModule {}
