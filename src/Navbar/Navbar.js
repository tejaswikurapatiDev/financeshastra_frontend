import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import unlockstockthemeimg from "../assest/unlocknavbarimg.png";
import { DarkModeContext } from "../Portfoilo/context/DarkModeContext";
import { UserProfileContext } from "../Portfoilo/context/UserProfileContext";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Navbar.css";
import { PiHandCoins } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiHome5Fill } from "react-icons/ri"; // Home Icon
import { SlBookOpen } from "react-icons/sl"; // Book Icon
import { RiBriefcase4Line } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import notiimg1 from "../assest/fst1.webp";
import notiimg2 from "../assest/mobile.png";
import notiimg3 from "../assest/letter.png";
import notiimg4 from "../assest/girl.jpg";
import notiimg5 from "../assest/mm.jpeg";
import notiimg6 from "../assest/smartphone.png";
import notiimg7 from "../assest/video.png";
import notiimg8 from "../assest/ipoo.webp";
import notiimg9 from "../assest/images.jpg";
import notiimg10 from "../assest/portra.webp";
import Cookies from "js-cookie";
import logo from "../assest/Logo design (1).png";
import Darkmodelogo from "../assest/navlogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { API_BASE_URL } from "../config";
import useSubscriptionStatus from "./Hooks/useSubscriptionStatus";
import useSearch from "./Hooks/useSearch";

