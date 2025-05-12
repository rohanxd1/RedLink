package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.dto.DonorDto;

import com.Rohan.RedLink.service.DonorService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RestController
@RequestMapping("/donors")
public class DonorController
{
    private final DonorService donorService;
//    private final DonorMapper donorMapper;



    @PostMapping("/create")
    public ResponseEntity<DonorDto> createDonor(@RequestBody DonorDto donorDto)
    {
        DonorDto savedDonor = donorService.createDonor(donorDto);
        return ResponseEntity.ok(savedDonor);
    }


}
