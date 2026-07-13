package com.vimal.jobtracker.controller;

import com.vimal.jobtracker.dto.JobApplicationRequest;
import com.vimal.jobtracker.dto.JobApplicationResponse;
import com.vimal.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> createJobApplication(@Valid @RequestBody JobApplicationRequest request) {
        JobApplicationResponse created = jobApplicationService.createJobApplication(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAllJobApplications() {
        List<JobApplicationResponse> jobs = jobApplicationService.getAllJobApplications();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getJobApplicationById(@PathVariable Long id) {
        JobApplicationResponse job = jobApplicationService.getJobApplicationById(id);
        return ResponseEntity.ok(job);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> updateJobApplication(@PathVariable Long id, @Valid @RequestBody JobApplicationRequest request) {
        JobApplicationResponse updated = jobApplicationService.updateJobApplication(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
        jobApplicationService.deleteJobApplication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export")
    public ResponseEntity<InputStreamResource> exportToExcel() {
        ByteArrayInputStream in = jobApplicationService.exportApplicationsToExcel();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=job_applications.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(in));
    }
}
