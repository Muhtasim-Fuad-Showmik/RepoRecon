import { Injectable } from '@nestjs/common';
import { LoggerService } from './common/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {
    this.logger.log('AppService initialized');
  }

  getWelcomeMessage(): string {
    this.logger.log('Returning welcome message');
    return 'Welcome to RepoRecon - Your Bug Tracking and Technical Debt Management System';
  }

  getAppInfo(): any {
    this.logger.log('Returning app info');
    return {
      name: 'RepoRecon',
      version: '1.0.0',
      description: 'Bug tracking and technical debt management application',
      features: [
        'Bug Tracking',
        'Technical Debt Management',
        'Project Management',
        'Team Collaboration'
      ]
    };
  }
}
