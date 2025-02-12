package com.example.ExploreMate.beans;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Long id;

	@Column(name = "user_id", nullable = false) // Establish a relationship with the User entity
	private Long userId;

	@Column(name = "guide_id", nullable = false) // Establish a relationship with the Guide entity
	private Long guideId;

	
	@Column(name = "current_location", nullable = false)
	private String currentLocation;

	
	@Column(name = "destination_location", nullable = false)
	private String destinationLocation;

	@Enumerated(EnumType.STRING)
	@Column(name = "payment_status", columnDefinition = "ENUM('PENDING', 'COMPLETED', 'FAILED')DEFAULT 'PENDING'")
	private PaymentStatus paymentStatus = PaymentStatus.PENDING;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@Column(name = "updated_at")
	private LocalDateTime updatedAt = LocalDateTime.now();
	
	@Column(name = "totalprice")
	private double totalprice;

	@PreUpdate
	public void setLastUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

	public Booking() {
		super();
	}

	public Booking(Long id, Long userId, Long guideId, String currentLocation, String destinationLocation,
			PaymentStatus paymentStatus, LocalDateTime createdAt, LocalDateTime updatedAt, double totalprice) {
		super();
		this.id = id;
		this.userId = userId;
		this.guideId = guideId;
		this.currentLocation = currentLocation;
		this.destinationLocation = destinationLocation;
		this.paymentStatus = paymentStatus;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.totalprice = totalprice;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getGuide() {
		return guideId;
	}

	public void setGuideId(Long guideId) {
		this.guideId = guideId;
	}

	public String getCurrentLocation() {
		return currentLocation;
	}

	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}

	public String getDestinationLocation() {
		return destinationLocation;
	}

	public void setDestinationLocation(String destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	public double getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", userId=" + userId + ", guideId=" + guideId + ", currentLocation="
				+ currentLocation + ", destinationLocation=" + destinationLocation + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + "]";
	}

}
