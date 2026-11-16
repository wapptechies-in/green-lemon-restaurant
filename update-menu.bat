@echo off
title Green Lemon Restaurant - Menu Updater
cls
echo ====================================================
echo   GREEN LEMON RESTAURANT - ONE-CLICK MENU UPDATER
echo ====================================================
echo.
echo Updating menu from data\menu.xlsx and data\images...
echo.
python update_menu.py
echo.
echo Press any key to exit...
pause >nul
