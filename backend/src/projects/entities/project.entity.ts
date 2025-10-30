import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Bug } from '../../bugs/entities/bug.entity';
import { TechnicalDebt } from '../../technical-debt/entities/technical-debt.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.ownedProjects)
  owner: User;

  @OneToMany(() => Bug, bug => bug.project)
  bugs: Bug[];

  @OneToMany(() => TechnicalDebt, debt => debt.project)
  technicalDebt: TechnicalDebt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
