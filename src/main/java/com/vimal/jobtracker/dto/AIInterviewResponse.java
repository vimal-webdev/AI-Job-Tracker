package com.vimal.jobtracker.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIInterviewResponse {
    private List<String> javaQuestions;
    private List<String> springBootQuestions;
    private List<String> sqlQuestions;
    private List<String> hrQuestions;
    private List<String> codingQuestions;
}
