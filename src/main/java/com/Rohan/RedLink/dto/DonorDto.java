package com.Rohan.RedLink.dto;
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
