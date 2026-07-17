package com.medicalstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.medicalstore.model.Supplier;
import com.medicalstore.service.SupplierService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/supplier")
@Validated
public class SupplierController {

	@Autowired
	private SupplierService supplierService;

	@PostMapping("/add")
	public Supplier addSupplier(@Valid @RequestBody Supplier supplier) {
		return supplierService.addSupplier(supplier);
	}

	@GetMapping("/getall")
	public List<Supplier> getAllSuppliers() {
		return supplierService.getAllSuppliers();
	}

	@GetMapping("/get/{supplierId}")
	public Supplier getSupplierById(@PathVariable Long supplierId) {
		return supplierService.getSupplierById(supplierId);
	}

	@PutMapping("/update/{supplierId}")
	public Supplier updateSupplier(@PathVariable Long supplierId,
			@Valid @RequestBody Supplier supplier) {
		return supplierService.updateSupplier(supplierId, supplier);
	}

	@DeleteMapping("/delete/{supplierId}")
	public String deleteSupplier(@PathVariable Long supplierId) {

		supplierService.deleteSupplier(supplierId);

		return "Supplier deleted successfully...";
	}

}