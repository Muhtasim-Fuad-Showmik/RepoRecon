import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TechnicalDebt } from './technical-debt.entity';

@Entity()
export class TechnicalDebtComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => TechnicalDebt, technicalDebt => technicalDebt.comments, { onDelete: 'CASCADE' })
  technicalDebt: TechnicalDebt;

  @ManyToOne(() => User, user => user.technicalDebtComments)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
