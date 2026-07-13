package com.vimal.jobtracker.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIJobDescResponse {
    private List<String> requiredSkills;
    private String experience;
    private List<String> responsibilities;
    private List<String> keywords;
}
