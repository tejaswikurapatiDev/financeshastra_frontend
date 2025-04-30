import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import './StockThemesindustriesPageslock.css';
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Stockthemeunlocknavbar from "../stockthemeunlocknavbar/stockthemeunlocknavbar";
import Navbar from "../../Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import useSubscriptionStatus from "../../Navbar/Hooks/useSubscriptionStatus";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center",
};

const stockThemesindustriesData = [
  {
    sector: "Bank-Private",
    marketCap: "3,347,032 (-0.12%)",
    advDecl: "19 | 9",
    sectorPE: "22.49",
    earningsYOY: "50,245 (9.16%)",
    stocks: "06",
  },
  {
    sector: "Bank-Public",
    marketCap: "1,468,861 (0.68%)",
    advDecl: "11 | 1",
    sectorPE: "12.05",
    earningsYOY: "23,457 (22.07%)",
    stocks: "06",
  },
];

export default function StockThemesindustrieslockPages() {
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(stockThemesindustriesData);
  const [showSuggestions, setShowSuggestions] = useState(false);
const [isloading, setisloading]= useState(true)
  const [isLocked, setIsLocked] = useState(true);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if (isSubscribed && isLoading){
      setisloading(false)
    }else{
      setisloading(false)
    }
  }, [])

  const handleLockClick = () => {
    setShowSubscribe(true);
  };

  const handleMouseEnter = () => {
    if (isLocked) setShowSubscribe(true);
  };

  const handleMouseLeave = () => {
    setShowSubscribe(false);
  };

  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredData(stockThemesindustriesData);
    } else {
      const filteredList = stockThemesindustriesData.filter((item) =>
        item.sector.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredList);
    }
  };

  return (
    <div>
      {isloading ?  <div className="loader-cont">
          <ClipLoader
            cssOverride={override}
            size={35}
            data-testid="loader"
            loading={isLoading}
            speedMultiplier={1}
            color="green"
          />
        </div> : 
      <div className={`banksectorthemepage ${!isSubscribed && !isLoading && "backdrop-blur"}`}>
        <h1 className="banksectortitle">Banks Sector Stocks</h1>
        <div className="banksectorfilter">
          <button
            className="banksectorbtnn"
            onClick={() => navigate("/bankSectorStockTheme")}
          >
            All Stocks (12)
          </button>
          <button
            className="banksectorbtnactivee"
            onClick={() => navigate("/stocksThemesindustries")}
          >
            Industries (02)
          </button>
        </div>

        <div className="search-wrapper" style={{ position: "relative" }}>
          <input
            type="text"
            className="banksectorsearch"
            placeholder="Search by sector name"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            style={{ paddingLeft: "30px" }}
          />
          <CiSearch className="banksector-search-icon" />
        </div>

        <div className="StockThemesSectorPages-themes-listt">
          {filteredData.map((item, index) => (
            <div key={index} className="StockThemesSectorPages-themes-card">
              <div className="StockThemesSectorPages-themes-card-header">
                <h2 className="StockThemesSectorPages-themes-sector">
                  {item.sector.split(" & ").map((text, index) => (
                    <React.Fragment key={index}>
                      {text}
                      {index === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="StockThemesSectorPages-themes-neutral">
                  - Neutral
                </p>
              </div>

              <div className="StockThemesSectorPages-themes-details">
                <p>
                  <strong style={{ color: "#333", fontWeight: "normal" }}>
                    M.Cap (₹ Cr.):
                  </strong>
                  <br />
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {item.marketCap.split(" ")[0]}
                  </span>{" "}
                  <span
                    style={{
                      color: item.marketCap.includes("-") ? "red" : "#24b676",
                      fontWeight: "bold",
                    }}
                  >
                    {item.marketCap.split(" ")[1]}
                  </span>
                </p>

                <p className="StockThemesSectorPages-themespara">
                  <strong style={{ color: "#333", fontWeight: "normal" }}>
                    Adv/Decline:
                  </strong>
                  <br />
                  <span style={{ color: "#24b676", fontWeight: "bold" }}>
                    {item.advDecl.split(" | ")[0]}
                  </span>{" "}
                  |{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {item.advDecl.split(" | ")[1]}
                  </span>
                </p>

                <p className="StockThemesSectorPages-themespara">
                  <strong style={{ color: "#333", fontWeight: "normal" }}>
                    Sector PE:
                  </strong>
                  <br />
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {item.sectorPE}
                  </span>
                </p>

                <p>
                  <strong style={{ color: "#333", fontWeight: "normal" }}>
                    Sector earnings YOY:
                  </strong>
                  <br />
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {item.earningsYOY.split(" ")[0]}
                  </span>{" "}
                  <span style={{ color: "#24b676", fontWeight: "bold" }}>
                    {item.earningsYOY.match(/\(.*\)/)}
                  </span>
                </p>

                <p className="StockThemesSectorPages-themespara">
                  <strong style={{ color: "#333", fontWeight: "normal" }}>
                    Stocks:
                  </strong>
                  <br />
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {item.stocks}
                  </span>
                </p>
              </div>

              <ChevronRight
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/StockScreener")}
                className="StockThemesSectorPages-themes-icon"
              />

              {!isSubscribed && !isLoading && (
                <div className="subscribethemestocklocked-overlay">
                  <div
                    className="subscribethemestocklocked-lock-icon"
                    onClick={handleLockClick}
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/015/117/333/original/padlock-icon-with-glowing-neon-effect-security-lock-sign-secure-protection-symbol-png.png"
                      alt="Lock Icon"
                    />
                    <button
                      className="subscribethemestock-button"
                      onClick={handleSubscribeClick}
                    >
                      Subscribe for more details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>}

      {/* Wrap these in a fragment to fix the JSX error */}
      <>
        <Navbar />
        <FooterForAllPage />
      </>
    </div>
  );
}
