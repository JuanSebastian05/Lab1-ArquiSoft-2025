package com.udea.lab1_2025.controller;

import com.udea.lab1_2025.DTO.TransactionDTO;
import com.udea.lab1_2025.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar transacciones financieras.
 * Proporciona endpoints para transferencias de dinero y consulta de transacciones de un usuario.
 */
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Endpoint para realizar transacción entre cuentas
    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(@RequestBody TransactionDTO transactionDTO) {
        try {
            transactionService.transfer(transactionDTO);
            return ResponseEntity.ok("Transacción realizada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en la transacción: " + e.getMessage());
        }
    }

    // Endpoint para consultar histórico de transacciones por número de cuenta
    @GetMapping("/history/{accountNumber}")
    public ResponseEntity<List<TransactionDTO>> getTransactionHistory(@PathVariable String accountNumber) {
        List<TransactionDTO> history = transactionService.getTransactionHistory(accountNumber);
        if (history.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(history);
    }
}

