import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { FiTrendingDown } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

import "./StockThemesSectorPages.css";

import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";
const stockThemesData = [
  
  {
    sector: "Bank",
    marketCap: "4,794,099 (0.71%)",
    advDecl: "34 | 6",
    sectorPE: "18.07",
    earningsYOY: "68,251 (13.4%)",
    industries: "2",
    stocks: "12",
    sectorUrl: "/bankSectorThemePagelock"  // Add the URL for navigation
  },
  
  {
    sector: "IT Services",
    marketCap: "4,688,173 (2.68%)",
    advDecl: "198 | 47",
    sectorPE: "40.50",
    earningsYOY: "32,632 (11.23%)",
    industries: "7",
    stocks: "18",
  },
  {
    sector: "Finance",
    marketCap: "3,307,093 (2.64%)",
    advDecl: "338 | 166",
    sectorPE: "87.70",
    earningsYOY: "17,932 (24.18%)",
    industries: "8",
    stocks: "20",
  },
  {
    sector: "Automobile & Components",
    marketCap: "4,688,173 (2.68%)",
    advDecl: "198 | 47",
    sectorPE: "40.50",
    earningsYOY: "32,632 (11.23%)",
    industries: "7",
    stocks: "6",
  },
  {
    sector: "Healthcare",
    marketCap: "2,728,442 (2.08%)",
    advDecl: "194 | 70",
    sectorPE: "66.31",
    earningsYOY: "4,720 (22.85%)",
    industries: "5",
    stocks: "15",
  },
  {
    sector: "Capital Goods",
    marketCap: "1,651,176 (4.02%)",
    advDecl: "217 | 56",
    sectorPE: "161.71",
    earningsYOY: "2,083 (22.44%)",
    industries: "9",
    stocks: "8",
  },
  {
    sector: "Power",
    marketCap: "1,598,082 (1.80%)",
    advDecl: "37 | 7",
    sectorPE: "26.66",
    earningsYOY: "9,466 (8.12%)",
    industries: "1",
    stocks: "20",
  },
  {
    sector: "Energy (Oil & Gas)",
    marketCap: "2,507,683 (0.38%)",
    advDecl: "18 | 4",
    sectorPE: "20.22",
    earningsYOY: "31,846 (-4%)",
    industries: "2",
    stocks: "17",
  },
  {
    sector: "FMCG",
    marketCap: "1,944,664 (0.72%)",
    advDecl: "96 | 27",
    sectorPE: "95.30",
    earningsYOY: "4,651 (12.75%)",
    industries: "5",
    stocks: "7",
  },
  {
    sector: "Metals & Mining",
    marketCap: "1,944,111 (2.12%)",
    advDecl: "166 | 48",
    sectorPE: "22.60",
    earningsYOY: "14,692 (-15.46%)",
    industries: "10",
    stocks: "11",
  },
  {
    sector: "Media & Entertainment",
    marketCap: "95,429 (-0.07%)",
    advDecl: "48 | 19",
    sectorPE: "95.60",
    earningsYOY: "-1,398 (-74.51%)",
    industries: "4",
    stocks: "14"
  },
  {
    sector: "Construction & Materials",
    marketCap: "877,409 (-0.72%)",
    advDecl: "64 | 35",
    sectorPE: "55.46",
    earningsYOY: "5,464 (34.99%)",
    industries: "7",
    stocks: "12",
  },
  {
    sector: "Aviation",
    marketCap: "669,147 (1.61%)",
    advDecl: "14 | 3",
    sectorPE: "38.78",
    earningsYOY: "2,449 (-18.32%)",
    industries: "2",
    stocks: "17",
  },
  {
    sector: "Real Estate",
    marketCap: "938,126 (1.42%)",
    advDecl: "84 | 38",
    sectorPE: "46.72",
    earningsYOY: "2,680 (50.9%)",
    industries: "4",
    stocks: "13",
  },
  {
    sector: "Telecom",
    marketCap: "1,388,212 (3.32%)",
    advDecl: "25 | 14",
    sectorPE: "-155.98",
    earningsYOY: "4,245 (134.79%)",
    industries: "4",
    stocks: "10",
  },
  {
    sector: "Consumer Durables",
    marketCap: "379,468 (-1.97%)",
    advDecl: "34 | 19",
    sectorPE: "75.59",
    earningsYOY: "695 (102.78%)",
    industries: "5",
    stocks: "54",
  },
  {
    sector: "Textiles",
    marketCap: "325,633 (-0.01%)",
    advDecl: "174 | 77",
    sectorPE: "76.14",
    earningsYOY: "361 (-4.4%)",
    industries: "6",
    stocks: "9",
  },
  {
    sector: "Agriculture",
    marketCap: "315,366 (0.13%)",
    advDecl: "74 | 17",
    sectorPE: "76.14",
    earningsYOY: "1,464 (-4.4%)",
    industries: "2",
    stocks: "18",
  },
  {
    sector: "Logistics",
    marketCap: "289,132 (0.82%)",
    advDecl: "14 | 5",
    sectorPE: "34.23",
    earningsYOY: "3,214 (19.8%)",
    industries: "3",
    stocks: "11",
  },
  {
    sector: "Chemicals",
    marketCap: "1,243,562 (1.73%)",
    advDecl: "87 | 23",
    sectorPE: "42.18",
    earningsYOY: "7,620 (15.4%)",
    industries: "6",
    stocks: "22",
  },
  
];

