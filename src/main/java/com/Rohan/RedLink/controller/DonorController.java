package com.Rohan.RedLink.controller;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.service.DonorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("admin/donors")
@AllArgsConstructor
public class DonorController
{

    private final DonorService donorService;




    @PostMapping("/create")
    public ResponseEntity<?> createDonor(@RequestBody DonorDto donorDto)
    {
        DonorDto savedDonor = donorService.createDonor(donorDto);

        if (savedDonor == null)
        {
            String message = "Error: Unable to create donor due to invalid data or missing fields.";
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok(savedDonor);
    }

    @GetMapping("/view-all")
    public ResponseEntity<?> allDonors()
    {
        List<DonorDto> donorDtoList = donorService.getAllDonors();

        if (donorDtoList == null || donorDtoList.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Records Found!!");
        }

        return ResponseEntity.ok(donorDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonorById(@PathVariable long id)
    {
        DonorDto donorDto = donorService.getDonorById(id);

        if (donorDto == null)
        {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor with id:"+id+" not found!!");
        }

        return ResponseEntity.ok(donorDto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDonor(@PathVariable long id,@RequestBody DonorDto updatedDonorDto)
    {
        DonorDto donorDto = donorService.updateDonor(id, updatedDonorDto);
        if (donorDto==null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor with id:"+id+" not found!! \nFailed to update donor.");
        }
        return  ResponseEntity.ok(donorDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDonor(@PathVariable long id)
    {
        DonorDto donorDto = donorService.deleteDonor(id);
        if (donorDto==null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor with id:"+id+" not found!! \nFailed to delete donor.");
        }
        String message="Donor with id:"+id+" deleted.";
        return ResponseEntity.ok(message);
    }

}
