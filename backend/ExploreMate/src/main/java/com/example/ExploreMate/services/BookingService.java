package com.example.ExploreMate.services;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ExploreMate.beans.Booking;
import com.example.ExploreMate.beans.Guide;
import com.example.ExploreMate.beans.PaymentStatus;
import com.example.ExploreMate.beans.User;
import com.example.ExploreMate.repository.BookingRepository;
import com.example.ExploreMate.repository.GuideRepository;
import com.example.ExploreMate.repository.UserRepository;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	
	public Booking createBooking(Booking booking) {
		return bookingRepository.save(booking);
	}
	

	public void updatePaymentStatus(Long bookingId, String status) throws Exception {
		Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
	    if (!bookingOptional.isPresent()) {
	        throw new Exception("Booking not found.");
	    }

	    Booking booking = bookingOptional.get();

	    try {
	        // Convert status string to uppercase before using the enum
	        PaymentStatus paymentStatus = PaymentStatus.valueOf(status.toUpperCase());
	        booking.setPaymentStatus(paymentStatus);
	    } catch (IllegalArgumentException e) {
	        throw new Exception("Invalid payment status: " + status);
	    }

	    booking.setUpdatedAt(LocalDateTime.now());
	    bookingRepository.save(booking);
    }
}
