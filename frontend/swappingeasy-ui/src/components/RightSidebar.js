import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RightSidebar.css";
import {
  FaHome,
  FaUser,
  FaComments,
  FaPlusCircle,
  FaBox,
  FaExchangeAlt,
  FaChartBar,
  FaBell,
  FaSignOutAlt
} from "react-icons/fa";

function RightSidebar() {
const navigate = useNavigate();
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");



const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");

  navigate("/");
  window.location.reload();
};

const protectedNavigate = (path) => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  navigate(path);
};

const Item = ({ icon, label, path, onClick }) => (
  <div
    className="sidebar-item"
    onClick={onClick ? onClick : () => navigate(path)}
  >
    <span className="sidebar-icon">
      {icon}
    </span>

    <span>
      {label}
    </span>
  </div>
);

return ( <div className="sidebar">
  <div className="user-panel">

    <div className="sidebar-avatar">
      {username?.charAt(0).toUpperCase()}
    </div>

    <h5>{username}</h5>

  </div>


 <Item icon={<FaHome />} label="Home" path="/" />
<Item
  icon={<FaUser />}
  label="Profile"
  onClick={() => protectedNavigate("/profile")}
/>

<Item
  icon={<FaComments />}
  label="Messages"
  onClick={() => protectedNavigate("/messages")}
/>



<Item
  icon={<FaPlusCircle />}
  label="Add Skill"
  onClick={() => protectedNavigate("/add-skill")}
/>

<Item
  icon={<FaBox />}
  label="Add Product"
  onClick={() => protectedNavigate("/add-product")}
/>

<Item
  icon={<FaExchangeAlt />}
  label="My Exchanges"
  onClick={() => protectedNavigate("/my-exchanges")}
/>

<Item icon={<FaChartBar />} label="Dashboard" path="/dashboard" />
<Item icon={<FaBell />} label="Notifications" path="/notifications" />

{userId && (
  <Item
    icon={<FaSignOutAlt />}
    label="Logout"
    onClick={logout}
  />
)}

</div>

);
}

export default RightSidebar;
