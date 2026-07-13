package com.vimal.jobtracker.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIResumeAnalysisResponse {
    private String atsScore;
    private List<String> missingSkills;
    private List<String> improvements;
}
