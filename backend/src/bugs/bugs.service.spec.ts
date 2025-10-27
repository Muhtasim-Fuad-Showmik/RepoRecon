import { Test, TestingModule } from '@nestjs/testing';
import { BugsService } from './bugs.service';
import { LoggerService } from '../common/logger.service';

describe('BugsService', () => {
  let service: BugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BugsService,
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

    service = module.get<BugsService>(BugsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBugs', () => {
    it('should return an array of bugs', () => {
      const result = service.getAllBugs();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getBugById', () => {
    it('should return a bug by ID', () => {
      const result = service.getBugById(1);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });
  });

  describe('createBug', () => {
    it('should create a new bug', () => {
      const newBug = { 
        title: 'Test bug', 
        description: 'Test description',
        priority: 'medium', 
        assignedTo: 'Tester' 
      };
      const result = service.createBug(newBug);
      expect(result).toBeDefined();
      expect(result.id).toBeGreaterThan(0);
      expect(result.title).toBe('Test bug');
    });
  });
});
