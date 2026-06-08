import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/SkillCard.css";

function SkillCard({
  skill,
  type = "SKILL",
  hideUser = false,
  grid = false,
}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const isSkill = type === "SKILL";

  const [showSelect, setShowSelect] = useState(false);
  const [myItems, setMyItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(false);

  const goToProfile = () => {
    if (skill.userId) {
      navigate(`/profile/${skill.userId}`);
    }
  };

  const loadMyItems = async () => {
    const url = isSkill
      ? `/skills/user/${userId}`
      : `/products/user/${userId}`;

    const res = await api.get(url);
    return res.data;
  };

  const requestExchange = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (Number(userId) === Number(skill.userId)) {
      alert("You cannot request your own item");
      return;
    }

    try {
      setLoading(true);

      const items = await loadMyItems();

      setMyItems(items);
      setShowSelect(true);
    } catch (e) {
      alert("Failed to load your items");
    } finally {
      setLoading(false);
    }
  };

  const submitExchange = async () => {
    if (!selectedItem) {
      alert(
        `Please select a ${isSkill ? "skill" : "product"} to offer`
      );
      return;
    }

    const exchangeRequest = {
      requesterId: userId,
      ownerId: skill.userId,
      message: "Interested in exchange",
    };

    if (isSkill) {
      exchangeRequest.requestedSkillId = skill.id;
      exchangeRequest.offeredSkillId = selectedItem;
    } else {
      exchangeRequest.requestedProductId = skill.id;
      exchangeRequest.offeredProductId = selectedItem;
    }

    try {
      await api.post("/exchange/request", exchangeRequest);

      alert("Exchange request sent successfully");

      setShowSelect(false);
      setSelectedItem("");
    } catch (e) {
      alert("Failed to send exchange request");
    }
  };

  useEffect(() => {
    if (!userId) {
      setShowSelect(false);
      setMyItems([]);
      setSelectedItem("");
    }
  }, [userId]);

  return (
    <div className={`skill-card ${grid ? "grid-card" : ""}`}>
      {/* USER HEADER */}
      {!hideUser && (
        <div
          onClick={goToProfile}
          className="skill-header"
        >
          <div className="skill-avatar">
            {skill.username
              ? skill.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <b className="skill-username">
            {skill.username || "Unknown User"}
          </b>
        </div>
      )}

      {/* IMAGE */}
      {skill.imageUrl && (
        <img
          src={`http://localhost:8080/images/${
            isSkill ? "skills" : "products"
          }/${skill.imageUrl}`}
          alt={skill.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `http://localhost:8080/images/${skill.imageUrl}`;
          }}
          className="skill-image"
        />
      )}

      {/* CONTENT */}
      <div className="skill-content">
        <h3 className="skill-title">
          {skill.title}
        </h3>

        <p className="skill-description">
          {skill.description}
        </p>

        {/* REQUEST BUTTON */}
        <button
          onClick={requestExchange}
          disabled={loading || showSelect}
          className="exchange-btn"
        >
          🔁 Request Exchange
        </button>

        {/* SELECT ITEM */}
        {showSelect && (
          <div className="exchange-container">
            <select
              value={selectedItem}
              onChange={(e) =>
                setSelectedItem(e.target.value)
              }
              className="exchange-select"
            >
              <option value="">
                Select your{" "}
                {isSkill ? "skill" : "product"} to offer
              </option>

              {myItems.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.title}
                </option>
              ))}
            </select>

            <button
              onClick={submitExchange}
              className="confirm-btn"
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