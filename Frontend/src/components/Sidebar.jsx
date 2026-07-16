import {
  FaTachometerAlt,
  FaCapsules,
  FaTruck,
  FaShoppingCart,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {

  localStorage.removeItem("username");
  localStorage.removeItem("password");

  navigate("/");

};
  return (
    <div className="sidebar">

      <div className="logo">

        <h3>💊 MediCare</h3>

      </div>

      <ul>

        <li>
          <NavLink to="/dashboard">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/medicine">
            <FaCapsules /> Medicines
          </NavLink>
        </li>

        <li>
          <NavLink to="/supplier">
            <FaTruck /> Suppliers
          </NavLink>
        </li>

        <li>
          <NavLink to="/sales">
            <FaShoppingCart /> Sales
          </NavLink>
        </li>

        <li>
          <NavLink to="/inventory">
            <FaBoxes /> Inventory
          </NavLink>
        </li>

      </ul>

      <div className="logout">

        <button
          className="btn text-white w-100 text-start"
          onClick={handleLogout}
          style={{ background: "none", border: "none" }}
        >
          <FaSignOutAlt /> Logout
        </button>

    </div>

    </div>
  );
}

export default Sidebar;