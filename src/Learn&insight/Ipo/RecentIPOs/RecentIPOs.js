import React from 'react';
import './RecentIPOs.css'; // Import the CSS file

const RecentIPOs = () => {
  const ipos = [
    "Ventive Hospitality Ltd IPO",
    "Senores Pharmaceuticals Ltd IPO",
    "Carraro India Ltd IPO",
    "Transrail Lighting Ltd IPO",
    "Mamata Machinery Ltd IPO",
    "DAM Capital Advisors Ltd IPO",
    "Sanathan Textiles Ltd IPO",
    "Concord Enviro Systems Ltd IPO",
    "NewMalayalam Steel Ltd IPO",
    "Identical Brains Studios Ltd IPO",
  ];

  return (
    <div className="recentipo">
      <h3>Recent IPOs List</h3>
      <ul>
        {ipos.map((ipo, index) => (
          <li key={index}>{ipo}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentIPOs;