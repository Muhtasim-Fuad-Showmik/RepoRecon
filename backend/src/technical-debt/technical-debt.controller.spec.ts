import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalDebtController } from './technical-debt.controller';

describe('TechnicalDebtController', () => {
  let controller: TechnicalDebtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalDebtController],
    }).compile();

    controller = module.get<TechnicalDebtController>(TechnicalDebtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
