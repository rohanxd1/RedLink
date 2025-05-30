package com.Rohan.RedLink.service;

import com.Rohan.RedLink.dto.HospitalDto;
import com.Rohan.RedLink.dto.HospitalLoginRequest;
import com.Rohan.RedLink.entity.Hospital;
import com.Rohan.RedLink.mappers.HospitalMapper;
import com.Rohan.RedLink.repository.HospitalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HospitalService
{
    private HospitalRepository hospitalRepository;
    private HospitalMapper hospitalMapper;

    public HospitalDto createHospital(Hospital hospital)
    {
        Hospital saved=hospitalRepository.save(hospital);
        return hospitalMapper.toDto(saved);
    }


    public List<HospitalDto> getAllHospitals()
    {
        List<Hospital> hospitals=hospitalRepository.findAll();
        return hospitalMapper.toDtoList(hospitals);
    }

    public  HospitalDto getHospitalById(long id)
    {
        Hospital hospital=hospitalRepository.findById(id).orElse(null);

        if (hospital==null)
        {
            return null;
        }

        return  hospitalMapper.toDto(hospital);
    }

    public  HospitalDto updateHospital(long id,HospitalDto updatedHospitalDto)
    {
        Hospital existingHospital= hospitalRepository.findById(id)
                                   .orElse(null);
        if (existingHospital!=null)
        {
            existingHospital.setHospitalName(updatedHospitalDto.getHospitalName());
            existingHospital.setHospitalCoordinator(updatedHospitalDto.getHospitalCoordinator());
            existingHospital.setHospitalPh(updatedHospitalDto.getHospitalPh());
            existingHospital.setHospitalMail(updatedHospitalDto.getHospitalMail());
            existingHospital.setHospitalAddress(updatedHospitalDto.getHospitalAddress());

            Hospital updated=hospitalRepository.save(existingHospital);
            return hospitalMapper.toDto(updated);
        }
        return null;
    }


    public  HospitalDto deleteHospital(long id)
    {
        Hospital deletedHospital = hospitalRepository.findById(id)
                                   .orElse(null);
        if (deletedHospital!=null)
        {
            hospitalRepository.deleteById(id);
            return  hospitalMapper.toDto(deletedHospital);
        }
        return null;
    }


    public Hospital findByHospitalMail(HospitalLoginRequest hospitalLoginRequest)
    {
        Hospital hospital=hospitalRepository.findByHospitalMail(hospitalLoginRequest.getEmail())
                .orElse(null);
        return hospital;
    }

}
