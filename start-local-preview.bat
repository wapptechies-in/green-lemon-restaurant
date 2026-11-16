@echo off
title Green Lemon Restaurant - Local Menu Preview
cls
echo ====================================================
echo   GREEN LEMON RESTAURANT - LOCAL MENU PREVIEW
echo ====================================================
echo.
echo Starting local web server on http://localhost:8080 ...
echo.
echo View on this PC:      http://localhost:8080
echo View on your Phone:   http://10.195.159.193:8080  (same Wi-Fi)
echo.
echo (Keep this window open while previewing. Close it to stop)
echo.

start "" "http://localhost:8080"
python server.py
pause
