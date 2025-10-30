import { Test, TestingModule } from '@nestjs/testing';
import { BugsService } from './bugs.service';
import { LoggerService } from '../common/logger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bug } from './entities/bug.entity';

describe('BugsService', () => {
  let service: BugsService;
  let mockRepository: any;

  beforeEach(async () => {
    // Create a mock repository
    mockRepository = {
      create: jest.fn().mockImplementation((bug) => ({ id: '1', ...bug })),
      save: jest.fn().mockImplementation((bug) => Promise.resolve(bug)),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
      createQueryBuilder: jest.fn(() => ({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
      })),
    };

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
        {
          provide: getRepositoryToken(Bug),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BugsService>(BugsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bugs', async () => {
      mockRepository.createQueryBuilder().getMany.mockResolvedValue([
        { id: '1', title: 'Test Bug' },
      ]);
      
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a bug by ID', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1', title: 'Test Bug' });
      
      const result = await service.findOne('1');
      expect(result).toBeDefined();
      if (result) {
        expect(result.id).toBe('1');
      }
    });
  });

  describe('create', () => {
    it('should create a new bug', async () => {
      const newBug = { 
        title: 'Test bug', 
        description: 'Test description',
        priority: 'medium' as any, 
        assignedTo: 'Tester' 
      };
      
      mockRepository.create.mockImplementation((bug) => ({ id: '1', ...bug }));
      mockRepository.save.mockImplementation((bug) => Promise.resolve(bug));
      
      const result = await service.create(newBug);
      expect(result).toBeDefined();
      expect(result.title).toBe('Test bug');
    });
  });
});
