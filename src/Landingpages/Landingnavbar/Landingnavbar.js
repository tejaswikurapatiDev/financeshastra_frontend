import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import useSubscriptionStatus from "../../Navbar/Hooks/useSubscriptionStatus";
import { FaBell } from "react-icons/fa";
import notiimg2 from "../../assest/mobile.png";
import { LuDot } from "react-icons/lu";
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";
import { FaUserCircle, FaSearch, FaChevronDown, FaUser } from "react-icons/fa";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import { VscBell } from "react-icons/vsc";
import { FaCircleQuestion } from "react-icons/fa6";
import { PiHandCoins } from "react-icons/pi";
import { RiHome5Fill, RiBriefcase4Line } from "react-icons/ri";
import { SlBookOpen } from "react-icons/sl";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Store/Slices/searchDataSlice";
import { debounce, set } from "lodash";
import Cookies from "js-cookie";

import logo from "../../assest/Logo design (1).png";
import Darkmodelogo from "../../assest/navlogo.png";
import "./Landingnavbar.css";
import { API_BASE_URL } from "../../config";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
// Dropdown menu components
const StockDropdownMenu = () => (
  <div className="stockmenu">
    <div className="stockmenu-column">
      <ul>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/Stock-Screener"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Stock Screener
            <p>
              Discover stocks based on various filters and criteria to make
              informed decisions.
            </p>
          </Link>
        </li>

        <li style={{ listStyle: "none" }}>
          <Link
            to="/stocks/best-stock"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Best Stock
            <p>
              Explore the best stocks for investment based on analysis and
              trends.
            </p>
          </Link>
        </li>
        <li>
          <Link
            to="/stocks/high-growth-stocks"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            High Growth Stocks
            <p>
              Find stocks that are expected to grow rapidly in the upcoming
              years.
            </p>
          </Link>
        </li>
        <li>
          <Link
            to="/nifty-50-stocks-list"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Nifty 50 Companies
            <p>
              Track the top 50 companies listed on the National Stock Exchange
              of India.
            </p>
          </Link>
        </li>
      </ul>
    </div>
    <div className="stockmenu-column">
      <ul>
        <li>
          <Link
            to="/nifty-100-stocks-list"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Nifty 100 Companies
            <p>
              Explore all 500 companies listed on the Nifty index to diversify
              your portfolio.
            </p>
          </Link>
        </li>
        <li>
          <Link
            to="/small-cap-stocks"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Small Cap
            <p>Invest in smaller companies with high potential for growth.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/mid-cap-stocks"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Mid Cap
            <p>Discover mid-sized companies with a strong growth trajectory.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/large-cap-stocks"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Large Cap
            <p>Focus on large, established companies with stable returns.</p>
          </Link>
        </li>
        <li>
          {/*<Link
            to="/stock-themes"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Stock Themes
            <p>Research is key before buying any stock</p>
          </Link>*/}
        </li>
      </ul>
    </div>
  </div>
);

const PortfolioDropdownMenu = () => (
  <div className="dropdown-menu">
    <Link
      to="/portfolio"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      My Portfolio
      <p>Your financial navigator</p>
    </Link>

    <Link
      to="/portfolio-risk"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Portfolio Risk Analysis
      <p>Risk evaluation and insights(coming soon)</p>
    </Link>

    <Link
      to="/stock-watchlist"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Watchlist
      <p>Monitor, assess, and improve</p>
    </Link>
  </div>
);

