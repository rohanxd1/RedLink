package com.Rohan.RedLink.service;

import com.Rohan.RedLink.entity.SupplyLog;
import com.Rohan.RedLink.entity.UrgentLog;
import com.Rohan.RedLink.repository.SupplyLogRepository;
import com.Rohan.RedLink.repository.UrgentLogsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@AllArgsConstructor
public class UrgentLogsService {

    private final UrgentLogsRepository urgentLogsRepository;
    private final SupplyLogRepository supplyLogRepository;

    public UrgentLog createUrgentLog(UrgentLog urgentLog) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = LocalDateTime.now().format(formatter);
        urgentLog.setDateOfRequest(formattedDate);

        // Save urgent log
        UrgentLog savedUrgentLog = urgentLogsRepository.save(urgentLog);

        // Also create a corresponding supply log (no link stored)
        SupplyLog supplyLog = new SupplyLog();
        supplyLog.setHospitalMail(savedUrgentLog.getHospitalMail());
        supplyLog.setBloodGroup(savedUrgentLog.getBloodGroup());
        supplyLog.setUnitsRequired(savedUrgentLog.getUnitsRequired());
        supplyLog.setDateOfRequest(formattedDate);
        supplyLog.setDateOfTransit(savedUrgentLog.getDateOfTransit());
        supplyLog.setDateOfDelivery(savedUrgentLog.getDateOfDelivery());
        supplyLog.setStatus(savedUrgentLog.getStatus());
        supplyLog.setManagedBy(savedUrgentLog.getManagedBy());
        supplyLogRepository.save(supplyLog);

        return savedUrgentLog;
    }

    public List<UrgentLog> getAllUrgentLogs() {
        return urgentLogsRepository.findAll();
    }

    public UrgentLog updateUrgentLog(long id, UrgentLog updatedUrgentLog) {
        UrgentLog existingUrgentLog = urgentLogsRepository.findById(id).orElse(null);

        if (existingUrgentLog != null) {
            String newStatus = updatedUrgentLog.getStatus();
            String managedBy = updatedUrgentLog.getManagedBy();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String now = LocalDateTime.now().format(formatter);

            existingUrgentLog.setStatus(newStatus);
            existingUrgentLog.setManagedBy(managedBy);

            switch (newStatus) {
                case "IN-TRANSIT":
                    existingUrgentLog.setDateOfTransit(now);
                    existingUrgentLog.setDateOfDelivery("UNCONFIRMED");
                    break;

                case "DELIVERED":
                    if ("UNCONFIRMED".equals(existingUrgentLog.getDateOfTransit())) {
                        existingUrgentLog.setDateOfTransit(now);
                    }
                    existingUrgentLog.setDateOfDelivery(now);
                    break;

                case "UNCONFIRMED":
                default:
                    existingUrgentLog.setDateOfTransit("UNCONFIRMED");
                    existingUrgentLog.setDateOfDelivery("UNCONFIRMED");
                    break;
            }

            UrgentLog savedUrgentLog = urgentLogsRepository.save(existingUrgentLog);

            // Now update corresponding SupplyLog(s) by matching on criteria manually
            // For example: update SupplyLog with same hospitalMail, bloodGroup, dateOfRequest (or other criteria)
            List<SupplyLog> matchingSupplyLogs = supplyLogRepository.findByHospitalMailAndBloodGroupAndDateOfRequest(
                    savedUrgentLog.getHospitalMail(),
                    savedUrgentLog.getBloodGroup(),
                    savedUrgentLog.getDateOfRequest()
            );

            for (SupplyLog supplyLog : matchingSupplyLogs) {
                supplyLog.setStatus(savedUrgentLog.getStatus());
                supplyLog.setManagedBy(savedUrgentLog.getManagedBy());
                supplyLog.setDateOfTransit(savedUrgentLog.getDateOfTransit());
                supplyLog.setDateOfDelivery(savedUrgentLog.getDateOfDelivery());
                supplyLog.setUnitsRequired(savedUrgentLog.getUnitsRequired());
                supplyLogRepository.save(supplyLog);
            }

            return savedUrgentLog;
        }
        return null;
    }



}
