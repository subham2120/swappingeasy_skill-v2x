import React, { useEffect, useState } from "react";
import api from "../services/api";
import SkillCard from "../components/SkillCard";
import "../styles/Home.css";
import NotificationPanel from "../components/NotificationPanel";

function Home() {
const [skills, setSkills] = useState([]);
const [products, setProducts] = useState([]);
const [activeTab, setActiveTab] = useState("ALL");

useEffect(() => {
api.get("/skills")
.then(res => setSkills(res.data))
.catch(() => setSkills([]));


api.get("/products")
  .then(res => setProducts(res.data))
  .catch(() => setProducts([]));


}, []);

const getMixedFeed = () => {
const skillItems = skills.map(s => ({ ...s, __type: "SKILL" }));
const productItems = products.map(p => ({ ...p, __type: "PRODUCT" }));


return [...skillItems, ...productItems];

};

return (
<div className="home-layout">
<div className="home-container">

<div className="feed-tabs">

  <span
    className={`feed-tab ${activeTab === "ALL" ? "active" : ""}`}
    onClick={() => setActiveTab("ALL")}
  >
    All
  </span>

  <span
    className={`feed-tab ${activeTab === "SKILL" ? "active" : ""}`}
    onClick={() => setActiveTab("SKILL")}
  >
    Skills
  </span>

  <span
    className={`feed-tab ${activeTab === "PRODUCT" ? "active" : ""}`}
    onClick={() => setActiveTab("PRODUCT")}
  >
    Products
  </span>

</div>

  {activeTab === "ALL" && (
    <div className="skill-grid">
      {getMixedFeed().length === 0 ? (
        <p className="empty-text">Nothing to show</p>
      ) : (
        getMixedFeed().map(item => (
          <SkillCard
            key={`${item.__type}-${item.id}`}
            skill={item}
            type={item.__type}
            grid={true}
          />
        ))
      )}
    </div>
  )}

  {activeTab === "SKILL" && (
    <div className="skill-grid">
      {skills.length === 0 ? (
        <p className="empty-text">No skills available</p>
      ) : (
        skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            grid={true}
          />
        ))
      )}
    </div>
  )}

  {activeTab === "PRODUCT" && (
    <div className="skill-grid">
      {products.length === 0 ? (
        <p className="empty-text">No products available</p>
      ) : (
        products.map(product => (
          <SkillCard
            key={product.id}
            skill={product}
            type="PRODUCT"
            grid={true}
          />
        ))
      )}
    </div>
  )}
    </div>
      <div className="notification-section">
        <NotificationPanel />
      </div>
</div>


);
}


export default Home;
