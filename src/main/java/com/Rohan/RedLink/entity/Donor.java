package com.Rohan.RedLink.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "donors")
public class Donor
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donorId;

    @Column(nullable = false, length = 100)
    private String donorName;

    @Column(nullable = false, length = 10)
    private String donorGroup;

    @Column(unique = true, length = 10)
    private String donorPh;

    @Column(unique = true, length=100)
    private String donorMail;

    @Column(length = 255)
    private String donorAddress;
}
