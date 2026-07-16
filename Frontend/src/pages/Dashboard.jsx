import Layout from "../components/Layout";
import DashboardCards from "../components/DashboardCards";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {

    try {

      const response = await api.get("/sale/getall");

      setSales(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <Layout>

      <DashboardCards />

      <div className="card shadow mt-4">

        <div className="card-header bg-primary text-white">
          <h4>Recent Sales</h4>
        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead>
              <tr>
                <th>Bill No</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {sales.length > 0 ? (

                sales
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((sale, index) => (

                    <tr key={sale.saleId}>

                      <td>{sale.saleId}</td>
                      <td>{sale.saleDate}</td>
                      <td>₹ {sale.totalAmount}</td>
                      <td>{sale.status}</td>

                    </tr>

                  ))

              ) : (

                <tr>

                  <td colSpan="4" className="text-center">
                    No Sales Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;