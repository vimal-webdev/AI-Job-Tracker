package com.vimal.jobtracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HRContactDTO {
    private Long id;

    @NotBlank(message = "HR name is required")
    private String hrName;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private String linkedin;
    private String notes;
}
