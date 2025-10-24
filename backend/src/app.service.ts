import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private bugs = [
    { id: 1, title: 'Login page not responsive', status: 'open', priority: 'high', assignedTo: 'John Doe' },
    { id: 2, title: 'Database connection timeout', status: 'in-progress', priority: 'critical', assignedTo: 'Jane Smith' },
    { id: 3, title: 'UI alignment issues', status: 'resolved', priority: 'low', assignedTo: 'Mike Johnson' }
  ];

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

  // Simulate getting all bugs
  getAllBugs(): any[] {
    return this.bugs;
  }

  // Simulate getting a bug by ID
  getBugById(id: number): any {
    return this.bugs.find(bug => bug.id === id);
  }

  // Simulate creating a new bug
  createBug(bug: any): any {
    const newBug = {
      id: this.bugs.length + 1,
      ...bug,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    this.bugs.push(newBug);
    return newBug;
  }
}
