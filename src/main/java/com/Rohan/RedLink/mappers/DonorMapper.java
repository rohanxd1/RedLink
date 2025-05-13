package com.Rohan.RedLink.mappers;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface DonorMapper
{
    public DonorDto toDto(Donor donors);
     public Donor toEntity(DonorDto donorDto);
}