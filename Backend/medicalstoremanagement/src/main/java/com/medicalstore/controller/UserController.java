package com.medicalstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.medicalstore.model.User;
import com.medicalstore.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/add")
	public User addUser(@Valid @RequestBody User user) {
		return userService.addUser(user);
	}

	@GetMapping("/getall")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/get/{userId}")
	public User getUserById(@PathVariable Long userId) {
		return userService.getUserById(userId);
	}

	@PutMapping("/update/{userId}")
	public User updateUser(@PathVariable Long userId,
						   @Valid @RequestBody User user) {
		return userService.updateUser(userId, user);
	}

	@DeleteMapping("/delete/{userId}")
	public String deleteUser(@PathVariable Long userId) {

		userService.deleteUser(userId);

		return "User deleted successfully.";
	}

}