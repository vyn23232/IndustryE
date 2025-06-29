@echo off
echo Starting ShoeStop E-Commerce Application...
echo.

echo Step 1: Starting Backend Server...
echo Opening backend in new window...
start cmd /k "cd /d c:\Users\MarkChristian Garing\OneDrive\Desktop\shoestop\IndustryE\backend && mvn spring-boot:run"

echo Waiting for backend to initialize...
timeout /t 10 /nobreak > nul

echo Step 2: Starting Frontend Development Server...
echo Opening frontend in new window...
start cmd /k "cd /d c:\Users\MarkChristian Garing\OneDrive\Desktop\shoestop\IndustryE\ecommerce && npm run dev"

echo.
echo Both servers are starting!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo The application should open automatically in your browser.
echo Close this window when you're done testing.
pause
