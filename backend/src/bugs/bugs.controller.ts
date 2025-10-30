import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { BugsService } from './bugs.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { UpdateBugDto } from './dto/update-bug.dto';
import { Bug } from './entities/bug.entity';

@Controller('bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  async getAllBugs(
    @Query('priority') priority?: string,
    @Query('status') status?: string,
  ): Promise<Bug[]> {
    return this.bugsService.findAll(priority, status);
  }

  @Get(':id')
  async getBugById(@Param('id') id: string): Promise<Bug> {
    const bug = await this.bugsService.findOne(id);
    if (!bug) {
      throw new Error('Bug not found');
    }
    return bug;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBug(@Body() createBugDto: CreateBugDto): Promise<Bug> {
    return this.bugsService.create(createBugDto);
  }

  @Put(':id')
  async updateBug(
    @Param('id') id: string,
    @Body() updateBugDto: UpdateBugDto
  ): Promise<Bug> {
    return this.bugsService.update(id, updateBugDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBug(@Param('id') id: string): Promise<void> {
    return this.bugsService.remove(id);
  }

  @Get('search')
  async searchBugs(@Query('q') query: string): Promise<Bug[]> {
    return this.bugsService.search(query);
  }
}
