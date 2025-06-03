package com.Rohan.RedLink.service;


import com.Rohan.RedLink.dto.AdminLoginRequest;
import com.Rohan.RedLink.entity.Admin;
import com.Rohan.RedLink.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService
{
    private AdminRepository adminRepository;


    public Admin createAdmin(Admin admin)
    {
        Admin saved = adminRepository.save(admin);
        return saved;
    }

    public List<Admin> getAllAdmins()
    {
        List<Admin> admins = adminRepository.findAll();
        return admins;
    }

    public Admin loginAdmin(AdminLoginRequest adminLoginRequest)
    {
        Admin admin=adminRepository.findByAdminMail(adminLoginRequest.getEmail())
                    .orElse(null);
            return admin;
    }
}
