import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalDebtService } from './technical-debt.service';

describe('TechnicalDebtService', () => {
  let service: TechnicalDebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicalDebtService],
    }).compile();

    service = module.get<TechnicalDebtService>(TechnicalDebtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
