import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

import {
  FaHandshake,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = () => {
    api.post("/auth/register", form)
      .then(() => {
        alert("Registration successful. Please login.");
        navigate("/login");
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="register-page">

      <div className="register-content">

        {/* LEFT SIDE */}
        <div className="register-left">

          <div className="feature-list">

            <div className="feature-item">
              <div className="feature-icon">
                <FaHandshake />
              </div>

              <span>
                Exchange <b>Skills.</b>
              </span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaUsers />
              </div>

              <span>
                Share <b>Talent.</b>
              </span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaChartLine />
              </div>

              <span>
                Grow <b>Together.</b>
              </span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>

              <span>
                Real <b>Connections.</b>
              </span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaBolt />
              </div>

              <span>
                Instant <b>Messaging.</b>
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">

          <div className="register-card">

            <h2 className="register-title">
              Create Account ✨
            </h2>

            <p className="register-subtitle">
              Join SwappingEasy Community
            </p>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              className="register-input"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              className="register-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
              className="register-input"
            />

            <button
              onClick={submit}
              className="register-btn"
            >
              Register
            </button>

            <p className="login-text">
              Already have an account?{" "}
              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;