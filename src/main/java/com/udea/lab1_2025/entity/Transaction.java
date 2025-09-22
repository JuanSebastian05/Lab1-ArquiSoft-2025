package com.udea.lab1_2025.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data

@Entity

@Table(name="transtactions")

public class Transaction {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name = "sender_account_number", nullable = false)

    private String senderAccountNumber;

    @Column(name = "receiver_account_number", nullable = false)

    private String receiverAccountNumber;

    @Column(nullable = false)

    private Double amount;

    @Column(nullable = true) // Cambia a true

    private LocalDate transactionDate;

}
