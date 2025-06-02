package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.entity.UrgentLog;
import com.Rohan.RedLink.entity.UrgentLog;
import com.Rohan.RedLink.service.SupplyLogService;
import com.Rohan.RedLink.service.UrgentLogsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("urgentlogs")
@AllArgsConstructor
public class UrgentLogController
{
    private final UrgentLogsService supplyLogService;

    @PostMapping("/create")
    public ResponseEntity<?> createSupplyLog(@RequestBody UrgentLog supplyLog)
    {

        UrgentLog savedSupplyLog = supplyLogService.createUrgentLog(supplyLog);

        if (savedSupplyLog == null) {
            String message = "Error: Unable to create supply log due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedSupplyLog);
    }

    @GetMapping("/view-all")
    public ResponseEntity<?> viewAll() {
        List<UrgentLog> supplyLogList = supplyLogService.getAllUrgentLogs();
        if (supplyLogList == null || supplyLogList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found!!");
        }
        return ResponseEntity.ok(supplyLogList);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSupplyLog(@PathVariable long id, @RequestBody UrgentLog updatedSupplyLog) {
        UrgentLog supplyLog = supplyLogService.updateUrgentLog(id, updatedSupplyLog);
        if (supplyLog == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Supply-log with id: " + id + " not found!! \nFailed to update.");
        }
        return ResponseEntity.ok(supplyLog);
    }

}
