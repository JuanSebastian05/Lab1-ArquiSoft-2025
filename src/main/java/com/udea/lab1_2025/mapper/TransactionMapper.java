package com.udea.lab1_2025.mapper;

import com.udea.lab1_2025.DTO.TransactionDTO;
import com.udea.lab1_2025.entity.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public Transaction toEntity(TransactionDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setSenderAccountNumber(dto.getSenderAccountNumber());
        transaction.setReceiverAccountNumber(dto.getReceiverAccountNumber());
        transaction.setAmount(dto.getAmount());
        transaction.setTransactionDate(dto.getTransactionDate());
        return transaction;
    }

    public TransactionDTO toDTO(Transaction entity) {
        TransactionDTO dto = new TransactionDTO();
        dto.setSenderAccountNumber(entity.getSenderAccountNumber());
        dto.setReceiverAccountNumber(entity.getReceiverAccountNumber());
        dto.setAmount(entity.getAmount());
        dto.setTransactionDate(entity.getTransactionDate());
        return dto;
    }
}
