package com.Rohan.RedLink.service;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import com.Rohan.RedLink.mappers.DonorMapper;
import com.Rohan.RedLink.repository.DonorRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class DonorService
{
    public final DonorRepository donorRepository;

    public final DonorMapper donorMapper;

//    public DonorService(DonorRepository donorRepository, DonorMapper donorMapper) {
//        this.donorRepository = donorRepository;
//        this.donorMapper = donorMapper;
//    }

    public DonorDto createDonor(DonorDto donorDto)
    {
        Donor donor= donorMapper.toEntity(donorDto);
        donorRepository.save(donor);
        return donorMapper.toDto(donor);
    }
}
