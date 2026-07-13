package com.vimal.jobtracker.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIEmailResponse {
    private String subject;
    private String body;
}
