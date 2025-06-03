package com.Rohan.RedLink.service;


import com.Rohan.RedLink.entity.Blood;
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

    // Check inventory units for a blood group
    public Optional<Blood> getBloodByGroup(String bloodGroup)
    {
        return bloodRepository.findByBloodGroup(bloodGroup);
    }

    // Reduce available units of a blood group, return updated Blood entity or throw exception if insufficient
    public Blood reduceUnits(String bloodGroup, float unitsToReduce) throws IllegalArgumentException
    {
        Blood blood = bloodRepository.findByBloodGroup(bloodGroup)
                .orElseThrow(() -> new IllegalArgumentException("Blood group not found"));

        if (blood.getAvailableUnits() < unitsToReduce) {
            throw new IllegalArgumentException("Insufficient units");
        }

        blood.setAvailableUnits(blood.getAvailableUnits() - unitsToReduce);
        return bloodRepository.save(blood);
    }


}
