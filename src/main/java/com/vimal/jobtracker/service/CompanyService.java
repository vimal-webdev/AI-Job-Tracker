package com.vimal.jobtracker.service;

import com.vimal.jobtracker.dto.CompanyDTO;
import com.vimal.jobtracker.entity.Company;
import com.vimal.jobtracker.exception.ResourceNotFoundException;
import com.vimal.jobtracker.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional
    public CompanyDTO createCompany(CompanyDTO dto) {
        Company company = mapToEntity(dto);
        Company saved = companyRepository.save(company);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CompanyDTO getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + id));
        return mapToDTO(company);
    }

    @Transactional
    public CompanyDTO updateCompany(Long id, CompanyDTO dto) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + id));
        
        company.setCompanyName(dto.getCompanyName());
        company.setLocation(dto.getLocation());
        company.setWebsite(dto.getWebsite());
        
        Company updated = companyRepository.save(company);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }

    public CompanyDTO mapToDTO(Company entity) {
        if (entity == null) return null;
        return CompanyDTO.builder()
                .id(entity.getId())
                .companyName(entity.getCompanyName())
                .location(entity.getLocation())
                .website(entity.getWebsite())
                .build();
    }

    public Company mapToEntity(CompanyDTO dto) {
        if (dto == null) return null;
        return Company.builder()
                .id(dto.getId())
                .companyName(dto.getCompanyName())
                .location(dto.getLocation())
                .website(dto.getWebsite())
                .build();
    }
}
