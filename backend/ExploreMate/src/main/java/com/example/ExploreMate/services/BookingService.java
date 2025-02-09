package com.example.ExploreMate.services;

import java.util.Map;

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
	

	public void updatePaymentStatus(Long bookingId, PaymentStatus status) {
		Booking booking = bookingRepository.findById(bookingId).orElseThrow(()-> new RuntimeException("Booking not found"));
		booking.setPaymentStatus(status);
		bookingRepository.save(booking);
	}
}
