package com.example.ExploreMate.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ExploreMate.beans.Payment;
import com.example.ExploreMate.repository.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

}
