package com.Rohan.RedLink.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Blood")
public class Blood
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodId;

    @Column(nullable = false, length = 3, unique = true)
    private String bloodGroup;

    @Column(nullable = false)
    private float availableUnits;
}
