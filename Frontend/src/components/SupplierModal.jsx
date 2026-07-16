import { useState, useEffect } from "react";

function SupplierModal({
  show,
  closeModal,
  addSupplier,
  editSupplier,
  selectedSupplier,
}) {
  const [supplier, setSupplier] = useState({
    supplierName: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (selectedSupplier) {
      setSupplier(selectedSupplier);
    } else {
      setSupplier({
        supplierName: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [selectedSupplier, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      supplier.supplierName.trim() === "" ||
      supplier.phone.trim() === "" ||
      supplier.email.trim() === "" ||
      supplier.address.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (selectedSupplier) {
        await editSupplier(supplier);
      } else {
        await addSupplier(supplier);
      }

      closeModal();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label>Supplier Name</label>

              <input
                type="text"
                className="form-control"
                name="supplierName"
                value={supplier.supplierName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={supplier.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Address</label>

              <textarea
                rows="3"
                className="form-control"
                name="address"
                value={supplier.address}
                onChange={handleChange}
              ></textarea>
            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {selectedSupplier ? "Update Supplier" : "Save Supplier"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default SupplierModal;