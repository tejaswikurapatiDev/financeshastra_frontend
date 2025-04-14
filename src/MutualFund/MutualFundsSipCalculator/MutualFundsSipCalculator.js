import React, { useState } from "react";
import "./MutualFundsSipCalculator.css";

const MutualFundsSipCalculator = () => {
  const [mode, setMode] = useState("SIP"); // SIP or One-Time
  const [monthlyInvestment, setMonthlyInvestment] = useState(100);
  const [investmentPeriod, setInvestmentPeriod] = useState(1); // in years
  const [wealthGained, setWealthGained] = useState(294);
  const [expectedAmount, setExpectedAmount] = useState(1494);
  const [lumpSumAmount, setLumpSumAmount] = useState(1000); // For One-Time investment

  const handleMonthlyInvestmentChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setMonthlyInvestment(amount);
    calculateSipValues(amount, investmentPeriod);
  };

  const handleInvestmentPeriodChange = (e) => {
    const years = parseInt(e.target.value, 10);
    setInvestmentPeriod(years);

    if (mode === "SIP") {
      calculateSipValues(monthlyInvestment, years);
    } else {
      calculateOneTimeValues(lumpSumAmount, years);
    }
  };

  const handleLumpSumAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setLumpSumAmount(amount);
    calculateOneTimeValues(amount, investmentPeriod);
  };

  const calculateSipValues = (investment, years) => {
    const investedAmount = investment * years * 12;
    const wealth = Math.round((investedAmount * 1.07) - investedAmount); // Assuming 7% annual return
    const total = investedAmount + wealth;

    setWealthGained(wealth);
    setExpectedAmount(total);
  };

  const calculateOneTimeValues = (investment, years) => {
    const futureValue = Math.round(investment * Math.pow(1 + 0.07, years)); // Assuming 7% annual return
    const wealth = futureValue - investment;

    setWealthGained(wealth);
    setExpectedAmount(futureValue);
  };

  return (
    <div className="sip-calculator-container">
      <h2 className="sip-calculator-title">SIP Calculator</h2>
      <div className="sip-calculator-header">
        <button
          className={`sip-calculator-button ${mode === "SIP" ? "sip-selected" : ""}`}
          onClick={() => {
            setMode("SIP");
            calculateSipValues(monthlyInvestment, investmentPeriod);
          }}
        >
          SIP
        </button>
        <button
          className={`sip-calculator-button ${mode === "One-Time" ? "sip-selected" : ""}`}
          onClick={() => {
            setMode("One-Time");
            calculateOneTimeValues(lumpSumAmount, investmentPeriod);
          }}
        >
          One-Time
        </button>
      </div>

      {mode === "SIP" ? (
        <div className="sip-input-container">
          <div className="sip-input-row">
            <label>Monthly Investment</label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={monthlyInvestment}
              onChange={handleMonthlyInvestmentChange}
              className="sip-slider"
            />
            <span>₹{monthlyInvestment}</span>
          </div>
          <div className="sip-input-row">
            <label>Investment Period</label>
            <input
              type="range"
              min="1"
              max="30"
              value={investmentPeriod}
              onChange={handleInvestmentPeriodChange}
              className="sip-slider"
            />
            <span>Yr {investmentPeriod}</span>
          </div>
        </div>
      ) : (
        <div className="sip-input-container">
          <div className="sip-input-row">
            <label>Lump Sum Investment</label>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={lumpSumAmount}
              onChange={handleLumpSumAmountChange}
              className="sip-slider"
            />
            <span>₹{lumpSumAmount}</span>
          </div>
          <div className="sip-input-row">
            <label>Investment Period</label>
            <input
              type="range"
              min="1"
              max="30"
              value={investmentPeriod}
              onChange={handleInvestmentPeriodChange}
              className="sip-slider"
            />
            <span>Yr {investmentPeriod}</span>
          </div>
        </div>
      )}

      <div className="sip-result-container">
        <div className="sip-result-row">
          <span>Invested Amount</span>
          <span>
            ₹{mode === "SIP" ? monthlyInvestment * investmentPeriod * 12 : lumpSumAmount}
          </span>
        </div>
        <div className="sip-result-row">
          <span>Wealth Gained</span>
          <span>₹{wealthGained}</span>
        </div>
        <div className="sip-result-row">
          <span>Expected Amount</span>
          <span>₹{expectedAmount}</span>
        </div>
      </div>
      <div className="sip-start-button-container">
  <button className="sip-start-button">Start {mode}</button>
</div>

    </div>
  );
};

export default MutualFundsSipCalculator;
