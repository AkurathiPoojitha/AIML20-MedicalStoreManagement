package com.medicalstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.medicalstore.model.User;
import com.medicalstore.repository.UserRepository;
import com.medicalstore.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User addUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserById(Long userId) {

		Optional<User> optional = userRepository.findById(userId);

		if (optional.isPresent()) {
			return optional.get();
		}

		throw new RuntimeException("User not found.");
	}

	@Override
	public User updateUser(Long userId, User user) {

		Optional<User> optional = userRepository.findById(userId);

		if (optional.isPresent()) {

			User existingUser = optional.get();

			existingUser.setUsername(user.getUsername());
			existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
			existingUser.setRole(user.getRole());

			return userRepository.save(existingUser);
		}

		return null;
	}

	@Override
	public void deleteUser(Long userId) {
		userRepository.deleteById(userId);
	}
	
	@Override
	public User login(String username, String password) {

		Optional<User> optional = userRepository.findByUsername(username);

		if(optional.isPresent()) {

			User user = optional.get();

			if(passwordEncoder.matches(password, user.getPassword())) {

				return user;

			}

		}

		return null;

	}

}