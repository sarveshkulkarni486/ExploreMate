package com.example.ExploreMate.beans;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="User_Id")
	private int userId;
	
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Email_Id", unique = true)
	private String emailId;
	
	@Column(name="Password")
	private String password;
	
	@Column(name="Profile_Photo")
	private String profilePhoto;
	
	@Column(name="Preferences", columnDefinition = "TEXT")
	private String preferences;
	
	@Column(name="IS_GUEST")
	private boolean isGuest;
	
	@Enumerated(EnumType.STRING)
	@Column(name="Role", nullable = false)
	private Role role;

	public User() {
		super();
	}

	public User(int userId, String name, String emailId, String password, String profilePhoto, String preferences,
			boolean isGuest, Role role) {
		super();
		this.userId = userId;
		this.name = name;
		this.emailId = emailId;
		this.password = password;
		this.profilePhoto = profilePhoto;
		this.preferences = preferences;
		this.isGuest = isGuest;
		this.role = role;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	public String getPreferences() {
		return preferences;
	}

	public void setPreferences(String preferences) {
		this.preferences = preferences;
	}

	public boolean isGuest() {
		return isGuest;
	}

	public void setGuest(boolean isGuest) {
		this.isGuest = isGuest;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", emailId=" + emailId + ", password=" + password
				+ ", profilePhoto=" + profilePhoto + ", preferences=" + preferences + ", isGuest=" + isGuest + ", role="
				+ role + "]";
	}
	
	

}
