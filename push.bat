@echo off
echo ==========================================
echo    Pushing FarmVerse Project to GitHub
echo ==========================================
echo.
git init
git branch -M main
git remote add origin https://github.com/Sivadharani06/FarmVerse.git 2>nul
git remote set-url origin https://github.com/Sivadharani06/FarmVerse.git
git add .
git commit -m "Initial commit: FarmVerse Backend and Frontend"
git push -u origin main
echo.
echo ==========================================
echo Done! Press any key to exit.
echo ==========================================
pause
