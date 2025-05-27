package com.Rohan.RedLink.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    @Column(nullable = false)
    private String adminName;

    @Column(nullable = false, unique = true)
    private String adminMail;

    @Column(nullable = false)
    private String adminPassword;
}
