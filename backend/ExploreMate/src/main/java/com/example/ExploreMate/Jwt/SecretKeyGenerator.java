package com.example.ExploreMate.Jwt;

import java.util.Base64;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class SecretKeyGenerator {
	public static String generateSecretKey() {
        try {
            // Generate a 256-bit AES key
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            keyGen.init(256);
            SecretKey secretKey = keyGen.generateKey();

            // Encode the key in Base64 to store as a String
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (Exception e) {
            throw new RuntimeException("Error while generating secret key", e);
        }
    }

    public static void main(String[] args) {
        // Generate and print the secret key
        System.out.println("Generated Secret Key: " + generateSecretKey());
    }

}
