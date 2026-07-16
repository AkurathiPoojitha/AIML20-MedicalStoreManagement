import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SalesModal from "../components/SalesModal";
import ConfirmDelete from "../components/ConfirmDelete";

import {
  getSales,
  addSale,
  cancelSale,
} from "../services/api";

function Sales() {

  
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {

    try {

      const response = await getSales();

      console.log("Sales Page:", response.data);

      setSales(response.data);

    } catch (err) {

      console.log(err);

    }

  };

  const saveSale = async (saleData) => {

    try {

        saleData.user = {
            userId: Number(localStorage.getItem("userId"))
        };

        await addSale(saleData);

        loadSales();

        setShowModal(false);

    } catch (err) {

        alert(
            err.response?.data?.Message ||
            "Unable to save sale"
        );

    }

};

  const deleteSale = async () => {

    try {

      await cancelSale(selectedSale.saleId);

      loadSales();

      setShowDeleteModal(false);

      setSelectedSale(null);

    } catch (err) {

      console.log(err);

    }

  };

  const filteredSales =
  search.trim() === ""
    ? sales
    : sales.filter((sale) =>
        sale.saleItems.some((item) =>
          item.medicine.medicineName
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );

  return (

    <Layout>

      <div className="card shadow">

        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">

          <h3>Sales Management</h3>

          <button
            className="btn btn-light"
            onClick={() => {

              setSelectedSale(null);

              setShowModal(true);

            }}
          >
            + New Sale
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

                <th>Bill No</th>

                <th>Date</th>

                <th>Medicine</th>

                <th>Qty</th>

                <th>Total</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredSales.map((sale, index) => (

                  <tr key={sale.saleId}>

                    <td>{index + 1}</td>

                    <td>{sale.saleDate}</td>

                    <td>

                      {sale.saleItems.map((item) =>

                        item.medicine.medicineName

                      ).join(", ")}

                    </td>

                    <td>

                      {sale.saleItems.map((item) =>

                        item.quantity

                      ).join(", ")}

                    </td>

                    <td>

                      ₹ {sale.totalAmount}

                    </td>

                    <td>

                      <span className={
                        sale.status === "ACTIVE"
                        ? "badge bg-success"
                        : "badge bg-danger"
                      }>
                        {sale.status}
                      </span>

                    </td>

                    <td>

                      {

                        sale.status === "ACTIVE" &&

                        <button

                          className="btn btn-danger btn-sm"

                          onClick={() => {

                            setSelectedSale(sale);

                            setShowDeleteModal(true);

                          }}

                        >

                          Cancel

                        </button>

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      <SalesModal

        show={showModal}

        closeModal={() => setShowModal(false)}

        saveSale={saveSale}

      />

      <ConfirmDelete

        show={showDeleteModal}

        closeModal={() => {

          setShowDeleteModal(false);

          setSelectedSale(null);

        }}

        deleteSupplier={deleteSale}

        supplierName="this sale"

      />

    </Layout>

  );

}

export default Sales;