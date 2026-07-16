import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MedicineModal from "../components/MedicineModal";
import ConfirmDelete from "../components/ConfirmDelete";
import api from "../services/api";

function Medicine() {

  
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Load Medicines

  const loadMedicines = () => {

    api.get("/medicine/getall")
      .then((res) => {

        setMedicines(res.data);

      })
      .catch((err) => console.log(err));

  };

  useEffect(() => {

    loadMedicines();

  }, []);

  // ADD

  const addMedicine = (medicine) => {

  medicine.user = {
    userId: Number(localStorage.getItem("userId"))
  };

  api.post("/medicine/add", medicine)
    .then(() => {

      loadMedicines();

    })
    .catch((err) => console.log(err));

};

  // UPDATE

  const editMedicine = (medicine) => {

    api.put(`/medicine/update/${medicine.medicineId}`, medicine)
      .then(() => {

        loadMedicines();

      })
      .catch((err) => console.log(err));

  };

  // DELETE

  const deleteMedicine = () => {

    api.delete(`/medicine/delete/${selectedMedicine.medicineId}`)
      .then(() => {

        loadMedicines();

        setShowDeleteModal(false);

        setSelectedMedicine(null);

      })
      .catch((err) => console.log(err));

  };

  // SEARCH

  const filteredMedicines = medicines.filter((medicine) =>

    medicine.medicineName
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <Layout>

      <div className="card shadow">

        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">

          <h3>Medicine Management</h3>

          <button
            className="btn btn-light"
            onClick={() => {

              setSelectedMedicine(null);

              setShowModal(true);

            }}
          >
            + Add Medicine
          </button>

        </div>

        <div className="card-body">

          <input
            className="form-control mb-3"
            placeholder="Search Medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Category</th>

                <th>Supplier</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Expiry</th>

                <th width="180">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredMedicines.length > 0 ? (

                filteredMedicines.map((medicine, index) => (

                  <tr key={medicine.medicineId}>

                    <td>{index + 1}</td>

                    <td>{medicine.medicineName}</td>

                    <td>{medicine.category}</td>

                    <td>{medicine.supplier?.supplierName}</td>

                    <td>₹ {medicine.price}</td>

                    <td>{medicine.stock}</td>

                    <td>{medicine.expiryDate}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {

                          setSelectedMedicine(medicine);

                          setShowModal(true);

                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {

                          setSelectedMedicine(medicine);

                          setShowDeleteModal(true);

                        }}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="8" className="text-center">

                    No Medicines Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>



      <MedicineModal
        show={showModal}
        closeModal={() => {

          setShowModal(false);

          setSelectedMedicine(null);

        }}
        addMedicine={addMedicine}
        editMedicine={editMedicine}
        selectedMedicine={selectedMedicine}
      />

      <ConfirmDelete
        show={showDeleteModal}
        closeModal={() => {

          setShowDeleteModal(false);

          setSelectedMedicine(null);

        }}
        deleteSupplier={deleteMedicine}
        supplierName={
          selectedMedicine
            ? selectedMedicine.medicineName
            : ""
        }
      />

    </Layout>

  );

}

export default Medicine;