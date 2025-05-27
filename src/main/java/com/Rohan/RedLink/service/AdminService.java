package com.Rohan.RedLink.service;


import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Admin;
import com.Rohan.RedLink.entity.Donor;
import com.Rohan.RedLink.repository.AdminRepository;
import com.Rohan.RedLink.repository.BloodRepository;
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
}
