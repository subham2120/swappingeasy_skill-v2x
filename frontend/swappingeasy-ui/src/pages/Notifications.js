import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Notifications.css";
import { useNavigate } from "react-router-dom";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {

    if(notification.type === "MESSAGE"){
       navigate("/messages");
    }

    else if (
              notification.type === "EXCHANGE" ||
              notification.type === "EXCHANGE_REQUEST"){
       navigate("/my-exchanges");
    }

    else if(notification.type === "SKILL"){
       navigate("/");
    }

  };

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
             onClick={() => handleNotificationClick(n)}
          >
            <div className="notification-type">
              {n.type}
            </div>

            <p className="notification-message">
              {n.message}
            </p>

            <div className="notification-time">
              {n.createdAt &&
                new Date(n.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
            </div>
          </div>

        ))

      )}

    </div>
  );
}

export default Notifications;