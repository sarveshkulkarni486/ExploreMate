package com.example.ExploreMate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ExploreMate.beans.Guide;

public interface GuideRepository extends JpaRepository<Guide, Integer> {
	Optional<Guide> findByEmail(String email);


}
