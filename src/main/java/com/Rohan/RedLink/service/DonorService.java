package com.Rohan.RedLink.service;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import com.Rohan.RedLink.mappers.DonorMapper;
import com.Rohan.RedLink.repository.DonorsRepository;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class DonorService
{
    private final DonorsRepository donorsRepository;

    private final DonorMapper donorMapper;

    public DonorDto createDonor(DonorDto donorDto)
    {
        Donor donor= donorMapper.toEntity(donorDto);
        donorsRepository.save(donor);
        return donorMapper.toDto(donor);
    }
}
