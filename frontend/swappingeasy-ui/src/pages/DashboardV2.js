import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/DashboardV2.css";

function DashboardV2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    api.get(`/dashboard/${userId}`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <h2>Loading...</h2>;



  return (
    <div className="dashboard-v2">

      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>
          Welcome back, {localStorage.getItem("username")} 👋
        </p>
      </div>

      <div className="stats-grid">

        <div className="stat-card blue">
          <h4>Skills</h4>
          <h2>{data.totalSkills}</h2>
        </div>

        <div className="stat-card orange">
          <h4>Products</h4>
          <h2>{data.totalProducts}</h2>
        </div>

        <div className="stat-card yellow">
          <h4>Pending</h4>
          <h2>{data.pendingExchanges}</h2>
        </div>

        <div className="stat-card green">
          <h4>Completed</h4>
          <h2>{data.completedExchanges}</h2>
        </div>

         <div className="stat-card purple">
            <h4>Messages</h4>
            <h2>{data.totalMessages}</h2>
          </div>

          <div className="stat-card gold">
            <div>
              <h4>Rating</h4>
              <small>User Feedback</small>
            </div>

            <h2>
              ⭐ {data.averageRating.toFixed(1)}
            </h2>
          </div>
</div>

        <div className="dashboard-sections">

          <div className="section-card">

            <h3>📌 Recent Activity</h3>

            <div className="activity-item">
              <span>🟢 Skill Added</span>
              <small>Recently</small>
            </div>

            <div className="activity-item">
              <span>🟡 Exchange Requested</span>
              <small>Recently</small>
            </div>

            <div className="activity-item">
              <span>🔵 Message Received</span>
              <small>Recently</small>
            </div>

            <div className="activity-item">
              <span>🟢 Exchange Completed</span>
              <small>Recently</small>
            </div>

          </div>

          <div className="section-card">

            <h3>📊 Progress Overview</h3>

            <div className="progress-row">

              <div className="progress-header">
                <span>Completed Exchanges--></span>
                <span>{data.completedExchanges}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill completed"
                  style={{
                    width: `${
                      (data.completedExchanges /
                      (data.completedExchanges +
                       data.pendingExchanges || 1)) * 100
                    }%`
                  }}
                />
              </div>

            </div>

            <div className="progress-row">

              <div className="progress-header">
                <span>Pending Exchanges--></span>
                <span>{data.pendingExchanges}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill pending"
                  style={{
                    width: `${
                      (data.pendingExchanges /
                      (data.completedExchanges +
                       data.pendingExchanges || 1)) * 100
                    }%`
                  }}
                />
              </div>

            </div>

            <div className="progress-row">

              <div className="progress-header">
                <span>Messages--></span>
                <span>{data.totalMessages}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill messages"
                  style={{ width: "70%" }}
                />
              </div>

            </div>

          </div>



      </div>
    </div>
  );
}

export default DashboardV2;