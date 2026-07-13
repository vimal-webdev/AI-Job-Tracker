package com.vimal.jobtracker.service;

import com.vimal.jobtracker.dto.CompanyDTO;
import com.vimal.jobtracker.dto.HRContactDTO;
import com.vimal.jobtracker.dto.JobApplicationRequest;
import com.vimal.jobtracker.dto.JobApplicationResponse;
import com.vimal.jobtracker.entity.Company;
import com.vimal.jobtracker.entity.HRContact;
import com.vimal.jobtracker.entity.JobApplication;
import com.vimal.jobtracker.excel.ExcelExportUtil;
import com.vimal.jobtracker.exception.ResourceNotFoundException;
import com.vimal.jobtracker.repository.CompanyRepository;
import com.vimal.jobtracker.repository.HRContactRepository;
import com.vimal.jobtracker.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final CompanyRepository companyRepository;
    private final HRContactRepository hrContactRepository;

    @Transactional
    public JobApplicationResponse createJobApplication(JobApplicationRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + request.getCompanyId()));

        HRContact hrContact = null;
        if (request.getHrContactId() != null) {
            hrContact = hrContactRepository.findById(request.getHrContactId())
                    .orElseThrow(() -> new ResourceNotFoundException("HR Contact not found with id: " + request.getHrContactId()));
        }

        JobApplication jobApplication = JobApplication.builder()
                .jobId(request.getJobId())
                .role(request.getRole())
                .company(company)
                .hrContact(hrContact)
                .status(request.getStatus())
                .appliedDate(request.getAppliedDate())
                .resumeVersion(request.getResumeVersion())
                .jobDescription(request.getJobDescription())
                .salary(request.getSalary())
                .location(request.getLocation())
                .jobPortal(request.getJobPortal())
                .notes(request.getNotes())
                .build();

        JobApplication saved = jobApplicationRepository.save(jobApplication);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getAllJobApplications() {
        return jobApplicationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getJobApplicationById(Long id) {
        JobApplication job = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not found with id: " + id));
        return mapToResponse(job);
    }

    @Transactional
    public JobApplicationResponse updateJobApplication(Long id, JobApplicationRequest request) {
        JobApplication job = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not found with id: " + id));

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + request.getCompanyId()));

        HRContact hrContact = null;
        if (request.getHrContactId() != null) {
            hrContact = hrContactRepository.findById(request.getHrContactId())
                    .orElseThrow(() -> new ResourceNotFoundException("HR Contact not found with id: " + request.getHrContactId()));
        }

        job.setJobId(request.getJobId());
        job.setRole(request.getRole());
        job.setCompany(company);
        job.setHrContact(hrContact);
        job.setStatus(request.getStatus());
        job.setAppliedDate(request.getAppliedDate());
        job.setResumeVersion(request.getResumeVersion());
        job.setJobDescription(request.getJobDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setJobPortal(request.getJobPortal());
        job.setNotes(request.getNotes());

        JobApplication updated = jobApplicationRepository.save(job);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteJobApplication(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job Application not found with id: " + id);
        }
        jobApplicationRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public ByteArrayInputStream exportApplicationsToExcel() {
        List<JobApplication> apps = jobApplicationRepository.findAll();
        return ExcelExportUtil.applicationsToExcel(apps);
    }

    public JobApplicationResponse mapToResponse(JobApplication entity) {
        if (entity == null) return null;

        CompanyDTO companyDTO = null;
        if (entity.getCompany() != null) {
            companyDTO = CompanyDTO.builder()
                    .id(entity.getCompany().getId())
                    .companyName(entity.getCompany().getCompanyName())
                    .location(entity.getCompany().getLocation())
                    .website(entity.getCompany().getWebsite())
                    .build();
        }

        HRContactDTO hrContactDTO = null;
        if (entity.getHrContact() != null) {
            hrContactDTO = HRContactDTO.builder()
                    .id(entity.getHrContact().getId())
                    .hrName(entity.getHrContact().getHrName())
                    .email(entity.getHrContact().getEmail())
                    .phone(entity.getHrContact().getPhone())
                    .linkedin(entity.getHrContact().getLinkedin())
                    .notes(entity.getHrContact().getNotes())
                    .build();
        }

        return JobApplicationResponse.builder()
                .id(entity.getId())
                .jobId(entity.getJobId())
                .role(entity.getRole())
                .company(companyDTO)
                .hrContact(hrContactDTO)
                .status(entity.getStatus())
                .appliedDate(entity.getAppliedDate())
                .resumeVersion(entity.getResumeVersion())
                .jobDescription(entity.getJobDescription())
                .salary(entity.getSalary())
                .location(entity.getLocation())
                .jobPortal(entity.getJobPortal())
                .notes(entity.getNotes())
                .build();
    }
}
