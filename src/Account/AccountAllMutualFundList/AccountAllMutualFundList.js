import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./AccountAllMutualFundList.css";

const AccountAllMutualFundList = () => {
  const totalInvestment = 1200000; // Rs 12,00,000
  const estimatedReturns = 1420914; // Rs 14,20,914
  const totalAmount = totalInvestment + estimatedReturns; // Rs 26,20,914

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

      <div className="accountallmutualfundlist-details">
  <div className="accountallmutualfundlist-row">
    <p>Total Investment</p>
    <h2>Rs {totalInvestment.toLocaleString()}</h2>
  </div>
  <div className="accountallmutualfundlist-row">
    <p>Est. Returns</p>
    <h3>Rs {estimatedReturns.toLocaleString()}</h3>
  </div>
  <div className="accountallmutualfundlist-row">
    <p>Total Amount</p>
    <h3>Rs {totalAmount.toLocaleString()}</h3>
  </div>
</div>

      <button className="accountallmutualfundlist-button">
        Best Mutual Funds List
      </button>
    </div>
  );
};

export default AccountAllMutualFundList;
