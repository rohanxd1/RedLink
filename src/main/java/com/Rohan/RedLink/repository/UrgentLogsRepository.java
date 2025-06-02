package com.Rohan.RedLink.repository;

import com.Rohan.RedLink.entity.SupplyLog;
import com.Rohan.RedLink.entity.UrgentLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UrgentLogsRepository extends JpaRepository<UrgentLog,Long>
{
    List<UrgentLog> findByHospitalMail(String hospitalMail);
    List<UrgentLog> findAllByOrderByDateOfRequestDesc();

}
