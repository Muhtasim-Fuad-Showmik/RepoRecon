const { DataSource } = require('typeorm');
const path = require('path');

// Simple configuration for migrations only
module.exports = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'repo_recon_dev',
  entities: [],
  synchronize: false,
  logging: true,
  migrations: [path.join(__dirname, '../migrations/**/*{.js}')],
  migrationsTableName: 'migrations'
});
