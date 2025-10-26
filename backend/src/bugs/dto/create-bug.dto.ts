import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateBugDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority: string;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}
