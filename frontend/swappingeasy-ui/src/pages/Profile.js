import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import SkillCard from "../components/SkillCard";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUsername = localStorage.getItem("username");

  const profileUserId = userId ? userId : loggedInUserId;
  const isOwnProfile = !userId || userId === loggedInUserId;

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [connections, setConnections] = useState(0);

  // 🔹 Edit profile state
  const [showEdit, setShowEdit] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");

  /* ================= LOAD PROFILE + CONNECTIONS ================= */
  useEffect(() => {
    // profile
    api.get(`/users/${profileUserId}/public-profile`)
      .then(res => {
        setProfile(res.data);
        setSkills(res.data.skills || []);
      });

    // connections count
    api.get(`/exchange/connections/${profileUserId}`)
      .then(res => setConnections(res.data))
      .catch(() => setConnections(0));
  }, [profileUserId]);

  if (!profile) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "950px", margin: "30px auto", padding: "0 20px" }}>

      {/* ================= PROFILE HEADER ================= */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>

        {/* Avatar */}
        <div
          style={avatarStyle}
          onClick={() => alert("Profile photo upload (frontend only)")}
        >
          {profile.username?.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={{ marginRight: "20px" }}>
              {isOwnProfile ? loggedInUsername : profile.username}
            </h2>

            {isOwnProfile && (
              <button
                style={btnStyle}
                onClick={() => {
                  setEditUsername(profile.username);
                  setEditBio(profile.bio || "");
                  setShowEdit(true);
                }}
              >
                Edit Profile
              </button>
            )}

            {!isOwnProfile && (
              <button
                onClick={() =>
                  navigate(`/messages?userId=${profileUserId}&name=${profile.username}`)
                }
                style={{
                  ...btnStyle,
                  background: "#3897f0",
                  color: "white",
                  border: "none",
                  marginLeft: "10px"
                }}
              >
                Message
              </button>
            )}
          </div>

          {/* 🔥 STATS */}
          <div style={statsContainer}>
            <StatCard icon="🛠️" value={skills.length} label="Skills" color="#3897f0" />
            <StatCard icon="🤝" value={connections} label="Connections" color="#ff9800" />
          </div>

          {/* Bio */}
          <div style={{ marginTop: "10px" }}>
            <b>{profile.username}</b>
            <p style={{ margin: "4px 0", color: "#555" }}>
              {profile.bio?.trim() || "Learn and Grow"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* ================= SKILLS GRID ================= */}
      <div style={skillsGrid}>
        {skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            hideUser={true}
            grid={true}
          />
        ))}
      </div>

      {skills.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#777" }}>
          No skills added yet
        </p>
      )}

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEdit && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Edit Profile</h2>

            <input
              value={editUsername}
              onChange={e => setEditUsername(e.target.value)}
              placeholder="Username"
              style={inputStyle}
            />

            <textarea
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              placeholder="Bio"
              rows={3}
              style={inputStyle}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button style={btnStyle} onClick={() => setShowEdit(false)}>
                Cancel
              </button>

              <button
                style={{
                  ...btnStyle,
                  background: "#3897f0",
                  color: "white",
                  border: "none"
                }}
                onClick={async () => {
                  await api.put(`/users/${profileUserId}/profile`, {
                    username: editUsername,
                    bio: editBio
                  });

                  setProfile({
                    ...profile,
                    username: editUsername,
                    bio: editBio
                  });

                  setShowEdit(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ icon, value, label, color }) => (
  <div style={{
    flex: 1,
    background: "#fff",
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderTop: `4px solid ${color}`
  }}>
    <div style={{ fontSize: "22px" }}>{icon}</div>
    <h3 style={{ margin: "6px 0" }}>{value}</h3>
    <span style={{ fontSize: "14px", color: "#777" }}>{label}</span>
  </div>
);

/* ================= STYLES ================= */

const avatarStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  backgroundColor: "#3897f0",
  color: "white",
  fontSize: "60px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "40px",
  cursor: "pointer"
};

const btnStyle = {
  padding: "6px 16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "500"
};

const statsContainer = {
  display: "flex",
  gap: "16px",
  marginBottom: "10px"
};

const skillsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "30px"
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "360px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

export default Profile;
