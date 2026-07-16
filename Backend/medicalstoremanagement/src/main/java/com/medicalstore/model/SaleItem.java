package com.medicalstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class SaleItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long saleItemId;

	@ManyToOne
	@JoinColumn(name = "sale_id")
	@JsonIgnore
	private Sale sale;

	@ManyToOne
	@JoinColumn(name = "medicine_id")
	private Medicine medicine;

	@NotNull(message = "Quantity cannot be empty")
	@Positive(message = "Quantity must be greater than 0")
	private Integer quantity;

	@NotNull(message = "Price cannot be empty")
	@Positive(message = "Price must be greater than 0")
	private Double price;

	public SaleItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SaleItem(Long saleItemId, Sale sale, Medicine medicine, Integer quantity, Double price) {
		super();
		this.saleItemId = saleItemId;
		this.sale = sale;
		this.medicine = medicine;
		this.quantity = quantity;
		this.price = price;
	}

	public Long getSaleItemId() {
		return saleItemId;
	}

	public void setSaleItemId(Long saleItemId) {
		this.saleItemId = saleItemId;
	}

	public Sale getSale() {
		return sale;
	}

	public void setSale(Sale sale) {
		this.sale = sale;
	}

	public Medicine getMedicine() {
		return medicine;
	}

	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "SaleItem [saleItemId=" + saleItemId + ", quantity=" + quantity + ", price=" + price + "]";
	}

}