@echo off
REM Set working directory to backend folder
cd /d "%~dp0backend"

REM Create temp and pip cache directories if they don't exist
if not exist D:\pip_cache mkdir D:\pip_cache
if not exist D:\temp mkdir D:\temp

REM Set environment variables for this session
set PIP_CACHE_DIR=D:\pip_cache
set TMP=D:\temp
set TEMP=D:\temp

REM Create virtual environment in backend folder if it doesn't exist
if not exist .venv (
    python -m venv .venv
)

REM Activate the virtual environment
call .venv\Scripts\activate

REM Install requirements
pip install -r requirements.txt

echo.
echo Environment setup complete!
echo To activate the environment in the future, run:
echo     call D:\pdf interpreter\backend\.venv\Scripts\activate
echo.
pause