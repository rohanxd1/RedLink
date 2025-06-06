package com.Rohan.RedLink.service;

import com.Rohan.RedLink.entity.SupplyLog;
import com.Rohan.RedLink.repository.SupplyLogRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@AllArgsConstructor
public class SupplyLogService
{

    private final SupplyLogRepository supplyLogRepository;


    public SupplyLog createSupplyLog(SupplyLog supplyLog)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = LocalDateTime.now().format(formatter);
        supplyLog.setDateOfRequest(formattedDate);

        return supplyLogRepository.save(supplyLog);
    }

    public List<SupplyLog> getAllSupplyLog()
    {
        return supplyLogRepository.findAll();
    }

    public SupplyLog updateOrder(long id, SupplyLog updatedSupplyLog)
    {
        SupplyLog existingSupplyLog = supplyLogRepository.findById(id).orElse(null);

        if (existingSupplyLog != null)
        {
            String newStatus = updatedSupplyLog.getStatus();
            String managedBy = updatedSupplyLog.getManagedBy();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String now = LocalDateTime.now().format(formatter);

            existingSupplyLog.setStatus(newStatus);
            existingSupplyLog.setManagedBy(managedBy);

            switch (newStatus)
            {
                case "IN-TRANSIT":
                    existingSupplyLog.setDateOfTransit(now);
                    existingSupplyLog.setDateOfDelivery("UNCONFIRMED");
                    break;

                case "DELIVERED":
                    if ("UNCONFIRMED".equals(existingSupplyLog.getDateOfTransit()))
                    {
                        existingSupplyLog.setDateOfTransit(now);
                    }
                    existingSupplyLog.setDateOfDelivery(now);

                    // Set urgent to false when delivered
                    existingSupplyLog.setUrgent(false);
                    break;

                case "UNCONFIRMED":
                default:
                    existingSupplyLog.setDateOfTransit("UNCONFIRMED");
                    existingSupplyLog.setDateOfDelivery("UNCONFIRMED");
                    break;
            }

            return supplyLogRepository.save(existingSupplyLog);
        }

        return null;
    }


    public List<SupplyLog> getSupplyLogsByHospitalMail(String hospitalMail) {
        return supplyLogRepository.findByHospitalMail(hospitalMail);
    }

    public SupplyLog updateHospitalUserSupplyLog(SupplyLog newSupplyLog) {
        SupplyLog existingSupplyLog = supplyLogRepository.findById(newSupplyLog.getLogId()).orElse(null);

        if (existingSupplyLog != null)
        {

                existingSupplyLog.setBloodGroup(newSupplyLog.getBloodGroup());
                existingSupplyLog.setUnitsRequired(newSupplyLog.getUnitsRequired());
                return supplyLogRepository.save(existingSupplyLog);

        }
       return existingSupplyLog;
    }


}
