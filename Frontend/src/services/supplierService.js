import api from "./api";

export const getAllSuppliers = () => {
  return api.get("/supplier/getall");
};

export const addSupplier = (supplier) => {
  return api.post("/supplier/add", supplier);
};

export const updateSupplier = (id, supplier) => {
  return api.put(`/supplier/update/${id}`, supplier);
};

export const deleteSupplier = (id) => {
  return api.delete(`/supplier/delete/${id}`);
};