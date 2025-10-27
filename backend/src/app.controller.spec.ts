import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './common/logger.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return RepoRecon welcome message', () => {
      expect(appController.getWelcomeMessage()).toBe('Welcome to RepoRecon - Your Bug Tracking and Technical Debt Management System');
    });
  });

  describe('info', () => {
    it('should return app info', () => {
      const info = appController.getAppInfo();
      expect(info.name).toBe('RepoRecon');
      expect(info.version).toBe('1.0.0');
    });
  });

  describe('health', () => {
    it('should return health check status', () => {
      const health = appController.healthCheck();
      expect(health.status).toBe('OK');
      expect(health.service).toBe('RepoRecon API');
    });
  });
});