export default function StockThemesSectorPages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(stockThemesData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the sectors based on the search term
    if (value.trim() === "") {
      setFilteredData(stockThemesData);  // Show all when input is empty
    } else {
      const filteredList = stockThemesData.filter((item) =>
        item.sector.toLowerCase().includes(value.toLowerCase()) // Match by sector name
      );
      setFilteredData(filteredList);
    }
  };
 
  return (
    <div className="StockThemesSectorPages-themes-container">
      <h1 className="StockThemesSectorPages-themes-title">Stocks Themes</h1>
      <p className="StockThemesSectorPages-themes-description">
        Evaluate sector results, classifications, financial outcomes, growth trends, and other factors to make well-informed choices.
      </p>
      <div className="search-wrapper" style={{ position: "relative" }}>
        <input
          type="text"
          className="banksectorsearchstock"
          placeholder="Search by sector name"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          style={{ paddingLeft: "30px" }}
        />
        <CiSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "72%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <div className="StockThemesSectorPages-themes-list">
      {filteredData.map((item, index) => (
          <div key={index} className="StockThemesSectorPages-themes-card">
            <div className="StockThemesSectorPages-themes-card-header">
            <h2
            className="StockThemesSectorPages-themes-sector"
            onClick={() => navigate(item.sectorUrl)} // Navigate to the URL for the sector
            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
          >
            {item.sector.split(" & ").map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>
  <p className="StockThemesSectorPages-themes-status">
    <FiTrendingDown className="StockThemesSectorPages-bearish-icon" /> Bearish
  </p>
</div>

            <div className="StockThemesSectorPages-themes-details">
            <p>
  <strong style={{ color: "#333",fontWeight:"normal" }}>M.Cap (₹ Cr.):</strong> <br />
  <span style={{ fontWeight: "bold", color: "#333" }}>
    {item.marketCap.split(" ")[0]}
  </span>{" "}
  <span style={{ color: "#24b676",fontWeight: "bold" }}>{item.marketCap.match(/\(.*\)/)}</span>
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
              <p><strong style={{ color: "#333", fontWeight: "normal" }}>Industries:</strong><br/><span style={{ fontWeight: "bold", color: "#333" }}> {item.industries}

              </span></p>
              <p><strong style={{ color: "#333", fontWeight: "normal" }}>Stocks:</strong><br/><span style={{ fontWeight: "bold", color: "#333" }}> {item.stocks} </span></p>
            </div>
            <ChevronRight
  className="StockThemesSectorPages-themes-icon"
  onClick={() => navigate(item.sectorUrl)} // Add navigation on click for the ChevronRight icon
  style={{ cursor: 'pointer' }} // Optional: Add pointer cursor for better UX
/>

          </div>
        ))}
      </div>
      
      <Navbar/>
      <div className="StockThemesSectorPagesfooter">
      <FooterForAllPage/>
      </div>
      
    </div>
  );
}
