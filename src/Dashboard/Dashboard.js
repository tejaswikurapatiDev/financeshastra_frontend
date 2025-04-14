import React from 'react';
import { FaDollarSign} from 'react-icons/fa'; 
import { LuChartLine } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi"
import { FiPieChart } from 'react-icons/fi'; // For 'Net Worth'

import './Dashboard.css';

const AssetAllocation = () => (
  <div className="assest-box">
    <h2 className="title">Assets Allocation</h2>
    <p className="subtitle">Assets you have in your account</p>
    <div className="pie-chart">
      <div className="pie-section stocks">52.67%</div>
      <div className="pie-section mutual-fund">31.33%</div>
      <div className="pie-section gold">16%</div>
    </div>
    <ul className="assets-list">
    <li className="asset-item">
  <span
    className="legend-circle stocks"
    style={{
      display: 'inline-block',
      
      borderRadius: '50%',
     
      marginRight: '-70px', // Space between the circle and text
    }}
  ></span>
  Stocks
  <span className="asset-value">$26,869</span>
</li>

      <li className="asset-item">
        <span className="legend-circle mutual-fund"
        style={{
          display: 'inline-block',
          
          borderRadius: '50%',
         
          marginRight: '-30px', // Space between the circle and text
        }}></span> Mutual Fund
        <span className="asset-value">$16,455</span>
      </li>
      <li className="asset-item">
        <span className="legend-circle gold"
        style={{
          display: 'inline-block',
          
          borderRadius: '50%',
         
          marginRight: '-80px', // Space between the circle and text
        }}></span> Gold
        <span className="asset-value">$8,374</span>
      </li>
    </ul>
  </div>
);

const InvestmentSummary = () => (
  <div className="box">
    <h2 className="title">Investment</h2>
    <div className="investment-item">
      <span className="investment-label">
        <GiReceiveMoney className="icon gain-icon" /> {/* Total Gain Icon */}
        Total Gain
      </span>
      <span className="investment-value">$43,854</span>
    </div>
    <div className="investment-item">
      <span className="investment-label">
        <LuChartLine className="icon loss-icon" /> {/* Total Losses Icon */}
        Total Losses
      </span>
      <span className="investment-value">$10,412</span>
    </div>
    <div className="investment-item">
      <span className="investment-label">
        <FaDollarSign className="icon returns-icon" /> {/* Annual Returns Icon */}
        Annual Returns
      </span>
      <span className="investment-value">$40,846</span>
    </div>
    <div className="investment-item">
      <span className="investment-label">
        <FiPieChart className="icon net-worth-icon" /> {/* Net Worth Icon */}
        Net worth
      </span>
      <span className="investment-value">$53,598</span>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="dashboard-container">
    <AssetAllocation />
    <InvestmentSummary />
  </div>
);

export default Dashboard;
