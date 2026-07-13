Write-Host "=== AI-Powered Job Application Tracker API Verification ===" -ForegroundColor Cyan

$baseUrl = "http://localhost:8080/api"

# 1. Create a Company
Write-Host "`n1. Creating a Company..." -ForegroundColor Yellow
$companyBody = @{
    companyName = "Google"
    location = "Mountain View, CA"
    website = "https://google.com"
} | ConvertTo-Json

$companyResponse = Invoke-RestMethod -Uri "$baseUrl/companies" -Method Post -Body $companyBody -ContentType "application/json"
Write-Host "Response:" -ForegroundColor Green
$companyResponse | Format-List
$companyId = $companyResponse.id

# 2. Create an HR Contact
Write-Host "`n2. Creating an HR Contact..." -ForegroundColor Yellow
$hrBody = @{
    hrName = "John Doe"
    email = "johndoe@google.com"
    phone = "123-456-7890"
    linkedin = "https://linkedin.com/in/johndoe"
    notes = "Lead recruiter for backend teams"
} | ConvertTo-Json

$hrResponse = Invoke-RestMethod -Uri "$baseUrl/hr" -Method Post -Body $hrBody -ContentType "application/json"
Write-Host "Response:" -ForegroundColor Green
$hrResponse | Format-List
$hrId = $hrResponse.id

# 3. Create a Job Application
Write-Host "`n3. Creating a Job Application..." -ForegroundColor Yellow
$jobBody = @{
    jobId = "JOB-101"
    role = "Java Backend Developer"
    companyId = $companyId
    hrContactId = $hrId
    status = "Applied"
    appliedDate = "2026-07-13"
    resumeVersion = "v1.2-Standard"
    jobDescription = "We are looking for a Java Developer with Spring Boot and MySQL experience."
    salary = "140,000 USD"
    location = "Remote"
    jobPortal = "LinkedIn"
    notes = "Applied on LinkedIn, received confirmation email."
} | ConvertTo-Json

$jobResponse = Invoke-RestMethod -Uri "$baseUrl/jobs" -Method Post -Body $jobBody -ContentType "application/json"
Write-Host "Response:" -ForegroundColor Green
$jobResponse | Format-List
$jobId = $jobResponse.id

# 4. Fetch All Job Applications
Write-Host "`n4. Fetching All Job Applications..." -ForegroundColor Yellow
$allJobs = Invoke-RestMethod -Uri "$baseUrl/jobs" -Method Get
Write-Host "Total Jobs: $($allJobs.Count)" -ForegroundColor Green
$allJobs | Format-Table -Property id, jobId, role, status, appliedDate

# 5. Export to Excel
Write-Host "`n5. Exporting Job Applications to Excel..." -ForegroundColor Yellow
$excelFile = "d:\job_tracker\scratch\job_applications.xlsx"
Invoke-WebRequest -Uri "$baseUrl/jobs/export" -OutFile $excelFile
if (Test-Path $excelFile) {
    $fileInfo = Get-Item $excelFile
    Write-Host "Excel exported successfully! File size: $($fileInfo.Length) bytes at $excelFile" -ForegroundColor Green
} else {
    Write-Error "Excel export failed!"
}

# 6. Verify Error Handlers (AI Call with missing keys)
Write-Host "`n6. Verifying AI API Error Handler (Calling without API key)..." -ForegroundColor Yellow
$aiEmailBody = @{
    templateType = "Cold Email"
    role = "Java Developer"
    companyName = "Google"
} | ConvertTo-Json

try {
    $aiResponse = Invoke-RestMethod -Uri "$baseUrl/ai/email" -Method Post -Body $aiEmailBody -ContentType "application/json"
    Write-Host "AI Response: $aiResponse" -ForegroundColor Green
} catch {
    Write-Host "Caught expected exception:" -ForegroundColor Green
    $_.Exception.Message
    $_.ErrorDetails.Message
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Cyan
