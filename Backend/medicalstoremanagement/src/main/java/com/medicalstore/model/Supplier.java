package com.medicalstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;

@Entity
@Table // To change table name use: @Table(name = "suppliers")
public class Supplier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // ID will be generated automatically
	private Long supplierId;

	@NotBlank(message = "Supplier name cannot be empty")
	private String supplierName;

	@NotBlank(message = "Phone number cannot be empty")
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
	private String phone;

	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Enter a valid email address")
	private String email;

	@NotBlank(message = "Address cannot be empty")
	private String address;

	public Supplier() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Supplier(Long supplierId, String supplierName, String phone, String email, String address) {
		super();
		this.supplierId = supplierId;
		this.supplierName = supplierName;
		this.phone = phone;
		this.email = email;
		this.address = address;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Supplier [supplierId=" + supplierId + ", supplierName=" + supplierName + ", phone=" + phone
				+ ", email=" + email + ", address=" + address + "]";
	}
	
	@OneToMany(mappedBy = "supplier")
	@JsonIgnore
	private List<Medicine> medicines;

}