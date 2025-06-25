@echo off
echo Starting E-commerce Backend...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.

REM Check if Maven is available
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven (mvn) is not found in PATH!
    echo Please install Maven and add it to your PATH, or use the Maven Wrapper.
    echo.
    echo Alternative: Try using the Maven Wrapper if available:
    if exist "mvnw.cmd" (
        echo Found Maven Wrapper. Using mvnw.cmd instead...
        set MVN_CMD=mvnw.cmd
    ) else (
        echo Maven Wrapper not found either.
        echo Please install Maven from: https://maven.apache.org/download.cgi
        pause
        exit /b 1
    )
) else (
    set MVN_CMD=mvn
)

echo Building the project...
call %MVN_CMD% clean install -q
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo MySQL Database: dbshoestop
echo API endpoints will be available at: http://localhost:8080/api/*
echo.
call %MVN_CMD% spring-boot:run
