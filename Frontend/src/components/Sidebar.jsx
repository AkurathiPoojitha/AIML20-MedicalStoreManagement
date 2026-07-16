import {
  FaTachometerAlt,
  FaCapsules,
  FaTruck,
  FaShoppingCart,
  FaBoxes,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../services/api";

import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {

  localStorage.removeItem("username");
  localStorage.removeItem("password");

  navigate("/");

};

const handleDeleteAccount = async () => {

  const confirmDelete = window.confirm(
    "Are you sure?\n\nThis will permanently delete your account and ALL your medicines, suppliers, inventory, and sales.\n\nThis action cannot be undone."
  );

  if (!confirmDelete) return;

  try {

    await deleteMyAccount();

    localStorage.clear();

    alert("Account deleted successfully.");

    navigate("/");

  } catch (err) {

    alert(
      err.response?.data?.Message ||
      "Unable to delete account."
    );

    console.log(err);

  }

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
        className="btn text-danger w-100 text-start mb-2"
        onClick={handleDeleteAccount}
        style={{ background: "none", border: "none" }}
      >
        <FaTrashAlt /> Delete Account
      </button>

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