package com.medicalstore.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicalstore.model.Medicine;
import com.medicalstore.repository.MedicineRepository;
import com.medicalstore.service.MedicineService;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class MedicineServiceImpl implements MedicineService {

	@Autowired
	private MedicineRepository medicineRepository;

	@Override
	public Medicine addMedicine(Medicine medicine) {
		return medicineRepository.save(medicine);
	}

	@Override
	public List<Medicine> getAllMedicines() {
		return medicineRepository.findAll();
	}

	@Override
	public Medicine getMedicineById(Long medicineId) {

		Optional<Medicine> optional = medicineRepository.findById(medicineId);

		if (optional.isPresent()) {
			return optional.get();
		}

		throw new RuntimeException("Medicine not found.");
	}

	@Override
	public Medicine updateMedicine(Long medicineId, Medicine medicine) {

		Optional<Medicine> optional = medicineRepository.findById(medicineId);

		if (optional.isPresent()) {

			Medicine existingMedicine = optional.get();

			existingMedicine.setMedicineName(medicine.getMedicineName());
			existingMedicine.setCategory(medicine.getCategory());
			existingMedicine.setBatchNo(medicine.getBatchNo());
			existingMedicine.setMfgDate(medicine.getMfgDate());
			existingMedicine.setExpiryDate(medicine.getExpiryDate());
			existingMedicine.setPrice(medicine.getPrice());
			existingMedicine.setStock(medicine.getStock());
			existingMedicine.setSupplier(medicine.getSupplier());

			return medicineRepository.save(existingMedicine);
		}

		return null;
	}
	
	@Override
	public List<Medicine> getLowStockMedicines() {

	    return medicineRepository.findByStockLessThan(10);

	}
	
	@Override
	public List<Medicine> getExpiringMedicines() {

	    LocalDate today = LocalDate.now();
	    LocalDate next30Days = today.plusDays(30);

	    return medicineRepository.findByExpiryDateBetween(today, next30Days);

	}
	
	@Override
	public List<Medicine> searchMedicine(String medicineName) {

	    return medicineRepository.findByMedicineNameContainingIgnoreCase(medicineName);

	}
	
	

	@Override
	public void deleteMedicine(Long medicineId) {

	    try {

	        medicineRepository.deleteById(medicineId);

	    } catch (DataIntegrityViolationException e) {

	        throw new RuntimeException(
	            "Cannot delete medicine because it has sales history."
	        );

	    }

	}

}