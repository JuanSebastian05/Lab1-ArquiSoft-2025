package com.udea.lab1_2025.entity;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity

@Table(name="transactions")

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
