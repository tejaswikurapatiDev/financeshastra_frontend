import React, {useState, useEffect, useCallback} from "react";
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

const fetchData = useCallback (async () => {
  try {
    setLoading(true);
    setError(null);

    const token = Cookies.get("jwtToken");
    if (!token) {
      throw new Error("No authentication token found.");
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

    if (data.length >= 3) {
      setPortfolio({
        stocks: Number(data[0].invested_money) || 0,
        latestStocks: Number(data[0].latest_value) || 0,
        mutualFunds: Number(data[1].invested_money) || 0,
        latestMutualFunds: Number(data[1].latest_value) || 0,
        gold: Number(data[2].invested_money) || 0,
        latestGold: Number(data[2].latest_value) || 0,
      });
    } else {
      setError("No portfolio data found.");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]); // No dependencies, this will run once on mount.

// Dynamically calculate myInvestment and latestValue
const myInvestment = portfolio.stocks + portfolio.mutualFunds +portfolio.gold;
const latestValue = portfolio.latestStocks + portfolio.latestMutualFunds + portfolio.latestGold;
  return (
    <div className="portfolio-allocation-container">
      <div className="portfolio-chart-section">
        <h3>Allocation - Investment Cost</h3>
        <p className="portfolio-amount">{(myInvestment - 0).toLocaleString()}</p>
        <div className="portfolio-chart">
          <div className="portfolio-donut"></div>
          <div className="portfolio-chart-labels">
            <p className='portchartp'>Stocks: {(portfolio.stocks - 0).toLocaleString()}</p>
            <p className='portchartp'>Mutual Funds: {(portfolio.mutualFunds - 0).toLocaleString()}</p>
            <p className='portchartp'>Gold: {(portfolio.gold - 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="portfolio-divider"></div>

      <div className="portfolio-chart-section">
        <h3>Allocation - Latest Value</h3>
        <p className="portfolio-amount">{(latestValue - 0 ).toLocaleString()}</p>
        <div className="portfolio-chart">
          <div className="portfolio-donut"></div>
          <div className="portfolio-chart-labels">
            <p className='portchartp'>Stocks: {(portfolio.latestStocks - 0).toLocaleString()}</p>
            <p className='portchartp'>Mutual Funds: {(portfolio.latestMutualFunds - 0).toLocaleString()}</p>
            <p className='portchartp'>Gold: {(portfolio.latestGold - 0).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocationManagerChart;
