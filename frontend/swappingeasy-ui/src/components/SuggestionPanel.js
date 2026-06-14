import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/SuggestionPanel.css";
import { useNavigate } from "react-router-dom";

function SuggestionPanel() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
     const loggedInUserId =
        Number(localStorage.getItem("userId"));
    api.get("/users")
      .then(res =>
          setUsers(
            res.data
              .filter(user => user.id !== loggedInUserId)
              .slice(0, 5)))
      .catch(console.error);

  }, []);

  return (
    <div className="suggestion-panel">

      <h4>Suggested for you</h4>

      {users.map(user => (

      <div
        key={user.id}
        className="suggestion-item"
        onClick={() => navigate(`/profile/${user.id}`)}
      >

        <div className="suggestion-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className="suggestion-info">
          <b>{user.name}</b>
        </div>

        </div>

      ))}

    </div>
  );
}

export default SuggestionPanel;