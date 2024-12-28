import React, { useState } from "react";
import { Nifty50tabledata } from "../Niftystock50tabledata";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon

import "./Niftystock50table.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";

const Nifty50screenerStockList = () => {
  const [stocks, setStocks] = useState(Nifty50tabledata);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [filters, setFilters] = useState({
    epsDilGrowth: [], // Initialize as an empty array
    pe: [], // Initialize as an empty array
    roe: [], // Initialize as an empty array
    price: "All",
    marketCap: "All",
    divYield: [],
    sector: "All",
    change: "All",
  });

   // Handle sorting logic for columns
   const handleSort = (key) => {
    const sortedStocks = [...stocks].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Clean strings that are numeric and convert to number for comparison
      if (typeof valA === "string") {
        if (key === "price" || key === "marketCap") {
          valA = parseFloat(valA.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valA = parseFloat(valA.replace(/[₹,%]/g, ""));
        }
      }

      if (typeof valB === "string") {
        if (key === "price" || key === "marketCap") {
          valB = parseFloat(valB.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valB = parseFloat(valB.replace(/[₹,%]/g, ""));
        }
      }

      // For sector column, compare alphabetically
      if (key === "sector") {
        return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      // For other columns, compare numerically
      return sortDirection ? valA - valB : valB - valA;
    });

    setStocks(sortedStocks);
    setSortDirection(!sortDirection); // Toggle sort direction
  };

  return (
    <div className="screener-container">
      <h1 className="screener-header">Nifty 50</h1>
      
{/* Conditional Rendering */}

<div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>

<table className="screener-table" style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead
    style={{
      position: "sticky",
      top: 0,
      backgroundColor: "#f9f9f9",
      zIndex: 10,
      boxShadow: "0 4px 6px #24b676",
    }}
  >
    <tr>
      <th>Symbol</th>
      <th>
        LTP
        <button className="screenerbtnlist" onClick={() => handleSort("ltp")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        Change %
        <button className="screenerbtnlist" onClick={() => handleSort("change")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        Volume
        <button className="screenerbtnlist" onClick={() => handleSort("volume")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        Market Cap (Cr.)
        <button className="screenerbtnlist" onClick={() => handleSort("marketCap")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        P / E
        <button className="screenerbtnlist" onClick={() => handleSort("pe")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        52W High
        <button className="screenerbtnlist" onClick={() => handleSort("high52")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        52W Low
        <button className="screenerbtnlist" onClick={() => handleSort("low52")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        PB Ratio
        <button className="screenerbtnlist" onClick={() => handleSort("pbRatio")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        Dividend
        <button className="screenerbtnlist" onClick={() => handleSort("dividend")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        ROE
        <button className="screenerbtnlist" onClick={() => handleSort("roe")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        ROCE
        <button className="screenerbtnlist" onClick={() => handleSort("roce")}>
          <PiCaretUpDownFill />
        </button>
      </th>
      <th>
        EPS
        <button className="screenerbtnlist" onClick={() => handleSort("eps")}>
          <PiCaretUpDownFill />
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    {stocks.map((stock, index) => (
      <tr key={index} className="screener-row">
        <td className="symbol-cell">
          <img src={stock.icon} alt={`${stock.symbol} logo`} className="company-icon" />
          {stock.symbol}
        </td>
        <td>{stock.ltp}</td>
        <td
          style={{
            color: parseFloat(stock.change) > 0 ? "#24b676" : parseFloat(stock.change) < 0 ? "red" : "inherit",
          }}
        >
          {stock.change}
        </td>
        <td>{stock.volume}</td>
        <td>{stock.marketCap}</td>
        <td>{stock.pe}</td>
        <td>{stock.high52}</td>
        <td
          
        >
          {stock.low52}
        </td>
        <td>{stock.pbRatio}</td>
        <td>{stock.dividend}</td>
        <td style={{
            color: "#24b676",
          }}>{stock.roe}</td>
        <td style={{
            color: "#24b676",
          }}>{stock.roce}</td>
        <td>{stock.eps}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
    
  <Navbar/>
  </div>
);
};

export default Nifty50screenerStockList;
