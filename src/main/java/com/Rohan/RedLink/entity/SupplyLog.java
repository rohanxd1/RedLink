package com.Rohan.RedLink.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supply_logs")
public class SupplyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;


    @Column(nullable = false)
    private String hospitalMail;

    @Column(nullable = false)
    private String bloodGroup;

    @Column(nullable = false)
    private float unitsRequired;

    @Column(nullable = false)
    private String dateOfRequest;

    @Column(nullable = true)
    private String dateOfTransit="UNCONFIRMED";

    @Column(nullable = true)
    private String dateOfDelivery="UNCONFIRMED";

    @Column(nullable = false, length = 20)
    private String status = "UNCONFIRMED";  // UNCONFIRMED, IN-TRANSIT, DELIVERED

    @Column(nullable = true, length = 100)
    private String managedBy ="UNCONFIRMED";

    @Column(nullable = true)
    private Boolean Urgent=false;
}
