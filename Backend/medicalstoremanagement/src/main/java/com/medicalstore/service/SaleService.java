package com.medicalstore.service;

import java.util.List;

import com.medicalstore.model.Sale;

public interface SaleService {

	Sale addSale(Sale sale);

	List<Sale> getAllSales();

	Sale getSaleById(Long saleId);

	void cancelSale(Long saleId);

}