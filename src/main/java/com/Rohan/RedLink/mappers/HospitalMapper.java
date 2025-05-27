package com.Rohan.RedLink.mappers;

import com.Rohan.RedLink.dto.HospitalDto;
import com.Rohan.RedLink.entity.Hospital;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HospitalMapper
{
    public Hospital  toHospital(HospitalDto hospitalDto);
    public  HospitalDto toDto(Hospital hospital);

    public List<Hospital> toHosptalList(List<HospitalDto> hospitalDto);
    public List<HospitalDto> toDtoList(List<Hospital> hospital);
}
