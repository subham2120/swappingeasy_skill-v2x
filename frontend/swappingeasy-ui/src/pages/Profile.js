import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import SkillCard from "../components/SkillCard";
import "../styles/Profile.css";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUsername = localStorage.getItem("username");

  const profileUserId = userId ? userId : loggedInUserId;
  const isOwnProfile = !userId || userId === loggedInUserId;

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [products, setProducts] = useState([]);
  const [connections, setConnections] = useState(0);

  const [showEdit, setShowEdit] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");

  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get(`/users/${profileUserId}/public-profile`)
      .then(res => {
        setProfile(res.data);
        setSkills(res.data.skills || []);
      });

    api.get(`/products/user/${profileUserId}`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));

    api.get(`/exchange/connections/${profileUserId}`)
      .then(res => setConnections(res.data))
      .catch(() => setConnections(0));
  }, [profileUserId]);

  if (!profile) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="profile-container">

      <input
        type="file"
        accept="image/*"
        id="profileImageInput"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          try {
            setUploading(true);
            const res = await api.post(
              `/users/${profileUserId}/profile-image`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            setProfile(prev => ({ ...prev, profileImage: res.data }));
          } catch {
            alert("Image upload failed");
          } finally {
            setUploading(false);
            setShowAvatarMenu(false);
          }
        }}
      />

      <div className="ig-header">
        <div
          className="ig-avatar"
          onClick={() => isOwnProfile && setShowAvatarMenu(!showAvatarMenu)}
        >
          {profile.profileImage ? (
            <img src={profile.profileImage} alt="profile" className="ig-avatar-img" />
          ) : (
            <span>{uploading ? "..." : profile.username?.charAt(0).toUpperCase()}</span>
          )}

          {showAvatarMenu && isOwnProfile && (
            <div className="avatar-menu">
              <div
                className="avatar-menu-item"
                onClick={() =>
                  document.getElementById("profileImageInput").click()
                }
              >
                Change Profile Photo
              </div>

              <div
                className="avatar-menu-item cancel"
                onClick={() => setShowAvatarMenu(false)}
              >
                Cancel
              </div>
            </div>
          )}
        </div>

        <div className="profile-info">
          <div className="ig-top-row">
            <h2>
              {isOwnProfile ? loggedInUsername : profile.username}
            </h2>

            {isOwnProfile && (
              <button
                className="ig-btn"
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
                className="ig-btn message-btn"
                onClick={() =>
                  navigate(`/messages?userId=${profileUserId}&name=${profile.username}`)
                }
              >
                Message
              </button>
            )}
          </div>

          <div className="ig-stats">
            <span><b>{skills.length}</b> skills</span>
            <span><b>{products.length}</b> products</span>
            <span><b>{connections}</b> connections</span>
            <span><b>{profile.exchangeCount || 0}</b> exchanges</span>
          </div>

          <div className="profile-bio">
            <b>{profile.username}</b>
            <p>{profile.bio?.trim() || "Learn • Share • Grow"}</p>
          </div>
        </div>
      </div>

      <hr />

      <h3>Skills</h3>
      <div className="skills-grid">
        {skills.map(skill => (
          <SkillCard key={`skill-${skill.id}`} skill={skill} hideUser grid />
        ))}
      </div>

      <h3 className="products-title">Products</h3>
      <div className="skills-grid">
        {products.map(product => (
          <SkillCard
            key={`product-${product.id}`}
            skill={product}
            type="PRODUCT"
            hideUser
            grid
          />
        ))}
      </div>

      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Profile</h2>

            <input
              value={editUsername}
              disabled
              className="input-style"
            />

            <textarea
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              placeholder="Bio"
              rows={3}
              className="input-style"
            />

            <div className="modal-actions">
              <button
                className="btn-style"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>

              <button
                className="btn-style save-btn"
                onClick={async () => {
                  await api.put(`/users/${profileUserId}/profile`, {
                    bio: editBio
                  });
                  setProfile(prev => ({ ...prev, bio: editBio }));
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

export default Profile;