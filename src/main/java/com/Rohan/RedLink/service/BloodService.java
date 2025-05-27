package com.Rohan.RedLink.service;


import com.Rohan.RedLink.dto.HospitalDto;
import com.Rohan.RedLink.entity.Blood;
import com.Rohan.RedLink.entity.Hospital;
import com.Rohan.RedLink.repository.BloodRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BloodService
{
    private BloodRepository bloodRepository;

//    view all
    public List<Blood> getAllBlood()
    {
        List<Blood> bloodList=bloodRepository.findAll();
        return bloodList;
    }

//    update by bloodgroup
    public Optional<Blood> updateAvailableUnits(String bloodGroup, float availableUnits)
    {
        Optional<Blood> optionalBlood = bloodRepository.findByBloodGroup(bloodGroup);
        if (optionalBlood.isPresent())
        {
            Blood blood = optionalBlood.get();
            blood.setAvailableUnits(availableUnits);
            bloodRepository.save(blood);
            return Optional.of(blood);
        }
        else
        {
        return Optional.empty();
        }
    }


}
