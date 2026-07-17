package com.medicalstore.service;

import java.util.List;

import com.medicalstore.model.User;

public interface UserService {

	User addUser(User user);

	List<User> getAllUsers();

	User getUserById(Long userId);

	User updateUser(Long userId, User user);

	void deleteUser(Long userId);

	// Login Method
	User login(String username, String password);

}