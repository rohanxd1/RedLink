package com.Rohan.RedLink.repository;


import com.Rohan.RedLink.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital,Long> {
    Optional<Hospital> findByHospitalMail(String hospitalMail);
}
