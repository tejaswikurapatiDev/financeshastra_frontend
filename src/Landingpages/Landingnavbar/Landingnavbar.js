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


const UserDropdownMenu = () => (
  <div className="user-menu">
    <div className="dropdown-item">
      <Link to="/userDetailsupdate">
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
  const [showDropdown, setShowDropdown] = useState(false);

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
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
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

  // Apply debounced search when input changes
  useEffect(() => {
    fetchNotifications();
    debounceSearch(searchInputText);
    return () => debounceSearch.cancel();
  }, [searchInputText, debounceSearch]);

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


  // Dropdown menu components
const StockDropdownMenu = () => (
  <div className="stockmenu">
    <div className="stockmenu-column">
      <ul>
            <li style={{ listStyle: "none" }}>
       <Link
         to="/StockScreenerList"
         className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
         style={{
           display: "block",
           textDecoration: "none",
         
           
         }}
       >
         <strong>Stock Screener</strong>
         <p >
           Discover stocks based on various filters and criteria to make informed
           decisions.
         </p>
       </Link>
     </li>
     
               <li style={{ listStyle: "none" }}>
               
                   <Link to="/beststock"
                    className={
                     "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",
                    
                     
                   }}>
                     <strong>Best Stock</strong>
                     <p>
                       Explore the best stocks for investment based on analysis and
                       trends.
                     </p>
                   </Link>
                
               </li>
               <li>
               
                   <Link to="/highgrowth"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",
                   
                   
                   }}
                   >
                     <strong>High Growth Stocks</strong>
                     <p>
                       Find stocks that are expected to grow rapidly in the upcoming
                       years.
                     </p>
                   </Link>
               
               </li>
               <li>
               
                   <Link to="/nifty50pageall"
                     className={
                       darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                     }
     
                     style={{
                       display: "block",
                       textDecoration: "none",
                      
                       
                     }}
                     >
                      <strong>Nifty 50 Companies</strong>
                     <p>
                       Track the top 50 companies listed on the National Stock
                       Exchange of India.
                     </p>
                   </Link>
               </li>
             </ul>
           </div>
           <div className="stockmenu-column">
             <ul>
               <li>
             
                   <Link to="/nifty"  className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",
                    
                     
                   }}
                   >
                     <strong>Nifty 100 Companies</strong>
                     <p>
                       Explore all 500 companies listed on the Nifty index to
                       diversify your portfolio.
                     </p>
                   </Link>
               </li>
               <li>
               
                   <Link to="/smallcap"
                     className={
                       darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                     }
                   style={{
                     display: "block",
                     textDecoration: "none",
                   
                   }}>
                     <strong>Small Cap</strong>
                     <p>
                       Invest in smaller companies with high potential for growth.
                     </p>
                   </Link>
                
               </li>
               <li>
                 
                   <Link to="/midcap"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                    style={{
                     display: "block",
                     textDecoration: "none",
                   
                     
                   }}>
                      <strong>Mid Cap</strong>
                     <p>
                       Discover mid-sized companies with a strong growth trajectory.
                     </p>
                   </Link>
           
               </li>
               <li>
               
                   <Link to="/largecap"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                    style={{
                     display: "block",
                     textDecoration: "none",
                    
                   
                   }}>
                      <strong>Large Cap</strong>
                     <p>
                       Focus on large, established companies with stable returns.
                     </p>
                   </Link>
                 
               </li>
               <li>
                   <Link to="/stockThemesSectorPages"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",
                   
                    
                   }}>
                     <strong>Stock Themes</strong>
                     <p>Research is key before buying any stock</p>
                   </Link>
                
               </li>
             </ul>
    </div>
  </div>
);

const PortfolioDropdownMenu = () => (
  <div className="dropdown-menu">
    <Link
         to="/portfolio"
         className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
         style={{
           display: "block",
           textDecoration: "none",
           
          
         }}
       >
         <strong>My Portfolio</strong>
         <p >Your financial navigator</p>
       </Link>
        
           <Link to="/portfolio-risk"
            className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
            style={{
             display: "block",
             textDecoration: "none",
           
             
           }}>
             <strong>Portfolio Risk Analysis</strong>
             <p>Risk evaluation and insights(coming soon)</p>
           </Link>
      
         
           <Link to="/stockWatchlist"
           className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
             style={{
               display: "block",
               textDecoration: "none",
              
              
             }}>
             <strong>Watchlist</strong>
             <p>Monitor, assess, and improve</p>
           </Link>
  </div>
);

