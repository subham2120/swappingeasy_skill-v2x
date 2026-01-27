import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import exchangeImg from "../assets/exchange.png";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = () => {
    api.post("/auth/login", form)
      .then(res => {
        localStorage.setItem("userId", res.data.userId || res.data.id);
        localStorage.setItem("username", res.data.name);
        navigate("/");
      })
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div style={pageStyle}>

      {/* TOP HEADING */}
      <div style={headerStyle}>
        <h1>Swapingeasy</h1>
        <p>Exchange Skills. Share Talent. Grow Together.</p>
      </div>

      {/* MAIN CONTENT */}
      <div style={contentStyle}>

        {/* LEFT IMAGE */}
        <div style={leftStyle}>
          <img
            src={exchangeImg}
            alt="Skill Exchange"
            style={{
              width: "100%",
              maxWidth: "420px"
            }}
          />
        </div>

        {/* RIGHT LOGIN CARD */}
        <div style={rightStyle}>
          <div style={cardStyle}>
            <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
              Welcome Back 👋
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />

            <button onClick={submit} style={buttonStyle}>
              Login
            </button>

            <p style={{ textAlign: "center", marginTop: "18px" }}>
              New user?{" "}
              <Link to="/register" style={{ color: "#3897f0", fontWeight: "bold" }}>
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#3897f0",
  padding: "40px 60px"
};

const headerStyle = {
  textAlign: "center",
  color: "white",
  marginBottom: "40px"
};

const contentStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  gap: "40px"
};

const leftStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const cardStyle = {
  width: "100%",
  maxWidth: "360px",
  padding: "35px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#3897f0",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold"
};

export default Login;
