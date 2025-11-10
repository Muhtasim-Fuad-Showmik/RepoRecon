import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly customUsersRepository: UsersRepository,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async createWithHashedPassword(userData: Partial<User>): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findUsersByRole(role: string): Promise<User[]> {
    return this.customUsersRepository.findUsersByRole(role as any);
  }

  async getUsersWithProjects(): Promise<User[]> {
    return this.customUsersRepository.findUsersWithProjects();
  }

  async getUserStatistics(): Promise<any> {
    return this.customUsersRepository.getUserStatistics();
  }
}
