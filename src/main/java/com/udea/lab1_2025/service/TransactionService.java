package com.udea.lab1_2025.service;

import com.udea.lab1_2025.DTO.TransactionDTO;
import com.udea.lab1_2025.entity.Customer;
import com.udea.lab1_2025.entity.Transaction;
import com.udea.lab1_2025.repository.CustomerRepository;
import com.udea.lab1_2025.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udea.lab1_2025.mapper.TransactionMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionMapper transactionMapper;

    // Realiza la transferencia entre cuentas
    public void transfer(TransactionDTO dto) {
        Customer origen = customerRepository.findByAccountNumber(dto.getSenderAccountNumber())
            .orElseThrow(() -> new RuntimeException("Cuenta origen no encontrada"));
        Customer destino = customerRepository.findByAccountNumber(dto.getReceiverAccountNumber())
            .orElseThrow(() -> new RuntimeException("Cuenta destino no encontrada"));

        if (origen.getBalance() < dto.getAmount()) {
            throw new RuntimeException("Fondos insuficientes");
        }

        origen.setBalance(origen.getBalance() - dto.getAmount());
        destino.setBalance(destino.getBalance() + dto.getAmount());

        customerRepository.save(origen);
        customerRepository.save(destino);

        Transaction transaction = transactionMapper.toEntity(dto);
        transaction.setTransactionDate(LocalDate.now());
        transactionRepository.save(transaction);
    }

    // Consulta el histórico de transacciones por número de cuenta
    public List<TransactionDTO> getTransactionHistory(String accountNumber) {
        List<Transaction> transactions = transactionRepository.findBySenderAccountNumberOrReceiverAccountNumber(accountNumber, accountNumber);
        return transactions.stream()
            .map(transactionMapper::toDTO)
            .collect(Collectors.toList());
    }
}
