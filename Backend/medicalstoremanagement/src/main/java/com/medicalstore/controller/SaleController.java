package com.medicalstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.medicalstore.model.Sale;
import com.medicalstore.service.SaleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sale")
@Validated
public class SaleController {

	@Autowired
	private SaleService saleService;

	@PostMapping("/add")
	public Sale addSale(@Valid @RequestBody Sale sale) {
		return saleService.addSale(sale);
	}

	@GetMapping("/getall")
	public List<Sale> getAllSales() {
		return saleService.getAllSales();
	}

	@GetMapping("/get/{saleId}")
	public Sale getSaleById(@PathVariable Long saleId) {
		return saleService.getSaleById(saleId);
	}

	@PutMapping("/cancel/{saleId}")
	public String cancelSale(@PathVariable Long saleId) {

		saleService.cancelSale(saleId);

		return "Sale cancelled successfully and stock restored.";
	}

}