import React, {useState, useEffect, Navigate} from "react";
import "./AllocationChart.css";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

const PortfolioAllocationManagerChart = () => {
  
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [portfolio, setPortfolio] = useState({
  myInvestment: 0,
  latestValue: 0,
  mutualFunds: 0,
  latestMutualFunds: 0,
  stocks: 0,
  latestStocks: 0,
  gold: 0,
  latestGold: 0,
});

const fetchData = async () => {
  try {
    setLoading(true);
    const token = Cookies.get("jwtToken");
    if (!token) {
      setError("No authentication token found.");
      return;
    }
    
    const response = await fetch(`${API_BASE_URL}/myportfolio/allocationChart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("API Data:", data);

    if (data.length > 0) {
      setPortfolio({
        stocks: data[0].invested_money || 0,
        latestStocks: data[0].latest_value,
        mutualFunds: data[1].invested_money || 0,
        latestMutualFunds: data[1].latest_value || 0,
        gold: data[2].invested_money || 0,
        latestGold: data[2].latest_value || 0,
      });
    } else {
      setError("No portfolio data found.");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []); // No dependencies, this will run once on mount.

const { stocks, mutualFunds, gold, latestStocks, latestMutualFunds, latestGold } = portfolio;

// Dynamically calculate myInvestment and latestValue
const myInvestment = parseInt(stocks) + parseInt(mutualFunds) + parseInt(gold);
const latestValue = parseInt(latestStocks) + parseInt(latestMutualFunds) + parseInt(latestGold);
  return (
    <div className="portfolio-allocation-container">
      <div className="portfolio-chart-section">
        <h3>Allocation - Investment Cost</h3>
        <p className="portfolio-amount">{myInvestment}</p>
        <div className="portfolio-chart">
          <div className="portfolio-donut"></div>
          <div className="portfolio-chart-labels">
            <p className='portchartp'>Stocks: {stocks}</p>
            <p className='portchartp'>Mutual Funds: {mutualFunds}</p>
            <p className='portchartp'>Gold: {gold}</p>
          </div>
        </div>
      </div>

      <div className="portfolio-divider"></div>

      <div className="portfolio-chart-section">
        <h3>Allocation - Latest Value</h3>
        <p className="portfolio-amount">{latestValue}</p>
        <div className="portfolio-chart">
          <div className="portfolio-donut"></div>
          <div className="portfolio-chart-labels">
            <p className='portchartp'>Stocks: {latestStocks}</p>
            <p className='portchartp'>Mutual Funds: {latestMutualFunds}</p>
            <p className='portchartp'>Gold: {latestGold}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocationManagerChart;
