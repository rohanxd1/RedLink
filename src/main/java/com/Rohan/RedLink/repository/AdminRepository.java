package com.Rohan.RedLink.repository;

import com.Rohan.RedLink.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByAdminMail(String adminMail);
}
