package com.vimal.jobtracker.service;

import com.vimal.jobtracker.dto.HRContactDTO;
import com.vimal.jobtracker.entity.HRContact;
import com.vimal.jobtracker.exception.ResourceNotFoundException;
import com.vimal.jobtracker.repository.HRContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HRContactService {

    private final HRContactRepository hrContactRepository;

    @Transactional
    public HRContactDTO createHRContact(HRContactDTO dto) {
        HRContact hrContact = mapToEntity(dto);
        HRContact saved = hrContactRepository.save(hrContact);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<HRContactDTO> getAllHRContacts() {
        return hrContactRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HRContactDTO getHRContactById(Long id) {
        HRContact hrContact = hrContactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HR Contact not found with id: " + id));
        return mapToDTO(hrContact);
    }

    @Transactional
    public HRContactDTO updateHRContact(Long id, HRContactDTO dto) {
        HRContact hrContact = hrContactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HR Contact not found with id: " + id));

        hrContact.setHrName(dto.getHrName());
        hrContact.setEmail(dto.getEmail());
        hrContact.setPhone(dto.getPhone());
        hrContact.setLinkedin(dto.getLinkedin());
        hrContact.setNotes(dto.getNotes());

        HRContact updated = hrContactRepository.save(hrContact);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteHRContact(Long id) {
        if (!hrContactRepository.existsById(id)) {
            throw new ResourceNotFoundException("HR Contact not found with id: " + id);
        }
        hrContactRepository.deleteById(id);
    }

    public HRContactDTO mapToDTO(HRContact entity) {
        if (entity == null) return null;
        return HRContactDTO.builder()
                .id(entity.getId())
                .hrName(entity.getHrName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .linkedin(entity.getLinkedin())
                .notes(entity.getNotes())
                .build();
    }

    public HRContact mapToEntity(HRContactDTO dto) {
        if (dto == null) return null;
        return HRContact.builder()
                .id(dto.getId())
                .hrName(dto.getHrName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .linkedin(dto.getLinkedin())
                .notes(dto.getNotes())
                .build();
    }
}
