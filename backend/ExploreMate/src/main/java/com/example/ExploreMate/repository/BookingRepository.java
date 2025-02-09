package com.example.ExploreMate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ExploreMate.beans.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	

}
