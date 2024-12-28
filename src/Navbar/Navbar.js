import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle, FaSearch, FaChevronDown, FaUser } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Navbar.css";
import { PiHandCoins } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { RiHome5Fill } from 'react-icons/ri'; // Home Icon
import { SlBookOpen } from 'react-icons/sl'; // Book Icon
import { RiBriefcase4Line } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";


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
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);

  const footerPortfolioDropdownRef = useRef(null);
  const footerMutualFundsDropdownRef = useRef(null);
  const stockDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const footerStockDropdownRef = useRef(null);
  const portfolioDropdownRef = useRef(null);
  const mutualFundsDropdownRef = useRef(null);
  const learnDropdownRef = useRef(null);


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
  const togglelearnDropdown = () => {
    setLearnDropdownOpen(!learnDropdownOpen);
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
      if (learnDropdownRef.current && !learnDropdownRef.current.contains(event.target)) {
        setLearnDropdownOpen(false);
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
              <Link to="/StockScreenerList">Stock Screener
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
  const renderlearnDropdown = () => (
    <div className="learn-menu">
      <div className="dropdown-item">
        <Link to="/stockNewsComponent">Stock News
          <p>Discover what's happening in the stock markets in real-time</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/blogsComponent">Blogs
          <p>Investment Knowledge Hub</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/ipoComponent">IPO Details
          <p>Key Information on the Latest IPO Trends</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/stockwatchlist">Market Insights
          <p>Keep up with in-depth market insights</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/earningsInsightLearn">Quarterly Earnings
          <p>Monitor thorough quarterly earnings summaries</p></Link>
      </div>
      <div className="dropdown-item">
        <Link to="/learncard">Learn
          <p> Knowledge is the key to successful trading—learn, adapt, and grow</p></Link>
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
    <div className="mutualstockmenu">
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
              <Link to="/fundscreenerregular">Fund Screener
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
              <Link to="/bestgrowthregular">Best Growth Fund
                <p>Focus on high-potential growth.</p></Link>
            </div>
          </li>
          <li>
            <div className="dropdown-item">
              <Link to="/mutualflex">Best Flex Cap Fund
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


          <li
            className="stock-dropdown"
            ref={stockDropdownRef}
            onMouseEnter={() => setStockDropdownOpen(true)} // Show dropdown on hover
            onMouseLeave={() => setStockDropdownOpen(false)} // Hide dropdown when mouse leaves
          >
            <Link to="#" onClick={toggleStockDropdown}> {/* Toggle dropdown on click */}
              Stocks
              <FaChevronDown className="chevron-icon" /> {/* Chevron icon */}
            </Link>
            {stockDropdownOpen && renderStockDropdown()} {/* Render dropdown when open */}
          </li>
          <li className="mutualfunds-dropdown" ref={mutualFundsDropdownRef} onMouseEnter={() => setMutualFundsDropdownOpen(true)}
            onMouseLeave={() => setMutualFundsDropdownOpen(false)}>
            <Link to="#" onClick={toggleMutualFundsDropdown}>
              Mutual Funds
              <FaChevronDown onClick={toggleMutualFundsDropdown} className="chevron-icon" />
            </Link>
            {mutualFundsDropdownOpen && renderMutualFundsDropdown()}
          </li>

          <li className="learn-dropdown" ref={learnDropdownRef} onMouseEnter={() => setLearnDropdownOpen(true)}
            onMouseLeave={() => setLearnDropdownOpen(false)}>
            <Link to="#" onClick={togglelearnDropdown}>
              Learn & Insights
              <FaChevronDown onClick={togglelearnDropdown} className="chevron-icon" />
            </Link>
            {learnDropdownOpen && renderlearnDropdown()}
          </li>
          <li className="portfolio-dropdown" ref={portfolioDropdownRef} onMouseEnter={() => setPortfolioDropdownOpen(true)}
            onMouseLeave={() => setPortfolioDropdownOpen(false)}>
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

        <h4 className="subscritebutton" onClick={() => navigate('/pricehalf')} >
          Subscribe
        </h4>
        <div className="navbar-icons">
          <FaBell className="icon bell-icon" />
          <div className="profile-section">
            <li className="" ref={userDropdownRef} >
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
      <li>
        <a href="/home" className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><RiHome5Fill /></i>
            <span>Home</span>
          </div>
        </a>
      </li>
      <li className="stock-dropdown" ref={footerStockDropdownRef}>
        <a href="#" onClick={toggleFooterStockDropdown} className="footer-link">
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
            <i className="footerportfolio-icon"><RiBriefcase4Line /></i>
            <span>Portfolio</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </a>
        {footerPortfolioDropdownOpen && renderPortfolioDropdown()}
      </li>
      <li className="mutualfunds-dropdown" ref={footerMutualFundsDropdownRef}>
        <a href="#" onClick={toggleFooterMutualFundsDropdown} className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><PiHandCoins /></i>
            <span>MFs</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </a>
        {footerMutualFundsDropdownOpen && renderMutualFundsDropdown()}
      </li>
      <li>
        <a href="/learn" className="footer-link">
          <div className="footer-item">
            <i className="footer-icon"><SlBookOpen /></i>
            <span>Learn</span>
          </div>
        </a>
      </li>
    </ul>

    </>
  );
};

export default Navbar;