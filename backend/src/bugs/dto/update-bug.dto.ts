import { PartialType } from '@nestjs/mapped-types';
import { CreateBugDto } from './create-bug.dto';

// Create DTO for updating bugs with every property of creation DTO made optional
export class UpdateBugDto extends PartialType(CreateBugDto) {}
