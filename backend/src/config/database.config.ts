import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// For development, we'll use a more permissive configuration
// In production, you should use environment variables
const isDevelopment = process.env.NODE_ENV !== 'production';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || (isDevelopment ? 'postgres' : 'repo_recon_user'),
  password: process.env.DB_PASSWORD || (isDevelopment ? 'postgres' : 'repo_recon_password'),
  database: process.env.DB_NAME || (isDevelopment ? 'repo_recon_dev' : 'repo_recon_db'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: isDevelopment, // Only true in development
  logging: isDevelopment,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false,
  } : false,
  // Retry connection attempts
  extra: {
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 10,
  },
};
