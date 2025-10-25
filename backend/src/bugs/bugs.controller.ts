import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BugsService } from './bugs.service';

@Controller('bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  getAllBugs(): any[] {
    return this.bugsService.getAllBugs();
  }

  @Get(':id')
  getBugById(@Param('id') id: string): any {
    return this.bugsService.getBugById(parseInt(id));
  }

  @Post()
  createBug(@Body() bug: any): any {
    return this.bugsService.createBug(bug);
  }
}
