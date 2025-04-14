import React, { useState } from "react";
import "./DataDisplayEarnings.css";

const DataDisplayEarnings = () => {
  // State for Day Range and 52 Week Range
  const [dayRange, setDayRange] = useState({ low: 812.2, high: 824.0, current: 820.0 });
  const [weekRange, setWeekRange] = useState({ low: 600.65, high: 912.0, current: 750.0 });

  // Function to calculate thumb position (percentage)
  const calculateThumbPosition = (low, high, current) => {
    const percentage = ((current - low) / (high - low)) * 100;
    return Math.max(0, Math.min(percentage, 100)); // Ensure the percentage stays between 0 and 100
  };

  // Handle changes for Day Range slider
  const handleDayRangeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setDayRange((prev) => ({ ...prev, current: newValue }));
  };

  // Handle changes for 52 Week Range slider
  const handleWeekRangeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setWeekRange((prev) => ({ ...prev, current: newValue }));
  };

  return (
    <div className="earnings-container">
      {/* Day Range */}
      <div className="allearningquacontainer">
      <div className="data-section">
        <p className="label">Day Range</p>
        <div className="range">
          <span className="low">{dayRange.low}<br/>L</span>
          <div className="slider">
            <input
              type="range"
              min={dayRange.low}
              max={dayRange.high}
              step="0.1"
              value={dayRange.current}
              onChange={handleDayRangeChange}
              className="slider-input"
            />
            <div
              className="thumb"
              style={{
                left: `${calculateThumbPosition(dayRange.low, dayRange.high, dayRange.current)}%`,
              }}
            ></div>
          </div>
          <span className="high">{dayRange.high}<br/>H</span>
        </div>
        <p className="current-value">Current: {dayRange.current.toFixed(2)}</p>
      </div>

      {/* 52 Week Range */}
      <div className="data-section">
        <p className="label">52 Week Range</p>
        <div className="range">
          <span className="low">{weekRange.low}<br/>L</span>
          <div className="slider">
            <input
              type="range"
              min={weekRange.low}
              max={weekRange.high}
              step="1"
              value={weekRange.current}
              onChange={handleWeekRangeChange}
              className="slider-input"
            />
            <div
              className="thumb"
              style={{
                left: `${calculateThumbPosition(weekRange.low, weekRange.high, weekRange.current)}%`,
              }}
            ></div>
          </div>
          <span className="high">{weekRange.high}<br/>H</span>
        </div>
        <p className="current-value">Current: {weekRange.current.toFixed(2)}</p>
      </div>

      {/* Volume */}
      <div className="alldata">
        <div className="data-section">
          <p className="label">Volume</p>
          <p className="value">4,933,200</p>
        </div>

        {/* Bid / Ask */}
        <div className="data-section">
          <p className="label">Bid / Ask</p>
          <p className="value">-- / --</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DataDisplayEarnings;