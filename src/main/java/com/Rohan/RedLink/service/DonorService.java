package com.Rohan.RedLink.service;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import com.Rohan.RedLink.mappers.DonorMapper;
import com.Rohan.RedLink.repository.DonorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Donor donor = donorRepository.findById(id).orElse(null);

        if (donor==null)
        {
            return null;
        }

        return donorMapper.toDto(donor);
    }


    public DonorDto updateDonor(long id, DonorDto updatedDonorDto) {
        Donor existingDonor = donorRepository.findById(id)
                                        .orElse(null);
        if (existingDonor!=null)
        {
            existingDonor.setDonorName(updatedDonorDto.getDonorName());
            existingDonor.setDonorMail(updatedDonorDto.getDonorMail());
            existingDonor.setDonorPh(updatedDonorDto.getDonorPh());
            existingDonor.setDonorGroup(updatedDonorDto.getDonorGroup());
            existingDonor.setDonorAddress(updatedDonorDto.getDonorAddress());

            Donor updated = donorRepository.save(existingDonor);
            return donorMapper.toDto(updated);
        }
        return null;
    }


    public DonorDto deleteDonor(long id)
    {
        Donor deletedDonor = donorRepository.findById(id).orElse(null);
        if (deletedDonor!=null)
        {
            donorRepository.deleteById(id);
            return donorMapper.toDto(deletedDonor);
        }
        return null;
    }





}
