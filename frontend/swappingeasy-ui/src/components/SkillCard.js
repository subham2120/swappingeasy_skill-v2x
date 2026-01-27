import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SkillCard({ skill, hideUser = false, grid = false }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [showSelect, setShowSelect] = useState(false);
  const [mySkills, setMySkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= GO TO PROFILE ================= */
  const goToProfile = () => {
    if (skill.userId) {
      navigate(`/profile/${skill.userId}`);
    }
  };

  /* ================= LOAD MY SKILLS ================= */
  const loadMySkills = async () => {
    const res = await api.get(`/skills/user/${userId}`);
    return res.data;
  };

  /* ================= CLICK REQUEST EXCHANGE ================= */
  const requestExchange = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (Number(userId) === Number(skill.userId)) {
      alert("You cannot request your own skill");
      return;
    }

    try {
      setLoading(true);
      const skills = await loadMySkills();
      setMySkills(skills);
      setShowSelect(true);
    } catch (e) {
      alert("Failed to load your skills");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUBMIT EXCHANGE ================= */
  const submitExchange = async () => {
    if (!selectedSkill) {
      alert("Please select a skill to offer");
      return;
    }

    const exchangeRequest = {
      requesterId: userId,
      ownerId: skill.userId,
      requestedSkillId: skill.id,
      offeredSkillId: selectedSkill,
      message: "Interested in skill exchange"
    };

    try {
      await api.post("/exchange/request", exchangeRequest);
      alert("Exchange request sent successfully");
      setShowSelect(false);
      setSelectedSkill("");
    } catch (e) {
      alert("Failed to send exchange request");
    }
  };

  /* ================= LOGOUT SAFETY ================= */
  useEffect(() => {
    if (!userId) {
      setShowSelect(false);
      setMySkills([]);
      setSelectedSkill("");
    }
  }, [userId]);

  return (
    <div
      style={{
        width: grid ? "100%" : "420px",
        margin: grid ? "0" : "14px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}
    >
      {/* ================= USER HEADER ================= */}
      {!hideUser && (
        <div
          onClick={goToProfile}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            cursor: "pointer"
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#3897f0",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              marginRight: "10px",
              fontSize: "14px"
            }}
          >
            {skill.username
              ? skill.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <b style={{ color: "#3897f0", fontSize: "14px" }}>
            {skill.username || "Unknown User"}
          </b>
        </div>
      )}

      {/* ================= IMAGE ================= */}
      {skill.imageUrl && (
        <img
          src={`http://localhost:8080/images/${skill.imageUrl}`}
          alt="skill"
          style={{
            width: "100%",
            height: grid ? "160px" : "190px",
            objectFit: "cover"
          }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <div style={{ padding: "14px" }}>
        <h3 style={{ marginBottom: "6px", fontSize: "18px" }}>
          {skill.title}
        </h3>

        <p
          style={{
            color: "#555",
            fontSize: "14px",
            marginBottom: "12px"
          }}
        >
          {skill.description}
        </p>

        {/* REQUEST BUTTON */}
        <button
          onClick={requestExchange}
          disabled={loading || showSelect}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: showSelect ? "#ccc" : "#3897f0",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: showSelect ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          🔁 Request Exchange
        </button>

        {/* ================= SELECT OFFERED SKILL ================= */}
        {showSelect && (
          <div style={{ marginTop: "10px" }}>
            <select
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px"
              }}
            >
              <option value="">Select your skill to offer</option>
              {mySkills.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>

            <button
              onClick={submitExchange}
              style={{
                marginTop: "8px",
                width: "100%",
                padding: "8px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              ✅ Confirm Exchange
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