const LearnDropdownMenu = () => (
  <div className="learn-menu">
   <Link to="/stockNewsComponent"
           className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
             style={{
               display: "block",
               textDecoration: "none",
             
               
             }}>
             <strong>Stock News</strong>
             <p>Discover what's happening in the stock markets in real-time</p>
           </Link>
        
           <Link to="/blogsComponent"
           className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
            style={{
             display: "block",
             textDecoration: "none",
            
            
           }}>
             <strong>Blogs</strong>
             <p>Investment Knowledge Hub</p>
           </Link>
   
     
           <Link to="/ipoComponent"
           className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
           style={{
             display: "block",
             textDecoration: "none",
            
             
           }}>
             <strong>IPO Details</strong>
             <p>Key Information on the Latest IPO Trends</p>
           </Link>
   
   
           <Link to="/earningsInsightLearn" className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
            style={{
             display: "block",
             textDecoration: "none",
           
            
           }}>
             <strong>Quarterly Earnings</strong>
             <p>Monitor thorough quarterly earnings summaries</p>
           </Link>
       
        
           <Link to="/learncard"
           className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
           style={{
             display: "block",
             textDecoration: "none",
            
             
           }}
           >
             <strong>Learn</strong>
             <p>
               {" "}
               Knowledge is the key to successful trading—learn, adapt, and grow
             </p>
           </Link>
  </div>
);
const MutualFundsDropdownMenu = () => (
  <div className="mutualstockmenu">
    <div className="stockmenu-column">
      <ul>
               <li>
               
                   <Link to="/mutualfund" className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",
                   
                     
                   }}>
                     <strong>Top Rated Funds</strong>
                     <p>Focus on risk management and long-term growth.</p>
                   </Link>
                 
               </li>
               <li>
                
                   <Link to="/fundscreenerregular" className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}
                  >
                     <strong>Fund Screener</strong>
                     <p>Efficient filter and compare investment options.</p>
                   </Link>
                 
               </li>
               <li>
                <Link to="/bestsmallcapregular"
                   className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}>
                     <strong>Best Small Cap Fund</strong>
                     <p>Strong returns by investing in high-growth opportunities.</p>
                   </Link>
              
                   <Link to="/market"
                   className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}>
                     <strong>Equity (ETFs)</strong></Link>
                
               </li>
             </ul>
           </div>
           <div className="stockmenu-column">
             <ul>
               <li>
                
                   <Link to="/bestgrowthregular"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}>
                     <strong>Best Growth Fund</strong>
                     <p>Focus on high-potential growth.</p>
                   </Link>
               
               </li>
               <li>
     
                   <Link to="/flexregular"
                   className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}>
                     <strong>Best Flex Cap Fund</strong>
                     <p>Invest in companies poised for future and today's growth.</p>
                   </Link>
                 
               </li>
               <li>
                 
                   <Link to="/etfregular"
                   className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}>
                     <strong>Best ETF Fund</strong>
                     <p>Diverse and cost-effective investment strategy.</p>
                   </Link>
                 
                 <div
                  
                 >
                   <Link to="/gold"
                    className={
                     darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
                   }
                   style={{
                     display: "block",
                     textDecoration: "none",                
                   }}> 
                   <strong>Gold (ETFs)</strong></Link>
                 </div>
               </li>
             </ul>
    </div>
  </div>
);

const renderhomeDropdown = () => (
    <div className={darkMode ? "learn-homedarkerrrrmode" : "home-menu"}>
     
        <Link to="/home"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        
         
        }}>
        <strong>Dashboard</strong>
         
        </Link>
   
     
        <Link to="/porfolioanalysisallpagecall"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
      
         
        }}>
        <strong>Portfolio Analysis</strong>
        </Link>
     

        <Link to="/stockWatchlist"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        
         
        }}>
        <strong>Watchlist</strong>
        </Link>
   

     
        <Link to="/stockresearchpages"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        
        
        }}>
        <strong>Research</strong>
        </Link>

     
        <Link to="/security"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
         
          
        }}>
        <strong>Security</strong>
       
        </Link>
  
     
        <Link to="/settingDashPanel"
        className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}
        style={{
          display: "block",
          textDecoration: "none",
        
         
        }}>
        <strong>Setting</strong>
        </Link>
      </div>
   
  );

  const renderUserDropdown = () => (
    <div className={darkMode ? "user-menudarkerrmode" : "user-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/userDetailsupdate">
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
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <div onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
          Dark Mode
        </div>
      </div>
    </div>
  );

  const handleSearchInputText = (item) => {
    setSearchInputText(item);
    setFilterData([]);
  };

  console.log("filterData", filterData);
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
            <Link to="#" onClick={() => toggleDropdown("stock")}>
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
              Learn & Insights
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

        <div className={darkMode ? "navbar-darksearch" : "navbar-search"}>
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
                          handleSearchInputText(data.name || data.Scheme_Name);
                          setFilterData([]); 
                          setShowDropdown(false); 
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
                onClick={() => navigate("/pricehalf")}
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
              <li className="" ref={userDropdownRef}>
                <Link to="#" onClick={toggleUserDropdown}>
                  <FaUserCircle
                    className={
                      darkMode ? "iconuser-darkerrmodeicon" : "iconuser-icon"
                    }
                  />
                </Link>
                <span
                  className={darkMode ? "willamnamedarkmode" : "willamname"}
                >
                  {storedName.split(" ")[0]}
                </span>
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
        <li>
          <Link to="/home" className="footer-link">
            <div className="footer-item">
              <i className="footer-icon">
                <RiHome5Fill />
              </i>
              <span>Home</span>
            </div>
          </Link>
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
              <FaChevronDown className="chevron-icon" />
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

        <li>
          <Link
            to="/#"
            onClick={() => toggleDropdown("learn")}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <SlBookOpen />
              </i>
              <span>Learn</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.learn && <LearnDropdownMenu />}
        </li>
      </ul>
    </>
  );
};

export default Landingnavbar;
