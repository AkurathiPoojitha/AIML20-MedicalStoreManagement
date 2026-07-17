package com.medicalstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicalstore.model.Supplier;
import com.medicalstore.repository.SupplierRepository;
import com.medicalstore.service.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private SupplierRepository supplierRepository;

	@Override
	public Supplier addSupplier(Supplier supplier) {
		return supplierRepository.save(supplier);
	}

	@Override
	public List<Supplier> getAllSuppliers() {
		return supplierRepository.findAll();
	}

	@Override
	public Supplier getSupplierById(Long supplierId) {

		Optional<Supplier> optional = supplierRepository.findById(supplierId);

		if(optional.isPresent()) {
			return optional.get();
		}

		throw new RuntimeException("Supplier not found.");
	}

	@Override
	public Supplier updateSupplier(Long supplierId, Supplier supplier) {

		Optional<Supplier> optional = supplierRepository.findById(supplierId);

		if (optional.isPresent()) {

			Supplier existingSupplier = optional.get();

			existingSupplier.setSupplierName(supplier.getSupplierName());
			existingSupplier.setPhone(supplier.getPhone());
			existingSupplier.setEmail(supplier.getEmail());
			existingSupplier.setAddress(supplier.getAddress());

			return supplierRepository.save(existingSupplier);
		}

		return null;
	}

	@Override
	public void deleteSupplier(Long supplierId) {

		supplierRepository.deleteById(supplierId);

	}

}