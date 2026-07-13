package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO {
    private Long id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String location;
    private String website;
}
