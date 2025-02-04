import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import './Rdcalculator.css'
import { useNavigate } from 'react-router-dom';
const Rdcalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(3000); // Initial Monthly Investment Amount
  const [rdPeriod, setRdPeriod] = useState(12); // RD Period in months
  const [interestRate, setInterestRate] = useState(6); // Fixed Interest Rate (p.a)
const navigate = useNavigate();
  // Function to calculate total interest and maturity amount
  const calculateRD = (monthlyInvestment, rdPeriod, interestRate) => {
    const monthlyRate = interestRate / (12 * 100); // Monthly interest rate
    const totalInvestment = monthlyInvestment * rdPeriod; // Total amount invested
    const totalInterest =
      (monthlyInvestment *
        (Math.pow(1 + monthlyRate, rdPeriod) - 1) *
        (1 + monthlyRate)) /
      monthlyRate; // Compound interest formula
    const totalAmount = Math.round(totalInterest); // Total maturity amount
    return {
      totalInterest: Math.round(totalAmount - totalInvestment),
      totalAmount,
      totalInvestment,
    };
  };

  // Calculate values
  const { totalInvestment, totalInterest, totalAmount } = calculateRD(
    monthlyInvestment,
    rdPeriod,
    interestRate
  );

  // Doughnut Chart Data
  const data = {
    labels: ["Invested", "Total Interest"],
    datasets: [
      {
        data: [totalInvestment, totalInterest],
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
        {/* Monthly Investment Amount */}
        <div className="lumsumm">
          <div className="sippcaloculatorrs-input">
            <div className="alllsipmonthlyrd">
              <div className="labelsippp">
                <label>Monthly Investment Amount</label>
              </div>
              <div>
                <input
                  type="text"
                  value={`Rs ${monthlyInvestment.toLocaleString()}`}
                  readOnly
                  className="sippcaloculatorrs-textbox"
                />
              </div>
            </div>
            <div className="sippcaloculatorrs-slider-container">
              <input
                type="range"
                min="500"
                max="360000"
                step="500" // Ensures the slider steps are consistent
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="sippcaloculatorrs-slider"
              />
            </div>
          </div>

          {/* RD Period */}
          <div className="sippcaloculatorrs-input">
            <div className="alllsiprd">
              <div className="labelsippp">
                <label>Time Period (Months)</label>
              </div>
              <div>
                <input
                  type="text"
                  value={`${rdPeriod} months`}
                  readOnly
                  className="sippcaloculatorrs-textbox"
                />
              </div>
            </div>
            <div className="sippcaloculatorrs-slider-container">
              <input
                type="range"
                min="6"
                max="120"
                step="1"
                value={rdPeriod}
                onChange={(e) => setRdPeriod(Number(e.target.value))}
                className="sippcaloculatorrs-slider"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="sippcaloculatorrs-input">
            <div className="alllsipraterd">
              <div className="labelsippp">
                <label>Interest Rates (p.a)</label>
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
                step="0.1" // Allows for finer adjustments
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
              <h2>Rs {totalInvestment.toLocaleString()}</h2>
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
          <button className="accountallmutualfundlist-button"onClick={() => navigate("/fundTable")}>
          Best Mutual Funds List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rdcalculator;
