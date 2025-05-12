package com.Rohan.RedLink.mappers;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DonorMapper
{
    DonorDto toDto(Donor donors);
    Donor toEntity(DonorDto donorDto);
}