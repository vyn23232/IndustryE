Write-Host "Starting E-commerce Backend..." -ForegroundColor Green
Write-Host ""

# Change to script directory
Set-Location -Path $PSScriptRoot
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Building the project..." -ForegroundColor Cyan

# Check if Maven is available
$mvnCmd = "mvn"
try {
    & mvn --version | Out-Null
} catch {
    Write-Host "ERROR: Maven (mvn) is not found in PATH!" -ForegroundColor Red
    Write-Host "Checking for Maven Wrapper..." -ForegroundColor Yellow
    
    if (Test-Path "mvnw.cmd") {
        Write-Host "Found Maven Wrapper. Using mvnw.cmd instead..." -ForegroundColor Green
        $mvnCmd = ".\mvnw.cmd"
    } else {
        Write-Host "Maven Wrapper not found either." -ForegroundColor Red
        Write-Host "Please install Maven from: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

try {
    & $mvnCmd clean install -q
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host "Build failed!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Starting Spring Boot application..." -ForegroundColor Cyan
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Green
Write-Host "H2 Console will be available at: http://localhost:8080/h2-console" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

& mvn spring-boot:run
