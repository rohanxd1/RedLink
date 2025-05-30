package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.dto.AdminLoginRequest;
import com.Rohan.RedLink.dto.HospitalDto;
import com.Rohan.RedLink.dto.HospitalLoginRequest;
import com.Rohan.RedLink.entity.Admin;
import com.Rohan.RedLink.entity.Hospital;
import com.Rohan.RedLink.mappers.HospitalMapper;
import com.Rohan.RedLink.service.HospitalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("hospitaluser")
@AllArgsConstructor
public class HospitalUserController
{
    private  final HospitalService hospitalService;
    private  final HospitalMapper hospitalMapper;


    @PostMapping("/login")
    public ResponseEntity<?> hospitalLogin(@RequestBody HospitalLoginRequest loginRequest)
    {
        Hospital hospital = hospitalService.findByHospitalMail(loginRequest);
        System.out.println(hospital);
        if (hospital != null && loginRequest.getPassword().equals(hospital.getHospitalPassword()))
        {
            return ResponseEntity.ok(hospitalMapper.toDto(hospital));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createHospital(@RequestBody Hospital hospital)
    {
        HospitalDto savedHospital = hospitalService.createHospital(hospital);

        if (savedHospital == null)
        {
            String message = "Error: Unable to create hospital due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedHospital);
    }

}
