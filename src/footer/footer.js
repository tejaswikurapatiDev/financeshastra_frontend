import React, { useState, useRef } from 'react';
import { RiHome5Fill, RiFundsLine } from 'react-icons/ri';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import { GiPieChart } from 'react-icons/gi';
import { SlBookOpen } from 'react-icons/sl';
import { FaChevronDown } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  const [footerStockDropdownOpen, setFooterStockDropdownOpen] = useState(false);
  const [footerPortfolioDropdownOpen, setFooterPortfolioDropdownOpen] = useState(false);
  const [footerMutualFundsDropdownOpen, setFooterMutualFundsDropdownOpen] = useState(false);

  const footerStockDropdownRef = useRef(null);
  const footerPortfolioDropdownRef = useRef(null);
  const footerMutualFundsDropdownRef = useRef(null);

  const toggleFooterStockDropdown = () => {
    setFooterStockDropdownOpen(!footerStockDropdownOpen);
  };

  const toggleFooterPortfolioDropdown = () => {
    setFooterPortfolioDropdownOpen(!footerPortfolioDropdownOpen);
  };

  const toggleFooterMutualFundsDropdown = () => {
    setFooterMutualFundsDropdownOpen(!footerMutualFundsDropdownOpen);
  };

  const renderStockDropdown = () => <div className="dropdown">Stock Options</div>;
  const renderPortfolioDropdown = () => <div className="dropdown">Portfolio Options</div>;
  const renderMutualFundsDropdown = () => <div className="dropdown">Mutual Fund Options</div>;

  return (
    <ul className="footer-nav">
      <li>
        <a href="/home" className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><RiHome5Fill /></i>
            <span>Home</span>
          </div>
        </a>
      </li>
      <li className="stock-dropdown" ref={footerStockDropdownRef}>
        <a href="javascript:void(0)" onClick={toggleFooterStockDropdown} className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><LuChartNoAxesCombined /></i>
            <span>Stocks</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </a>
        {footerStockDropdownOpen && renderStockDropdown()}
      </li>
      <li className="portfolio-dropdown" ref={footerPortfolioDropdownRef}>
        <a href="#" onClick={toggleFooterPortfolioDropdown} className="footer-link">
          <div className="footer-item selected">
            <i className="footer-icon"><GiPieChart /></i>
            <span >Portfolio</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </a>
        {footerPortfolioDropdownOpen && renderPortfolioDropdown()}
      </li>
      <li className="mutualfunds-dropdown" ref={footerMutualFundsDropdownRef}>
        <a href="javascript:void(0)" onClick={toggleFooterMutualFundsDropdown} className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><RiFundsLine /></i>
            <span>MFs</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </a>
        {footerMutualFundsDropdownOpen && renderMutualFundsDropdown()}
      </li>
      <li style={{display: "none"}}>
        <a href="/learn" className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><SlBookOpen /></i>
            <span>Markets</span>
          </div>
        </a>
      </li>
    </ul>
  );
};

export default Footer;