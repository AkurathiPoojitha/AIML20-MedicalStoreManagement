import { useState, useEffect } from "react";
import api from "../services/api";

function MedicineModal({
  show,
  closeModal,
  addMedicine,
  editMedicine,
  selectedMedicine,
}) {

  const [suppliers, setSuppliers] = useState([]);

  const [medicine, setMedicine] = useState({
    medicineName: "",
    category: "",
    batchNo: "",
    mfgDate: "",
    expiryDate: "",
    price: "",
    stock: "",
    supplier: {
      supplierId: ""
    }
  });

  useEffect(() => {

    api.get("/supplier/getall")
      .then(res => setSuppliers(res.data))
      .catch(err => console.log(err));

  }, []);

  useEffect(() => {

    if (selectedMedicine) {

      setMedicine(selectedMedicine);

    } else {

      setMedicine({
        medicineName: "",
        category: "",
        batchNo: "",
        mfgDate: "",
        expiryDate: "",
        price: "",
        stock: "",
        supplier: {
          supplierId: ""
        }
      });

    }

  }, [selectedMedicine, show]);

  if (!show) return null;

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "supplierId") {

      setMedicine({
        ...medicine,
        supplier: {
          supplierId: value
        }
      });

    } else {

      setMedicine({
        ...medicine,
        [name]: value
      });

    }

  };

  const handleSubmit = () => {

    if (selectedMedicine)
      editMedicine(medicine);
    else
      addMedicine(medicine);

    closeModal();

  };

  return (

    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >

      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">

          <div className="modal-header bg-success text-white">

            <h5>
              {selectedMedicine ? "Edit Medicine" : "Add Medicine"}
            </h5>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-2"
              placeholder="Medicine Name"
              name="medicineName"
              value={medicine.medicineName}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              placeholder="Category"
              name="category"
              value={medicine.category}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              placeholder="Batch No"
              name="batchNo"
              value={medicine.batchNo}
              onChange={handleChange}
            />

            <label>MFG Date</label>

            <input
              type="date"
              className="form-control mb-2"
              name="mfgDate"
              value={medicine.mfgDate}
              onChange={handleChange}
            />

            <label>Expiry Date</label>

            <input
              type="date"
              className="form-control mb-2"
              name="expiryDate"
              value={medicine.expiryDate}
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price"
              name="price"
              value={medicine.price}
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Stock"
              name="stock"
              value={medicine.stock}
              onChange={handleChange}
            />

            <select
              className="form-select"
              name="supplierId"
              value={medicine.supplier.supplierId}
              onChange={handleChange}
            >

              <option value="">Select Supplier</option>

              {suppliers.map((supplier) => (

                <option
                  key={supplier.supplierId}
                  value={supplier.supplierId}
                >
                  {supplier.supplierName}
                </option>

              ))}

            </select>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn btn-success"
              onClick={handleSubmit}
            >
              {selectedMedicine ? "Update" : "Save"}
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default MedicineModal;