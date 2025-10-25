import { Test, TestingModule } from '@nestjs/testing';
import { BugsController } from './bugs.controller';
import { BugsService } from './bugs.service';

describe('BugsController', () => {
  let controller: BugsController;
  let service: BugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugsController],
      providers: [BugsService],
    }).compile();

    controller = module.get<BugsController>(BugsController);
    service = module.get<BugsService>(BugsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBugs', () => {
    it('should return an array of bugs', () => {
      const result = controller.getAllBugs();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getBugById', () => {
    it('should return a bug by ID', () => {
      const result = controller.getBugById('1');
      expect(result).toBeDefined();
    });
  });

  describe('createBug', () => {
    it('should create a new bug', () => {
      const newBug = { title: 'Test bug', priority: 'medium', assignedTo: 'Tester' };
      const result = controller.createBug(newBug);
      expect(result).toBeDefined();
      expect(result.id).toBeGreaterThan(0);
    });
  });
});
