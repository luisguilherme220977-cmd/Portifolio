@echo off
rem Kill any existing Chrome processes to avoid conflicts
taskkill /F /IM chrome.exe /T >nul 2>&1

rem Locate Chrome executable
set "CHROME_PATH=%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe"
if not exist "%CHROME_PATH%" set "CHROME_PATH=%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe"

if not exist "%CHROME_PATH%" (
  echo Chrome not found. Install Google Chrome or edit this script to point to the correct chrome.exe path.
  pause
  exit /b 1
)

rem Create a temporary user‑data directory for debugging
set "DEBUG_DIR=%LOCALAPPDATA%\\Google\\Chrome\\debug-profile"
if not exist "%DEBUG_DIR%" mkdir "%DEBUG_DIR%"

rem Start Chrome with remote debugging on a clean profile
"%CHROME_PATH%" --remote-debugging-port=9222 --user-data-dir="%DEBUG_DIR%"
