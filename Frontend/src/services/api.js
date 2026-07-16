import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Automatically attach logged-in user's credentials
api.interceptors.request.use((config) => {

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username && password) {
    config.auth = {
      username,
      password,
    };
  }

  return config;
});

export default api;

// ---------------- SUPPLIER ----------------

export const getSuppliers = () => api.get("/supplier/getall");

export const addSupplier = (data) =>
  api.post("/supplier/add", data);

export const updateSupplier = (id, data) =>
  api.put(`/supplier/update/${id}`, data);

export const deleteSupplier = (id) =>
  api.delete(`/supplier/delete/${id}`);

// ---------------- MEDICINE ----------------

export const getMedicines = () =>
  api.get("/medicine/getall");

export const addMedicine = (data) =>
  api.post("/medicine/add", data);

export const updateMedicine = (id, data) =>
  api.put(`/medicine/update/${id}`, data);

export const deleteMedicine = (id) =>
  api.delete(`/medicine/delete/${id}`);

// ---------------- DASHBOARD ----------------

export const getDashboardData = async () => {

  const medicines = await api.get("/medicine/getall");
  const suppliers = await api.get("/supplier/getall");
  const sales = await api.get("/sale/getall");
  const lowStock = await api.get("/medicine/low-stock");

  return {
    medicines: medicines.data,
    suppliers: suppliers.data,
    sales: sales.data,
    lowStock: lowStock.data,
  };

};

// ---------------- SALES ----------------

export const getSales = () =>
  api.get("/sale/getall");

export const addSale = (data) =>
  api.post("/sale/add", data);

export const cancelSale = (id) =>
  api.put(`/sale/cancel/${id}`);

//-------------Inventory------------
export const getInventory = () =>
  api.get("/medicine/getall");


//--------Delete Account------------
export const deleteMyAccount = () => {
  return api.delete("/user/delete");
};