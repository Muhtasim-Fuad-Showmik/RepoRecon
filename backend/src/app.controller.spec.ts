import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
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

  describe('bugs', () => {
    it('should return all bugs', () => {
      const bugs = appController.getAllBugs();
      expect(Array.isArray(bugs)).toBe(true);
      expect(bugs.length).toBeGreaterThan(0);
    });

    it('should return a bug by ID', () => {
      const bug = appController.getBugById('1');
      expect(bug).toBeDefined();
      expect(bug.id).toBe(1);
    });

    it('should create a new bug', () => {
      const newBug = { title: 'Test bug', priority: 'medium', assignedTo: 'Tester' };
      const createdBug = appController.createBug(newBug);
      expect(createdBug).toBeDefined();
      expect(createdBug.id).toBeGreaterThan(0);
      expect(createdBug.title).toBe('Test bug');
    });
  });
});
