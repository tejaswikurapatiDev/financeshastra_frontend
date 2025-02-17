import { useState, useEffect, navigate } from "react";
import Cookies from "js-cookie";
import React from "react";
import "./Portfoliomanager.css";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import PortfolioManagerDashboard from "../Portfoliodashboard/Portfoliodashboard";


function Portfolio() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myInvestment, setMyInvestment] = useState(0);
  const [latestValue, setLatestValue] = useState(0);
  const [unRealizedGains, setUnRealizedGains] = useState(0);
  const [realizedGains, setRealizedGains] = useState(0);
  const [capitalGains, setCapitalGains] = useState(0);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("jwtToken");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        navigate("/login")
        return;
      }

      const response = await fetch(`/myportfolio/dashboard`, {
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
        setMyInvestment(data[0].investment_cost || 0);
        setLatestValue(data[0].latest_value || 0);
        setUnRealizedGains(data[0].unrealized_gain || 0);
        setRealizedGains(data[0].realized_gain || 0);
        setCapitalGains(data[0].capital_gains || 0);
      } else {
        setError("No portfolio data found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="networth-stocks-dashboard">
      {/* Header Section */}
      <h2 className="newwmutual">Portfolio Management Dashboard</h2>
      <div className="networth-tabs">
        <Link to="/portfolio">
          <button className="networth-tabact">Dashboard</button>
        </Link>
        <Link to="/portfoliostockaccount">
          <button className="networth-tab">Stocks</button>
        </Link>
        <Link to="/mutualaccount">
          <button className="networth-tab">Mutual Fund</button>
        </Link>
        <Link to="/portfoliogoldtoppage">
          <button className="networth-tab">Gold</button>
        </Link>
      </div>

      {/* Net Worth Overview Section */}
      <div className="networth-summary">
        <div>
          <p className="financep">My Net Worth</p>
          <h2>₹{(latestValue - 0).toLocaleString()}</h2>
        </div>
        <div>
          <p className="financep">My Investments</p>
          <h2>₹{(myInvestment - 0).toLocaleString()}</h2>
        </div>
        <div>
          <p className="financep">My Liabilities</p>
          <h2>₹0</h2>
        </div>
      </div>

      {/* Enhance Message Section */}
      <div className="finance-enhance-message">
        Enhance risk management and maximize returns with FinanceShastra Portfolio Manager!
      </div>

      {/* Investments Section */}
      <h2 className="investh2">My Investments</h2>
      <div className="finance-dashboard-content">
        {/* Investment Details Card */}
        <div className="finance-investment-details-card">
          <div className="finance-investment-details-group">
            <p>Latest Value</p>
            <h3>₹{(latestValue - 0).toLocaleString()}</h3>
            <p>Investment Cost</p>
            <h3>₹{(myInvestment - 0).toLocaleString()}</h3>
          </div>
          <div className="finance-investment-details-group">
            <h3>Unrealized Gain</h3>
            <p>Overall Gain</p>
            <h3 className="finance-negative-gain">
              ₹{(unRealizedGains - 0).toLocaleString()} (
                {myInvestment !== 0 ? ((unRealizedGains / myInvestment) * 100).toFixed(2) : "0.00"}%)
            </h3>
            <p>Today's Gain</p>
            <h3 className="finance-negative-gain">₹0 (0%)</h3>
          </div>
          <div className="finance-investment-details-group">
            <h3>Realized Gain</h3>
            <p>Realized Gain</p>
            <h3 className="finance-negative-gain">₹{(realizedGains - 0).toLocaleString()}</h3>
            <p>Capital Gain</p>
            <h3 className="finance-negative-gain">₹{(capitalGains - 0).toLocaleString()}</h3>
          </div>
          <div className="finance-investment-detailsother">
            <p>Other Gain</p>
            <h3 className="finance-negative-gainother">₹0</h3>
            <p className="finance-investment-footer">
              Unrealized and Realized gain for current holdings in portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Navbar and PortfolioManagerDashboard Components */}
      <Navbar />
      <PortfolioManagerDashboard />
    </div>
  );
}

export default Portfolio;