import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  return (
    <div style={navStyle}>
      {/* LEFT - BRAND */}
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
        Swappingeasy
      </h2>

      {/* CENTER - SEARCH BAR */}
      {userId && (
        <input
          type="text"
          placeholder="Search skills or users"
          style={searchStyle}
        />
      )}

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* WHEN LOGGED IN */}
        {userId && (
          <div style={userBox}>
            <div style={avatar}>
              {username?.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </div>
        )}

        {/* WHEN NOT LOGGED IN */}
        {!userId && (
          <>
            <Link style={linkStyle} to="/login">Login</Link>
            <Link style={linkStyle} to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const navStyle = {
  height: "60px",
  backgroundColor: "#8390B3",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  color: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
};

const searchStyle = {
  width: "280px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  outline: "none"
};

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
  fontWeight: "500"
};

const userBox = {
  display: "flex",
  alignItems: "center"
};

const avatar = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "white",
  color: "#3897f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  marginRight: "8px"
};

export default Navbar;
