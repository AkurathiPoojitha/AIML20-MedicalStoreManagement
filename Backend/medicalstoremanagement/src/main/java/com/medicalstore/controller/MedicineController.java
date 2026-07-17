package com.medicalstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.medicalstore.model.Medicine;
import com.medicalstore.service.MedicineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/medicine")
@Validated
public class MedicineController {

	@Autowired
	private MedicineService medicineService;

	@PostMapping("/add")
	public Medicine addMedicine(@Valid @RequestBody Medicine medicine) {
		return medicineService.addMedicine(medicine);
	}

	@GetMapping("/getall")
	public List<Medicine> getAllMedicines() {
		return medicineService.getAllMedicines();
	}

	@GetMapping("/get/{medicineId}")
	public Medicine getMedicineById(@PathVariable Long medicineId) {
		return medicineService.getMedicineById(medicineId);
	}

	@PutMapping("/update/{medicineId}")
	public Medicine updateMedicine(@PathVariable Long medicineId,
			@Valid @RequestBody Medicine medicine) {
		return medicineService.updateMedicine(medicineId, medicine);
	}

	@DeleteMapping("/delete/{medicineId}")
	public String deleteMedicine(@PathVariable Long medicineId) {

		medicineService.deleteMedicine(medicineId);

		return "Medicine deleted successfully...";
	}
	
	@GetMapping("/low-stock")
	public List<Medicine> getLowStockMedicines() {

	    return medicineService.getLowStockMedicines();

	}

	@GetMapping("/expiring")
	public List<Medicine> getExpiringMedicines() {

	    return medicineService.getExpiringMedicines();

	}
	
	@GetMapping("/search/{medicineName}")
	public List<Medicine> searchMedicine(@PathVariable String medicineName){

	    return medicineService.searchMedicine(medicineName);

	}
}