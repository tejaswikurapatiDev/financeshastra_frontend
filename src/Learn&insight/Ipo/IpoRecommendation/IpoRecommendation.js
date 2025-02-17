import React from "react";
import "./IpoRecommendation.css"; // Updated CSS file name
import { useNavigate } from "react-router-dom";

const IpoRecommendation = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/ipoDetailsubscribe"); // Navigate to "ipoDetailsubscribe"
  };
  return (
    <div className="iporecommendation-container">
      <h2 className="iporecommendation-title">Recommendations</h2>
      <div className="iporecommendation-box">
        <div className="iporecommendation-overlay">
          <div className="iporecommendation-lock-icon"
           onClick={handleNavigate} >
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/117/333/original/padlock-icon-with-glowing-neon-effect-security-lock-sign-secure-protection-symbol-png.png" // Replace with your lock icon URL
              alt="Lock Icon"
            />
          </div>
        </div>
        <div className="iporecommendation-content">
          Somethan Textiles Ltd. is a prominent player in India’s textile industry, 
          recognized for its robust operational capabilities and an expansive product 
          portfolio catering to both domestic and international markets. While the 
          company exhibits strong financial fundamentals and a steady growth trajectory, 
          its currently high Price-to-Earnings (PE) ratio may point to overvaluation, 
          potentially targeting near-term downside risks...
    
        </div>
        <button className="avoidipo">Avoid</button>
        <button className="applyipo">Apply</button>
      </div>
    </div>
  );
};

export default IpoRecommendation;