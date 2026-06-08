import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import MyExchanges from "./pages/MyExchanges";
import AddSkill from "./pages/AddSkill";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import RightSidebar from "./components/RightSidebar";
import Messages from "./pages/Messages";
import DashboardV2 from "./pages/DashboardV2";
import Notifications from "./pages/Notifications";

function App() {
  const userId = localStorage.getItem("userId"); // ✅ ADD THIS

  return (
    <BrowserRouter>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 60px)",
          background: "#fafafa"
        }}
      >
        {/* MAIN CONTENT */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route path="/add-skill" element={<AddSkill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/dashboard" element={<DashboardV2 />} />
            <Route path="/notifications"element={<Notifications />} />
          </Routes>
        </div>



        {/* ✅ RIGHT SIDEBAR – ONLY WHEN LOGGED IN */}
        {userId && <RightSidebar />}
      </div>
    </BrowserRouter>
  );
}

export default App;
