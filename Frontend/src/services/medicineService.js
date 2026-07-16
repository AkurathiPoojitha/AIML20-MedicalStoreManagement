import api from "./api";

export const getAllMedicines = () => {
  return api.get("/medicine/getall");
};

export const addMedicine = (medicine) => {
  return api.post("/medicine/add", medicine);
};

export const updateMedicine = (id, medicine) => {
  return api.put(`/medicine/update/${id}`, medicine);
};

export const deleteMedicine = (id) => {
  return api.delete(`/medicine/delete/${id}`);
};

export const getLowStock = () => {
  return api.get("/medicine/low-stock");
};

export const getExpiring = () => {
  return api.get("/medicine/expiring");
};

export const searchMedicine = (name) => {
  return api.get(`/medicine/search/${name}`);
};