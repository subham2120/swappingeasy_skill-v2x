import React, { useState } from "react";

function EditProfileModal({ profile, onClose, onSave }) {
  const [bio, setBio] = useState(profile.bio || "");
  const [experience, setExperience] = useState(profile.experience || "");

  const handleSave = () => {
    // 🔥 backend baad me
    onSave({
      bio,
      experience
    });
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginBottom: "20px" }}>Edit Profile</h2>

        {/* Username (readonly) */}
        <div style={field}>
          <label>Username</label>
          <input value={profile.username} disabled style={inputDisabled} />
        </div>

        {/* Bio */}
        <div style={field}>
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell something about yourself"
            style={textarea}
          />
        </div>

        {/* Experience */}
        <div style={field}>
          <label>Experience</label>
          <input
            value={experience}
            onChange={e => setExperience(e.target.value)}
            placeholder="e.g. 2 years in Java"
            style={input}
          />
        </div>

        {/* Buttons */}
        <div style={actions}>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} style={saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  width: "420px",
  background: "#fff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const inputDisabled = {
  ...input,
  background: "#f0f0f0"
};

const textarea = {
  ...input,
  minHeight: "80px",
  resize: "none"
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px"
};

const cancelBtn = {
  padding: "8px 14px",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "6px",
  cursor: "pointer"
};

const saveBtn = {
  padding: "8px 16px",
  background: "#3897f0",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default EditProfileModal;
