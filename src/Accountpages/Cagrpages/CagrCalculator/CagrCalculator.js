import React, { useState } from "react";
import "./CagrCalculator.css"; // Import external CSS file

const CagrCalculator = () => {
  const [initialValue, setInitialValue] = useState(5000);
  const [finalValue, setFinalValue] = useState(8000);
  const [duration, setDuration] = useState(4);
  const [cagr, setCagr] = useState(null);

  // Function to calculate CAGR
  const calculateCAGR = () => {
    if (initialValue > 0 && finalValue > 0 && duration > 0) {
      const cagrValue =
        ((Math.pow(finalValue / initialValue, 1 / duration) - 1) * 100).toFixed(2);
      setCagr(cagrValue);
    } else {
      setCagr(null); // Reset CAGR if input is invalid
    }
  };

  return (
    <div className="allcagrcontainer">
    <div className="cagr-calculator-container">
      <div className="cagr-inputs">
        {/* Initial Investment Value */}
        <div className="cagr-input-row">
  <label>Initial Investment Value</label>
  <div className="input-wrapper">
    <span className="prefix">Rs</span>
    <input
      type="number"
      value={initialValue}
      onChange={(e) => setInitialValue(Number(e.target.value))}
      placeholder="Enter Value"
    />
  </div>
</div>


        {/* Final Investment Value */}
        <div className="cagr-input-row">
  <label>Final Investment Value</label>
  <div className="input-wrapper">
    <span className="prefix">Rs</span>
    <input
      type="number"
      value={finalValue}
      onChange={(e) => setFinalValue(Number(e.target.value))}
      placeholder="Enter Final Value"
    />
  </div>
</div>

        {/* Duration */}
        <div className="cagr-input-row">
          <label>Duration</label>
          <div className="duration-input">
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Enter Duration"
            />
            <span>yrs</span>
          </div>
        </div>

        {/* Calculate Button */}
        <button className="cagr-button" onClick={calculateCAGR}>
          Calculate
        </button>
      </div>

      {/* Result */}
      {cagr !== null && (
        <div className="cagr-result">
          <p>
            CAGR is <span>{cagr}%</span>
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default CagrCalculator;
