import React, { useState } from "react";
import "./SipCalculatorAccountPages.css";

const SipCalculatorAccountPages = () => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipPeriod, setSipPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  return (
    <div className="sippcaloculatorrs-container">
      <div className="sippcaloculatorrs-input">
        <label>Monthly SIP Amount</label>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1000"
            max="50000"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
          <input
            type="text"
            value={`Rs ${sipAmount}`}
            readOnly
            className="sippcaloculatorrs-textbox"
          />
        </div>
      </div>

      <div className="sippcaloculatorrs-input">
        <label>SIP Period</label>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1"
            max="30"
            value={sipPeriod}
            onChange={(e) => setSipPeriod(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
          <input
            type="text"
            value={`${sipPeriod} yrs`}
            readOnly
            className="sippcaloculatorrs-textbox"
          />
        </div>
      </div>

      <div className="sippcaloculatorrs-input">
        <label>Expected Return Rate (p.a)</label>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1"
            max="20"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
          <input
            type="text"
            value={`${expectedReturn} %`}
            readOnly
            className="sippcaloculatorrs-textbox"
          />
        </div>
      </div>
    </div>
  );
};

export default SipCalculatorAccountPages;
