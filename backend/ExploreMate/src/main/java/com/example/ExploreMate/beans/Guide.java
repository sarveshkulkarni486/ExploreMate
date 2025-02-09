package com.example.ExploreMate.beans;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * Entity representing a guide in the system.
 */
@Entity
@Table(name = "guide")
public class Guide implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer guideId;

    @Size(max = 10, message = "Gender must not exceed 10 characters")
    private String gender;
    
    @Column(name="name")
    private String name;

    @Size(max = 100, message = "Languages must not exceed 100 characters")
    private String language;

    @DecimalMin(value = "0.00", message = "Price per hour must be positive")
    private Double pricePerHr;

    @Size(max = 100, message = "Transportation must not exceed 100 characters")
    private String transportation;

    @DecimalMin(value = "0.00", message = "Rating must be at least 0")
    @DecimalMax(value = "5.00", message = "Rating must not exceed 5.00")
    private Double rating;

    private Integer notificationId;
    private Integer userId;

    @Size(max = 100, message = "Expertise must not exceed 100 characters")
    private String expertise;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Size(max = 100, message = "Aadhaar number must not exceed 100 characters")
    @Column(name="aadhaarnumber")
    private String aadhaarNumber;

    @Lob
    @Column(name="profilepic")
    private byte[] profilePic;
    
    @Lob
    @Column(name="aadhaarcard")
    private byte[] aadhaarPic;

    @Size(max = 100, message = "Vehicle type must not exceed 100 characters")
    @Column(name="vehicletype")
    private String vehicleType;

    @Column(name="age")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must not exceed 100")
    private Integer age;

    @Column(nullable = false)
    private Boolean approved = false;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role; // Enum for role (e.g., GUIDE, ADMIN)

    // Default constructor
    public Guide() {
    }

    // Parametrized constructor
    public Guide(Integer guideId, String gender, String name, String language, Double pricePerHr, String transportation,
                 Double rating, Integer notificationId, Integer userId, String expertise, String email,
                 String password, String aadhaarNumber, byte[] profilePic, byte[] aadhaarPic, String vehicleType,
                 Integer age, Boolean approved, Role role) {
        this.guideId = guideId;
        this.gender = gender;
        this.name = name;
        this.language = language;
        this.pricePerHr = pricePerHr;
        this.transportation = transportation;
        this.rating = rating;
        this.notificationId = notificationId;
        this.userId = userId;
        this.expertise = expertise;
        this.email = email;
        this.password = password;
        this.aadhaarNumber = aadhaarNumber;
        this.profilePic = profilePic;
        this.aadhaarPic = aadhaarPic;
        this.vehicleType = vehicleType;
        this.age = age;
        this.approved = approved;
        this.role = role;
    }

    // Getter and Setter Methods

	public Integer getGuideId() {
        return guideId;
    }

    public void setGuideId(Integer guideId) {
        this.guideId = guideId;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Double getPricePerHr() {
        return pricePerHr;
    }

    public void setPricePerHr(Double pricePerHr) {
        this.pricePerHr = pricePerHr;
    }

    public String getTransportation() {
        return transportation;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public byte[] getAadhaarPic() {
        return aadhaarPic;
    }

    public void setAadhaarPic(byte[] aadhaarPic) {
        this.aadhaarPic = aadhaarPic;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    /**
     * Updates the guide with new data.
     */
    public void updateGuide(Guide guideData) {
        this.setGender(guideData.getGender());
        this.setName(guideData.getName());
        this.setLanguage(guideData.getLanguage());
        this.setPricePerHr(guideData.getPricePerHr());
        this.setTransportation(guideData.getTransportation());
        this.setRating(guideData.getRating());
        this.setNotificationId(guideData.getNotificationId());
        this.setUserId(guideData.getUserId());
        this.setExpertise(guideData.getExpertise());
        this.setEmail(guideData.getEmail());
        this.setPassword(guideData.getPassword());
        this.setAadhaarNumber(guideData.getAadhaarNumber());
        this.setAadhaarPic(guideData.getAadhaarPic());
        this.setProfilePic(guideData.getProfilePic());
        this.setVehicleType(guideData.getVehicleType());
        this.setAge(guideData.getAge());
        this.setApproved(guideData.getApproved());
        this.setRole(guideData.getRole());
    }

    @Override
    public String toString() {
        return "Guide [guideId=" + guideId + ", gender=" + gender + ", name="+ name + ", language=" + language + ", pricePerHr="
                + pricePerHr + ", transportation=" + transportation + ", rating=" + rating + ", notificationId="
                + notificationId + ", userId=" + userId + ", expertise=" + expertise + ", email=" + email
                + ", password=" + password + ", aadhaarNumber=" + aadhaarNumber + ", profilePic=" + profilePic
                + ", aadhaarPic=" + aadhaarPic + ", vehicleType=" + vehicleType + ", age=" + age + ", approved="
                + approved + ", role=" + role + "]";
    }
}
