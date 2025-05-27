package com.Rohan.RedLink.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DonorDto
{
    private Long donorId;
    private String donorName;
    private String donorGroup;
    private String donorPh;
    private String donorMail;
    private String donorAddress;
}
