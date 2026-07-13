package com.vimal.jobtracker.controller;

import com.vimal.jobtracker.dto.*;
import com.vimal.jobtracker.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    @PostMapping("/email")
    public ResponseEntity<AIEmailResponse> generateEmail(@Valid @RequestBody AIEmailRequest request) {
        AIEmailResponse response = aiService.generateEmail(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resume-analysis")
    public ResponseEntity<AIResumeAnalysisResponse> analyzeResume(@Valid @RequestBody AIResumeAnalysisRequest request) {
        AIResumeAnalysisResponse response = aiService.analyzeResume(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/job-description")
    public ResponseEntity<AIJobDescResponse> analyzeJobDescription(@Valid @RequestBody AIJobDescRequest request) {
        AIJobDescResponse response = aiService.analyzeJobDescription(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/interview")
    public ResponseEntity<AIInterviewResponse> generateInterviewPrep(@Valid @RequestBody AIInterviewRequest request) {
        AIInterviewResponse response = aiService.generateInterviewPrep(request);
        return ResponseEntity.ok(response);
    }
}
