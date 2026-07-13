package com.vimal.jobtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id")
    private String jobId;

    @Column(name = "role", nullable = false)
    private String role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hr_contact_id")
    private HRContact hrContact;

    @Column(name = "status", nullable = false)
    private String status; // Applied, Resume Viewed, Shortlisted, Technical Round, HR Round, Manager Round, Offer Received, Rejected, Joined

    @Column(name = "applied_date")
    private LocalDate appliedDate;

    @Column(name = "resume_version")
    private String resumeVersion;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "salary")
    private String salary;

    @Column(name = "location")
    private String location;

    @Column(name = "job_portal")
    private String jobPortal;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}
