package com.example.ExploreMate.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.example.ExploreMate.Jwt.JwtUtility;
import com.example.ExploreMate.beans.Guide;
import com.example.ExploreMate.beans.Role;
import com.example.ExploreMate.beans.User;
import com.example.ExploreMate.repository.GuideRepository;

@Service
public class GuideService {
	private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
	
	@Autowired
	GuideRepository guideRepository;
	
	@Autowired
	JwtUtility jwtUtil;
	
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	/*
	 * public ResponseEntity<?> registerguide(Guide guideData) { Optional<Guide>
	 * existingGuide = guideRepository.findByEmail(guideData.getEmail()); if
	 * (existingGuide.isPresent()) { return ResponseEntity.badRequest().
	 * body("You are already registered. Please proceed to login."); } else {
	 * guideData.setApproved(false); // Ensure the guide is not approved by default
	 * Guide savedGuide = guideRepository.save(guideData); return
	 * ResponseEntity.ok(savedGuide); } }
	 */

	public ResponseEntity<?> loginUser(String email, String password) {
		Optional<Guide> guide = guideRepository.findByEmail(email);
		if(!guide.isPresent()) {
			logger.warn("Wrong email: {}", email);
			return ResponseEntity.badRequest().body("User not found");
		}
		Guide guide1 = guide.get();
		logger.info("Stored password (hashed): {}", guide1.getPassword());
		logger.info("Raw password input: {}", password);
		
		if(!passwordEncoder.matches(password, guide1.getPassword())) {
			logger.warn("Invalid Password Attempt for email: {}", email);
			return ResponseEntity.badRequest().body("Invalid Password ");
		}
		
		try {
			String token = jwtUtil.generateToken(email, guide1.getRole().name());
			logger.info("user logged in successful ", email);
			logger.info(token);
			return ResponseEntity.ok(Map.of("token", token));
		}catch(Exception e) {
			logger.error("Token generation failed for guide {}", email, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token generation failed");
		}
	}

	public ResponseEntity<?> registerguide(String gender, String name, String language, String pricePerHr, String transportation, String rating,
			String expertise, String email, String password, String aadhaarnumber, byte[] profilepic,
			byte[] aadhaarpic, String vehicleType, String age, Role role) {
		
		Optional<Guide> existingGuide = guideRepository.findByEmail(email);
		if(existingGuide.isPresent()) {
			logger.warn("Guide {} already exists");
			return ResponseEntity.badRequest().body("You are already register. Please proceed to login");
		}
		
		String encodedPassword = passwordEncoder.encode(password);
		
		double pricePerHrint = Double.parseDouble(pricePerHr);
		double ratingdb = Double.parseDouble(rating);
		int ageint = Integer.parseInt(age);
		
		Guide guide = new Guide();
		guide.setGender(gender);
		guide.setName(name);
	    guide.setLanguage(language);
	    guide.setPricePerHr(pricePerHrint);
	    guide.setTransportation(transportation);
	    guide.setRating(ratingdb);
	    guide.setExpertise(expertise);
	    guide.setEmail(email);
	    guide.setPassword(encodedPassword); 
	    guide.setAadhaarNumber(aadhaarnumber);
	    guide.setProfilePic(profilepic); // Save the file for profile pic
	    guide.setAadhaarPic(aadhaarpic); // Save the file for Aadhaar pic
	    guide.setVehicleType(vehicleType);
	    guide.setAge(ageint);
	    guide.setRole(role);
	    guide.setApproved(false);

	    Guide savedGuide = guideRepository.save(guide);
	    logger.info("Guide Registered successfully");
	    return ResponseEntity.ok(savedGuide);
	}

	public ResponseEntity<?> getLoggedInGuideDetails(String token) {
		if(token == null || jwtUtil.isTokenExpired(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
		}
		String email = jwtUtil.extractUsername(token);
		Optional<Guide> guide = guideRepository.findByEmail(email);
		if(!guide.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user not found");
		}
		return ResponseEntity.ok(guide.get());
	}

	public List<Guide> getAllGuides() {
		return guideRepository.findAll();
	}
	
}
