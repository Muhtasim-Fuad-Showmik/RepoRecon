import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { BugComment } from './bug-comment.entity';

export enum BugStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum BugPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum BugSeverity {
  TRIVIAL = 'trivial',
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

@Entity()
export class Bug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Project, project => project.bugs)
  project: Project;

  @ManyToOne(() => User, user => user.assignedBugs)
  assignee: User;

  @ManyToOne(() => User, user => user.reportedBugs)
  reporter: User;

  @Column({
    type: 'enum',
    enum: BugStatus,
    default: BugStatus.NEW,
  })
  status: BugStatus;

  @Column({
    type: 'enum',
    enum: BugPriority,
    default: BugPriority.MEDIUM,
  })
  priority: BugPriority;

  @Column({
    type: 'enum',
    enum: BugSeverity,
    default: BugSeverity.MINOR,
  })
  severity: BugSeverity;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BugComment, comment => comment.bug)
  comments: BugComment[];

  @UpdateDateColumn()
  updatedAt: Date;
}
