package com.Rohan.RedLink.repository;

import com.Rohan.RedLink.entity.Blood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BloodRepository extends JpaRepository<Blood,Long> {
    Optional<Blood> findByBloodGroup(String bloodGroup);
}
