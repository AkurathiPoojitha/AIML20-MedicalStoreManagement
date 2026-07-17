package com.medicalstore.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;

@Entity
@Table // To change table name use: @Table(name = "medicines")
public class Medicine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // ID will be generated automatically
	private Long medicineId;

	@NotBlank(message = "Medicine name cannot be empty")
	private String medicineName;

	@NotBlank(message = "Category cannot be empty")
	private String category;

	@NotBlank(message = "Batch number cannot be empty")
	private String batchNo;

	@NotNull(message = "Manufacturing date is required")
	private LocalDate mfgDate;

	@NotNull(message = "Expiry date is required")
	@Future(message = "Expiry date must be in the future")
	private LocalDate expiryDate;

	@NotNull(message = "Price is required")
	@Positive(message = "Price must be greater than 0")
	private Double price;

	@NotNull(message = "Stock is required")
	@Positive(message = "Stock must be greater than 0")
	private Integer stock;

	@ManyToOne
	@JoinColumn(name = "supplier_id")
	private Supplier supplier;

	public Medicine() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Medicine(Long medicineId, String medicineName, String category, String batchNo, LocalDate mfgDate,
			LocalDate expiryDate, Double price, Integer stock, Supplier supplier) {
		super();
		this.medicineId = medicineId;
		this.medicineName = medicineName;
		this.category = category;
		this.batchNo = batchNo;
		this.mfgDate = mfgDate;
		this.expiryDate = expiryDate;
		this.price = price;
		this.stock = stock;
		this.supplier = supplier;
	}

	public Long getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(Long medicineId) {
		this.medicineId = medicineId;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public LocalDate getMfgDate() {
		return mfgDate;
	}

	public void setMfgDate(LocalDate mfgDate) {
		this.mfgDate = mfgDate;
	}

	public LocalDate getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	@Override
	public String toString() {
		return "Medicine [medicineId=" + medicineId + ", medicineName=" + medicineName + ", category=" + category
				+ ", batchNo=" + batchNo + ", mfgDate=" + mfgDate + ", expiryDate=" + expiryDate + ", price=" + price
				+ ", stock=" + stock + ", supplier=" + supplier + "]";
	}
	
	@OneToMany(mappedBy = "medicine")
	@JsonIgnore
	private List<SaleItem> saleItems;

}