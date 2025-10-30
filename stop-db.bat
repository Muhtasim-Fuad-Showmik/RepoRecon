@echo off
echo Stopping PostgreSQL database for RepoRecon...
docker-compose down
if %ERRORLEVEL% EQU 0 (
    echo Database stopped successfully!
) else (
    echo Failed to stop database.
)
pause
