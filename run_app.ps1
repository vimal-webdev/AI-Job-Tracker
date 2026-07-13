# run_app.ps1
# Script to clean up and run both Backend and Frontend for Job Application Tracker

# 1. Kill existing processes on port 8080 (Backend)
$backendPort = 8080
$backendProc = Get-NetTCPConnection -LocalPort $backendPort -ErrorAction SilentlyContinue
if ($backendProc) {
    Write-Host "Stopping existing backend process running on port $backendPort..." -ForegroundColor Yellow
    foreach ($procId in $backendProc.OwningProcess) {
        Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    }
}

# 2. Kill existing processes on port 5173 (Frontend)
$frontendPort = 5173
$frontendProc = Get-NetTCPConnection -LocalPort $frontendPort -ErrorAction SilentlyContinue
if ($frontendProc) {
    Write-Host "Stopping existing frontend process running on port $frontendPort..." -ForegroundColor Yellow
    foreach ($procId in $frontendProc.OwningProcess) {
        Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    }
}

# 3. Start Spring Boot Backend in a new terminal window
Write-Host "Starting Spring Boot Backend on port $backendPort..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$PSScriptRoot'; ./mvnw spring-boot:run"

# 4. Start React Frontend in a new terminal window
Write-Host "Starting React Frontend on port $frontendPort..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting up in separate terminal windows!" -ForegroundColor Cyan
Write-Host "- Backend API: http://localhost:8080" -ForegroundColor Cyan
Write-Host "- Frontend UI:  http://localhost:5173" -ForegroundColor Cyan
