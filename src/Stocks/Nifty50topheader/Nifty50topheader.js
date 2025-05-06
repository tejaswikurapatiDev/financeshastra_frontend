import React, { useState, useEffect } from 'react';
import './Nifty50topheader.css';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Nifty50topheader() {
  const [activeTab, setActiveTab] = useState("overview");
  const [change, setChange] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPrice, setCurrentPrice] = useState(300);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleNavigationWithActive = (path, tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); // Store active tab
    handleNavigation(path);
  };

  // Load active tab from localStorage on first mount
  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) setActiveTab(storedTab);
  }, []);

  const fetchData = () => {
    const randomChange = (Math.random() * 20 - 10).toFixed(2);
    setChange(randomChange);

    const currentTime = new Date();
    setLastUpdated(currentTime.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }));

    setCurrentPrice(prevPrice => {
      const newPrice = parseFloat(prevPrice) + parseFloat(randomChange);
      return newPrice.toFixed(1);
    });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="graphcontainerernifty50">
      <div className="graphheadernifty">
        <div className="title-containernifty">
          <h1 className="telephoneniftyh1">Nifty 50</h1>
        </div>
        <div className="graph-price-update">
          <span
            style={{ fontSize: "20px" }}
            className={`graphpricenifty50 ${change >= 0 ? 'positive' : 'negative'}`}
          >
            ₹{parseFloat(currentPrice).toLocaleString()}
          </span>
          <span className="graphupdatenifty50">Last updated: {lastUpdated}</span>
        </div>
      </div>

      <nav className="graphnavbarrnifty50">
        <Divider />

        <span
          onClick={() => handleNavigationWithActive("/nifty50stocks", "overview")}
          className={activeTab === "overview" ? "active-span" : ""}
        >
          Overview
        </span>

        <span
          onClick={() => handleNavigationWithActive("/SectorWeightageTableniffty50", "stockxray")}
          className={activeTab === "stockxray" ? "active-span" : ""}
        >
          Sectors
        </span>

        <span
          onClick={() => handleNavigationWithActive("/nifty50screenerStockList", "stockearning")}
          className={activeTab === "stockearning" ? "active-span" : ""}
        >
          Companies
        </span>

        <Divider />
      </nav>

      <Divider sx={{ margin: '10px 0' }} />
    </div>
  );
}

export default Nifty50topheader;
