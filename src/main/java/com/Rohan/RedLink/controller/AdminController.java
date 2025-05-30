package com.Rohan.RedLink.controller;


import com.Rohan.RedLink.entity.Admin;
import com.Rohan.RedLink.dto.AdminLoginRequest;
import com.Rohan.RedLink.repository.AdminRepository;
import com.Rohan.RedLink.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@AllArgsConstructor
public class AdminController {

    private final AdminRepository adminRepository;
    private  final AdminService adminService;




    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest loginRequest)
    {
        Admin admin = adminService.loginAdmin(loginRequest);
        System.out.println(admin);
        if (admin != null && loginRequest.getPassword().equals(admin.getAdminPassword()))
        {
            return ResponseEntity.ok(admin); // or return a DTO if needed
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin)
    {    System.out.println("Creating admin: " + admin);
        Admin savedAdmin= adminService.createAdmin(admin);

        if (savedAdmin == null)
        {
            String message = "Error: Unable to create admin due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedAdmin);
    }


    @GetMapping("/view-all")
    public ResponseEntity<?> allAdmin()
    {
        List<Admin> adminList = adminService.getAllAdmins();

        if (adminList == null || adminList.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Records Found!!");
        }

        return ResponseEntity.ok(adminList);
    }

}
