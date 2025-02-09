package com.example.ExploreMate.controller;

import java.time.LocalDateTime;
import java.util.Map;

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
import com.example.ExploreMate.services.BookingService;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/bookings")
public class BookingController {
	
	@Autowired
	BookingService bookingService;
	
	@PostMapping("/create")
	public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
	    try {
	        // Logging the incoming booking data
	        System.out.println("Booking received: " + booking);
	        
	        // Manually setting required fields (if not set in the request)
	        Booking newBooking = new Booking();
	        
	        // Set values manually
	        newBooking.setUserId(booking.getUser());  // from the incoming request
	        newBooking.setGuideId(booking.getGuide());  // from the incoming request
	        newBooking.setCurrentLocation(booking.getCurrentLocation());  // from the incoming request
	        newBooking.setDestinationLocation(booking.getDestinationLocation());  // from the incoming request
	        
	        // Manually set createdAt and updatedAt if required
	        newBooking.setCreatedAt(LocalDateTime.now());  // Set current time for createdAt
	        newBooking.setUpdatedAt(LocalDateTime.now());  // Set current time for updatedAt

	        // Optionally, set payment status if it's not set
	        newBooking.setPaymentStatus(PaymentStatus.PENDING);  // Set default payment status (if not provided)
	        
	        // Pass the entity with manually set values to the service layer
	        Booking createdBooking = bookingService.createBooking(newBooking);

	        // Return the created booking
	        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
	    } catch (Exception e) {
	        // Log the error message for debugging
	        System.out.println("Error: " + e.getMessage());
	        
	        // Return 400 Bad Request in case of an error
	        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	    }
	}

	@PostMapping("/update-status/{bookingId}")
    public ResponseEntity<String> updatePaymentStatus(
            @PathVariable Long bookingId, 
            @RequestBody PaymentStatus status) {
        try {
            bookingService.updatePaymentStatus(bookingId, status);
            return new ResponseEntity<>("Payment status updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update payment status.", HttpStatus.BAD_REQUEST);
        }
    }
}
