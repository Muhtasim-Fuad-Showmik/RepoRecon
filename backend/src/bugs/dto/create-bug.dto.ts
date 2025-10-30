import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { BugPriority } from '../entities/bug.entity';

export class CreateBugDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(BugPriority)
  priority: BugPriority;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}
