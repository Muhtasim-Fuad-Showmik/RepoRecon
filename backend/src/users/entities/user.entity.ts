import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Bug } from '../../bugs/entities/bug.entity';
import { TechnicalDebt } from '../../technical-debt/entities/technical-debt.entity';
import { BugComment } from '../../bugs/entities/bug-comment.entity';
import { TechnicalDebtComment } from '../../technical-debt/entities/technical-debt-comment.entity';

export enum UserRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  MANAGER = 'manager',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEVELOPER,
  })
  role: UserRole;

  @OneToMany(() => Project, project => project.owner)
  ownedProjects: Project[];

  @OneToMany(() => Bug, bug => bug.reporter)
  reportedBugs: Bug[];

  @OneToMany(() => Bug, bug => bug.assignee)
  assignedBugs: Bug[];

  @OneToMany(() => TechnicalDebt, debt => debt.reporter)
  reportedTechnicalDebt: TechnicalDebt[];

  @OneToMany(() => TechnicalDebt, debt => debt.assignee)
  assignedTechnicalDebt: TechnicalDebt[];

  @OneToMany(() => BugComment, comment => comment.author)
  bugComments: BugComment[];

  @OneToMany(() => TechnicalDebtComment, comment => comment.author)
  technicalDebtComments: TechnicalDebtComment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
