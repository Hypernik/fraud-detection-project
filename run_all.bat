@echo off
REM This batch file runs both frontend and backend servers simultaneously

REM Define paths to your batch files
set FRONTEND_BAT=run_frontend.bat
set BACKEND_BAT=run_backend.bat

REM Function to check if file exists
:fileExists
if not exist "%~1" (
    echo Error: File "%~1" not found!
    pause
    exit /b 1
)
goto :eof

REM Check if both batch files exist
call :fileExists "%FRONTEND_BAT%"
call :fileExists "%BACKEND_BAT%"

echo Starting both frontend and backend servers...

REM Start frontend in a new window
start "Frontend Server" cmd /k call "%FRONTEND_BAT%"

REM Start backend in a new window
start "Backend Server" cmd /k call "%BACKEND_BAT%"

echo Both servers should now be running in separate windows.
echo You can close this window.
pause