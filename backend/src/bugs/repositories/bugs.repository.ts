import { Repository, DataSource } from 'typeorm';
import { Bug } from '../entities/bug.entity';
import { BugStatus, BugPriority } from '../entities/bug.entity';

export class BugsRepository extends Repository<Bug> {
  constructor(dataSource: DataSource) {
    super(Bug, dataSource.createEntityManager());
  }

  async findActiveBugs(): Promise<Bug[]> {
    return this.createQueryBuilder('bug')
      .where('bug.status != :status', { status: BugStatus.CLOSED })
      .orderBy('bug.createdAt', 'DESC')
      .getMany();
  }

  async findBugsByPriority(priority: BugPriority): Promise<Bug[]> {
    return this.createQueryBuilder('bug')
      .where('bug.priority = :priority', { priority })
      .orderBy('bug.createdAt', 'DESC')
      .getMany();
  }

  async findBugsByAssignee(assigneeId: string): Promise<Bug[]> {
    return this.createQueryBuilder('bug')
      .leftJoinAndSelect('bug.assignee', 'assignee')
      .leftJoinAndSelect('bug.reporter', 'reporter')
      .leftJoinAndSelect('bug.project', 'project')
      .where('bug.assignee.id = :assigneeId', { assigneeId })
      .orderBy('bug.createdAt', 'DESC')
      .getMany();
  }

  async getBugStatistics(): Promise<any> {
    const stats = await this.createQueryBuilder('bug')
      .select('bug.status', 'status')
      .addSelect('COUNT(bug.id)', 'count')
      .groupBy('bug.status')
      .getRawMany();

    return stats.reduce((acc, stat) => {
      acc[stat.status] = parseInt(stat.count);
      return acc;
    }, {} as Record<string, number>);
  }
}
