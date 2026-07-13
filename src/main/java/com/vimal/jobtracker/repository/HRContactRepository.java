package com.vimal.jobtracker.repository;

import com.vimal.jobtracker.entity.HRContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HRContactRepository extends JpaRepository<HRContact, Long> {
}
