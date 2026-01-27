import React, { useEffect, useState } from "react";
import api from "../services/api";
import SkillCard from "../components/SkillCard";

function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/skills")
      .then(res => setSkills(res.data))
      .catch(() => setSkills([]));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Skill Feed
      </h2>

      {skills.length === 0 && (
        <p style={{ textAlign: "center" }}>No skills available</p>
      )}

      <div className="skill-grid">
        {skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            grid={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
