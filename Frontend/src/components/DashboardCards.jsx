import {
  FaCapsules,
  FaTruck,
  FaShoppingCart,
  FaExclamationTriangle,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

function DashboardCards() {

  const [cards, setCards] = useState([
    {
      title: "Total Medicines",
      value: 0,
      icon: <FaCapsules />,
      color: "primary",
    },
    {
      title: "Total Suppliers",
      value: 0,
      icon: <FaTruck />,
      color: "success",
    },
    {
      title: "Total Sales",
      value: 0,
      icon: <FaShoppingCart />,
      color: "warning",
    },
    {
      title: "Low Stock",
      value: 0,
      icon: <FaExclamationTriangle />,
      color: "danger",
    },
  ]);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboardData();

      setCards([
        {
          title: "Total Medicines",
          value: data.medicines.length,
          icon: <FaCapsules />,
          color: "primary",
        },
        {
          title: "Total Suppliers",
          value: data.suppliers.length,
          icon: <FaTruck />,
          color: "success",
        },
        {
          title: "Total Sales",
          value: data.sales.length,
          icon: <FaShoppingCart />,
          color: "warning",
        },
        {
          title: "Low Stock",
          value: data.lowStock.length,
          icon: <FaExclamationTriangle />,
          color: "danger",
        },
      ]);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="row">

      {cards.map((card, index) => (

        <div className="col-md-3 mb-4" key={index}>

          <div className={`card border-0 shadow dashboard-card bg-${card.color} text-white`}>

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>{card.title}</h6>

                  <h2>{card.value}</h2>

                </div>

                <div style={{ fontSize: "35px" }}>
                  {card.icon}
                </div>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );

}

export default DashboardCards;