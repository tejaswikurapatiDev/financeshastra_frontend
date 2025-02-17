import React from "react";
import "./RiskoMutualDashboard.css"; // Import the associated CSS file

const RiskOMeter = () => {
  const riskLevels = [
    { label: "Low", color: "#0045ad" },
    { label: "Low to Moderate", color: "#013567" },
    { label: "Moderate", color: "#f5a623" },
    { label: "Moderately High", color: "#41c08e" },
    { label: "High", color: "#2c898e" },
    { label: "Very High", color: "#d12b29" },
  ];

  const createArcPath = (startAngle, endAngle, radius, cx, cy) => {
    const start = {
      x: cx + radius * Math.cos(startAngle),
      y: cy + radius * Math.sin(startAngle),
    };

    const end = {
      x: cx + radius * Math.cos(endAngle),
      y: cy + radius * Math.sin(endAngle),
    };

    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const cx = 300; // Center X
  const cy = 300; // Center Y
  const radius = 200; // Arc Radius
  const startAngle = Math.PI; // Start angle (leftmost point)
  const anglePerSegment = Math.PI / riskLevels.length; // Divide half-circle into segments

  return (
    <div>
      <h3 className="riskometer-title">Risk-o-meter</h3>
      <div className="riskometer">
        <svg
          viewBox="0 0 600 350"
          preserveAspectRatio="xMidYMid meet"
          className="riskometer-svg"
        >
          {/* Create Arc Segments */}
          {riskLevels.map((risk, index) => {
            const start = startAngle + index * anglePerSegment; // Calculate start angle
            const end = start + anglePerSegment; // Calculate end angle

            return (
              <path
                key={index}
                d={createArcPath(start, end, radius, cx, cy)} // Use start and end angles here
                fill="none"
                stroke={risk.color}
                strokeWidth="25"
              />
            );
          })}

          {/* Add Labels */}
          {riskLevels.map((risk, index) => {
            const angle = startAngle + index * anglePerSegment + anglePerSegment / 2; // Label position in the middle of each segment
            const labelRadius = radius + 50; // Position labels outside the arc
            const labelX = cx + labelRadius * Math.cos(angle);
            const labelY = cy + labelRadius * Math.sin(angle);

            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                fill="#000"
                fontSize="14"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {risk.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RiskOMeter;
