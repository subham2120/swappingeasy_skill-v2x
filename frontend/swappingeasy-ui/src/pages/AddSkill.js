import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/AddSkill.css";

function AddSkill() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [skill, setSkill] = useState({
    title: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

  }, [navigate]);

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
    <div className="add-skill-container">

      <div className="add-skill-card">

        <h2>Add New Skill</h2>

        <input
          className="skill-input"
          placeholder="Skill title (e.g. Java, Guitar, Cooking)"
          value={skill.title}
          onChange={e =>
            setSkill({
              ...skill,
              title: e.target.value
            })
          }
        />

        <textarea
          className="skill-textarea"
          placeholder="Describe your skill"
          value={skill.description}
          onChange={e =>
            setSkill({
              ...skill,
              description: e.target.value
            })
          }
        />

        <input
          className="skill-file"
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

      {image && (
         <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="image-preview"
         />
      )}


        <button
          className="add-skill-btn"
          onClick={submitSkill}
        >
          Add Skill
        </button>

      </div>

    </div>
  );
}

export default AddSkill;