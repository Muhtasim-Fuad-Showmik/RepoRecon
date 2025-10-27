import { Injectable } from '@nestjs/common';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class BugsService {
  constructor(private readonly logger: LoggerService) {}

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
    this.logger.log(`Fetching all bugs with filters: priority=${priority}, status=${status}, assignedTo=${assignedTo}`);
    const filteredBugs = this.bugs.filter(bug => {
      if (priority && bug.priority !== priority) return false;
      if (status && bug.status !== status) return false;
      if (assignedTo && bug.assignedTo !== assignedTo) return false;
      return true;
    });
    this.logger.log(`Found ${filteredBugs.length} bugs`);
    return filteredBugs;
  }

  // Get a bug by ID
  getBugById(id: number): any {
    this.logger.log(`Fetching bug with ID: ${id}`);
    const bug = this.bugs.find(bug => bug.id === id);
    if (bug) {
      this.logger.log(`Bug found: ${bug.title}`);
    } else {
      this.logger.warn(`Bug with ID ${id} not found`);
    }
    return bug;
  }

  // Create a new bug
  createBug(bug: any): any {
    this.logger.log(`Creating new bug: ${bug.title}`);
    const newBug = {
      id: this.bugs.length + 1,
      ...bug,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    this.bugs.push(newBug);
    this.logger.log(`Bug created successfully with ID: ${newBug.id}`);
    return newBug;
  }

  // Update a bug
  updateBug(id: number, updatedBug: any): any {
    this.logger.log(`Updating bug with ID: ${id}`);
    const index = this.bugs.findIndex(bug => bug.id === id);
    if (index === -1) {
      this.logger.warn(`Bug with ID ${id} not found for update`);
      return null;
    }
    
    // Don't allow updating the status through this method
    const { status, ...updateData } = updatedBug;
    
    this.bugs[index] = {
      ...this.bugs[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.logger.log(`Bug updated successfully: ${this.bugs[index].title}`);
    return this.bugs[index];
  }

  // Delete a bug
  deleteBug(id: number): void {
    this.logger.log(`Deleting bug with ID: ${id}`);
    const index = this.bugs.findIndex(bug => bug.id === id);
    if (index !== -1) {
      const deletedBug = this.bugs[index];
      this.bugs.splice(index, 1);
      this.logger.log(`Bug deleted successfully: ${deletedBug.title}`);
    } else {
      this.logger.warn(`Bug with ID ${id} not found for deletion`);
    }
  }

  // Search bugs
  searchBugs(query: string): any[] {
    this.logger.log(`Searching bugs with query: ${query}`);
    if (!query) {
      this.logger.log('No query provided, returning all bugs');
      return this.bugs;
    }
    
    const results = this.bugs.filter(bug => 
      bug.title.toLowerCase().includes(query.toLowerCase()) ||
      bug.description.toLowerCase().includes(query.toLowerCase()) ||
      bug.assignedTo.toLowerCase().includes(query.toLowerCase())
    );
    
    this.logger.log(`Search returned ${results.length} results`);
    return results;
  }
}
