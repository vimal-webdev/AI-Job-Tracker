package com.vimal.jobtracker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vimal.jobtracker.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${ai.provider:gemini}")
    private String provider;

    @Value("${ai.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${ai.openai.api-key:}")
    private String openaiApiKey;

    public AIEmailResponse generateEmail(AIEmailRequest request) {
        String prompt = String.format(
                "Generate a professional %s email for the role of '%s' at the company '%s'. " +
                "HR name is '%s'. Extra details: '%s'. " +
                "Return ONLY a JSON object with two fields: 'subject' (string) and 'body' (string). " +
                "Do not include any other text or markdown wrappers.",
                request.getTemplateType(),
                request.getRole(),
                request.getCompanyName(),
                request.getHrName() != null ? request.getHrName() : "HR Team",
                request.getKeyDetails() != null ? request.getKeyDetails() : "None"
        );

        String jsonResponse = callAI(prompt);
        try {
            JsonNode root = objectMapper.readTree(cleanJsonString(jsonResponse));
            return AIEmailResponse.builder()
                    .subject(root.path("subject").asText("Job Application Follow-up"))
                    .body(root.path("body").asText("Dear HR,\n\nI am writing to..."))
                    .build();
        } catch (Exception e) {
            return AIEmailResponse.builder()
                    .subject("Subject: Application for " + request.getRole())
                    .body(jsonResponse)
                    .build();
        }
    }

    public AIResumeAnalysisResponse analyzeResume(AIResumeAnalysisRequest request) {
        String prompt = "Compare the following Resume with the Job Description.\n\n" +
                "Resume:\n" + request.getResumeText() + "\n\n" +
                "Job Description:\n" + request.getJobDescription() + "\n\n" +
                "Analyze them and return ONLY a JSON object with three fields:\n" +
                "1. 'atsScore' (a string representing ATS match score, e.g. '78%')\n" +
                "2. 'missingSkills' (a JSON array of strings listing skills present in JD but missing in Resume)\n" +
                "3. 'improvements' (a JSON array of strings listing specific suggestions to improve the resume)\n" +
                "Do not include any other text or markdown wrappers.";

        String jsonResponse = callAI(prompt);
        try {
            JsonNode root = objectMapper.readTree(cleanJsonString(jsonResponse));
            List<String> missing = new ArrayList<>();
            root.path("missingSkills").forEach(node -> missing.add(node.asText()));
            List<String> improvements = new ArrayList<>();
            root.path("improvements").forEach(node -> improvements.add(node.asText()));

            return AIResumeAnalysisResponse.builder()
                    .atsScore(root.path("atsScore").asText("N/A"))
                    .missingSkills(missing)
                    .improvements(improvements)
                    .build();
        } catch (Exception e) {
            return AIResumeAnalysisResponse.builder()
                    .atsScore("Error parsing score")
                    .missingSkills(List.of("Error analyzing missing skills"))
                    .improvements(List.of("Could not parse AI output: " + jsonResponse))
                    .build();
        }
    }

    public AIResumeAnalysisResponse analyzeResumeFile(org.springframework.web.multipart.MultipartFile file, String jobDescription) {
        String resumeText = extractTextFromMultipartFile(file);
        AIResumeAnalysisRequest request = AIResumeAnalysisRequest.builder()
                .resumeText(resumeText)
                .jobDescription(jobDescription)
                .build();
        return analyzeResume(request);
    }

    public String extractTextFromMultipartFile(org.springframework.web.multipart.MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("File size must be less than 2MB");
        }

        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Invalid filename");
        }

        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            throw new IllegalArgumentException("File must have a valid extension (.pdf, .doc, .docx)");
        }
        String extension = filename.substring(lastDotIndex).toLowerCase();

        try {
            switch (extension) {
                case ".pdf":
                    try (org.apache.pdfbox.pdmodel.PDDocument doc = org.apache.pdfbox.Loader.loadPDF(file.getBytes())) {
                        org.apache.pdfbox.text.PDFTextStripper stripper = new org.apache.pdfbox.text.PDFTextStripper();
                        return stripper.getText(doc);
                    }
                case ".docx":
                    try (org.apache.poi.xwpf.usermodel.XWPFDocument doc = new org.apache.poi.xwpf.usermodel.XWPFDocument(file.getInputStream())) {
                        org.apache.poi.xwpf.extractor.XWPFWordExtractor extractor = new org.apache.poi.xwpf.extractor.XWPFWordExtractor(doc);
                        return extractor.getText();
                    }
                case ".doc":
                    try (org.apache.poi.hwpf.HWPFDocument doc = new org.apache.poi.hwpf.HWPFDocument(file.getInputStream())) {
                        org.apache.poi.hwpf.extractor.WordExtractor extractor = new org.apache.poi.hwpf.extractor.WordExtractor(doc);
                        return extractor.getText();
                    }
                default:
                    throw new IllegalArgumentException("Unsupported file type: only PDF, DOC, and DOCX formats are allowed");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from file '" + filename + "': " + e.getMessage(), e);
        }
    }

    public AIJobDescResponse analyzeJobDescription(AIJobDescRequest request) {
        String prompt = String.format(
                "Analyze the following Job Description:\n%s\n\n" +
                "Extract the details and return ONLY a JSON object with four fields:\n" +
                "1. 'requiredSkills' (a JSON array of required technical/soft skills)\n" +
                "2. 'experience' (a string describing required experience level/years)\n" +
                "3. 'responsibilities' (a JSON array of key responsibilities)\n" +
                "4. 'keywords' (a JSON array of main keywords for search optimization)\n" +
                "Do not include any other text or markdown wrappers.",
                request.getJobDescription()
        );

        String jsonResponse = callAI(prompt);
        try {
            JsonNode root = objectMapper.readTree(cleanJsonString(jsonResponse));
            List<String> skills = new ArrayList<>();
            root.path("requiredSkills").forEach(node -> skills.add(node.asText()));
            List<String> responsibilities = new ArrayList<>();
            root.path("responsibilities").forEach(node -> responsibilities.add(node.asText()));
            List<String> keywords = new ArrayList<>();
            root.path("keywords").forEach(node -> keywords.add(node.asText()));

            return AIJobDescResponse.builder()
                    .requiredSkills(skills)
                    .experience(root.path("experience").asText("Not specified"))
                    .responsibilities(responsibilities)
                    .keywords(keywords)
                    .build();
        } catch (Exception e) {
            return AIJobDescResponse.builder()
                    .requiredSkills(List.of())
                    .experience("Error analyzing description")
                    .responsibilities(List.of())
                    .keywords(List.of("Could not parse AI output: " + jsonResponse))
                    .build();
        }
    }

    public AIInterviewResponse generateInterviewPrep(AIInterviewRequest request) {
        String prompt = String.format(
                "Based on the job role '%s', generate relevant interview questions.\n" +
                "Return ONLY a JSON object with five fields:\n" +
                "1. 'javaQuestions' (a JSON array of 5 Java questions)\n" +
                "2. 'springBootQuestions' (a JSON array of 5 Spring Boot questions)\n" +
                "3. 'sqlQuestions' (a JSON array of 5 SQL questions)\n" +
                "4. 'hrQuestions' (a JSON array of 5 behavioral/HR questions)\n" +
                "5. 'codingQuestions' (a JSON array of 5 coding questions/problem statements)\n" +
                "Do not include any other text or markdown wrappers.",
                request.getRole()
        );

        String jsonResponse = callAI(prompt);
        try {
            JsonNode root = objectMapper.readTree(cleanJsonString(jsonResponse));
            List<String> java = new ArrayList<>();
            root.path("javaQuestions").forEach(node -> java.add(node.asText()));
            List<String> spring = new ArrayList<>();
            root.path("springBootQuestions").forEach(node -> spring.add(node.asText()));
            List<String> sql = new ArrayList<>();
            root.path("sqlQuestions").forEach(node -> sql.add(node.asText()));
            List<String> hr = new ArrayList<>();
            root.path("hrQuestions").forEach(node -> hr.add(node.asText()));
            List<String> coding = new ArrayList<>();
            root.path("codingQuestions").forEach(node -> coding.add(node.asText()));

            return AIInterviewResponse.builder()
                    .javaQuestions(java)
                    .springBootQuestions(spring)
                    .sqlQuestions(sql)
                    .hrQuestions(hr)
                    .codingQuestions(coding)
                    .build();
        } catch (Exception e) {
            return AIInterviewResponse.builder()
                    .javaQuestions(List.of("Could not parse AI output: " + jsonResponse))
                    .springBootQuestions(List.of())
                    .sqlQuestions(List.of())
                    .hrQuestions(List.of())
                    .codingQuestions(List.of())
                    .build();
        }
    }

    private String callAI(String prompt) {
        if ("openai".equalsIgnoreCase(provider)) {
            if (openaiApiKey == null || openaiApiKey.trim().isEmpty() || "YOUR_OPENAI_API_KEY_HERE".equals(openaiApiKey) || openaiApiKey.startsWith("${")) {
                return getMockAIResponse(prompt);
            }
            return callOpenAI(prompt);
        } else {
            if (geminiApiKey == null || geminiApiKey.trim().isEmpty() || "YOUR_GEMINI_API_KEY_HERE".equals(geminiApiKey) || geminiApiKey.startsWith("${")) {
                return getMockAIResponse(prompt);
            }
            return callGemini(prompt);
        }
    }

    private String getMockAIResponse(String prompt) {
        if (prompt.contains("Compare the following Resume with the Job Description.")) {
            return "{\n" +
                    "  \"atsScore\": \"85%\",\n" +
                    "  \"missingSkills\": [\"Docker\", \"Kubernetes\", \"CI/CD Pipelines\", \"System Design\"],\n" +
                    "  \"improvements\": [\n" +
                    "    \"Highlight experience with microservices architecture and deployment tools.\",\n" +
                    "    \"Quantify achievements in previous roles (e.g., 'improved query performance by 30%').\",\n" +
                    "    \"Add certification or details regarding cloud platforms (AWS/GCP).\"\n" +
                    "  ]\n" +
                    "}";
        } else if (prompt.contains("Analyze the following Job Description:")) {
            return "{\n" +
                    "  \"requiredSkills\": [\"Java\", \"Spring Boot\", \"REST APIs\", \"MySQL\", \"Git\"],\n" +
                    "  \"experience\": \"3+ years of professional software engineering experience\",\n" +
                    "  \"responsibilities\": [\n" +
                    "    \"Design and develop robust backend APIs using Spring Boot.\",\n" +
                    "    \"Optimize database queries and schema designs in MySQL.\",\n" +
                    "    \"Collaborate with front-end developers to integrate user-facing elements.\"\n" +
                    "  ],\n" +
                    "  \"keywords\": [\"Backend Developer\", \"Java\", \"Spring Boot\", \"MySQL\", \"REST API\", \"Software Engineer\"]\n" +
                    "}";
        } else if (prompt.contains("Based on the job role")) {
            String role = "Software Engineer";
            try {
                int start = prompt.indexOf("job role '") + 10;
                int end = prompt.indexOf("', generate");
                if (start > 9 && end > start) {
                    role = prompt.substring(start, end);
                }
            } catch (Exception e) {}

            return "{\n" +
                    "  \"javaQuestions\": [\n" +
                    "    \"What is the difference between HashMap and ConcurrentHashMap?\",\n" +
                    "    \"Explain the Java Memory Model and Garbage Collection.\",\n" +
                    "    \"What are functional interfaces and lambda expressions in Java 8?\",\n" +
                    "    \"How does exception handling work with try-with-resources?\",\n" +
                    "    \"What is the difference between fail-fast and fail-safe iterators?\"\n" +
                    "  ],\n" +
                    "  \"springBootQuestions\": [\n" +
                    "    \"What is dependency injection and how does Spring container handle it in a " + role + " context?\",\n" +
                    "    \"Explain the difference between @Component, @Service, and @Repository annotations.\",\n" +
                    "    \"How do you secure Spring Boot REST APIs using Spring Security?\",\n" +
                    "    \"What is the role of @SpringBootApplication annotation?\",\n" +
                    "    \"How do you handle global exception handling in Spring Boot?\"\n" +
                    "  ],\n" +
                    "  \"sqlQuestions\": [\n" +
                    "    \"Explain database indexing and its impact on performance.\",\n" +
                    "    \"What is the difference between inner join, left join, and outer join?\",\n" +
                    "    \"What are transactions and ACID properties in databases?\",\n" +
                    "    \"How do you prevent SQL injection in queries?\",\n" +
                    "    \"What is normalization and why is it important?\"\n" +
                    "  ],\n" +
                    "  \"hrQuestions\": [\n" +
                    "    \"Tell me about a challenging technical project you worked on.\",\n" +
                    "    \"How do you handle conflicts within a team?\",\n" +
                    "    \"Why are you interested in this role and our company?\",\n" +
                    "    \"Describe a time you had to learn a new technology quickly.\",\n" +
                    "    \"Where do you see yourself in the next 5 years?\"\n" +
                    "  ],\n" +
                    "  \"codingQuestions\": [\n" +
                    "    \"Reverse a linked list in-place.\",\n" +
                    "    \"Find the longest substring without repeating characters.\",\n" +
                    "    \"Implement a function to check if a binary tree is balanced.\",\n" +
                    "    \"Merge k sorted linked lists.\",\n" +
                    "    \"Find the two numbers in an array that sum up to a target value.\"\n" +
                    "  ]\n" +
                    "}";
        } else if (prompt.contains("Generate a professional")) {
            String template = "Cold Email";
            String role = "Software Engineer";
            String company = "Company";
            String hr = "HR Team";
            String details = "None";

            try {
                if (prompt.contains("professional ")) {
                    int start = prompt.indexOf("professional ") + 13;
                    int end = prompt.indexOf(" email for the role of");
                    if (start > 12 && end > start) template = prompt.substring(start, end);
                }
                if (prompt.contains("role of '")) {
                    int start = prompt.indexOf("role of '") + 9;
                    int end = prompt.indexOf("' at the company '");
                    if (start > 8 && end > start) role = prompt.substring(start, end);
                }
                if (prompt.contains("company '")) {
                    int start = prompt.indexOf("company '") + 9;
                    int end = prompt.indexOf("'. HR name is");
                    if (start > 8 && end > start) company = prompt.substring(start, end);
                }
                if (prompt.contains("HR name is '")) {
                    int start = prompt.indexOf("HR name is '") + 12;
                    int end = prompt.indexOf("'. Extra details:");
                    if (start > 11 && end > start) hr = prompt.substring(start, end);
                }
                if (prompt.contains("Extra details: '")) {
                    int start = prompt.indexOf("Extra details: '") + 16;
                    int end = prompt.indexOf("'. Return ONLY a JSON object");
                    if (start > 15 && end > start) details = prompt.substring(start, end);
                }
            } catch (Exception e) {}

            String subject = String.format("%s - %s Application", template, role);
            String body = String.format("Dear %s,\n\nI hope this email finds you well.\n\nI am reaching out to express my strong interest in the %s position at %s. With my background in software engineering, I am confident in my ability to add significant value to your team.\n\nDetails of my background: %s\n\nThank you for your time and consideration. I look forward to the possibility of discussing how my skills align with your needs.\n\nBest regards,\n[Your Name]", hr, role, company, details);

            return "{\n" +
                    "  \"subject\": \"" + subject + "\",\n" +
                    "  \"body\": \"" + body.replace("\n", "\\n") + "\"\n" +
                    "}";
        }
        return "{}";
    }

    private String callGemini(String prompt) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty() || geminiApiKey.startsWith("${")) {
            throw new IllegalArgumentException("Google Gemini API Key is missing! Please configure it in application.properties or set GEMINI_API_KEY environment variable.");
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Body Structure: { "contents": [ { "parts": [ { "text": "prompt" } ] } ] }
        Map<String, Object> textPart = Map.of("text", prompt);
        Map<String, Object> partsWrapper = Map.of("parts", List.of(textPart));
        Map<String, Object> requestBody = Map.of("contents", List.of(partsWrapper));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<JsonNode> response = restTemplate.postForEntity(url, entity, JsonNode.class);
            JsonNode body = response.getBody();
            if (body != null) {
                // Path to extract: candidates[0].content.parts[0].text
                return body.path("candidates").path(0).path("content").path("parts").path(0).path("text").asText();
            }
            throw new RuntimeException("Empty response from Google Gemini API");
        } catch (Exception e) {
            throw new RuntimeException("Error calling Gemini API: " + e.getMessage(), e);
        }
    }

    private String callOpenAI(String prompt) {
        if (openaiApiKey == null || openaiApiKey.trim().isEmpty() || openaiApiKey.startsWith("${")) {
            throw new IllegalArgumentException("OpenAI API Key is missing! Please configure it in application.properties or set OPENAI_API_KEY environment variable.");
        }

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openaiApiKey);

        // Body Structure: { "model": "gpt-4o-mini", "messages": [ { "role": "user", "content": "prompt" } ], "response_format": { "type": "json_object" } }
        Map<String, Object> message = Map.of("role", "user", "content", prompt);
        Map<String, Object> responseFormat = Map.of("type", "json_object");
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(message),
                "response_format", responseFormat
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<JsonNode> response = restTemplate.postForEntity(url, entity, JsonNode.class);
            JsonNode body = response.getBody();
            if (body != null) {
                // Path to extract: choices[0].message.content
                return body.path("choices").path(0).path("message").path("content").asText();
            }
            throw new RuntimeException("Empty response from OpenAI API");
        } catch (Exception e) {
            throw new RuntimeException("Error calling OpenAI API: " + e.getMessage(), e);
        }
    }

    private String cleanJsonString(String response) {
        if (response == null) return "{}";
        response = response.trim();
        if (response.startsWith("```json")) {
            response = response.substring(7);
        } else if (response.startsWith("```")) {
            response = response.substring(3);
        }
        if (response.endsWith("```")) {
            response = response.substring(0, response.length() - 3);
        }
        return response.trim();
    }
}
