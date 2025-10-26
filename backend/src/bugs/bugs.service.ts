import { Injectable } from '@nestjs/common';

@Injectable()
export class BugsService {
  private bugs = [
    { 
      id: 1, 
      title: 'Login page not responsive', 
      description: 'The login page is not responding to clicks',
      status: 'open', 
      priority: 'high', 
      assignedTo: 'John Doe',
      createdAt: new Date().toISOString()
    },
    { 
      id: 2, 
      title: 'Database connection timeout', 
      description: 'Database connection is timing out after 30 seconds',
      status: 'in-progress', 
      priority: 'critical', 
      assignedTo: 'Jane Smith',
      createdAt: new Date().toISOString()
    },
    { 
      id: 3, 
      title: 'UI alignment issues', 
      description: 'Buttons are not aligned properly on the dashboard',
      status: 'resolved', 
      priority: 'low', 
      assignedTo: 'Mike Johnson',
      createdAt: new Date().toISOString()
    }
  ];

  // Get all bugs with optional filtering
  getAllBugs(priority?: string, status?: string, assignedTo?: string): any[] {
    return this.bugs.filter(bug => {
      if (priority && bug.priority !== priority) return false;
      if (status && bug.status !== status) return false;
      if (assignedTo && bug.assignedTo !== assignedTo) return false;
      return true;
    });
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

  // Update a bug
  updateBug(id: number, updatedBug: any): any {
    const index = this.bugs.findIndex(bug => bug.id === id);
    if (index === -1) return null;
    
    // Don't allow updating the status through this method
    const { status, ...updateData } = updatedBug;
    
    this.bugs[index] = {
      ...this.bugs[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return this.bugs[index];
  }

  // Delete a bug
  deleteBug(id: number): void {
    const index = this.bugs.findIndex(bug => bug.id === id);
    if (index !== -1) {
      this.bugs.splice(index, 1);
    }
  }

  // Search bugs
  searchBugs(query: string): any[] {
    if (!query) return this.bugs;
    
    return this.bugs.filter(bug => 
      bug.title.toLowerCase().includes(query.toLowerCase()) ||
      bug.description.toLowerCase().includes(query.toLowerCase()) ||
      bug.assignedTo.toLowerCase().includes(query.toLowerCase())
    );
  }
}
