import { Controller, Get } from '@nestjs/common';
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
}
