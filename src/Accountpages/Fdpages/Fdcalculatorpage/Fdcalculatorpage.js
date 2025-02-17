import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';

const Fdcalculatorpage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100_000); // Initial Investment Amount
  const [fdPeriod, setFdPeriod] = useState(5); // FD Period in years
  const [interestRate, setInterestRate] = useState(6); // Fixed Interest Rate (p.a)
const navigate = useNavigate();
  // Calculate total interest using the compound interest formula
  const totalInterest = Math.round(
    investmentAmount * (Math.pow(1 + interestRate / 100, fdPeriod) - 1)
  );

  // Calculate total maturity amount
  const totalAmount = investmentAmount + totalInterest;

  // Doughnut Chart Data
  const data = {
    labels: ["Invested", "Total Interest"],
    datasets: [
      {
        data: [investmentAmount, totalInterest],
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
        {/* Investment Amount */}
        <div className="lumsumm">
          <div className="sippcaloculatorrs-input">
            <div className="alllsipmonthlyfd">
              <div className="labelsippp">
                <label>Investment Amount</label>
              </div>
              <div>
                <input
                  type="text"
                  value={`Rs ${investmentAmount}`}
                  readOnly
                  className="sippcaloculatorrs-textbox"
                />
              </div>
            </div>
            <div className="sippcaloculatorrs-slider-container">
              <input
                type="range"
                min="1000"
                max="1000000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="sippcaloculatorrs-slider"
              />
            </div>
          </div>

          {/* FD Period */}
          <div className="sippcaloculatorrs-input">
            <div className="alllsipfd">
              <div className="labelsippp">
                <label>Time Period</label>
              </div>
              <div>
                <input
                  type="text"
                  value={`${fdPeriod} yrs`}
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
                value={fdPeriod}
                onChange={(e) => setFdPeriod(Number(e.target.value))}
                className="sippcaloculatorrs-slider"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="sippcaloculatorrs-input">
            <div className="alllsipratelfd">
              <div className="labelsippp">
                <label>Interest Rates (Yearly)</label>
              </div>
              <div>
                <input
                  type="text"
                  value={`${interestRate} %`}
                  readOnly
                  className="sippcaloculatorrs-textbox"
                />
              </div>
            </div>
            <div className="sippcaloculatorrs-slider-container">
              <input
                type="range"
                min="1"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
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
              Total Interest
            </div>
          </div>

          {/* Investment Details */}
          <div className="accountallmutualfundlist-details">
            <div className="accountallmutualfundlist-row">
              <p>Total Investment</p>
              <h2>Rs {investmentAmount.toLocaleString()}</h2>
            </div>
            <div className="accountallmutualfundlist-row">
              <p>Total Interest</p>
              <h3>Rs {totalInterest.toLocaleString()}</h3>
            </div>
            <div className="accountallmutualfundlist-row">
              <p>Total Amount</p>
              <h3>Rs {totalAmount.toLocaleString()}</h3>
            </div>
          </div>

          {/* Button */}
          <button className="accountallmutualfundlist-button" onClick={() => navigate("/fundTable")}>
          Best Mutual Funds List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fdcalculatorpage;
