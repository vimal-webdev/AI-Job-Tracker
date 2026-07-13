package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIJobDescRequest {
    @NotBlank(message = "Job description is required")
    private String jobDescription;
}
