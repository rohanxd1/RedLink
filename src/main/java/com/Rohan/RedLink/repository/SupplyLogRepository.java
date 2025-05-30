package com.Rohan.RedLink.repository;

import com.Rohan.RedLink.entity.SupplyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplyLogRepository extends JpaRepository<SupplyLog,Long>
{
    List<SupplyLog> findByHospitalMail(String hospitalMail);
}
