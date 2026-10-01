@echo off
setlocal enabledelayedexpansion
color 0A

echo.
echo ============================================
echo Dilabit Pharmacy POS - Windows Installer
echo ============================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo Error: This script must be run as Administrator
    echo Right-click and select "Run as Administrator"
    pause
    exit /b 1
)

echo Checking Node.js installation...
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js not found. Downloading...
    powershell -Command "& {$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'node-installer.msi'; Start-Process -Wait -FilePath 'node-installer.msi' -ArgumentList '/quiet /norestart'; Remove-Item 'node-installer.msi'}"
    echo Node.js installed successfully
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo Node.js found: !NODE_VERSION!
)

echo Checking PostgreSQL installation...
where psql >nul 2>nul
if errorlevel 1 (
    echo PostgreSQL not found
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo After installation, run this script again
    pause
    exit /b 1
)

echo Creating PostgreSQL database...
psql -U postgres -c "CREATE DATABASE dilabit_pharmacy_pos;" 2>nul
if errorlevel 0 (
    echo Database created or already exists
)

echo Installing Node.js dependencies...
call npm install

echo Creating .env file...
(
    echo PORT=3000
    echo JWT_SECRET=replace_with_long_random_secret_at_least_32_characters
    echo DB_HOST=localhost
    echo DB_PORT=5432
    echo DB_NAME=dilabit_pharmacy_pos
    echo DB_USER=postgres
    echo DB_PASSWORD=postgres
    echo CORS_ORIGIN=http://localhost:3000
) > .env

echo Running database migrations...
call npm run migrate

echo Seeding default users...
call npm run seed

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Default login credentials:
echo   owner / 1234
echo.
echo To start the application, run:
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause