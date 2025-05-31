package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.dto.BloodInventoryUpdateRequest;
import com.Rohan.RedLink.entity.Blood;
import com.Rohan.RedLink.service.BloodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
@RestController
@RequestMapping("admin/blood")
@AllArgsConstructor
public class BloodController
{
    private BloodService bloodService;

    @GetMapping("/view-all")
    public ResponseEntity<?> allBlood()
    {
        List<Blood> bloodList = bloodService.getAllBlood();

        if (bloodList==null||bloodList.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found!!");
        }
        return ResponseEntity.ok(bloodList);

    }


//    update
    @PutMapping("/update-units")
    public ResponseEntity<?> updateUnits(@RequestBody Blood blood)
    {
        Optional<Blood> updated = bloodService.updateAvailableUnits(blood.getBloodGroup(), blood.getAvailableUnits());
        if (updated.isPresent())
        {
        return ResponseEntity.ok(updated.get());
        }
        else
        {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blood group not found: " + blood.getBloodGroup());
        }
    }



    @GetMapping("/check")
    public ResponseEntity<?> checkBloodInventory(@RequestParam("group") String bloodGroup) {
        Optional<Blood> bloodOpt = bloodService.getBloodByGroup(bloodGroup);
        if (bloodOpt.isPresent()) {
            return ResponseEntity.ok(bloodOpt.get());
        } else {
            return ResponseEntity.badRequest().body("Blood group not found");
        }
    }


    @PutMapping("/reduce")
    public ResponseEntity<?> updateBloodInventory(@RequestBody BloodInventoryUpdateRequest bloodRequest)
    {
        try {
            Blood updated = bloodService.reduceUnits(bloodRequest.getBloodGroup(), bloodRequest.getUnitsToReduce());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}
