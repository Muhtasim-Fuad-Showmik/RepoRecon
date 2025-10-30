@echo off
echo Starting PostgreSQL database for RepoRecon...
docker-compose up -d
if %ERRORLEVEL% EQU 0 (
    echo Database started successfully!
    echo You can now run your NestJS application.
) else (
    echo Failed to start database. Make sure Docker is running.
)
pause
