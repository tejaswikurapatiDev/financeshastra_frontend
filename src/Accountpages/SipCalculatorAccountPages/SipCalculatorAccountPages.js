import React, { useState } from "react";
import "./SipCalculatorAccountPages.css";
import { Doughnut } from "react-chartjs-2";

const SipCalculatorAccountPages = () => {
  const [sipAmount, setSipAmount] = useState(5000); // Monthly SIP Amount
  const [sipPeriod, setSipPeriod] = useState(10); // SIP Period in years
  const [expectedReturn, setExpectedReturn] = useState(12); // Expected Return Rate (p.a)

  // Calculate total investment
  const totalInvestment = sipAmount * 12 * sipPeriod;

  // Calculate estimated returns using compound interest formula
  const estimatedReturns = Math.round(
    sipAmount *
      (((1 + expectedReturn / 100 / 12) ** (sipPeriod * 12) - 1) /
        (expectedReturn / 100 / 12)) *
      (1 + expectedReturn / 100 / 12) -
      totalInvestment
  );

  // Calculate total amount
  const totalAmount = totalInvestment + estimatedReturns;

  // Doughnut Chart Data
  const data = {
    labels: ["Invested", "Est. Returns"],
    datasets: [
      {
        data: [totalInvestment, estimatedReturns],
        backgroundColor: ["#003f8f", "#24b676"],
        hoverBackgroundColor: ["#003f8f", "#24b676"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="sippcaloculatorrs-container">
      <div className="alllsipcontainerss">
      {/* Monthly SIP Amount */}
      <div className="allsipcalculatorss">
      <div className="sippcaloculatorrs-input">
        <div className="alllsipmonthly">
          <div className="labelsippp">
            <label>Monthly SIP Amount</label>
          </div>
          <div>
            <input
              type="text"
              value={`Rs ${sipAmount}`}
              readOnly
              className="sippcaloculatorrs-textbox"
            />
          </div>
        </div>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1000"
            max="50000"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
        </div>
      </div>

      {/* SIP Period */}
      <div className="sippcaloculatorrs-input">
        <div className="alllsip">
          <div className="labelsippp">
            <label>SIP Period (years)</label>
          </div>
          <div>
            <input
              type="text"
              value={`${sipPeriod} yrs`}
              readOnly
              className="sippcaloculatorrs-textbox"
            />
          </div>
        </div>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1"
            max="30"
            value={sipPeriod}
            onChange={(e) => setSipPeriod(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
        </div>
      </div>

      {/* Expected Return Rate */}
      <div className="sippcaloculatorrs-input">
        <div className="alllsiprate">
          <div className="labelsippp">
            <label>Expected Return Rate (p.a)</label>
          </div>
          <div>
            <input
              type="text"
              value={`${expectedReturn} %`}
              readOnly
              className="sippcaloculatorrs-textbox"
            />
          </div>
        </div>
        <div className="sippcaloculatorrs-slider-container">
          <input
            type="range"
            min="1"
            max="20"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="sippcaloculatorrs-slider"
          />
        </div>
      </div>
      </div>
      {/* Doughnut Chart */}
      <div className="accountallmutualfundlist-container">
      <div className="accountallmutualfundlist-chart">
        <Doughnut data={data} options={options} />
      </div>

      <div className="accountallmutualfundlist-legend">
        <div className="accountallmutualfundlist-legend-item">
          <span className="accountallmutualfundlist-dot invested"></span> 
          Invested
        </div>
        <div className="accountallmutualfundlist-legend-item">
          <span className="accountallmutualfundlist-dot returns"></span> 
          Est. Returns
        </div>
      </div>
      {/* Investment Details */}
      <div className="accountallmutualfundlist-details">
      <div className="accountallmutualfundlist-row">
          <p>Total Investment</p>
          <h2>Rs {totalInvestment.toLocaleString()}</h2>
        </div>
        <div className="accountallmutualfundlist-row">
          <p>Estimated Returns</p>
          <h3>Rs {estimatedReturns.toLocaleString()}</h3>
        </div>
        <div className="accountallmutualfundlist-row">
          <p>Total Amount</p>
          <h3>Rs {totalAmount.toLocaleString()}</h3>
        </div>
      </div>

      {/* Button */}
      <button className="accountallmutualfundlist-button">
        Best Mutual Funds List
      </button>
    </div>
    </div>
    </div>
  
  );
};

export default SipCalculatorAccountPages;
