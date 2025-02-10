import React, {useState, useEffect, useCallback} from "react";
import "./AllocationChart.css";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

const PortfolioAllocationManagerChart = () => {
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState({
    stocks: 0,
    latestStocks: 0,
    mutualFunds: 0,
    latestMutualFunds: 0,
    gold: 0,
    latestGold: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get("jwtToken");
      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(`${API_BASE_URL}/myportfolio/allocationChart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch portfolio data.");

      const data = await response.json();
      if (!data.length) throw new Error("No portfolio data found.");

      setPortfolio({
        stocks: data[0]?.stock_investment ?? 0,
        latestStocks: data[0]?.latest_value ?? 0,
        mutualFunds: data[1]?.invested_money ?? 0,
        latestMutualFunds: data[1]?.latest_value ?? 0,
        gold: data[2]?.invested_money ?? 0,
        latestGold: data[2]?.latest_value ?? 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate investments
  const myInvestment = portfolio.stocks + portfolio.mutualFunds + portfolio.gold;
  const latestValue = portfolio.latestStocks + portfolio.latestMutualFunds + portfolio.latestGold;

  const AllocationChart = ({ title, total, data }) => (
    <div className="portfolio-chart-section">
      <h3>{title}</h3>
      <p className="portfolio-amount">{total.toLocaleString()}</p>
      <div className="portfolio-chart">
        <div className="portfolio-donut"></div>
        <div className="portfolio-chart-labels">
          {Object.entries(data).map(([key, value]) => (
            <p key={key} className="portchartp">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value.toLocaleString()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return <p>Loading portfolio data...</p>;
  if (error) return <p className="error">{error}</p>;
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
