import React from "react";
import "./LandingdarkPageSmartSIP.css";
import { useNavigate } from "react-router-dom";

const LandingdarkPageSmartSIP = () => {
    const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      title: "What is it?",
      description:
        "A systematic stock investment plan for disciplined, goal-based equity growth.",
    },
    {
      id: 2,
      title: "Key Features",
      description:
        "Personalized portfolios, auto-scheduled investments, dynamic rebalancing, AI-driven insights.",
    },
    {
      id: 3,
      title: "Benefits",
      description:
        "Risk reduction, wealth compounding, and flexible options.",
    },
    {
      id: 4,
      title: "Ideal For",
      description:
        "Beginners, seasoned investors, and goal-focused individuals.",
    },
  ];

  return (
    <div className="landingpagesmartsipdarkcontainer">
      <h2 className="landingpagesmartsip-darktitle">Stocks SmartSIP Overview</h2>
      <div className="landingpagesmartsip-cards">
        {cards.map((card) => (
          <div key={card.id} className="landingpagesmartsipdarkcard">
            <h3 className="landingpagesmartsip-card-title">{card.title}</h3>
            <p className="landingpagesmartsip-carddarkdescription">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <button
        className="landingpagesmartsip-button"
        onClick={() => navigate("/stocksSmartSIPPSdark")}
      >
        Learn more
      </button>
    </div>
  );
};

export default LandingdarkPageSmartSIP;
