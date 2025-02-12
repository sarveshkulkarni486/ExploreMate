package com.example.ExploreMate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ExploreMate.beans.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
