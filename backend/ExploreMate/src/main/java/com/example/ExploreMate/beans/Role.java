package com.example.ExploreMate.beans;

public enum Role {
	USER, GUIDE, ADMIN;
	
	public static Role fromString(String role) {
        if (role != null) {
            for (Role r : Role.values()) {
                if (role.equalsIgnoreCase(r.name())) {
                    return r;
                }
            }
        }
        return Role.GUIDE;
	}

}
