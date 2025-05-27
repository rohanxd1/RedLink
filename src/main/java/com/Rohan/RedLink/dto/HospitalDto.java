package com.Rohan.RedLink.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HospitalDto
{
    private long hospitalId;
    private String hospitalName;
    private String hospitalCoordinator;
//    password not included
    private String hospitalPh;
    private String hospitalMail;
    private String hospitalAddress;
}
