import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get('info')
  getAppInfo(): any {
    return this.appService.getAppInfo();
  }

  @Get('health')
  healthCheck(): any {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'RepoRecon API'
    };
  }

  // Bug tracking endpoints
  @Get('bugs')
  getAllBugs(): any[] {
    return this.appService.getAllBugs();
  }

  @Get('bugs/:id')
  getBugById(@Param('id') id: string): any {
    return this.appService.getBugById(parseInt(id));
  }

  @Post('bugs')
  createBug(@Body() bug: any): any {
    return this.appService.createBug(bug);
  }
}
