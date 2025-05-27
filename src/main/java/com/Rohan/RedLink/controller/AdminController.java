package com.Rohan.RedLink.controller;


import com.Rohan.RedLink.entity.Admin;
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

    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin)
    {
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