const LearnDropdownMenu = () => (
  <div className="learn-lanmenu">
    <Link
      to="/stock-market-news"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Stock News
      <p>Discover what's happening in the stock markets in real-time</p>
    </Link>

    <Link
      to="/markets/ipo-details"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      IPO Details
      <p>Key Information on the Latest IPO Trends</p>
    </Link>

    <Link
      to="/markets/earnings"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Quarterly Earnings
      <p>Monitor thorough quarterly earnings summaries</p>
    </Link>

  </div>
);
const MutualFundsDropdownMenu = () => (
  <div className="mutualstockmenu">
    <div className="stockmenu-column">
      <ul>
        <li>
          <Link
            to="/mutual-funds/top-rated-mutual-funds"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Top Rated Funds
            <p>Focus on risk management and long-term growth.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/mutual-funds/fund-screener"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Fund Screener
            <p>Efficient filter and compare investment options.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/mutual-funds/best-small-cap-fund"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Best Small Cap Fund
            <p>Strong returns by investing in high-growth opportunities.</p>
          </Link>

          {/*<Link
            to="/market"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Equity (ETFs)
          </Link>*/}
        </li>
      </ul>
    </div>
    <div className="stockmenu-column">
      <ul>
        <li>
          <Link
            to="/mutual-funds/best-growth-funds"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Best Growth Fund
            <p>Focus on high-potential growth.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/mutual-funds/best-flex-cap-fund"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Best Flex Cap Fund
            <p>Invest in companies poised for future and today's growth.</p>
          </Link>
        </li>
        <li>
          <Link
            to="/mutual-funds/exchange-traded-funds"
            className="dropdown-item"
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            Best ETF Fund
            <p>Diverse and cost-effective investment strategy.</p>
          </Link>

          <div>
            {/*<Link
              to="/gold"
              className="dropdown-item"
              style={{
                display: "block",
                textDecoration: "none",
              }}
            >
              Gold (ETFs)
            </Link>*/}
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const renderhomeDropdown = () => (
  <div className="home-menu">
    <Link
      to="/home"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Dashboard
    </Link>

    <Link
      to="/portfolio-analysis-tool"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Portfolio Analysis
    </Link>

    <Link
      to="/stock-watchlist"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Watchlist
    </Link>

    <Link
      to="/stock-research-reports"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Research
    </Link>

    <Link
      to="/security"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Security
    </Link>

    <Link
      to="/user-settings-dashboard"
      className="dropdown-item"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      Setting
    </Link>
  </div>
);
 const renderlearnDropdown = (darkMode) => (
  <div className={darkMode ? "learn-menudarkerrrrmode" : "learn-menu"}>
      <Link
        to="/stock-market-news"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",


        }}>
        Stock News
        <p>Discover what's happening in the stock markets in real-time</p>
      </Link>

      {/*<Link to="/blogs"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
         
         
        }}>
          Blogs
          <p>Investment Knowledge Hub</p>
        </Link>*/}

      <Link
        to="/markets/ipo-details"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        IPO Details
        <p>Key Information on the Latest IPO Trends</p>
      </Link>

      <Link
        to="/markets/earnings"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",


        }}>
        Quarterly Earnings
        <p>Monitor thorough quarterly earnings summaries</p>
      </Link>


      {/*<Link to="/learncard"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
        >
          Learn
          <p>
            {" "}
            Knowledge is the key to successful trading—learn, adapt, and grow
          </p>
        </Link>*/}
    </div>

  );

const UserDropdownMenu = () => (
  <div className="user-menu">
    <div className="dropdown-item">
      <Link to="/userDetails">
        <FaUser className="dropdown-icon" />
        My Profile
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/help">
        <FaCircleQuestion className="dropdown-icon" />
        Help Center
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/">
        <FaUserCircle className="dropdown-icon" />
        Logout
      </Link>
    </div>
  </div>
);

