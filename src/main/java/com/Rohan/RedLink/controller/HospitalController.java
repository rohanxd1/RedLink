package com.Rohan.RedLink.controller;


import com.Rohan.RedLink.dto.HospitalDto;
import com.Rohan.RedLink.entity.Hospital;
import com.Rohan.RedLink.service.HospitalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("admin/hospitals")
@AllArgsConstructor
public class HospitalController
{
    private final HospitalService hospitalService;

    @PostMapping("/create")
    public ResponseEntity<?> createDonor(@RequestBody Hospital hospital)
    {
        HospitalDto savedHospital = hospitalService.createHospital(hospital);

        if (savedHospital == null)
        {
            String message = "Error: Unable to create hospital due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedHospital);
    }

    @GetMapping("/view-all")
    public ResponseEntity<?> allHospitals()
    {
        List<HospitalDto> hospitalDtoList = hospitalService.getAllHospitals();
        if (hospitalDtoList==null||hospitalDtoList.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found!!");
        }
        return ResponseEntity.ok(hospitalDtoList);

    }
    

    @GetMapping("/{id}")
    public  ResponseEntity<?> getHospitalById(@PathVariable long id)
    {
        HospitalDto hospitalDto = hospitalService.getHospitalById(id);
        if (hospitalDto==null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor with id:"+id+" not found!!");
        }
        return ResponseEntity.ok(hospitalDto);

    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateHospital(@PathVariable long id,@RequestBody HospitalDto updatedHospitalDto)
    {
        HospitalDto hospitalDto=hospitalService.updateHospital(id,updatedHospitalDto);
        if (hospitalDto==null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital with id:"+id+" not found!! \nFailed to update hospital.");
        }
        return  ResponseEntity.ok(hospitalDto);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHospital(@PathVariable long id)
    {
        HospitalDto hospitalDto=hospitalService.deleteHospital(id);
        if (hospitalDto==null)
        {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital with id:"+id+" not found!! \nFailed to delete hospital.");
        }
        String message="Hospital with id:"+id+" deleted";
        return  ResponseEntity.ok(message);
    }
}
