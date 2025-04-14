import React, { useState } from "react";
import "./ReversecagrCalculator.css";

const RevcagrValueCalculator = () => {
  const [initialValue, setInitialValue] = useState(10000); // Default initial investment
  const [cagr, setCagr] = useState(14.87); // Default CAGR percentage
  const [duration, setDuration] = useState(5); // Default duration in years

  // Calculate Final Value using the CAGR formula
  const finalValue = Math.round(
    initialValue * Math.pow(1 + cagr / 100, duration)
  );

  return (
    <div className="allcagrcontainer">
      <div className="cagr-calculator-container">
        <div className="cagr-inputs">
          {/* Input for Initial Investment */}
          <div className="cagr-input-row">
            <label htmlFor="initialValue">Initial Investment Value</label>
            <div className="input-wrapper">
              <span className="prefix">₹</span>
              <input
                id="initialValue"
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                placeholder="Enter Initial Value"
              />
            </div>
          </div>

          {/* Input for CAGR */}
          <div className="cagr-input-row">
            <label htmlFor="cagr">CAGR in %</label>
            <div className="input-wrapper">
              <input
                id="cagr"
                type="number"
                value={cagr}
                onChange={(e) => setCagr(Number(e.target.value))}
                placeholder="Enter CAGR"
              />
            </div>
          </div>

          {/* Input for Duration */}
          <div className="cagr-input-roww">
            <label htmlFor="duration">Duration</label>
            <div className="input-wrapper">
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="Enter Duration"
              />
              <span className="suffixdura">yrs</span>
            </div>
          </div>

          {/* Display Final Value */}
          <button className="cagr-resultt">
            Final Value is ₹ {finalValue.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevcagrValueCalculator;
