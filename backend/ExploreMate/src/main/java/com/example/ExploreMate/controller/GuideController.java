package com.example.ExploreMate.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.sound.midi.Patch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ExploreMate.Jwt.JwtUtility;
import com.example.ExploreMate.beans.Guide;
import com.example.ExploreMate.beans.Role;
import com.example.ExploreMate.repository.GuideRepository;
import com.example.ExploreMate.services.GuideService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/guide")
public class GuideController {
	@Autowired
	private GuideService guideService;

	private static final Logger logger = LoggerFactory.getLogger(GuideService.class);
	
	@Value("${file.upload.profileimages.path}")
	private String uploadDir;
	
	@Value("${file.upload.aadhaarimages.path}")
	private String aadhaarImagesDir;
	
	@Autowired
	private JwtUtility jwtUtil;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	//Register Guide
	@PostMapping("/register")
	public ResponseEntity<?> registerGuide( @RequestParam("gender") String gender,
			@RequestParam("name") String name,
            @RequestParam("language") String language,
            @RequestParam("price_per_hr") String pricePerHr,
            @RequestParam("transportation") String transportation,
            @RequestParam("rating") String rating,
            @RequestParam("expertise") String expertise,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("aadhaarnumber") String aadhaarNumber,
            @RequestParam("profilepic") MultipartFile profilePic, // MultipartFile for profile picture
            @RequestParam("aadhaarpic") MultipartFile aadhaarPic, // MultipartFile for Aadhaar picture
            @RequestParam("vehicletype") String vehicleType,
            @RequestParam("age") String age,
            @RequestParam(value= "role", defaultValue = "GUIDE") String role)throws IOException, java.io.IOException {
		
		try {
			byte[] profilePicBytes = profilePic.isEmpty() ? null : profilePic.getBytes();
			byte[] aadhaarPicBytes = aadhaarPic.isEmpty() ? null : aadhaarPic.getBytes();
			
			Role roleEnum = Role.fromString(role.toUpperCase());
			
			guideService.registerguide(gender, name, language, pricePerHr, transportation, rating, expertise, email, password, aadhaarNumber, profilePicBytes, aadhaarPicBytes, vehicleType, age, roleEnum);
			return ResponseEntity.ok("Guide registered successfully");
			
			
		}catch(Exception e) {
			logger.warn("Error while saving data ", e.getMessage());
			return ResponseEntity.badRequest().body("Error saving guide"+e.getMessage());
		}
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody com.example.ExploreMate.beans.LoginUser loginUser){
		
		return guideService.loginUser(loginUser.getEmail(), loginUser.getPassword());
	}
	
	private String saveFile(MultipartFile file, String directory) throws IOException, java.io.IOException {
		if(file.isEmpty()) {
			throw new IOException("Failed to upload empty file");
		}
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		
		Path path = Paths.get(directory, filename);
		//create the directory if does not exists
		Files.createDirectories(path.getParent());
		
		Files.copy(file.getInputStream(),path);
		
		return filename;
	}
	@GetMapping("/profile")
	public ResponseEntity<?> getLoggedInGuideDetails(@RequestHeader("Authorization") String authorizationHeader) {
		String token = authorizationHeader.substring(7);
		logger.info("Token {} ", token);
		return guideService.getLoggedInGuideDetails(token);
	}
	
	@GetMapping("/getAllGuides")
	public ResponseEntity<List<Map<String, Object>>> getAllGuides() {
		List<Guide> guides = guideService.getAllGuides();
		List<Map<String, Object>> responseList = new ArrayList<>();
		
		for(Guide guide : guides) {
			Map<String, Object> guideData = new HashMap<>();
			guideData.put("id", guide.getGuideId());
	        guideData.put("name", guide.getName());
	        guideData.put("gender", guide.getGender());
	        guideData.put("language", guide.getLanguage());
	        guideData.put("price_per_hr", guide.getPricePerHr());
	        guideData.put("expertise", guide.getExpertise());
	        guideData.put("email", guide.getEmail());
	        guideData.put("transportation", guide.getTransportation());
			
	        if(guide.getProfilePic() != null) {
	        	guideData.put("profilePic", Base64.getEncoder().encodeToString(guide.getProfilePic()));
	        	
	        }else {
	        	guideData.put("profilePic", null);
	        }
	        responseList.add(guideData);
		}
		return ResponseEntity.ok(responseList);
	
	}
	
			

}
