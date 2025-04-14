import React, { useState } from "react";
import "./StockList.css";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import stocks from "../stockData"; // Ensure stock data is imported correctly
import Navbar from "../Navbar/Navbar";

function Stocktable() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Function to sort stocks based on current sort configuration
  const sortedStocks = () => {
    if (!sortConfig.key) return stocks;

    const sorted = [...stocks];
    sorted.sort((a, b) => {
      const aValue = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
      const bValue = parseFloat(b[sortConfig.key]) || b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortIcons = (key) => {
    const isActive = sortConfig.key === key;
    const isAscending = isActive && sortConfig.direction === "asc";
    const isDescending = isActive && sortConfig.direction === "desc";

    return (
      <span className="sort-icons">
        <FaCaretUp className={isAscending ? "active" : "inactive"} />
        <FaCaretDown className={isDescending ? "active" : "inactive"} />
      </span>
    );
  };

  const filteredStocks = sortedStocks();

  return (
    <div className="stock-table-container">
      <Navbar />
      <div className="headerstocklist">
        <h2>List of Stocks</h2>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Company</th>
            <th onClick={() => handleSort("ltp")}>
              <div className="header-title-updown">
                LTP (₹)
                {renderSortIcons("ltp")}
              </div>
            </th>
            <th onClick={() => handleSort("change")}>
              <div className="header-title-updown">
                Price Change %
                {renderSortIcons("change")}
              </div>
            </th>
            <th onClick={() => handleSort("marketCap")}>
              <div className="header-title-updown">
                Market Cap (Cr)
                {renderSortIcons("marketCap")}
              </div>
            </th>
            <th onClick={() => handleSort("highLow")}>
              <div className="header-title-updown">
                52W High (₹)
                {renderSortIcons("highLow")}
              </div>
            </th>
            <th onClick={() => handleSort("highLow")}>
              <div className="header-title-updown">
                52W Low (₹)
                {renderSortIcons("highLow")}
              </div>
            </th>
            <th onClick={() => handleSort("roe")}>
              <div className="header-title-updown">
                ROE
                {renderSortIcons("roe")}
              </div>
            </th>
            <th onClick={() => handleSort("pe")}>
              <div className="header-title-updown">
                P/E
                {renderSortIcons("pe")}
              </div>
            </th>
            <th onClick={() => handleSort("pbv")}>
              <div className="header-title-updown">
                P/BV
                {renderSortIcons("pbv")}
              </div>
            </th>
            <th onClick={() => handleSort("fiveYSalesGrowth")}>
              <div className="header-title-updown">
                5Y Sales Growth
                {renderSortIcons("fiveYSalesGrowth")}
              </div>
            </th>
            <th onClick={() => handleSort("fiveYProfitGrowth")}>
              <div className="header-title-updown">
                5Y Profit Growth
                {renderSortIcons("fiveYProfitGrowth")}
              </div>
            </th>
            <th>Clarification</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock, idx) => (
            <tr key={idx}>
              <td>
                {stock.clarification?.url ? (
                  <a
                    href={stock.clarification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {stock.company}
                  </a>
                ) : (
                  stock.company
                )}
              </td>
              <td>{stock.ltp}</td>
              <td
                className={parseFloat(stock.change) > 0 ? "positive" : "negative"}
              >
                {stock.change}%
              </td>
              <td>{stock.marketCap}</td>
              <td>{stock.highLow.split("/")[0]}</td>
              <td>{stock.highLow.split("/")[1]}</td>
              <td>{stock.roe}</td>
              <td>{stock.pe}</td>
              <td>{stock.pbv}</td>
              <td>{stock.fiveYSalesGrowth}</td>
              <td>{stock.fiveYProfitGrowth}</td>
              <td>
                {stock.clarification?.url ? (
                  <a
                    href={stock.clarification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Know More
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stocktable;
