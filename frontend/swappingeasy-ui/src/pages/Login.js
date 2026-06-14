import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

import {
  FaHandshake,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = () => {
    api
      .post("/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userId",
          res.data.userId || res.data.id
        );
        localStorage.setItem(
          "username",
          res.data.name
        );

        navigate("/");
      })
      .catch(() =>
        alert("Invalid email or password")
      );
  };

  return (
    <div className="login-page">

      <div className="login-content">

        {/* LEFT SIDE */}
        <div className="login-left">



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
        <div className="login-right">

          <div className="login-card">

            <h1 className="login-title">
              Welcome Back 👋
            </h1>

            <p className="login-subtitle">
              Login to continue to SwappingEasy
            </p>

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
              className="login-input"
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
              className="login-input"
            />

            <button
              onClick={submit}
              className="login-btn"
            >
              Login
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="google-btn">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                width="18"
              />
              Continue with Google
            </button>

            <p className="register-text">
              New user?{" "}
              <Link
                to="/register"
                className="register-link"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;