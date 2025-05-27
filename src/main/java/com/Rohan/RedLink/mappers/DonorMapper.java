package com.Rohan.RedLink.mappers;

import com.Rohan.RedLink.dto.DonorDto;
import com.Rohan.RedLink.entity.Donor;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface DonorMapper
{
    public DonorDto toDto(Donor donors);
    public Donor toDonor(DonorDto donorDto);


    public List<DonorDto> toDtoList(List<Donor> donorList);
    public List<Donor> toDonorList(List<DonorDto> donorDtoList);


}
