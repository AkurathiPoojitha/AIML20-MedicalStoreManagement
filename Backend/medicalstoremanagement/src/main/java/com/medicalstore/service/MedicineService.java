package com.medicalstore.service;

import java.util.List;

import com.medicalstore.model.Medicine;

public interface MedicineService {

	Medicine addMedicine(Medicine medicine);

	List<Medicine> getAllMedicines();

	Medicine getMedicineById(Long medicineId);

	Medicine updateMedicine(Long medicineId, Medicine medicine);

	void deleteMedicine(Long medicineId);
	
	List<Medicine> getLowStockMedicines();

	List<Medicine> getExpiringMedicines();
	
	List<Medicine> searchMedicine(String medicineName);
}