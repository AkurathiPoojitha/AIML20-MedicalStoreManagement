import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getInventory } from "../services/api";

function Inventory() {

  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await getInventory();
      setInventory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

  const getBadge = (stock) => {
    if (stock === 0) return "danger";
    if (stock < 10) return "warning";
    return "success";
  };

  const filteredInventory = inventory.filter((item) =>
    item.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="card shadow">

        <div className="card-header bg-secondary text-white">

          <h3>Inventory</h3>

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
                <th>Medicine</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Expiry</th>

              </tr>

            </thead>

            <tbody>

              {filteredInventory.map((item, index) => (

                <tr key={item.medicineId}>

                  <td>{index + 1}</td>

                  <td>{item.medicineName}</td>

                  <td>{item.category}</td>

                  <td>{item.supplier?.supplierName}</td>

                  <td>{item.stock}</td>

                  <td>
                    <span className={`badge bg-${getBadge(item.stock)}`}>
                      {getStatus(item.stock)}
                    </span>
                  </td>

                  <td>{item.expiryDate}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

}

export default Inventory;