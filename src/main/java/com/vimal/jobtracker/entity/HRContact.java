package com.vimal.jobtracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hr_contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HRContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hr_name", nullable = false)
    private String hrName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "linkedin")
    private String linkedin;

    @Column(name = "notes", length = 1000)
    private String notes;
}
