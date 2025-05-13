package com.Rohan.RedLink.service;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import com.Rohan.RedLink.mappers.DonorMapper;
import com.Rohan.RedLink.repository.DonorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DonorService
{

    private final DonorRepository donorRepository;
    private final DonorMapper donorMapper;

    public DonorDto createDonor(DonorDto donorDto)
    {
        Donor donor = donorMapper.toDonor(donorDto);
        Donor saved = donorRepository.save(donor);
        return donorMapper.toDto(saved);
    }

    public List<DonorDto> getAllDonors()
    {
        List<Donor> donors = donorRepository.findAll();
        return donorMapper.toDtoList(donors);
    }

    public DonorDto getDonorById(long id)
    {
        Optional<Donor> donor = donorRepository.findById(id);

        return donor.map(donorMapper::toDto)
                .orElse(null);
    }



}
