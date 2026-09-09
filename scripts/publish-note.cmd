@echo off
chcp 65001 >nul
cd /d "%~dp0\.."
title southsail — 发布笔记
echo.
echo southsail 发布笔记
echo 1. 选择 Markdown 文件
echo 2. 选择 Articles 或 CTF
echo 3. 自动提交并推送到 GitHub
echo.
call npm run note
echo.
if errorlevel 1 (
  echo 发布失败。窗口会保持打开，方便查看上面的报错。
) else (
  echo 完成。Netlify 会在几分钟内更新 https://southsail.netlify.app
)
echo.
pause
