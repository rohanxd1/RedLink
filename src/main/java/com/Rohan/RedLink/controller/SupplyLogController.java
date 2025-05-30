package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.entity.SupplyLog;
import com.Rohan.RedLink.service.SupplyLogService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("supplylogs")
@AllArgsConstructor
public class SupplyLogController {

    private final SupplyLogService supplyLogService;

    @PostMapping("/create")
    public ResponseEntity<?> createSupplyLog(@RequestBody SupplyLog supplyLog) {
        SupplyLog savedSupplyLog = supplyLogService.createSupplyLog(supplyLog);

        if (savedSupplyLog == null) {
            String message = "Error: Unable to create supply log due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedSupplyLog);
    }

    @GetMapping("/view-all")
    public ResponseEntity<?> viewAll() {
        List<SupplyLog> supplyLogList = supplyLogService.getAllSupplyLog();
        if (supplyLogList == null || supplyLogList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found!!");
        }
        return ResponseEntity.ok(supplyLogList);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSupplyLog(@PathVariable long id, @RequestBody SupplyLog updatedSupplyLog) {
        SupplyLog supplyLog = supplyLogService.updateOrder(id, updatedSupplyLog);
        if (supplyLog == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Supply-log with id: " + id + " not found!! \nFailed to update.");
        }
        return ResponseEntity.ok(supplyLog);
    }

    @GetMapping("/hospitallogs")
    public ResponseEntity<?> getLogsByHospitalMail(@RequestParam String mail) {
        List<SupplyLog> logs = supplyLogService.getSupplyLogsByHospitalMail(mail);
        if (logs == null || logs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No supply logs found for hospital: " + mail);
        }
        return ResponseEntity.ok(logs);
    }
}
