import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import './PortfolioCard.css'




const PortfolioCard = () => {
  // State for portfolio values and chart data
  const [timeRange, setTimeRange] = useState("1D");
   const [showPopup, setShowPopup] = useState(false);
  const [portfolio, setPortfolio] = useState({
    investmentValue: 178798,
    currentValue: 302312,
    profitOrLossPercentage: 69.08,
    numberOfStocks: 5,
  });

  // Simulating live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prev) => {
        const newCurrentValue = prev.currentValue + (Math.random() * 100 - 50); // Simulating price changes
        return {
          ...prev,
          currentValue: newCurrentValue,
          profitOrLossPercentage: (((newCurrentValue - prev.investmentValue) / prev.investmentValue) * 100).toFixed(2),
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Sample Data for Chart
  const chartDataByRange = {
    "1D": [294000, 312500, 315000, 300000,295000,325000, 308000],
    "5D": [ 300000,294000,325000, 315000,295000,312500, 308000],
    "1M": [  308000,312500,325000,294000, 315000, 300000,290000],
    "6M": [ 312500,294000, 315000,325000, 300000,295000, 308000],
    "1Y": [315000,294000, 295000, 312500, 300000, 308000 ,325000],
    "5Y": [322000,315000,294000, 295000, 312500, 300000, 308000 ],
    "Max": [325000,315000,294000, 295000, 312500, 300000, 308000 ]
  };

  const chartData = {
    labels: ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Portfolio Value",
        data: chartDataByRange[timeRange],
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "#22c55e",
        pointBackgroundColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return `₹${value.toLocaleString()}`; // Format with Rupee symbol
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    
 
      <div className="portfolio-cardanalysisss">
        {/* Portfolio Summary */}
        <div className="allportfoilioheaderanalysis">
        <div className="portfolio-header">
          <h3 className="portfolio-headerdemo">Demo Portfolio</h3>
          <h2>₹ {portfolio.currentValue.toLocaleString()}</h2>
          <p className={portfolio.profitOrLossPercentage >= 0 ? "profit" : "loss"}>
            ₹ {((portfolio.currentValue - portfolio.investmentValue).toLocaleString())} (
            {portfolio.profitOrLossPercentage}%) {timeRange}
          </p>
        </div>

        </div>
        {/* Time Range Selector */}
        <div className="portfoliocardddanalysis">
          {["1D", "5D", "1M", "6M", "1Y","5Y","Max"].map((range) => (
            <button
              key={range}
              className={`time-range-buttonportfiliocard ${range === timeRange ? "active" : ""}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="chart-containeranalysisspopup">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Portfolio Details */}
        <div className="portfolio-details">
          <div className="detail-box">
            <div className="allinvestcahrttt">
            <p>Investment Value :</p>
            <h4>₹ {portfolio.investmentValue.toLocaleString()}</h4>
            </div>
            <div className="allinvestcahrtttport">
            <p>Current Value :</p>
    
    <h4>₹ {portfolio.currentValue.toLocaleString()}</h4>
   
         </div>

          </div>
          <div className="detail-box">
          
          <div className="allinvestcahrttt">
          <p>Profit or Loss % :</p>
            <h4 className={portfolio.profitOrLossPercentage >= 0 ? "profit" : "loss"}>
              {portfolio.profitOrLossPercentage}%
            </h4>
            </div>
            <div className="allinvestcahrtttport">
            <p>No. of Stocks :</p>
            <h4>{portfolio.numberOfStocks}</h4>
            </div>
     </div>
        </div>
      </div>
     
  );
};

export default PortfolioCard;
