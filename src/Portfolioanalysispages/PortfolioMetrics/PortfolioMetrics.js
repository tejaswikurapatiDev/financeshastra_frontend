import React from "react";
import "./PortfolioMetrics.css";
import PortfolioAnalysisSpeedometer from "../PortfolioAnalysisSpeedometer/PortfolioAnalysisSpeedometer";

const PortfolioMetrics = () => {
  // Example metrics data
  const metrics = [
    { name: "PE Ratio", value: 40.4 },
    { name: "ROE", value: 30.34 },
    { name: "ROCE", value: 32.44 },
  ];

  return (
    <div className="portfolio-metrics-containerspeedometre">
    <div className="portfolio-metrics-container">
      <h2 className="metrics-title">Key Portfolio Metrics</h2>
      <div className="metrics-bars">
        {metrics.map((metric, index) => (
          <div className="metric" key={index}>
            <div className="bar-container">
              <div className="bar">
                {/* Marker with Value */}
                <div
                  className="marker"
                  style={{ bottom: `${metric.value}%` }}
                >
                  <p className="metric-value">{metric.value}</p>
                </div>
              </div>
            </div>
            <p className="metric-name">{metric.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
    <PortfolioAnalysisSpeedometer/></div>
    
    </div>
  );
};

export default PortfolioMetrics;
