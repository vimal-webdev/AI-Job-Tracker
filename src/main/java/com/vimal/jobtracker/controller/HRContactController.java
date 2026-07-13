package com.vimal.jobtracker.controller;

import com.vimal.jobtracker.dto.HRContactDTO;
import com.vimal.jobtracker.service.HRContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HRContactController {

    private final HRContactService hrContactService;

    @PostMapping
    public ResponseEntity<HRContactDTO> createHRContact(@Valid @RequestBody HRContactDTO dto) {
        HRContactDTO created = hrContactService.createHRContact(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<HRContactDTO>> getAllHRContacts() {
        List<HRContactDTO> contacts = hrContactService.getAllHRContacts();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HRContactDTO> getHRContactById(@PathVariable Long id) {
        HRContactDTO contact = hrContactService.getHRContactById(id);
        return ResponseEntity.ok(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HRContactDTO> updateHRContact(@PathVariable Long id, @Valid @RequestBody HRContactDTO dto) {
        HRContactDTO updated = hrContactService.updateHRContact(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHRContact(@PathVariable Long id) {
        hrContactService.deleteHRContact(id);
        return ResponseEntity.noContent().build();
    }
}
