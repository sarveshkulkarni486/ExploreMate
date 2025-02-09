package com.example.ExploreMate.services;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ExploreMate.Jwt.JwtUtility;
import com.example.ExploreMate.beans.User;
import com.example.ExploreMate.repository.UserRepository;

@Service
public class AuthService {
	private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtility jwtUtil;
	
	
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	//Register User
	public ResponseEntity<?> registerUser(User userdata) {
		User user = new User();
        user.setName(userdata.getName());
        user.setEmailId(userdata.getEmailId());
        user.setPassword(userdata.getPassword());
        user.setRole(userdata.getRole());
        user.setGuest(false);
        user.setPreferences("");
        user.setProfilePhoto("");
		Optional<User> existingUser = userRepository.findByEmailId(user.getEmailId());
		if(existingUser.isPresent()) {
			logger.warn("User with email {} already exists", user.getEmailId());
			return ResponseEntity.badRequest().body("user already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setGuest(false);
		userRepository.save(user);
		logger.info("User {} registered successfully.", user.getEmailId());
		return ResponseEntity.ok("User registered successfully");
	}

	public ResponseEntity<?> loginUser(String email, String password) {
		Optional<User> user = userRepository.findByEmailId(email);
		if(!user.isPresent()) {
			logger.warn("Wrong email: {}", email);
			return ResponseEntity.badRequest().body("User not found");
		}
		User user1 = user.get();
		
		logger.info("Stored password (hashed): {}", user1.getPassword());
		logger.info("Raw password input: {}", password);
		
		if(!passwordEncoder.matches(password, user1.getPassword())) {
			logger.warn("Invalid Password Attempt for email: {}", email);
			return ResponseEntity.badRequest().body("Invalid Password ");
		}
		
		//Generate JWT token
		String token = jwtUtil.generateToken(email, user1.getRole().name());
		
		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("userId", user.get().getUserId());
        response.put("name", user.get().getName());
        response.put("email", user.get().getEmailId());
        response.put("role", user.get().getRole().name()); 
		logger.info("User {} logged in successfully", email);
		return ResponseEntity.ok(response);
	}

	/*
	 * public Optional<User> authenticateUser(String email, String password) {
	 * Optional<User> user = userRepository.findByEmailId(email);
	 * if(!user.isPresent()) { throw new IllegalArgumentException("User not found");
	 * } if(!passwordEncoder.matches(password, user.get().getPassword())) { throw
	 * new IllegalArgumentException("Invalid credentials"); } return user; }
	 */

}
