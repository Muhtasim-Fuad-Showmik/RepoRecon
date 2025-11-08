import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user.entity';

export class UsersRepository extends Repository<User> {
  async findUsersByRole(role: UserRole): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.role = :role', { role })
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }

  async findUsersWithProjects(): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.ownedProjects', 'project')
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }

  async getUserStatistics(): Promise<any> {
    const stats = await this.createQueryBuilder('user')
      .select('user.role', 'role')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('user.role')
      .getRawMany();

    return stats.reduce((acc, stat) => {
      acc[stat.role] = parseInt(stat.count);
      return acc;
    }, {} as Record<string, number>);
  }
}
