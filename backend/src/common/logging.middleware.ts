import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // Log the incoming request
    this.logger.log(`Incoming Request: ${method} ${originalUrl}`);

    // Capture the response finish event to log response details
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      this.logger.log(`Outgoing Response: ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}
