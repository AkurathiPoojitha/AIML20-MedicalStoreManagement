package com.medicalstore.service;

import java.util.List;

import com.medicalstore.model.Supplier;

public interface SupplierService {

	Supplier addSupplier(Supplier supplier);

	List<Supplier> getAllSuppliers();

	Supplier getSupplierById(Long supplierId);

	Supplier updateSupplier(Long supplierId, Supplier supplier);

	void deleteSupplier(Long supplierId);

}