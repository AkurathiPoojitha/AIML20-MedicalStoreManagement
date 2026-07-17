package com.medicalstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicalstore.dto.DashboardDTO;
import com.medicalstore.repository.MedicineRepository;
import com.medicalstore.repository.SaleRepository;
import com.medicalstore.repository.SupplierRepository;
import com.medicalstore.repository.UserRepository;

@RestController
public class DashboardController {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SaleRepository saleRepository;

    @GetMapping("/dashboard")
    public DashboardDTO getDashboard() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalSuppliers(supplierRepository.count());
        dashboard.setTotalMedicines(medicineRepository.count());
        dashboard.setTotalUsers(userRepository.count());
        dashboard.setTotalSales(saleRepository.count());

        return dashboard;
    }

}