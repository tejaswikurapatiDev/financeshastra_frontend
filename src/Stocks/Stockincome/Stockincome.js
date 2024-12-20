import React, { useState } from "react";
import { screenerStockincomeData } from "../Stockincomedata";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";



const ScreenerStockincome = () => {
  const [stocks, setStocks] = useState(screenerStockincomeData);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Income Statement");
  const [filters, setFilters] = useState({
    index: "All",
    price: "All",
    change: "All",
    marketCap: "All",
    epsDilGrowth: "All",
    divYield: "All",
    sector: "All",
    performance: "All",
    revenueGrowth: "All",
    peg: "All",
    roe: "All",
  });

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
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

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const filteredStocks = screenerStockincomeData.filter((stock) => {
      const matchesPrice =
        newFilters.price === "All" ||
        parseFloat(stock.price.replace("₹", "")) <= parseFloat(newFilters.price);

      const matchesMarketCap =
        newFilters.marketCap === "All" ||
        parseFloat(stock.marketCap.replace("T", "")) <= parseFloat(newFilters.marketCap);

      const matchesDivYield =
        newFilters.divYield === "All" ||
        parseFloat(stock.divYield.replace("%", "")) >= parseFloat(newFilters.divYield);

      const matchesSector =
        newFilters.sector === "All" || stock.sector === newFilters.sector;

      const matchesChange =
        newFilters.change === "All" ||
        (newFilters.change === "-5" && parseFloat(stock.change) <= -5) ||
        (newFilters.change === "0" && parseFloat(stock.change) >= 0) ||
        (newFilters.change === "5" && parseFloat(stock.change) >= 5) ||
        (newFilters.change === "10" && parseFloat(stock.change) >= 10);

      return matchesPrice && matchesMarketCap && matchesDivYield && matchesSector && matchesChange;
    });

    setStocks(filteredStocks);
  };

  return (
    <div className="screener-container">
      <h1 className="screener-header">Stocks Screener</h1>

      {/* Filters */}
      <div className="screener-filters">
        {/* Filter for each parameter */}
        <div className="filter-group">
          <select value={filters.index} onChange={(e) => handleFilterChange("index", e.target.value)}>
            <option value="All" disabled hidden>Index</option>
            <option value="Nifty">Nifty</option>
            <option value="Sensex">Sensex</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="filter-group">
          <select value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)}>
            <option value="All" disabled hidden>Price</option>
            <option value="500">Up to ₹500</option>
            <option value="1000">Up to ₹1000</option>
            <option value="5000">Up to ₹5000</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.change} onChange={(e) => handleFilterChange("change", e.target.value)}>
            <option value="All" disabled hidden>Change%</option>
            <option value="-5">-5% or more</option>
            <option value="0">0% or more</option>
            <option value="5">+5% or more</option>
            <option value="10">+10% or more</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.marketCap} onChange={(e) => handleFilterChange("marketCap", e.target.value)}>
            <option value="All" disabled hidden>Market Cap</option>
            <option value="1">Up to 1T</option>
            <option value="10">Up to 10T</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.epsDilGrowth} onChange={(e) => handleFilterChange("epsDilGrowth", e.target.value)}>
            <option value="All" disabled hidden>EPS Dil Growth</option>
            <option value="10">Above 10%</option>
            <option value="20">Above 20%</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.divYield} onChange={(e) => handleFilterChange("divYield", e.target.value)}>
            <option value="All" disabled hidden>Div Yield %</option>
            <option value="1">1% or more</option>
            <option value="2">2% or more</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.sector} onChange={(e) => handleFilterChange("sector", e.target.value)}>
            <option value="All" disabled hidden>Sector</option>
            <option value="Finance">Finance</option>
            <option value="Technology services">Technology Services</option>
            <option value="Energy minerals">Energy Minerals</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.performance} onChange={(e) => handleFilterChange("performance", e.target.value)}>
            <option value="All" disabled hidden>Perf%</option>
            <option value="5">Up to 5%</option>
            <option value="10">Up to 10%</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.revenueGrowth} onChange={(e) => handleFilterChange("revenueGrowth", e.target.value)}>
            <option value="All" disabled hidden>Revenue Growth</option>
            <option value="5">Above 5%</option>
            <option value="10">Above 10%</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.peg} onChange={(e) => handleFilterChange("peg", e.target.value)}>
            <option value="All" disabled hidden>PEG</option>
            <option value="1">Up to 1</option>
            <option value="2">Up to 2</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={filters.roe} onChange={(e) => handleFilterChange("roe", e.target.value)}>
            <option value="All" disabled hidden>ROE</option>
            <option value="10">Above 10%</option>
            <option value="20">Above 20%</option>
          </select>
        </div>
      </div>
      <button
          className={`tab-button ${activeTab === "Overview" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Overview");
            navigate('/StockScreenerList'); // Navigate to the StockScreenerList page
          }}
        >
          Overview
        </button>

        <button
          className={`tab-button ${activeTab === "Valuation" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Valuation");
            navigate('/ScreenerStockvaluation'); // Navigate to the ScreenerStockvaluation page
          }}
        >
          Valuation
        </button>

        <button
          className={`tab-button ${activeTab === "Income Statement" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Income Statement");
            navigate('/IncomeStatement'); // Add a route for Income Statement if needed
          }}
        >
          Income Statement
        </button>
        <div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>
  <table className="screener-table" style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676' }}>
    <tr>
    <th>Symbol</th>
    <th>
      Revenue
      <button className="screenerbtnlist" onClick={() => handleSort("revenue")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Revenue Growth %
      <button className="screenerbtnlist" onClick={() => handleSort("revenueGrowth")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Gross Profit
      <button className="screenerbtnlist" onClick={() => handleSort("grossProfit")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Operating Income
      <button className="screenerbtnlist" onClick={() => handleSort("operatingIncome")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Net Income
      <button className="screenerbtnlist" onClick={() => handleSort("netIncome")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EBITDA
      <button className="screenerbtnlist" onClick={() => handleSort("ebitda")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EPS Diluted
      <button className="screenerbtnlist" onClick={() => handleSort("epsDil")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EPS Diluted Growth %
      <button className="screenerbtnlist" onClick={() => handleSort("epsDilGrowth")}>
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
      <td>{stock.revenue}</td>
      <td style={{ color: stock.revenueGrowth > 0 ? "#24b676" : "red" }}>
        {stock.revenueGrowth}%
      </td>
      <td>{stock.grossProfit || "-"}</td>
      <td>{stock.operatingIncome}</td>
      <td>{stock.netIncome}</td>
      <td>{stock.ebitda}</td>
      <td>{stock.epsDil}</td>
      <td style={{ color: stock.epsDilGrowth > 0 ? "#24b676" : "red" }}>
        {stock.epsDilGrowth}%
      </td>
                 


              </tr>
            ))}
          </tbody>
        </table>
      </div>
<Navbar/>
    </div>
  );
};

export default ScreenerStockincome;
