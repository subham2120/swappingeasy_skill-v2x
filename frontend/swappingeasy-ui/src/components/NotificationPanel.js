import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/NotificationPanel.css";

function NotificationPanel() {

  const [notifications, setNotifications] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    if (!userId) return;

    api.get(`/notifications/${userId}`)
      .then(res => setNotifications(res.data.slice(0, 5)))
      .catch(console.error);

  }, [userId]);

  return (
    <div className="notification-panel">

      <h4>🔔 Notifications</h4>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map(n => (
          <div
            key={n.id}
            className="notification-item"
          >
            {n.message}
          </div>
        ))
      )}

    </div>
  );
}

export default NotificationPanel;