import React from "react";
import "./SizeAnalysis.css";

const SizeAnalysis = () => {
  const sizeData = [
    { name: "Large Cap", value: 100 },
    { name: "Mid Cap", value: 0 },
    { name: "Small Cap", value: 0 },
    { name: "Micro Cap", value: 0 },
  ];

  return (
    <div className="size-analysis-container">
      <h2 className="size-title">Size Analysis</h2>
      
      <div className="size-chart">
        {/* Grid Lines */}
        <div className="grid-lines">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="grid-line" style={{ left: `${i * 10}%` }}></div>
          ))}
        </div>

        {/* Bars - Only Large Cap should have a bar */}
        {sizeData.map((size, index) => (
          <div className="size-row" key={index}>
            <p className="size-label">{size.name}</p>
            {size.value > 0 && ( // Show bar only if value > 0 (i.e., only Large Cap)
              <div className="size-bar-container">
                <div className="size-bar" style={{ width: `${size.value}%`, backgroundColor: "#4a90e2" }}>
                  <span className="size-value">{size.value}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Percentage Scale */}
      <div className="size-grid">
        {Array.from({ length: 11 }).map((_, i) => (
          <span key={i} className="grid-label">{i * 10}</span>
        ))}
      </div>
    </div>
  );
};

export default SizeAnalysis;
