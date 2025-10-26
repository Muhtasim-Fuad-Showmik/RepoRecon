import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { BugsService } from './bugs.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { UpdateBugDto } from './dto/update-bug.dto';

@Controller('bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  getAllBugs(
    @Query('priority') priority?: string,
    @Query('status') status?: string,
    @Query('assignedTo') assignedTo?: string
  ): any[] {
    return this.bugsService.getAllBugs(priority, status, assignedTo);
  }

  @Get(':id')
  getBugById(@Param('id') id: string): any {
    return this.bugsService.getBugById(parseInt(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBug(@Body() createBugDto: CreateBugDto): any {
    return this.bugsService.createBug(createBugDto);
  }

  @Put(':id')
  updateBug(
    @Param('id') id: string,
    @Body() updateBugDto: UpdateBugDto
  ): any {
    return this.bugsService.updateBug(parseInt(id), updateBugDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBug(@Param('id') id: string): void {
    this.bugsService.deleteBug(parseInt(id));
  }

  @Get('search')
  searchBugs(@Query('q') query: string): any[] {
    return this.bugsService.searchBugs(query);
  }
}
