import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome to RepoRecon - Your Bug Tracking and Technical Debt Management System';
  }

  getAppInfo(): any {
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
