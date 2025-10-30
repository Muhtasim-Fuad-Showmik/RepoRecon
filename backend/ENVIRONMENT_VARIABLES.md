# Environment Variables

## Database Configuration

The following environment variables can be used to configure the database connection:

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USERNAME` - Database username (default: postgres in development)
- `DB_PASSWORD` - Database password (default: postgres in development)
- `DB_NAME` - Database name (default: repo_recon_dev in development)
- `DB_SSL` - Enable SSL connection (default: false)

## Node Environment

- `NODE_ENV` - Node environment (development, production, test)

## Example Development Configuration

For development, the default configuration will work with the Docker Compose setup:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=repo_recon_dev
NODE_ENV=development
```
