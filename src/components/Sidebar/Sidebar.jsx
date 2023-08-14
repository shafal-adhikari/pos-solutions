import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            <i className="fas fa-home"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/pos">
            <i className="fas fa-cash-register"></i>
            <span className="menu-title">POS</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/orders/all">
            <i className="fas fa-cloud-meatball"></i>
            <span className="menu-title">Orders</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/inventory/list">
            <i className="fas fa-money-bill"></i>
            <span className="menu-title">Inventory</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/vendors/all-suppliers">
            <i className="fas fa-store"></i>
            <span className="menu-title">Suppliers</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/customers/all-customers">
            <i className="fas fa-users"></i>
            <span className="menu-title">Customers</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/employee/profile">
            <i className="fas fa-user-tie"></i>
            <span className="menu-title">Employees</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports/sales-summary">
            <i className="fas fa-file-invoice"></i>
            <span className="menu-title">Reports</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/loyalty/all">
            <i className="fas fa-hands"></i>
            <span className="menu-title">Loyalty</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/eod/end-of-day">
            <i className="fas fa-exchange-alt"></i>
            <span className="menu-title">EOD</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/booking/table-booking">
            <i className="fas fa-exchange-alt"></i>
            <span className="menu-title">Booking</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sync">
            <i className="fas fa-exchange-alt"></i>
            <span className="menu-title">sync</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/integration">
            <i className="fab fa-mixer"></i>
            <span className="menu-title">Integration</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/giftcards/add-card">
            <i className="fas fa-gift"></i>
            <span className="menu-title">Gift Cards</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings/general">
            <i className="fas fa-cog"></i>
            <span className="menu-title">Settings</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/superadmin/franchise">
            <i className="fas fa-user-tie"></i>
            <span className="menu-title">SuperAdmin</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
