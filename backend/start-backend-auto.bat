@echo off
echo Setting up and starting E-commerce Backend...
echo.

REM Check if Maven is available
where mvn >nul 2>&1
if %errorlevel% equ 0 (
    echo Maven found in PATH
    goto :build_with_maven
)

REM Check if Maven Wrapper exists
if exist "mvnw.cmd" (
    echo Using Maven Wrapper
    goto :build_with_wrapper
)

echo Maven not found and no wrapper available.
echo.
echo Please install Maven or use the Maven Wrapper.
echo.
echo To install Maven:
echo 1. Download from https://maven.apache.org/download.cgi
echo 2. Extract to a folder (e.g., C:\apache-maven-3.9.6)
echo 3. Add C:\apache-maven-3.9.6\bin to your PATH environment variable
echo 4. Restart your terminal
echo.
echo Alternatively, you can create the Maven Wrapper by running:
echo mvn wrapper:wrapper
echo.
pause
exit /b 1

:build_with_maven
echo Building with system Maven...
mvn clean compile
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo Starting Spring Boot application...
mvn spring-boot:run
goto :end

:build_with_wrapper
echo Building with Maven Wrapper...
call mvnw.cmd clean compile
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo Starting Spring Boot application...
call mvnw.cmd spring-boot:run
goto :end

:end
echo.
echo Backend stopped.
pause
