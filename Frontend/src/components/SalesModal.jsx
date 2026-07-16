import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";

function SalesModal({ show, closeModal, saveSale }) {

  const [medicines, setMedicines] = useState([]);

  const [sale, setSale] = useState({
    medicineId: "",
    quantity: 1,
    price: 0,
    total: 0,
    saleDate: "",
  });

  useEffect(() => {

    if (show) {

      loadMedicines();

      setSale({
        medicineId: "",
        quantity: 1,
        price: 0,
        total: 0,
        saleDate: "",
      });

    }

  }, [show]);

  const loadMedicines = async () => {

    try {

      const response = await getMedicines();

      setMedicines(response.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleMedicine = (e) => {

    const id = Number(e.target.value);

    const medicine = medicines.find(
      (m) => m.medicineId === id
    );

    if (!medicine) return;

    setSale({
      ...sale,
      medicineId: id,
      price: medicine.price,
      total: medicine.price * sale.quantity,
    });

  };

  const handleQuantity = (e) => {

    const qty = Number(e.target.value);

    setSale({
      ...sale,
      quantity: qty,
      total: qty * sale.price,
    });

  };

  const handleDate = (e) => {

    setSale({
      ...sale,
      saleDate: e.target.value,
    });

  };

  const handleSubmit = () => {

    if (
      sale.medicineId === "" ||
      sale.saleDate === ""
    ) {

      alert("Please fill all fields");

      return;

    }

    const request = {

      saleDate: sale.saleDate,

      totalAmount: sale.total,

      saleItems: [

        {

          medicine: {

            medicineId: sale.medicineId,

          },

          quantity: sale.quantity,

          price: sale.price,

        },

      ],

    };

    saveSale(request);

  };

  if (!show) return null;

  return (

    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header bg-info text-white">

            <h5>New Sale</h5>

            <button
              className="btn-close btn-close-white"
              onClick={closeModal}
            ></button>

          </div>

          <div className="modal-body">

            <div className="mb-3">

              <label>Medicine</label>

              <select
                className="form-select"
                value={sale.medicineId}
                onChange={handleMedicine}
              >

                <option value="">Select Medicine</option>

                {

                  medicines.map((medicine) => (

                    <option
                      key={medicine.medicineId}
                      value={medicine.medicineId}
                    >

                      {medicine.medicineName}

                    </option>

                  ))

                }

              </select>

            </div>

            <div className="mb-3">

              <label>Price</label>

              <input
                className="form-control"
                value={sale.price}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>Quantity</label>

              <input
                type="number"
                min="1"
                className="form-control"
                value={sale.quantity}
                onChange={handleQuantity}
              />

            </div>

            <div className="mb-3">

              <label>Total</label>

              <input
                className="form-control"
                value={sale.total}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>Sale Date</label>

              <input
                type="date"
                className="form-control"
                value={sale.saleDate}
                onChange={handleDate}
              />

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
              className="btn btn-info text-white"
              onClick={handleSubmit}
            >
              Save Sale
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SalesModal;