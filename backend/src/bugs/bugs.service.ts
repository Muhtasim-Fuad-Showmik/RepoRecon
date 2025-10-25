import { Injectable } from '@nestjs/common';

@Injectable()
export class BugsService {
  private bugs = [
    { id: 1, title: 'Login page not responsive', status: 'open', priority: 'high', assignedTo: 'John Doe' },
    { id: 2, title: 'Database connection timeout', status: 'in-progress', priority: 'critical', assignedTo: 'Jane Smith' },
    { id: 3, title: 'UI alignment issues', status: 'resolved', priority: 'low', assignedTo: 'Mike Johnson' }
  ];

  // Get all bugs
  getAllBugs(): any[] {
    return this.bugs;
  }

  // Get a bug by ID
  getBugById(id: number): any {
    return this.bugs.find(bug => bug.id === id);
  }

  // Create a new bug
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
