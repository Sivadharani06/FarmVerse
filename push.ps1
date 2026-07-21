Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Pushing FarmVerse Project to GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

git init
git branch -M main
git remote add origin https://github.com/Sivadharani06/FarmVerse.git 2>$null
git remote set-url origin https://github.com/Sivadharani06/FarmVerse.git
git add .
git commit -m "Initial commit: FarmVerse Backend and Frontend"
git push -u origin main

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Completed!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
