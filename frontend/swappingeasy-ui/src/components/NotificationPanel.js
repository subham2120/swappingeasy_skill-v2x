import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/NotificationPanel.css";

function NotificationPanel() {

  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {

    if (!userId) return;

    api.get(`/notifications/${userId}`)
      .then(res => setNotifications(res.data.slice(0, 5)))
      .catch(console.error);

  }, [userId]);

  const handleClick = (n) => {

    if (n.type?.includes("EXCHANGE")) {
      navigate("/my-exchanges");
    }

    else if (n.type === "MESSAGE") {
      navigate("/messages");
    }
  };

  return (
   <div className="notification-panel">

     <h4>🔔 Notifications</h4>

     <div className="notification-list">

       {notifications.length === 0 ? (
         <p>No notifications</p>
       ) : (
         notifications.map(n => (
           <div
             key={n.id}
             className="notification-item"
           >
             <div className="notification-message">
               {n.message}
             </div>

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

   </div>

  );
}

export default NotificationPanel;