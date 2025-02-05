package com.example.ExploreMate.beans;

import jakarta.persistence.Entity;


public class LoginUser {
	private String emailId;
	private String password;
	public LoginUser(String emailId, String password) {
		super();
		this.emailId = emailId;
		this.password = password;
	}
	public String getEmail() {
		return emailId;
	}
	public void setEmail(String email) {
		this.emailId = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	

}
