import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyExchanges() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [activeTab, setActiveTab] = useState("SENT");

  useEffect(() => {
    if (!userId) return;

    api.get(`/exchange/requester/${userId}`)
      .then(res => setSent(res.data))
      .catch(() => setSent([]));

    api.get(`/exchange/owner/${userId}`)
      .then(res => setReceived(res.data))
      .catch(() => setReceived([]));
  }, [userId]);

  const acceptExchange = async (id) => {
    await api.put(`/exchange/accept/${id}`);
    setReceived(prev =>
      prev.map(e => e.id === id ? { ...e, status: "ACCEPTED" } : e)
    );
  };

  const rejectExchange = async (id) => {
    await api.put(`/exchange/reject/${id}`);
    setReceived(prev =>
      prev.map(e => e.id === id ? { ...e, status: "REJECTED" } : e)
    );
  };

  const deleteExchange = async (id) => {
    await api.delete(`/exchange/delete/${id}`);
    setSent(prev => prev.filter(e => e.id !== id));
  };

  const statusStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "12px",
    color: "white",
    fontSize: "12px",
    backgroundColor:
      status === "PENDING" ? "#f39c12"
      : status === "ACCEPTED" ? "#27ae60"
      : "#e74c3c"
  });

  const typeBadge = (e) => ({
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "11px",
    marginLeft: "8px",
    color: "white",
    backgroundColor: e.requestedSkillTitle ? "#2980b9" : "#8e44ad"
  });

  if (!userId) return <h3 style={{ textAlign: "center" }}>Please login</h3>;

  return (
   <div
     style={{
       maxWidth: "1100px",
       marginTop: "30px",   // navbar height
       marginLeft: "250px", // 🔥 sidebar width (same as slider)
       padding: "30px"
     }}
   >

      <h2 style={{ textAlign: "center" }}>🔁 My Exchanges</h2>

      {/* TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", margin: "20px 0" }}>
        <button
          onClick={() => setActiveTab("SENT")}
          style={{ ...tabBtn, background: activeTab === "SENT" ? "#3897f0" : "#eee", color: activeTab === "SENT" ? "#fff" : "#333" }}
        >
          📤 Sent
        </button>
        <button
          onClick={() => setActiveTab("RECEIVED")}
          style={{ ...tabBtn, background: activeTab === "RECEIVED" ? "#3897f0" : "#eee", color: activeTab === "RECEIVED" ? "#fff" : "#333" }}
        >
          📥 Received
        </button>
      </div>

      {/* ===== GRID START ===== */}
      <div style={gridStyle}>
        {activeTab === "SENT" && sent.map(e => (
          <div key={e.id} style={cardStyle}>
            <p>
              <b>Requested:</b> {e.requestedSkillTitle || e.requestedProductTitle}
              <span style={typeBadge(e)}>
                {e.requestedSkillTitle ? "SKILL" : "PRODUCT"}
              </span>
            </p>

            <p><b>To:</b> {e.ownerName}</p>
            <span style={statusStyle(e.status)}>{e.status}</span>

            {e.status === "ACCEPTED" && (
              <button style={chatBtn} onClick={() => navigate(`/messages?name=${e.ownerName}`)}>
                💬 Chat
              </button>
            )}

            {e.status === "PENDING" && (
              <button style={deleteBtn} onClick={() => deleteExchange(e.id)}>
                ❌ Delete
              </button>
            )}
          </div>
        ))}

        {activeTab === "RECEIVED" && received.map(e => (
          <div key={e.id} style={cardStyle}>
            <p>
              <b>Your Item:</b> {e.requestedSkillTitle || e.requestedProductTitle}
              <span style={typeBadge(e)}>
                {e.requestedSkillTitle ? "SKILL" : "PRODUCT"}
              </span>
            </p>

            <p><b>From:</b> {e.requesterName}</p>
            <p><b>Offered:</b> {e.offeredSkillTitle || e.offeredProductTitle}</p>

            <span style={statusStyle(e.status)}>{e.status}</span>

            {e.status === "PENDING" && (
              <div style={{ marginTop: "10px" }}>
                <button style={acceptBtn} onClick={() => acceptExchange(e.id)}>Accept</button>
                <button style={rejectBtn} onClick={() => rejectExchange(e.id)}>Reject</button>
              </div>
            )}

            {e.status === "ACCEPTED" && (
              <button style={chatBtn} onClick={() => navigate(`/messages?name=${e.requesterName}`)}>
                💬 Chat
              </button>
            )}
          </div>
        ))}
      </div>
      {/* ===== GRID END ===== */}
    </div>
  );
}

/* ================= STYLES ================= */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 🔥 3 COLUMN
  gap: "20px",
  marginTop: "20px"
};

const tabBtn = {
  padding: "8px 18px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontWeight: "500"
};

const cardStyle = {
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
};

const acceptBtn = {
  marginRight: "10px",
  padding: "6px 12px",
  background: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const rejectBtn = {
  padding: "6px 12px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  background: "#c0392b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const chatBtn = {
  marginTop: "10px",
  padding: "6px 14px",
  background: "#3897f0",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default MyExchanges;
