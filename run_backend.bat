@echo off
REM Robust batch file to start the backend server

echo Starting backend server...

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Change to backend directory
cd backend || (
    echo Error: Could not change to backend directory
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "Scripts\activate.bat" (
    echo Error: Virtual environment not found in backend directory
    pause
    exit /b 1
)

REM Activate virtual environment
call Scripts\activate.bat || (
    echo Error: Failed to activate virtual environment
    pause
    exit /b 1
)

REM Run the Python application
python app.py || (
    echo Error: Failed to start Python application
    pause
    exit /b 1
)

echo Backend server started successfully
pause