const Navbar = () => {
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [footerStockDropdownOpen, setFooterStockDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [mutualFundsDropdownOpen, setMutualFundsDropdownOpen] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [footerMutualFundsDropdownOpen, setFooterMutualFundsDropdownOpen] =
    useState(false);
  const [footerhomeDropdownOpen, setFooterhomeDropdownOpen] = useState(false);
  const [footerLearnDropdownOpen, setFooterLearnDropdownOpen] = useState(false);
  const [footerPortfolioDropdownOpen, setFooterPortfolioDropdownOpen] =
    useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null); // Reference for dropdown

  const [userName, setUsername] = useState("");
  const [isLogedin, setIsLogedin] = useState(false);
  const [isSubed, setisSubed] = useState(false);
  //state for search suggestion dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  //calling useSearch Hook
  useSearch();

  // Get search data from Redux store
  const searchData = useSelector((store) => store.searchData.searchData);
  //list and read notifications
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    /*const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired, Please login again.");
      navigate("/login");
      return;
    }*/
    const token = Cookies.get("jwtToken");

    if (token) {
      setIsLogedin(true);
      setisSubed(false);
    } else {
      setIsLogedin(false);
    }

    if (user) {
      setUsername(user);
      //setIsLogedin(true)
    }

    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        !event.target.closest(".navbar-search")
      ) {
        setFilterData([]);
        setSearchInputText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);
  /*start list notificaiton */

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

  /*end list notificaiton */

  /*Start read notificaiton */
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
  const displayedNotifications = notifications.data;

  /*
  const notifications = [
    {
      id: 1,
      img: notiimg1,
      title: "Upcoming Quadrant Future Tek IPO analysis",
      date: "Yesterday 11:15 AM",
    }, 
    {
      id: 4,
      img: notiimg4,
      title: "Sara commented on blog",
      date: "01 Jan, 2025 08:15 AM",
    },
    {
      id: 5,
      img: notiimg5,
      title: "Lucas commented on sanathans IPO",
      date: "28 Nov, 2024 11:15 AM",
    },
    {
      id: 7,
      img: notiimg7,
      title: "New courses available",
      date: "08 Nov, 2024 10:30 PM",
    },
    {
      id: 8,
      img: notiimg8,
      title: "Upcoming Laxmi Dental IPO",
      date: "05 Nov, 2024 09:03 AM",
    },
    {
      id: 9,
      img: notiimg9,
      title: "Your profile picture updated successfully.",
      date: "27 Oct, 2024 02:23 PM",
    },
    {
      id: 10,
      img: notiimg10,
      title: "Upcoming IGI IPO",
      date: "25 Oct, 2024 08:48 AM",
    },   
    {
      id: 13,
      img: notiimg4,
      title: "Sara commented on blog",
      date: "01 Jan, 2025 08:15 AM",
    },
    {
      id: 14,
      img: notiimg5,
      title: "Lucas commented on sanathans IPO",
      date: "28 Nov, 2024 11:15 AM",
    },
 
  ];
  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 10);
  */

  const footerPortfolioDropdownRef = useRef(null);
  const footerMutualFundsDropdownRef = useRef(null);
  const footerLearnDropdownRef = useRef(null);
  const footerhomeDropdownRef = useRef(null);
  const footerportfolioDropdownRef = useRef(null);
  const stockDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const footerStockDropdownRef = useRef(null);
  const portfolioDropdownRef = useRef(null);
  const mutualFundsDropdownRef = useRef(null);
  const learnDropdownRef = useRef(null);

  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Debounced search function that only filters existing data from Redux
  const debouncedSearch = useCallback(
    debounce((searchText) => {
      if (!searchText.trim()) {
        setFilterData([]);
        return;
      }

      const lowerSearchText = searchText.toLowerCase().trim();

      // Filter data from Redux without additional API calls
      const results = searchData.filter((item) => {
        const company = (item.company || "").toLowerCase();
        const schemeName = (item.Scheme_Name || "").toLowerCase();
        const sector = (item.sector || "").toLowerCase();
        const symbol = item.symbol ? item.symbol.toLowerCase() : "";

        return (
          company.includes(lowerSearchText) ||
          schemeName.includes(lowerSearchText) ||
          sector.includes(lowerSearchText) ||
          symbol.includes(lowerSearchText)
        );
      });

      setFilterData(results);
    }, 300),
    [searchData] // Only depend on searchData from Redux
  );

  const handleSearchInputText = (item) => {
    setSearchInputText(item);
    setFilterData([]);
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInputText(value);
    debouncedSearch(value);
  };

  // Close search results when clicking outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stockDropdownRef.current &&
        !stockDropdownRef.current.contains(event.target)
      ) {
        setStockDropdownOpen(false);
      }
      if (
        mutualFundsDropdownRef.current &&
        !mutualFundsDropdownRef.current.contains(event.target)
      ) {
        setMutualFundsDropdownOpen(false);
      }
      if (
        footerMutualFundsDropdownRef.current &&
        !footerMutualFundsDropdownRef.current.contains(event.target)
      ) {
        setFooterMutualFundsDropdownOpen(false);
      }
      if (
        footerhomeDropdownRef.current &&
        !footerhomeDropdownRef.current.contains(event.target)
      ) {
        setFooterhomeDropdownOpen(false);
      }
      if (
        footerportfolioDropdownRef.current &&
        !footerportfolioDropdownRef.current.contains(event.target)
      ) {
        setFooterPortfolioDropdownOpen(false);
      }
      if (
        footerLearnDropdownRef.current &&
        !footerLearnDropdownRef.current.contains(event.target)
      ) {
        setFooterLearnDropdownOpen(false);
      }
      if (
        footerStockDropdownRef.current &&
        !footerStockDropdownRef.current.contains(event.target)
      ) {
        setFooterStockDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        portfolioDropdownRef.current &&
        !portfolioDropdownRef.current.contains(event.target)
      ) {
        setPortfolioDropdownOpen(false);
      }
      if (
        footerPortfolioDropdownRef.current &&
        !footerPortfolioDropdownRef.current.contains(event.target)
      ) {
        setFooterPortfolioDropdownOpen(false);
      }
      if (
        learnDropdownRef.current &&
        !learnDropdownRef.current.contains(event.target)
      ) {
        setLearnDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

  }, []);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onLogout = () => {
    Cookies.remove("jwtToken");
    localStorage.clear();
    navigate("/");
  };

  const toggleStockDropdown = () => {
    setStockDropdownOpen(!stockDropdownOpen);
  };

  const toggleFooterStockDropdown = () => {
    setFooterStockDropdownOpen(!footerStockDropdownOpen);
  };
  const toggleFooterhomeDropdown = () => {
    setFooterhomeDropdownOpen(!footerhomeDropdownOpen);
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
  const toggleFooterlearnDropdown = () => {
    setFooterLearnDropdownOpen(!footerLearnDropdownOpen);
  };

  const renderStockDropdown = () => (
    <div className={darkMode ? "stockmenudarkerrrrmode" : "stockmenu"}>
      <div
        className={
          darkMode ? "stockmenu-columndarkerrrrmode" : "stockmenu-column"
        }
      >
        <ul>
          <li style={{ listStyle: "none" }}>
            <Link
              to="/Stock-Screener"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              to="/nifty-50-stocks-list/"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",
              }}
            >
              Mid Cap
              <p>
                Discover mid-sized companies with a strong growth trajectory.
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/large-cap-stocks"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",
              }}
            >
              Large Cap
              <p>Focus on large, established companies with stable returns.</p>
            </Link>
          </li>
          {/*<li>
              <Link to="/stockThemes"
               className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",
              
               
              }}>
                Stock Themes
                <p>Research is key before buying any stock</p>
              </Link>
           
          </li>*/}
        </ul>
      </div>
    </div>
  );

  const renderPortfolioDropdown = () => (
    <div className={darkMode ? "learn-menudarkerrrrmode" : "dropdown-menu"}>
      <Link
        to="/portfolio-management-dashboard"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
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
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
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
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
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

  const renderlearnDropdown = () => (
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

  const renderhomeDropdown = () => (
    <div className={darkMode ? "learn-homedarkerrrrmode" : "home-menu"}>
      {console.log("renderhome")}
      <Link
        to="/home"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/portfolio-analysis-tool"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Portfolio Analysis
      </Link>

      <Link
        to="/stock-watchlist"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Watchlist
      </Link>

      <Link
        to="/stock-research-reports"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Research
      </Link>

      <Link
        to="/security"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Security
      </Link>

      <Link
        to="/user-settings-dashboard"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        Setting
      </Link>
    </div>
  );
  const renderUserDropdown = () => (
    <div className={darkMode ? "user-menudarkerrmode" : "user-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/userDetails" className="butn">
          <FaUser
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          <div>My Profile</div>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/help" className="butn">
          <FaCircleQuestion
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          <div>Help Center</div>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <button className="butn" onClick={onLogout} type="button">
          <FaUserCircle
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          <div>Logout</div>
        </button>
      </div>
      {/* 
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <div onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
          Dark Mode
        </div>
      </div>*/}
    </div>
  );

  const renderMutualFundsDropdown = () => (
    <div
      className={darkMode ? "mutualstockmenudarkerrrrmode" : "mutualstockmenu"}
    >
      <div className="stockmenu-column">
        <ul>
          <li>
            <Link
              to="/mutual-funds/top-rated-mutual-funds"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",
              }}>
              Best Small Cap Fund
              <p>Strong returns by investing in high-growth opportunities.</p>
            </Link>

            {/* <Link to="/market"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",                
              }}>
                Equity (ETFs)</Link>*/}

          </li>
        </ul>
      </div>
      <div className="stockmenu-column">
        <ul>
          <li>
            <Link
              to="/mutual-funds/best-growth-funds"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
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

            <Link to="/mutual-funds/exchange-traded-funds"
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",
              }}>
              Best ETF Fund
              <p>Diverse and cost-effective investment strategy.</p>
            </Link>

            <div

            >
              {/*<Link to="/gold"
               className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
              style={{
                display: "block",
                textDecoration: "none",                
              }}> 
              Gold (ETFs)</Link>*/}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  const navigate = useNavigate();

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

  return (
    <>
      <nav className={darkMode ? "navbar-dark-mode" : "navbar"}>
        <div className="navbar-logo">
          <img
            src={darkMode ? Darkmodelogo : logo}
            alt="FinanceShastra Logo"
            onClick={() => navigate("/")}
            className="logo-image"
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul className={darkMode ? "navbar-links-dark-mode" : "navbar-links"}>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li
            className="stock-dropdown"
            ref={stockDropdownRef}
            onMouseEnter={() => setStockDropdownOpen(true)}
            onMouseLeave={() => setStockDropdownOpen(false)}
          >
            <Link to="#" onClick={toggleStockDropdown}>
              Stocks
              <FaChevronDown className="chevron-icon" />
            </Link>
            {stockDropdownOpen && renderStockDropdown()}
          </li>
          <li
            className="mutualfunds-dropdown"
            ref={mutualFundsDropdownRef}
            onMouseEnter={() => setMutualFundsDropdownOpen(true)}
            onMouseLeave={() => setMutualFundsDropdownOpen(false)}
          >
            <Link to="#" onClick={toggleMutualFundsDropdown}>
              Mutual Funds
              <FaChevronDown className="chevron-icon" />
            </Link>
            {mutualFundsDropdownOpen && renderMutualFundsDropdown()}
          </li>

          <li
            className="learn-dropdown"
            ref={learnDropdownRef}
            onMouseEnter={() => setLearnDropdownOpen(true)}
            onMouseLeave={() => setLearnDropdownOpen(false)}
          >
            <Link to="#" onClick={togglelearnDropdown}>
              Markets
              <FaChevronDown className="chevron-icon" />
            </Link>
            {learnDropdownOpen && renderlearnDropdown()}
          </li>
          <li
            className="portfolio-dropdown"
            ref={portfolioDropdownRef}
            onMouseEnter={() => setPortfolioDropdownOpen(true)}
            onMouseLeave={() => setPortfolioDropdownOpen(false)}
          >
            <Link to="#" onClick={togglePortfolioDropdown}>
              Portfolio Manager
              <FaChevronDown className="chevron-icon" />
            </Link>
            {portfolioDropdownOpen && renderPortfolioDropdown()}
          </li>
        </ul>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for Stocks, Mutual..."
            value={searchInputText}
            onChange={(e) => {
              handleSearchInputChange(e);
              setShowDropdown(true);
            }}
          />
          <FaSearch
            className={darkMode ? "search-dark-mode-icon" : "search-icon"}
          />

          {/* Show results only when there is input */}
          {showDropdown && (
            <div
              ref={searchResultsRef}
              className={`search-results-watchlist-sector ${filterData.length > 0 ? "active" : ""
                }`}
            >
              {filterData.length > 0 ? (
                <ul>
                  {filterData.map((data, index) => (
                    <li
                      key={data.id || index}
                      onClick={() => handleSearchItemClick(data)}
                    >
                      {data.name || ""} {data.Scheme_Name || ""}{" "}
                      {data.sector || ""} {data.symbol || ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No result found</p>
              )}
            </div>
          )}
        </div>
        {!isLoading && !isSubscribed && (
          <h4
            className="subscritebutton"
            onClick={() => navigate("/subscription")}
          >
            Subscribe
          </h4>
        )}

        <div className="navbar-icons">
          <div className="notification-all" ref={dropdownRef}>
            {/* Bell Icon */}
            {isLogedin && (
              <FaBell
                className={
                  darkMode ? "icon bell-darkerrmodeicon" : "icon bell-icon"
                }
                onClick={() => setIsOpen(!isOpen)}
              />
            )}

            {/* Dropdown Content */}
            {isOpen && displayedNotifications?.length > 0 && (
              <div className="dropdown-contentnoti">
                {displayedNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() =>
                      !notif.is_read && markNotificationAsRead(notif.id)
                    }
                    className={`notification-card ${notif.is_read ? "read" : "unread"
                      }`}
                    style={{
                      backgroundColor: notif.is_read ? "#f0f0f0" : "#e0f7fa",
                      color: notif.is_read ? "#757575" : "#000",
                      cursor: notif.is_read ? "default" : "pointer",
                    }}
                  >
                    <div className="notification-header">
                      <div className="notification-all-header">
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
                          className="dot-notify-icon"
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
          </div>
          {isLogedin ? (
            <div className={darkMode ? "psectiondarkmode" : "profile-section"}>
              <li ref={userDropdownRef} className="user-info">
                <div className="user-trigger" onClick={toggleUserDropdown}>
                  <FaUserCircle
                    className={
                      darkMode ? "iconuser-darkerrmodeicon" : "iconuser-icon"
                    }
                  />
                  <span
                    className={darkMode ? "willamnamedarkmode" : "willamname"}
                  >
                    {userName.split(" ")[0]}
                  </span>
                </div>

                {userDropdownOpen && renderUserDropdown()}
              </li>
            </div>
          ) : (
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
        </div>
      </nav>

      <ul className="footer-nav">
        <li className="learn-dropdown" ref={footerhomeDropdownRef}>
          <button
            type="button"
            onClick={toggleFooterhomeDropdown}
            className="footer-link"
            style={{ border: "none", backgroundColor: "transparent"}}
          >
            <div className="footer-item">
              <i className="footer-icon">
                <RiHome5Fill />
              </i>
              <span style={{color: "#24b676"}}>Home</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </button>
          {footerhomeDropdownOpen && renderhomeDropdown()}
        </li>
        <li className="stock-dropdown" ref={footerStockDropdownRef}>
          <button
            type="button"
            onClick={toggleFooterStockDropdown}
            className="footer-link"
            style={{ border: "none", backgroundColor: "transparent"}}
          >
            <div className="footer-item">
              <i className="footer-icon">
                <LuChartNoAxesCombined />
              </i>
              <span style={{color: "#24b676"}}>Stocks</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </button>
          {footerStockDropdownOpen && renderStockDropdown()}
        </li>
        <li className="portfolio-dropdown" ref={footerportfolioDropdownRef}>
          <button
          type= "button"
            onClick={toggleFooterPortfolioDropdown}
            className="footer-link"
            style={{ border: "none", backgroundColor: "transparent"}}
          >
            <div className="footer-item selected">
              <i className="footer-portfolio-icon">
                <RiBriefcase4Line />
              </i>
              <span style={{color: "#24b676"}}>Portfolio</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </button>
          {footerPortfolioDropdownOpen && renderPortfolioDropdown()}
        </li>
        <li className="mutualfunds-dropdown" ref={footerMutualFundsDropdownRef}>
          <button 
          type="button"
            onClick={toggleFooterMutualFundsDropdown}
            className="footer-link"
            style={{ border: "none", backgroundColor: "transparent"}}
          >
            <div className="footer-item">
              <i className="footer-icon">
                <PiHandCoins />
              </i>
              <span style={{color: "#24b676"}}>MFs</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </button>
          {footerMutualFundsDropdownOpen && renderMutualFundsDropdown()}
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
              <span style={{color: "#24b676"}}>Learn</span>
              <FaChevronDown className="chevron-icon" />
              {footerLearnDropdownOpen && renderlearnDropdown()}
            </div>
          </button>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
