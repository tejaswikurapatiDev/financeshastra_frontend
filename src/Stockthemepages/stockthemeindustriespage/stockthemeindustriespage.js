import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import "./stockthemeindustriespage.css";

import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Stockthemeunlocknavbar from "../stockthemeunlocknavbar/stockthemeunlocknavbar";
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

export default function StockThemesindustriesPages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(stockThemesindustriesData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the sectors based on the search term
    if (value.trim() === "") {
      setFilteredData(stockThemesindustriesData);  // Show all when input is empty
    } else {
      const filteredList = stockThemesindustriesData.filter((item) =>
        item.sector.toLowerCase().includes(value.toLowerCase()) // Match by sector name
      );
      setFilteredData(filteredList);
    }
  };
  const navigate = useNavigate();
 
  return (
    <div className="banksectorthemepage">
       <h1 className="banksectortitle">Banks Sector Stocks</h1>
            <div className="banksectorfilter">
            <button 
      className="banksectorbtnn" 
      onClick={() => navigate("/banksectorstocktheme")} // Correct usage of navigate inside onClick
    >
      All Stocks (12)
    </button>
                <button className="banksectorbtnactivee"onClick={() => navigate("/stockThemesindustriesPages")}>Industries (02)</button>
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
        <CiSearch className="banksector-search-icon"
        />
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
  <strong style={{ color: "#333", fontWeight: "normal" }}>M.Cap (₹ Cr.):</strong> <br />
  <span style={{ fontWeight: "bold", color: "#333" }}>
    {item.marketCap.split(" ")[0]}
  </span>{" "}
  <span style={{ 
    color: item.marketCap.includes("-") ? "red" : "#24b676", 
    fontWeight: "bold"
  }}>
    {item.marketCap.split(" ")[1]} {/* Display percentage value */}
  </span>
  
</p>


<p>
  <strong style={{ color: "#333", fontWeight: "normal" }}>Adv/Decline:</strong>
  <br />
  <span style={{ color: "#24b676", fontWeight: "bold" }}>
    {item.advDecl.split(" | ")[0]}
  </span>{" "}
  |{" "}
  <span style={{ color: "red", fontWeight: "bold" }}>
    {item.advDecl.split(" | ")[1]}
  </span>
</p>

              <p><strong style={{ color: "#333", fontWeight: "normal" }}>Sector PE:</strong><br/>  <span style={{ fontWeight: "bold", color: "#333" }}>
                {item.sectorPE}</span></p>
              <p><strong style={{ color: "#333", fontWeight: "normal" }}>Sector earnings YOY:</strong><span style={{ fontWeight: "bold", color: "#333" }}> <br/>
              
              {item.earningsYOY.split(" ")[0]}</span>{" "}
              <span style={{ color: "#24b676",fontWeight: "bold" }}>
              {item.earningsYOY.match(/\(.*\)/)}</span>
              </p>
              
              <p><strong style={{ color: "#333", fontWeight: "normal" }}>Stocks:</strong><br/><span style={{ fontWeight: "bold", color: "#333" }}> {item.stocks} </span></p>
            </div>
            <ChevronRight className="StockThemesSectorPages-themes-icon" />
          </div>
        ))}
      </div>
      
      <Stockthemeunlocknavbar/>
      <div className="StockThemesindustriesPagesfooter">
      <FooterForAllPage/>
      </div>
      
    </div>
  );
}
