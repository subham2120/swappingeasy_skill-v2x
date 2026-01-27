import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyExchanges() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!userId) return;

    api.get(`/exchange/requester/${userId}`)
      .then(res => setSent(res.data))
      .catch(() => setSent([]));

    api.get(`/exchange/owner/${userId}`)
      .then(res => setReceived(res.data))
      .catch(() => setReceived([]));
  }, [userId]);

  /* ================= ACTIONS ================= */

  const acceptExchange = async (id) => {
    await api.put(`/exchange/accept/${id}`);
    setReceived(prev =>
      prev.map(e =>
        e.id === id ? { ...e, status: "ACCEPTED" } : e
      )
    );
  };

  const rejectExchange = async (id) => {
    await api.put(`/exchange/reject/${id}`);
    setReceived(prev =>
      prev.map(e =>
        e.id === id ? { ...e, status: "REJECTED" } : e
      )
    );
  };

  const deleteExchange = async (id) => {
    await api.delete(`/exchange/delete/${id}`);
    setSent(prev => prev.filter(e => e.id !== id));
  };

  /* ================= STATUS STYLE ================= */

  const statusStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "12px",
    color: "white",
    fontSize: "12px",
    display: "inline-block",
    backgroundColor:
      status === "PENDING"
        ? "#f39c12"
        : status === "ACCEPTED"
        ? "#27ae60"
        : "#e74c3c"
  });

  if (!userId) {
    return <h3 style={{ textAlign: "center" }}>Please login</h3>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "30px" }}>
      <h2>🔁 My Exchanges</h2>

      {/* ================= SENT ================= */}
      <h3 style={{ marginTop: "30px" }}>📤 Sent Requests</h3>
      {sent.length === 0 && <p>No sent requests</p>}

      {sent.map(e => (
        <div key={e.id} style={cardStyle}>
          <p><b>Requested Skill:</b> {e.requestedSkillTitle}</p>
          <p><b>To:</b> {e.ownerName}</p>

          <span style={statusStyle(e.status)}>{e.status}</span>

          {/* CHAT ONLY AFTER ACCEPT */}
          {e.status === "ACCEPTED" && (
            <div style={{ marginTop: "10px" }}>
              <button
                style={chatBtn}
                onClick={() =>
                  navigate(
                    `/messages?name=${encodeURIComponent(e.ownerName)}`
                  )
                }
              >
                💬 Chat
              </button>
            </div>
          )}

          {e.status === "PENDING" && (
            <div>
              <button onClick={() => deleteExchange(e.id)} style={deleteBtn}>
                ❌ Delete Request
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ================= RECEIVED ================= */}
      <h3 style={{ marginTop: "40px" }}>📥 Received Requests</h3>
      {received.length === 0 && <p>No received requests</p>}

      {received.map(e => (
        <div key={e.id} style={cardStyle}>
          <p><b>Your Skill:</b> {e.requestedSkillTitle}</p>
          <p><b>From:</b> {e.requesterName}</p>
          <p><b>Offered Skill:</b> {e.offeredSkillTitle}</p>

          <span style={statusStyle(e.status)}>{e.status}</span>

          {e.status === "PENDING" && (
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => acceptExchange(e.id)} style={acceptBtn}>
                Accept
              </button>
              <button onClick={() => rejectExchange(e.id)} style={rejectBtn}>
                Reject
              </button>
            </div>
          )}

          {/* CHAT ONLY AFTER ACCEPT */}
          {e.status === "ACCEPTED" && (
            <div style={{ marginTop: "10px" }}>
              <button
                style={chatBtn}
                onClick={() =>
                  navigate(
                    `/messages?name=${encodeURIComponent(e.requesterName)}`
                  )
                }
              >
                💬 Chat
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const acceptBtn = {
  padding: "6px 12px",
  backgroundColor: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px"
};

const rejectBtn = {
  padding: "6px 12px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#c0392b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const chatBtn = {
  padding: "6px 14px",
  backgroundColor: "#3897f0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default MyExchanges;
