package com.vimal.jobtracker.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationResponse {
    private Long id;
    private String jobId;
    private String role;
    private CompanyDTO company;
    private HRContactDTO hrContact;
    private String status;
    private LocalDate appliedDate;
    private String resumeVersion;
    private String jobDescription;
    private String salary;
    private String location;
    private String jobPortal;
    private String notes;
}
