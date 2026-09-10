@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0\.."
title southsail — 发布笔记

if not defined HOME set "HOME=%USERPROFILE%"
set "PATH=%PATH%;D:\magic\node;D:\magic\git\Git\cmd"

where node >nul 2>&1
if errorlevel 1 (
  echo [错误] 找不到 node.exe
  echo 本机 Node 一般在 D:\magic\node
  goto :fail
)

where git >nul 2>&1
if errorlevel 1 (
  echo [错误] 找不到 git.exe
  echo 本机 Git 一般在 D:\magic\git\Git\cmd
  goto :fail
)

echo.
echo southsail 发布笔记
echo 1. 选择 Markdown 文件  （也可以把 .md 拖到桌面快捷方式上）
echo 2. 选择 Articles 或 CTF
echo 3. 自动提交并推送到 GitHub
echo.

set "ARGS="
:collect
if "%~1"=="" goto run
set ARGS=%ARGS% "%~1"
shift
goto collect

:run
if not "%ARGS%"=="" (
  echo 已传入文件：
  echo %ARGS%
  echo.
)

node "scripts\publish.mjs" %ARGS%
set "EXITCODE=%ERRORLEVEL%"
echo.
if not "%EXITCODE%"=="0" goto :fail
echo 完成。Netlify 会在几分钟内更新 https://southsail.netlify.app
echo.
pause
exit /b 0

:fail
echo 发布失败。窗口会保持打开，方便查看上面的报错。
echo.
pause
exit /b 1
