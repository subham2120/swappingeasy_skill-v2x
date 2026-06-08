import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Notifications.css";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api.get(`/notifications/${userId}`)
      .then(res => setNotifications(res.data))
      .catch(console.error);
  }, [userId]);

  return (
    <div className="notifications-container">

      <h2 className="notifications-title">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (

        <p className="empty-notification">
          No notifications
        </p>

      ) : (

        notifications.map(n => (

          <div
            key={n.id}
            className="notification-card"
          >
            <div className="notification-type">
              {n.type}
            </div>

            <p className="notification-message">
              {n.message}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default Notifications;