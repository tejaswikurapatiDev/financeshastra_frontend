import React from "react";
import "./RiskoMutualDashboard.css";

const RiskoMeter = () => {
  return (
    <div className="circle-divider-container">
      <h3>Risk-o-meter</h3>
      <svg
        className="circle-divider"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="1" />

        {/* Labels positioned around the circle */}
        <text x="50" y="50" fill="red" fontSize="10" textAnchor="middle">
          Low
        </text>
        <text x="80" y="35" fill="#333" fontSize="4" textAnchor="middle">
          Low-Moderate
        </text>
        <text x="85" y="65" fill="#333" fontSize="4" textAnchor="middle">
          Moderate
        </text>
        <text x="70" y="85" fill="#333" fontSize="4" textAnchor="middle">
          Moderate-High
        </text>
        <text x="30" y="85" fill="#333" fontSize="4" textAnchor="middle">
          High
        </text>
        <text x="15" y="65" fill="#333" fontSize="4" textAnchor="middle">
          Very High
        </text>
      </svg>
    </div>
  );
};

export default RiskoMeter;
