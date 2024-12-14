import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle, FaSearch, FaChevronDown, FaUser } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

import logo from "../assest/Logo design (1).png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [footerStockDropdownOpen, setFooterStockDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [mutualFundsDropdownOpen, setMutualFundsDropdownOpen] = useState(false);
  const [footerMutualFundsDropdownOpen, setFooterMutualFundsDropdownOpen] = useState(false);
  const [footerPortfolioDropdownOpen, setFooterPortfolioDropdownOpen] = useState(false);
  
const footerPortfolioDropdownRef = useRef(null);
  const footerMutualFundsDropdownRef = useRef(null);
  const stockDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const footerStockDropdownRef = useRef(null);
  const portfolioDropdownRef = useRef(null);
  const mutualFundsDropdownRef = useRef(null);

  const toggleStockDropdown = () => {
    setStockDropdownOpen(!stockDropdownOpen);
  };

  const toggleFooterStockDropdown = () => {
    setFooterStockDropdownOpen(!footerStockDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };
  const toggleMutualFundsDropdown = () => {
    setMutualFundsDropdownOpen(!mutualFundsDropdownOpen);

  };
  const toggleFooterMutualFundsDropdown = () => {
    setFooterMutualFundsDropdownOpen(!footerMutualFundsDropdownOpen);
  };
  const togglePortfolioDropdown = () => {
    setPortfolioDropdownOpen(!portfolioDropdownOpen);
  };
  const toggleFooterPortfolioDropdown = () => {
    setFooterPortfolioDropdownOpen(!footerPortfolioDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stockDropdownRef.current && !stockDropdownRef.current.contains(event.target)) {
        setStockDropdownOpen(false);
      }
      if (mutualFundsDropdownRef.current && !mutualFundsDropdownRef.current.contains(event.target)) {
        setMutualFundsDropdownOpen(false);
      }
      if (footerMutualFundsDropdownRef.current && !footerMutualFundsDropdownRef.current.contains(event.target)) {
        setFooterMutualFundsDropdownOpen(false);
      }
      if (footerStockDropdownRef.current && !footerStockDropdownRef.current.contains(event.target)) {
        setFooterStockDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (portfolioDropdownRef.current && !portfolioDropdownRef.current.contains(event.target)) {
        setPortfolioDropdownOpen(false);
      }
      if (footerPortfolioDropdownRef.current && !footerPortfolioDropdownRef.current.contains(event.target)) {
        setFooterPortfolioDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderStockDropdown = () => (
    <div className="stockmenu">
      <div className="stockmenu-column">
        <ul>
          <li>
             <div className="dropdown-item">
            <Link to="/stock">Stock Screener
            <p>Discover stocks based on various filters and criteria to make informed decisions.</p></Link>
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/beststock">Best Stock
            <p>Explore the best stocks for investment based on analysis and trends.</p></Link>
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/highgrowth">High Growth Stocks
            <p>Find stocks that are expected to grow rapidly in the upcoming years.</p></Link>
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/niftystock">Nifty 50 Companies
            <p>Track the top 50 companies listed on the National Stock Exchange of India.</p></Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="stockmenu-column">
        <ul>
          <li>
          <div className="dropdown-item">
            <Link to="/nifty">Nifty 100 Companies
            <p>Explore all 500 companies listed on the Nifty index to diversify your portfolio.</p></Link>
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/smallcap">Small Cap
            <p>Invest in smaller companies with high potential for growth.</p></Link>
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/midcap">Mid Cap
            <p>Discover mid-sized companies with a strong growth trajectory.</p></Link> 
            </div>
          </li>
          <li>
          <div className="dropdown-item">
            <Link to="/largecap">Large Cap
            <p>Focus on large, established companies with stable returns.</p></Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderPortfolioDropdown = () => (
    <div className="dropdown-menu">
      <div className="dropdown-item">
        <Link to="/portfolio">My Portfolio
        <p>Your financial navigator</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/portfolio-risk">Portfolio Risk Analysis
        <p>Risk evaluation and insights</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/stockwatchlist">Watchlist
        <p>Monitor, assess, and improve</p></Link>
      </div>
    </div>
  );

  const renderUserDropdown = () => (
    <div className="user-menu">
       <div className="dropdown-item">
       <Link to="/profile"><FaUser className="dropdown-icon" />
       My Profile</Link>
      </div>
      <div className="dropdown-item">
      <Link to="/help"><FaCircleQuestion className="dropdown-icon" />
      Help Center</Link>
      </div>
      <div className="dropdown-item">
      <Link to="/"> <FaUserCircle className="dropdown-icon" />
      Logout</Link>
      </div>
    </div>
  );


  const renderMutualFundsDropdown = () => (
    <div className="stockmenu">
      <div className="stockmenu-column">
      <ul>
      <li>
      <div className="dropdown-item">
        <Link to="/mutualfund">Top Rated Funds
        <p>Focus on risk management and long-term growth.</p>
        </Link>
        </div>
      </li>
    <li>
    <div className="dropdown-item">
        <Link to="/Fundscreenerregular">Fund Screener
        <p>Efficient filter and compare investment options.</p></Link>
        </div>
        </li>
        <li>
        <div className="dropdown-item">
      
        <Link to="/bestsmallcapregular">Best Small Cap Fund
        <p>Strong returns by investing in high-growth opportunities.</p></Link>
        </div>
        <div className="dropdown-item">
      
        <Link to="/market">Equity (ETFs)
        </Link>
        </div>
        </li>
        </ul>
        </div>
      <div className="stockmenu-column">
        <ul>
      <li>
      <div className="dropdown-item">
        <Link to="/Bestgrowthdirect">Best Growth Fund
        <p>Focus on high-potential growth.</p></Link>
        </div>
        </li>
      <li>
      <div className="dropdown-item">
        <Link to="/flexregular">Best Flex Cap Fund
        <p>Invest in companies poised for future and today’s growth.</p></Link>
        </div>
        </li>
      <li>
      <div className="dropdown-item">
        <Link to="/etfregular">Best ETF Fund
        <p>Diverse and cost-effective investment strategy.</p></Link>
        </div>
        <div className="dropdown-item">
      
      <Link to="/gold"> Gold (ETFs)
      </Link>
      </div>
        </li>
        </ul>
    </div>
    </div>
   
  );
 
    const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="FinanceShastra Logo" className="logo-image" />
        </div>

        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
         

          <li className="stock-dropdown" ref={stockDropdownRef}>
            <Link to="#"onClick={toggleStockDropdown}>
              Stocks
              <FaChevronDown onClick={toggleStockDropdown} className="chevron-icon" />
            </Link>
            {stockDropdownOpen && renderStockDropdown()}
          </li>
          <li className="mutualfunds-dropdown" ref={mutualFundsDropdownRef}>
  <Link to="#"onClick={toggleMutualFundsDropdown}>
    Mutual Funds
    <FaChevronDown onClick={toggleMutualFundsDropdown} className="chevron-icon" />
  </Link>
  {mutualFundsDropdownOpen && renderMutualFundsDropdown()}
</li>

          <li className="portfolio-dropdown" ref={portfolioDropdownRef}>
          <Link to="#" onClick={togglePortfolioDropdown}>
          Portfolio Manager
              
              <FaChevronDown onClick={togglePortfolioDropdown} className="chevron-icon" />
            </Link>
            {portfolioDropdownOpen && renderPortfolioDropdown()}
          </li>
        </ul>

        <div className="navbar-search">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>
        
        <h4  className="subscritebutton" onClick={() => navigate('/pricehalf')} >
            Subscribe
        </h4>
        <div className="navbar-icons">
  <FaBell className="icon bell-icon" />
  <div className="profile-section">
  <li className="" ref={userDropdownRef}>
    <Link to="#" onClick={toggleUserDropdown}>
      <FaUserCircle className="iconuser-icon" />
 
    </Link>
    <span className="willamname">William</span>
    {userDropdownOpen && renderUserDropdown()}
  </li>
</div>

    </div>
  

      </nav>

      <ul className="footer-nav">
  <li><a href="/home">Home</a></li>
  
  <li className="stock-dropdown" ref={footerStockDropdownRef}>
    <a href="#" onClick={toggleFooterStockDropdown} className="footer-link">
      Stocks
      <FaChevronDown className="chevron-icon" />
    </a>
    {footerStockDropdownOpen && renderStockDropdown()}
  </li>
  
  <li className="mutualfunds-dropdown" ref={footerMutualFundsDropdownRef}>
  <a href="#" onClick={toggleFooterMutualFundsDropdown} className="footer-link">
    Mutual Funds
    <FaChevronDown className="chevron-icon" />
  </a>
  {footerMutualFundsDropdownOpen && renderMutualFundsDropdown()}
</li>
  
<li className="portfolio-dropdown" ref={footerPortfolioDropdownRef}>
    <a href="#" onClick={toggleFooterPortfolioDropdown} className="footer-link">
      Portfolio Manager
      <FaChevronDown className="chevron-icon" />
    </a>
    {footerPortfolioDropdownOpen && renderPortfolioDropdown()}
  </li>
  <li><a href="#profile">Profile</a></li>
</ul>

    </>
  );
};

export default Navbar;