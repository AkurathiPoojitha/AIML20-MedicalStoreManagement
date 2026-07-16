package com.medicalstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicalstore.exception.InsufficientStockException;
import com.medicalstore.exception.MedicineNotFoundException;
import com.medicalstore.model.Medicine;
import com.medicalstore.model.Sale;
import com.medicalstore.model.SaleItem;
import com.medicalstore.repository.MedicineRepository;
import com.medicalstore.repository.SaleRepository;
import com.medicalstore.service.SaleService;

@Service
public class SaleServiceImpl implements SaleService {

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private MedicineRepository medicineRepository;

	@Override
	public Sale addSale(Sale sale) {

		// Loop through every medicine in the sale
		for (SaleItem item : sale.getSaleItems()) {

			Optional<Medicine> optional = medicineRepository.findById(item.getMedicine().getMedicineId());

			if (optional.isPresent()) {

				Medicine medicine = optional.get();

				// Check stock availability
				if (medicine.getStock() < item.getQuantity()) {
					throw new InsufficientStockException(
							"Insufficient stock for " + medicine.getMedicineName());
				}

				// Reduce stock
				medicine.setStock(medicine.getStock() - item.getQuantity());

				// Save updated medicine
				medicineRepository.save(medicine);

				// Link sale with sale item
				item.setSale(sale);

			} else {

				throw new MedicineNotFoundException("Medicine not found.");

			}
		}

		// Save sale and all sale items
		sale.setStatus("ACTIVE");

		return saleRepository.save(sale);
	}

	@Override
	public List<Sale> getAllSales() {
		return saleRepository.findAll();
	}

	@Override
	public Sale getSaleById(Long saleId) {

		Optional<Sale> optional = saleRepository.findById(saleId);

		if (optional.isPresent()) {
			return optional.get();
		}

		throw new RuntimeException("Sale not found.");
	}

	@Override
	public void cancelSale(Long saleId) {

		Optional<Sale> optional = saleRepository.findById(saleId);

		if (optional.isPresent()) {

			Sale sale = optional.get();

			// Prevent cancelling twice
			if (sale.getStatus().equalsIgnoreCase("CANCELLED")) {
				throw new RuntimeException("Sale is already cancelled.");
			}

			// Restore medicine stock
			for (SaleItem item : sale.getSaleItems()) {

				Optional<Medicine> medicineOptional =
						medicineRepository.findById(item.getMedicine().getMedicineId());

				if (medicineOptional.isPresent()) {

					Medicine medicine = medicineOptional.get();

					medicine.setStock(
							medicine.getStock() + item.getQuantity());

					medicineRepository.save(medicine);

				}
			}

			// Mark the sale as cancelled
			sale.setStatus("CANCELLED");

			saleRepository.save(sale);

		} else {

			throw new RuntimeException("Sale not found.");

		}
	}

}