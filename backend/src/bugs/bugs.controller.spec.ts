import { Test, TestingModule } from '@nestjs/testing';
import { BugsController } from './bugs.controller';
import { BugsService } from './bugs.service';

describe('BugsController', () => {
  let controller: BugsController;
  let service: BugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugsController],
      providers: [
        {
          provide: BugsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BugsController>(BugsController);
    service = module.get<BugsService>(BugsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBugs', () => {
    it('should return an array of bugs', async () => {
      const mockBugs = [{ id: '1', title: 'Test Bug' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockBugs as any);
      
      const result = await controller.getAllBugs();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(mockBugs);
    });
  });

  describe('getBugById', () => {
    it('should return a bug by ID', async () => {
      const mockBug = { id: '1', title: 'Test Bug' };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockBug as any);
      
      const result = await controller.getBugById('1');
      expect(result).toBeDefined();
      expect(result).toEqual(mockBug);
    });
  });

  describe('createBug', () => {
    it('should create a new bug', async () => {
      const newBug = { 
        title: 'Test bug', 
        description: 'Test description',
        priority: 'medium' as any, 
        assignedTo: 'Tester' 
      };
      const createdBug = { id: '1', ...newBug };
      jest.spyOn(service, 'create').mockResolvedValue(createdBug as any);
      
      const result = await controller.createBug(newBug);
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
    });
  });
});
