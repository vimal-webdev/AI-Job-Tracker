package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIEmailRequest {
    @NotBlank(message = "Template type is required (e.g. Cold Email, Follow-up Email)")
    private String templateType;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String hrName;
    private String keyDetails;
}
