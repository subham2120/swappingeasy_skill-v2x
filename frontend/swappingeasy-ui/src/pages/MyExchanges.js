import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/MyExchanges.css";

function MyExchanges() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [activeTab, setActiveTab] = useState("SENT");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    api
      .get(`/exchange/requester/${userId}`)
      .then((res) => setSent(res.data))
      .catch(() => setSent([]));

    api
      .get(`/exchange/owner/${userId}`)
      .then((res) => setReceived(res.data))
      .catch(() => setReceived([]));
  }, [userId]);

  const acceptExchange = async (id) => {
    await api.put(`/exchange/accept/${id}`);
    setReceived((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "ACCEPTED" } : e
      )
    );
  };

  const rejectExchange = async (id) => {
    await api.put(`/exchange/reject/${id}`);
    setReceived((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "REJECTED" } : e
      )
    );
  };

  const deleteExchange = async (id) => {
    await api.delete(`/exchange/delete/${id}`);
    setSent((prev) => prev.filter((e) => e.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status pending";
      case "ACCEPTED":
        return "status accepted";
      default:
        return "status rejected";
    }
  };

  const getBadgeClass = (e) => {
    return e.requestedSkillTitle
      ? "type-badge skill-badge"
      : "type-badge product-badge";
  };

  if (!userId) {
    return <h3 className="login-message">Please login</h3>;
  }

  return (
    <div className="my-exchanges-container">

      <div className="tabs-container">
        <button
          onClick={() => setActiveTab("SENT")}
          className={`tab-btn ${
            activeTab === "SENT" ? "active" : "inactive"
          }`}
        >
          Sent
        </button>

        <button
          onClick={() => setActiveTab("RECEIVED")}
          className={`tab-btn ${
            activeTab === "RECEIVED" ? "active" : "inactive"
          }`}
        >
          Received
        </button>
      </div>

      <div className="exchange-grid">
        {activeTab === "SENT" &&
          sent.map((e) => (
            <div key={e.id} className="exchange-card">
              <p>
                <b>Requested:</b>{" "}
                {e.requestedSkillTitle ||
                  e.requestedProductTitle}

                <span className={getBadgeClass(e)}>
                  {e.requestedSkillTitle
                    ? "SKILL"
                    : "PRODUCT"}
                </span>
              </p>

              <p>
                <b>To:</b> {e.ownerName}
              </p>

              <span className={getStatusClass(e.status)}>
                {e.status}
              </span>

              {e.status === "ACCEPTED" && (
                <button
                  className="chat-btn"
                  onClick={() =>
                    navigate(
                      `/messages?userId=${e.ownerId}&name=${e.ownerName}`
                    )
                  }
                >
                  💬 Chat
                </button>
              )}

              {e.status === "PENDING" && (
                <button
                  className="delete-btn"
                  onClick={() => deleteExchange(e.id)}
                >
                  ❌ Delete
                </button>
              )}
            </div>
          ))}

        {activeTab === "RECEIVED" &&
          received.map((e) => (
            <div key={e.id} className="exchange-card">
              <p>
                <b>Your Item:</b>{" "}
                {e.requestedSkillTitle ||
                  e.requestedProductTitle}

                <span className={getBadgeClass(e)}>
                  {e.requestedSkillTitle
                    ? "SKILL"
                    : "PRODUCT"}
                </span>
              </p>

              <p>
                <b>From:</b> {e.requesterName}
              </p>

              <p>
                <b>Offered:</b>{" "}
                {e.offeredSkillTitle ||
                  e.offeredProductTitle}
              </p>

              <span className={getStatusClass(e.status)}>
                {e.status}
              </span>

              {e.status === "PENDING" && (
                <div className="action-buttons">
                  <button
                    className="accept-btn"
                    onClick={() => acceptExchange(e.id)}
                  >
                    Accept
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => rejectExchange(e.id)}
                  >
                    Reject
                  </button>
                </div>
              )}

              {e.status === "ACCEPTED" && (
                <button
                  className="chat-btn"
                  onClick={() =>
                    navigate(
                      `/messages?userId=${e.requesterId}&name=${e.requesterName}`
                    )
                  }
                >
                  💬 Chat
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyExchanges;