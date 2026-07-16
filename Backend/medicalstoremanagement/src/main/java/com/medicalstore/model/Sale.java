package com.medicalstore.model;

import java.time.LocalDate;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.CascadeType;



@Entity
@Table
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long saleId;

	@NotNull(message = "Sale date cannot be empty")
	private LocalDate saleDate;

	@NotNull(message = "Total amount cannot be empty")
	@Positive(message = "Total amount must be greater than 0")
	private Double totalAmount;
	
	private String status;

	@OneToMany(mappedBy = "sale",
			   cascade = CascadeType.ALL,
			   orphanRemoval = true)
	
	private List<SaleItem> saleItems;

	public Sale() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Sale(Long saleId, LocalDate saleDate, Double totalAmount, String status, List<SaleItem> saleItems) {
		super();
		this.saleId = saleId;
		this.saleDate = saleDate;
		this.totalAmount = totalAmount;
		this.status = status;
		this.saleItems = saleItems;
	}

	public Long getSaleId() {
		return saleId;
	}

	public void setSaleId(Long saleId) {
		this.saleId = saleId;
	}

	public LocalDate getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(LocalDate saleDate) {
		this.saleDate = saleDate;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<SaleItem> getSaleItems() {
		return saleItems;
	}

	public void setSaleItems(List<SaleItem> saleItems) {
		this.saleItems = saleItems;
	}

	@Override
	public String toString() {
		return "Sale [saleId=" + saleId + ", saleDate=" + saleDate + ", totalAmount=" + totalAmount
				+ ", status=" + status + "]";
	}

}