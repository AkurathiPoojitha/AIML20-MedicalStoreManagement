import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SupplierModal from "../components/SupplierModal";
import ConfirmDelete from "../components/ConfirmDelete";

import {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier as deleteSupplierAPI,
} from "../services/supplierService";

function Supplier() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD

  const handleAddSupplier = async (supplier) => {
    try {
      await addSupplier(supplier);

      loadSuppliers();

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  // UPDATE

  const handleUpdateSupplier = async (supplier) => {
    try {
      await updateSupplier(supplier.supplierId, supplier);

      loadSuppliers();

      setSelectedSupplier(null);

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE OPEN

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setShowDeleteModal(true);
  };

  // DELETE

  const handleDeleteSupplier = async () => {
    try {
      await deleteSupplierAPI(selectedSupplier.supplierId);

      loadSuppliers();

      setShowDeleteModal(false);

      setSelectedSupplier(null);
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.phone.includes(search) ||
      supplier.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.address
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <Layout>
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3>Supplier Management</h3>

          <button
            className="btn btn-light"
            onClick={() => {
              setSelectedSupplier(null);
              setShowModal(true);
            }}
          >
            + Add Supplier
          </button>
        </div>

        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier, index) => (
                  <tr key={supplier.supplierId}>
                    <td>{index + 1}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.address}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(supplier)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(supplier)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Supplier Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SupplierModal
        show={showModal}
        closeModal={() => {
          setShowModal(false);
          setSelectedSupplier(null);
        }}
        addSupplier={handleAddSupplier}
        editSupplier={handleUpdateSupplier}
        selectedSupplier={selectedSupplier}
      />

      <ConfirmDelete
        show={showDeleteModal}
        closeModal={() => {
          setShowDeleteModal(false);
          setSelectedSupplier(null);
        }}
        deleteSupplier={handleDeleteSupplier}
        supplierName={
          selectedSupplier ? selectedSupplier.supplierName : ""
        }
      />
    </Layout>
  );
}

export default Supplier;