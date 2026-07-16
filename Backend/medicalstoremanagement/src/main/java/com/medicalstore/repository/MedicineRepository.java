package com.medicalstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

import com.medicalstore.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long>{
	List<Medicine> findByStockLessThan(int stock);
	List<Medicine> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);
	List<Medicine> findByMedicineNameContainingIgnoreCase(String medicineName);
}