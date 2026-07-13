package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationRequest {
    private String jobId;

    @NotBlank(message = "Job role is required")
    private String role;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    private Long hrContactId;

    @NotBlank(message = "Application status is required")
    private String status;

    private LocalDate appliedDate;
    private String resumeVersion;
    private String jobDescription;
    private String salary;
    private String location;
    private String jobPortal;
    private String notes;
}
