import React from "react";
import { useNavigate } from "react-router-dom";

function RightSidebar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Agar login nahi hai → sidebar hi mat dikhao
  if (!userId) return null;

  const Item = ({ label, path, onClick }) => (
    <div
      onClick={onClick ? onClick : () => navigate(path)}
      style={{
        padding: "12px 10px",
        cursor: "pointer",
        borderRadius: "6px",
        marginBottom: "8px",
        fontWeight: "500"
      }}
      onMouseOver={e => e.currentTarget.style.background = "#f0f0f0"}
      onMouseOut={e => e.currentTarget.style.background = "transparent"}
    >
      {label}
    </div>
  );

  // 🔴 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "230px",
        borderLeft: "1px solid #ddd",
        background: "#fff",
        padding: "20px",
        height: "100vh",
        position: "sticky",
        top: 0
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>SwapingEasy</h2>

      {/* 🔹 MAIN NAV */}
      <Item label="🏠 Home" path="/" />
      <Item label="👤 Profile" path="/profile" />
      <Item label="💬 Messages" path="/messages" />

      <hr style={{ margin: "15px 0" }} />

      {/* 🔹 ACTIONS */}
      <Item label="➕ Add Skill" path="/add-skill" />
      <Item label="🔁 My Exchanges" path="/my-exchanges" />

      <hr style={{ margin: "15px 0" }} />

      {/* 🔹 EXTRA */}
      <Item label="📊 Dashboard" path="/dashboard" />
      <Item label="🔔 Notifications" path="/notifications" />

      <hr style={{ margin: "15px 0" }} />

      {/* 🔴 LOGOUT (ONLY HERE) */}
      <Item label="🚪 Logout" onClick={logout} />
    </div>
  );
}

export default RightSidebar;
