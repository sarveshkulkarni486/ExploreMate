package com.example.ExploreMate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ExploreMate.beans.Payment;
import com.example.ExploreMate.services.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentService;

    @PostMapping("/save-payment")
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }
	

}
