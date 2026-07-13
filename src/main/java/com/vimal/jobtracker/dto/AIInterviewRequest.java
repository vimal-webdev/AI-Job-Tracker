package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIInterviewRequest {
    @NotBlank(message = "Job role is required")
    private String role;
}
