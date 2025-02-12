package com.example.ExploreMate.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ExploreMate.beans.Booking;
import com.example.ExploreMate.beans.PaymentStatus;
import com.example.ExploreMate.repository.BookingRepository;
import com.example.ExploreMate.services.AuthService;
import com.example.ExploreMate.services.BookingService;
import com.example.ExploreMate.services.GuideService;

@RestController 
@RequestMapping("/bookings")
public class BookingController {
	
	private static final Logger logger = LoggerFactory.getLogger(GuideService.class);
	
	@Autowired
	BookingService bookingService;
	
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private GuideService guideService;
	
	
	@Autowired
	private BookingRepository bookingRepository;
	
	
	
	@PostMapping("/create")
	public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> bookingData) {
		System.out.println("Received JSON: " +bookingData);
		if (!bookingData.containsKey("user_id") || !bookingData.containsKey("guide_id") ||
		        !bookingData.containsKey("current_location") || !bookingData.containsKey("destination_location")) {
		        return ResponseEntity.badRequest().body("Missing required fields in the request.");
		    }
		
		

		    Booking booking = new Booking();
		    booking.setUserId(Long.valueOf(bookingData.get("user_id").toString()));  
		    booking.setGuideId(Long.valueOf(bookingData.get("guide_id").toString()));
		    booking.setCurrentLocation(bookingData.get("current_location").toString());
		    booking.setDestinationLocation(bookingData.get("destination_location").toString());
		    booking.setPaymentStatus(PaymentStatus.PENDING);
		    booking.setCreatedAt(LocalDateTime.now());
		    booking.setUpdatedAt(LocalDateTime.now());
		    booking.setTotalprice(Double.valueOf(bookingData.get("totalPrice").toString()));

		    Booking createdBooking = bookingService.createBooking(booking);
		    return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
	}
	@PostMapping("/update-status/{bookingId}")
	public ResponseEntity<String> updatePaymentStatus(@PathVariable Long bookingId) {
	    try {
	    	Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
	    	
	    	if (!bookingOptional.isPresent()) {
	            return new ResponseEntity<>("Booking ID not found.", HttpStatus.NOT_FOUND);
	        }
	    	System.out.println(bookingOptional);
	    	
	    	Booking booking = bookingOptional.get();
	    	booking.setPaymentStatus(PaymentStatus.COMPLETED);
	        
	        bookingService.updatePaymentStatus(bookingId, "Completed");
	        
	        
	        return new ResponseEntity<>("Payment status updated to COMPLETED.", HttpStatus.OK);
	    } catch (Exception e) {
	    	logger.error("Error updating payment status for bookingId: " + bookingId, e);
	        return new ResponseEntity<>("Failed to update payment status.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
