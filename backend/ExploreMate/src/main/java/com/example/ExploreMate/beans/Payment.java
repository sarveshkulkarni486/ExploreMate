package com.example.ExploreMate.beans;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="payments")
public class Payment {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long storedGuideId;
    private Long storedBookingId;
    private Long userId;
    private String userName;
    private String cardNumber;
    private String expiry;
    private String cvv;
    private String amount;
}
