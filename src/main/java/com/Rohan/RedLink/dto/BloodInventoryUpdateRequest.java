package com.Rohan.RedLink.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodInventoryUpdateRequest
{
    private String bloodGroup;
    private float unitsToReduce;
}
