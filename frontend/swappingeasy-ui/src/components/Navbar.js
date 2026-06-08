import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
const navigate = useNavigate();
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");
const [showMenu, setShowMenu] = useState(false);

return (
<>
<div className="navbar-container">

 <div
  className="mobile-menu-btn"
  onClick={() => setShowMenu(!showMenu)}>
  <FaBars />
</div>

  <h2
    className="navbar-logo"
    onClick={() => navigate("/")}
  >
    SwappingEasy
  </h2>

  {userId && (

    <input
      type="text"
      placeholder="Search skills or users"
      className="navbar-search"
    />
  )}


  <div className="navbar-right">

    {userId && (
      <div className="user-box">

        <div className="avatar">
          {username?.charAt(0).toUpperCase()}
        </div>

        <span className="username">
          {username}
        </span>

      </div>
    )}

    {!userId && (
      <>
        <Link className="nav-link-custom" to="/login">
          Login
        </Link>

        <Link className="nav-link-custom" to="/register">
          Register
        </Link>
      </>
    )}

  </div>
</div>

  {showMenu && (
    <div className="mobile-menu">

      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/add-skill">Add Skill</Link>
      <Link to="/add-product">Add Product</Link>
      <Link to="/my-exchanges">My Exchanges</Link>
      <Link to="/dashboard-v2">Dashboard</Link>
      <Link to="/notifications">Notifications</Link>

    </div>
  )}

</>
);
}

export default Navbar;
