import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddSkill() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [skill, setSkill] = useState({
    title: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  const submitSkill = () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", skill.title);
    formData.append("description", skill.description);
    formData.append("userId", userId);
    formData.append("image", image);

    api.post("/skills", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      alert("Skill added successfully");
      navigate("/");
    })
    .catch(() => alert("Failed to add skill"));
  };

  return (
    <div style={container}>
      <h2>Add New Skill</h2>

      <input
        placeholder="Skill title (e.g. Java, Guitar, Cooking)"
        value={skill.title}
        onChange={e => setSkill({ ...skill, title: e.target.value })}
        style={input}
      />

      <textarea
        placeholder="Describe your skill"
        value={skill.description}
        onChange={e => setSkill({ ...skill, description: e.target.value })}
        style={textarea}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        style={{ marginBottom: "15px" }}
      />

      <button onClick={submitSkill} style={button}>
        Add Skill
      </button>
    </div>
  );
}

/* STYLES */
const container = {
  maxWidth: "400px",
  margin: "60px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#3897f0",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AddSkill;