const Landingnavbar = () => {
  // State for different dropdowns
  const [dropdowns, setDropdowns] = useState({
    stock: false,
    user: false,
    footerStock: false,
    portfolio: false,
    mutualFunds: false,
    footerMutualFunds: false,
    footerPortfolio: false,
    learn: false,
  });
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);

  const [storedName, setUsername] = useState("");
   
  const { user } = useContext(UserProfileContext);
  const [searchInputText, setSearchInputText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isLogedin, setIsLogedin] = useState(false);
  const userDropdownRef = useRef(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const dropdownRef = useRef(null); // Reference for dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  //state for search suggestion dropdown
  const footerLearnDropdownRef = useRef(null);
  const footerhomeDropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
   const [footerLearnDropdownOpen, setFooterLearnDropdownOpen] = useState(false);
  const [footerhomeDropdownOpen, setFooterhomeDropdownOpen] = useState(false);
  // Refs for handling click outside
  const dropdownRefs = {
    footerPortfolio: useRef(null),
    footerMutualFunds: useRef(null),
    stock: useRef(null),
    user: useRef(null),
    footerStock: useRef(null),
    portfolio: useRef(null),
    mutualFunds: useRef(null),
    learn: useRef(null),
  };
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting data from redux store
  const getDataFromStore = useSelector((store) => store.searchData.searchData);

  // Toggle dropdown functions
  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };
  const toggleFooterhomeDropdown = () => {
    setFooterhomeDropdownOpen(!footerhomeDropdownOpen);
  };
   const toggleFooterlearnDropdown = () => {
    setFooterLearnDropdownOpen(!footerLearnDropdownOpen);
  };

  // API Call for search data
  const getAllData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/search/allInfo`);
      const data = await response.json();
      dispatch(setSearchData(data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  // Debounced search function
  const debounceSearch = useCallback(
    debounce((searchText) => {
      if (searchText) {
        const results = getDataFromStore.filter((item) => {
          const companyName = item.name ? item.name.toLowerCase() : "";
          const schemeName = item.Scheme_Name
            ? item.Scheme_Name.toLowerCase()
            : "";
          const sector = item.sector ? item.sector.toLowerCase() : "";
          const symbol = item.symbol ? item.symbol.toLowerCase() : "";

          return (
            companyName.includes(searchText.toLowerCase()) ||
            schemeName.includes(searchText.toLowerCase()) ||
            sector.includes(searchText.toLowerCase()) ||
            symbol.includes(searchText.toLowerCase())
          );
        });
        setFilterData(results);
      } else {
        setFilterData([]);
      }
    }, 300),
    [getDataFromStore]
  );

  const onLogout = () => {
    localStorage.clear();
    Cookies.remove("jwtToken", { path: "/" });
    setIsLogedin(false);
    navigate("/login");
  };

  // Get all data on component mount
  useEffect(() => {
    
    const token = Cookies.get("jwtToken");
    const isTokenExpired = (token) => {
      if (!token) return true; // If no token, consider it expired

      try {
        const { exp } = jwtDecode(token);
        if (!exp) return true; // If no expiration time, consider expired

        return exp * 1000 < Date.now(); // Compare expiry time with current time
      } catch (error) {
        return true; // If token is invalid, consider it expired
      }
    };
    if (token) {
      if (isTokenExpired(token)) {
        onLogout();
        setIsLogedin(false);
      } else {
        setIsLogedin(true);
      }

      //setIsLogedin(true);
    }
    getAllData();
  }, []);
  const displayedNotifications = notifications.data;

  useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
  
    }, []);

  // Apply debounced search when input changes
  useEffect(() => {
    fetchNotifications();
    debounceSearch(searchInputText);
    return () => debounceSearch.cancel();
  }, [searchInputText, debounceSearch]);

  const handleSearchItemClick = (data) => {
    setSearchInputText(data.name || data.Scheme_Name);
    setFilterData([]);
    setShowDropdown(false);
    if (data.id || data.symbol) {
      navigate(`/stockhandle/${data.id || data.symbol}`, {
        state: { item: data },
      });
    } else if (data.ID) {
      navigate(`/mutualfundgrowth/${data.ID}`, {
        state: { item: data },
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications?notificationId=${id}`,
        { method: "PATCH" }
      ); // Replace with your API

      if (!response.ok) throw new Error("Failed to mark as read");

      setNotifications((prevNotifications) => {
        return prevNotifications.data.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        );
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
       if (
        footerLearnDropdownRef.current &&
        !footerLearnDropdownRef.current.contains(event.target)
      ) {
        setFooterLearnDropdownOpen(false);
      }
      if (
        footerhomeDropdownRef.current &&
        !footerhomeDropdownRef.current.contains(event.target)
      ) {
        setFooterhomeDropdownOpen(false);
      }
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdowns((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const renderUserDropdown = () => (
    <div className={darkMode ? "user-menudarkerrmode" : "user-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/userDetails">
          <FaUser
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          My Profile
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/help">
          <FaCircleQuestion
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          Help Center
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <button className="butn" onClick={onLogout} type="button">
          <FaUserCircle
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          Logout
        </button>
      </div>
     
    </div>
  );

  const handleSearchInputText = (item) => {
    setSearchInputText(item);
    setFilterData([]);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <>
      <nav className={darkMode ? "darkmodenavbar" : "navbar"}>
        <div className="navbar-logo">
          <img
            src={darkMode ? Darkmodelogo : logo}
            alt="FinanceShastra Logo"
            className={darkMode ? "logo-darkimage" : "logo-image"}
          />
        </div>

        <ul className={darkMode ? "navbar-linksdarkerrrrmode" : "navbar-links"}>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li
            className="stock-dropdown"
            ref={dropdownRefs.stock}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, stock: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, stock: false }))
            }
          >
            <Link to="" onClick={() => toggleDropdown("stock")}>
              Stocks
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.stock && <StockDropdownMenu />}
          </li>

          <li
            className="mutualfunds-dropdown"
            ref={dropdownRefs.mutualFunds}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, mutualFunds: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, mutualFunds: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("mutualFunds")}>
              Mutual Funds
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.mutualFunds && <MutualFundsDropdownMenu />}
          </li>

          <li
            className="learn-dropdown"
            ref={dropdownRefs.learn}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, learn: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, learn: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("learn")}>
              Markets
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.learn && <LearnDropdownMenu />}
          </li>

          <li
            className="portfolio-dropdown"
            ref={dropdownRefs.portfolio}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, portfolio: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, portfolio: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("portfolio")}>
              Portfolio Manager
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.portfolio && <PortfolioDropdownMenu />}
          </li>
        </ul>

        <div className={darkMode ? "navbar-darksearch" : "navbar-search"} ref={containerRef}>
          <input
            type="text"
            placeholder="Search for Stocks, Mutual..."
            value={searchInputText}
            onChange={(e) => {
              setSearchInputText(e.target.value);
              setShowDropdown(true);
            }}
          />
          <FaSearch
            className={darkMode ? "searchdarkicon" : "search-icon"}
            style={darkMode ? { color: "white" } : {}}
          />
          {/* show search results  */}
          {showDropdown && (
            <div>
              {filterData.length > 0 ? (
                <ul>
                  {filterData.map((data) => {
                    return (
                      <li
                        key={data.id}
                        onClick={() => {
                          handleSearchItemClick(data);
                        }}
                      >
                        {data.name} {data.Scheme_Name} {data.sector}{" "}
                        {data.symbol}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                searchInputText && <p>No result found</p>
              )}
            </div>
          )}
        </div>

        {isLogedin ? (
          <>
            {!isLoading && !isSubscribed && (
              <h4
                className="subscritebutton"
                onClick={() => navigate("/subscription")}
              >
                Subscribe
              </h4>
            )}
            <FaBell
              className={
                darkMode ? "icon bell-darkerrmodeicon" : "icon bell-icon"
              }
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && displayedNotifications?.length > 0 && (
              <div className="dropdown-contentnotilanding" ref={dropdownRef}>
                {displayedNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() =>
                      !notif.is_read && markNotificationAsRead(notif.id)
                    }
                    className={`notification-card ${
                      notif.is_read ? "read" : "unread"
                    }`}
                    style={{
                      backgroundColor: notif.is_read ? "#f0f0f0" : "#e0f7fa",
                      color: notif.is_read ? "#757575" : "#000",
                      cursor: notif.is_read ? "default" : "pointer",
                    }}
                  >
                    <div className="notification-header">
                      <div className="notificationall-header">
                        <div>
                          <img
                            src={notiimg2}
                            alt="Notification"
                            className="notification-img"
                          />
                        </div>
                      </div>
                      <div className="notification-details">
                        <p
                          className="notification-title"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {notif.message}
                        </p>
                        <p className="notification-date">{notif.created_at}</p>
                      </div>
                      {!notif.is_read && (
                        <LuDot
                          className="dotnotifyicon"
                          style={{ color: "green" }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {/* View All Button */}
                {!showAll && (
                  <button className="view-all" onClick={() => setShowAll(true)}>
                    View all notifications
                  </button>
                )}
              </div>
            )}
            <div className={darkMode ? "psectiondarkmode" : "profile-section"}>
              <li ref={userDropdownRef} className="user-info">
                <div className="user-trigger" to="#" onClick={toggleUserDropdown}>
                  <FaUserCircle
                    className={
                      darkMode ? "iconuser-darkerrmodeicon" : "iconuser-icon"
                    }
                  />
               
                <span
                  className={darkMode ? "willamnamedarkmode" : "willamname"}
                >
                  {storedName.split(" ")[0]}
                </span>
                </div>
                {userDropdownOpen && renderUserDropdown()}
              </li>
            </div>
          </>
        ) : (
          /*<div className="landingnavbar-icons">
            <VscBell className="landingnavbaricon bell-icon" />
            <button
              className="landingnavbar-buttonlogin-button"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>*/
          <div className="landingnavbar-icons">
            <button
              className="landingnavbar-buttonregister-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="landingnavbar-buttonlogin-button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        )}
      </nav>

      <ul className="footer-nav">
        <li className="learn-dropdown" ref={footerhomeDropdownRef}>
          <a
            href="javascript:void(0)"
            onClick={toggleFooterhomeDropdown}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <RiHome5Fill />
              </i>
              <span>Home</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </a>
          {footerhomeDropdownOpen && renderhomeDropdown()}
        </li>
        <li className="stock-dropdown" ref={dropdownRefs.footerStock}>
          <Link
            to="#"
            onClick={() => toggleDropdown("footerStock")}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <LuChartNoAxesCombined />
              </i>
              <span>Stocks</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.footerStock && <StockDropdownMenu />}
        </li>

        <li className="portfolio-dropdown" ref={dropdownRefs.footerPortfolio}>
          <Link
            to="#"
            onClick={() => toggleDropdown("footerPortfolio")}
            className="footer-link"
          >
            <div className="footer-item selected">
              <i className="footerportfolio-icon">
                <RiBriefcase4Line />
              </i>
              <span>Portfolio</span>
              <FaChevronDown className="porchevron-icon" />
            </div>
          </Link>
          {dropdowns.footerPortfolio && <PortfolioDropdownMenu />}
        </li>

        <li
          className="mutualfunds-dropdown"
          ref={dropdownRefs.footerMutualFunds}
        >
          <Link
            to="#"
            onClick={() => toggleDropdown("footerMutualFunds")}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <PiHandCoins />
              </i>
              <span>MFs</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.footerMutualFunds && <MutualFundsDropdownMenu />}
        </li>

        <li className="learn-dropdown" ref={footerLearnDropdownRef}>
                 <button
                 type="button"
                   onClick={toggleFooterlearnDropdown}
                   className="footer-link"
                   style={{ border: "none", backgroundColor: "transparent"}}
                 >
                   <div className="footer-item">
                     <i className="footer-icon">
                       <SlBookOpen />
                     </i>
                     <span style={{color: "#24b676"}}>Markets</span>
                     <FaChevronDown className="chevron-icon" />
                     {footerLearnDropdownOpen && renderlearnDropdown()}
                   </div>
                 </button>
               </li>
      </ul>
    </>
  );
};

export default Landingnavbar;
