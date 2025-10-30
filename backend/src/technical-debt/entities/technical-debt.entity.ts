import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export enum TechnicalDebtStatus {
  IDENTIFIED = 'identified',
  PRIORITIZED = 'prioritized',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}

export enum TechnicalDebtType {
  CODE = 'code',
  ARCHITECTURE = 'architecture',
  TESTING = 'testing',
  DOCUMENTATION = 'documentation',
  SECURITY = 'security',
}

@Entity()
export class TechnicalDebt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Project, project => project.technicalDebt)
  project: Project;

  @ManyToOne(() => User, user => user.assignedTechnicalDebt)
  assignee: User;

  @ManyToOne(() => User, user => user.reportedTechnicalDebt)
  reporter: User;

  @Column({
    type: 'enum',
    enum: TechnicalDebtStatus,
    default: TechnicalDebtStatus.IDENTIFIED,
  })
  status: TechnicalDebtStatus;

  @Column({ nullable: true })
  effortEstimate: number;

  @Column({
    type: 'enum',
    enum: TechnicalDebtType,
    default: TechnicalDebtType.CODE,
  })
  debtType: TechnicalDebtType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
