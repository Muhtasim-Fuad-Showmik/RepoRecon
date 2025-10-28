import { Module } from '@nestjs/common';
import { TechnicalDebtController } from './technical-debt.controller';
import { TechnicalDebtService } from './technical-debt.service';

@Module({
  controllers: [TechnicalDebtController],
  providers: [TechnicalDebtService]
})
export class TechnicalDebtModule {}
