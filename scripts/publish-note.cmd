@echo off
setlocal EnableExtensions
set "SOUTHSAIL_LOG=%TEMP%\southsail-publish.log"
>>"%SOUTHSAIL_LOG%" echo [%DATE% %TIME%] start
>>"%SOUTHSAIL_LOG%" echo script=%~f0
>>"%SOUTHSAIL_LOG%" echo args=%*

cd /d "%~dp0.."
if errorlevel 1 (
  echo [ERROR] cannot enter project folder: "%~dp0.."
  >>"%SOUTHSAIL_LOG%" echo cd failed
  goto hold_fail
)
>>"%SOUTHSAIL_LOG%" echo project=%CD%

title southsail publish note
if not defined HOME set "HOME=%USERPROFILE%"
set "PATH=%PATH%;D:\magic\node;D:\magic\git\Git\cmd;C:\Windows\System32\WindowsPowerShell\v1.0"

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] node.exe not found. Expected at D:\magic\node
  >>"%SOUTHSAIL_LOG%" echo node missing
  goto hold_fail
)
where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] git.exe not found. Expected at D:\magic\git\Git\cmd
  >>"%SOUTHSAIL_LOG%" echo git missing
  goto hold_fail
)

echo.
echo southsail publish note
echo 1. Pick a Markdown file  (or drop .md onto the desktop shortcut)
echo 2. Choose Articles or CTF
echo 3. Commit and push to GitHub
echo.

set "ARGS="
:collect
if "%~1"=="" goto run
set ARGS=%ARGS% "%~1"
shift
goto collect

:run
if not "%ARGS%"=="" (
  echo Files:
  echo %ARGS%
  echo.
)

>>"%SOUTHSAIL_LOG%" echo running node scripts\publish.mjs%ARGS%
node "scripts\publish.mjs" %ARGS%
if errorlevel 1 goto hold_fail
echo.
echo Done. Netlify will update https://southsail.netlify.app in a few minutes.
echo.
goto hold_ok

:hold_fail
echo.
echo Publish failed. This window stays open so you can read the error.
echo Log: %SOUTHSAIL_LOG%
echo.
if defined SOUTHSAIL_NOPAUSE exit /b 1
echo Press any key to close...
pause >nul
exit

:hold_ok
if defined SOUTHSAIL_NOPAUSE exit /b 0
echo Press any key to close...
pause >nul
exit