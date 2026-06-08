import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    api.get(`/dashboard/${userId}`)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!data) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  const chartData = [
    { name: "Skills", value: data.totalSkills },
    { name: "Products", value: data.totalProducts },
    { name: "Pending", value: data.pendingExchanges },
    { name: "Completed", value: data.completedExchanges },
    { name: "Messages", value: data.totalMessages }
  ];

  const pieData = [
    { name: "Pending", value: data.pendingExchanges },
    { name: "Completed", value: data.completedExchanges }
  ];

  const COLORS = ["#ffc107", "#198754"];

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">
        📊 Dashboard
      </h2>

      <div className="dashboard-grid">
       <div className="dashboard-card skills-card">
          <h3>📚 Skills</h3>
          <p>{data.totalSkills}</p>
        </div>

        <div className="dashboard-card products-card">
          <h3>📦 Products</h3>
          <p>{data.totalProducts}</p>
        </div>

        <div className="dashboard-card pending-card">
          <h3>🔄 Pending</h3>
          <p>{data.pendingExchanges}</p>
        </div>

        <div className="dashboard-card completed-card">
          <h3>✅ Completed</h3>
          <p>{data.completedExchanges}</p>
        </div>

        <div className="dashboard-card messages-card">
          <h3>💬 Messages</h3>
          <p>{data.totalMessages}</p>
        </div>

        <div className="dashboard-card rating-card">
          <h3>⭐ Rating</h3>
          <p>{data.averageRating}</p>
        </div>

        </div>

        <div className="chart-section">

          <div className="chart-card">
            <h3>📊 Activity Analytics</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#0d6efd"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>🥧 Exchange Status</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
      </div>

    </div>
  );
}

export default Dashboard;