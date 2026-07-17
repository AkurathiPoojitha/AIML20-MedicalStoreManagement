package com.medicalstore.dto;

public class DashboardDTO {

    private Long totalSuppliers;
    private Long totalMedicines;
    private Long totalUsers;
    private Long totalSales;

    public DashboardDTO() {
    }

    public DashboardDTO(Long totalSuppliers, Long totalMedicines,
                        Long totalUsers, Long totalSales) {
        this.totalSuppliers = totalSuppliers;
        this.totalMedicines = totalMedicines;
        this.totalUsers = totalUsers;
        this.totalSales = totalSales;
    }

    public Long getTotalSuppliers() {
        return totalSuppliers;
    }

    public void setTotalSuppliers(Long totalSuppliers) {
        this.totalSuppliers = totalSuppliers;
    }

    public Long getTotalMedicines() {
        return totalMedicines;
    }

    public void setTotalMedicines(Long totalMedicines) {
        this.totalMedicines = totalMedicines;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Long totalSales) {
        this.totalSales = totalSales;
    }

}