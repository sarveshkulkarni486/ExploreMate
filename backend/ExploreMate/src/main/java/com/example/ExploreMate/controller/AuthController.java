package com.example.ExploreMate.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ExploreMate.beans.User;
import com.example.ExploreMate.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User userdata) {
		return ResponseEntity.ok(authService.registerUser(userdata));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody com.example.ExploreMate.beans.LoginUser loginUser){
		
		return authService.loginUser(loginUser.getEmail(), loginUser.getPassword());
	}

}
