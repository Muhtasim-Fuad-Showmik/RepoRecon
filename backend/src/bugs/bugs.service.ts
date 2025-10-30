import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../common/logger.service';
import { Bug } from './entities/bug.entity';

@Injectable()
export class BugsService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Bug)
    private bugsRepository: Repository<Bug>,
  ) {}

  async create(bugData: Partial<Bug>): Promise<Bug> {
    this.logger.log(`Creating new bug: ${bugData.title}`);
    const bug = this.bugsRepository.create(bugData);
    const savedBug = await this.bugsRepository.save(bug);
    this.logger.log(`Bug created successfully with ID: ${savedBug.id}`);
    return savedBug;
  }

  async findAll(priority?: string, status?: string, assignedTo?: string): Promise<Bug[]> {
    this.logger.log(`Fetching all bugs with filters: priority=${priority}, status=${status}, assignedTo=${assignedTo}`);
    const queryBuilder = this.bugsRepository.createQueryBuilder('bug');
    
    if (priority) {
      queryBuilder.andWhere('bug.priority = :priority', { priority });
    }
    
    if (status) {
      queryBuilder.andWhere('bug.status = :status', { status });
    }
    
    const bugs = await queryBuilder.getMany();
    this.logger.log(`Found ${bugs.length} bugs`);
    return bugs;
  }

  async findOne(id: string): Promise<Bug | null> {
    this.logger.log(`Fetching bug with ID: ${id}`);
    const bug = await this.bugsRepository.findOne({ where: { id } });
    if (bug) {
      this.logger.log(`Bug found: ${bug.title}`);
    } else {
      this.logger.warn(`Bug with ID ${id} not found`);
    }
    return bug;
  }

  async update(id: string, bugData: Partial<Bug>): Promise<Bug> {
    this.logger.log(`Updating bug with ID: ${id}`);
    await this.bugsRepository.update(id, bugData);
    const updatedBug = await this.findOne(id);
    if (!updatedBug) {
      this.logger.warn(`Bug with ID ${id} not found for update`);
      throw new Error('Bug not found');
    }
    this.logger.log(`Bug updated successfully: ${updatedBug.title}`);
    return updatedBug;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting bug with ID: ${id}`);
    const result = await this.bugsRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Bug with ID ${id} not found for deletion`);
      throw new Error('Bug not found');
    }
    this.logger.log(`Bug deleted successfully`);
  }

  async search(query: string): Promise<Bug[]> {
    this.logger.log(`Searching bugs with query: ${query}`);
    if (!query) {
      this.logger.log('No query provided, returning all bugs');
      return this.findAll();
    }
    
    const bugs = await this.bugsRepository
      .createQueryBuilder('bug')
      .where('bug.title ILIKE :query', { query: `%${query}%` })
      .orWhere('bug.description ILIKE :query', { query: `%${query}%` })
      .getMany();
    
    this.logger.log(`Search returned ${bugs.length} results`);
    return bugs;
  }
}
