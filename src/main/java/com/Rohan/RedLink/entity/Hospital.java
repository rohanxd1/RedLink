package com.Rohan.RedLink.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hospitals")
public class Hospital
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hospitalId;
    @Column(nullable = false, length = 100)
    private String hospitalName;
    @Column(nullable = false, length = 100)
    private String hospitalCoordinator;
    @Column(nullable = false, length = 100)
    private String hospitalPassword;
    @Column(unique = true,nullable = false, length = 10)
    private String hospitalPh;
    @Column(unique = true,nullable = false, length = 100)
    private String hospitalMail;
    @Column(nullable = false, length = 255)
    private String hospitalAddress;
}
