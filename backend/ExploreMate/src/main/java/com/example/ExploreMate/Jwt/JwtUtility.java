package com.example.ExploreMate.Jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.ExploreMate.beans.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtility {
	private static String SECRETKEY = SecretKeyGenerator.generateSecretKey();
	private static final long EXPIRATION_TIME = 1000*60*60; //1 hours
	
	public String generateToken(String email, String role) {
		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("role", role); 
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, SECRETKEY)
				.compact();
	}
	public boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public String extractRole(String token) {
		return extractClaim(token, claims->claims.get("role", String.class));
	}
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	public boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = Jwts.parser()
								.setSigningKey(SECRETKEY)
								.parseClaimsJws(token)
								.getBody();
		return claimsResolver.apply(claims);
	}
		

}
