import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    
    // Log that we're validating the request
    this.logger.log(`Validating request: ${method} ${originalUrl}`);

    // Example validation: Check for required headers
    // In a real application, you might check for API keys, content types, etc.
    const contentType = req.headers['content-type'];
    
    if (req.method === 'POST' || req.method === 'PUT') {
      if (!contentType || !contentType.includes('application/json')) {
        this.logger.warn(`Invalid content type for ${method} ${originalUrl}: ${contentType}`);
        throw new HttpException(
          'Content-Type must be application/json',
          HttpStatus.BAD_REQUEST
        );
      }
    }

    // If validation passes, continue to the next middleware/route handler
    this.logger.log(`Request validation passed: ${method} ${originalUrl}`);
    next();
  }
}
