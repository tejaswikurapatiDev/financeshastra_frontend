import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css"; // Import FontAwesome CSS

import Navbar from "../../Navbar/Navbar";

const MutualWatchlist = () => {
  const [stockName, setStockName] = useState("");
  const [stockDetails, setStockDetails] = useState([]);
  const [exchange] = useState("NSE"); // Static exchange value
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [watchlists, setWatchlists] = useState(["Watchlist 01"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const stockDatawatchlist = [
    {
      stockName: "Axis Short Term Fund-Regular Plan",
      sector: "SHORT DURATION FUND",
      nav1dchange: 29.272,
      fiftytwoweekhighorlow: "2805 / 2672",
      onemonth: "5.23%",
      threemonths: "3.15%",
      fiveyears: "15.76%",
      tenyears: "50.25%",
    },
    {
      stockName: "HDFC Equity Fund-Regular Plan",
      sector: "LONG DURATION FUND",
      nav1dchange: -12.34,
      fiftytwoweekhighorlow: "1050 / 850",
      onemonth: "-2.14%",
      threemonths: "-1.25%",
      fiveyears: "10.45%",
      tenyears: "30.12%",
    },
  ];

  // Add stock to watchlist
  const handleAddStock = () => {
    if (stockName.trim() === "") return alert("Stock name cannot be empty!");
    if (stockDetails.some((stock) => stock.stockName === stockName)) {
      return alert("This stock is already in your watchlist.");
    }

    const newStock = {
      stockName,
      nav1dchange: (Math.random() * 10 - 5).toFixed(2),
      fiftytwoweekhighorlow: `${(Math.random() * 1000).toFixed(2)} / ${(Math.random() * 1000).toFixed(2)}`,
      onemonth: `${(Math.random() * 10).toFixed(2)}%`,
      threemonths: `${(Math.random() * 10).toFixed(2)}%`,
      fiveyears: `${(Math.random() * 20).toFixed(2)}%`,
      tenyears: `${(Math.random() * 50).toFixed(2)}%`,
    };

    setStockDetails([...stockDetails, newStock]);
    setStockName("");
  };

  // Create a new watchlist
  const handleCreateWatchlist = () => {
    const newWatchlistName = `Watchlist ${watchlists.length + 1}`;
    setWatchlists([...watchlists, newWatchlistName]);
  };

  // Toggle dropdown for watchlist actions
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Delete a watchlist
  const handleDeleteWatchlist = (index) => {
    if (window.confirm("Are you sure you want to delete this watchlist?")) {
      setWatchlists(watchlists.filter((_, i) => i !== index));
      setActiveDropdown(null);
    }
  };

  // Rename a watchlist
  const handleRenameWatchlist = (index) => {
    const newName = prompt("Enter the new name for the watchlist:");
    if (newName && newName.trim() !== "") {
      setWatchlists(
        watchlists.map((watchlist, i) => (i === index ? newName : watchlist))
      );
    }
    setActiveDropdown(null);
  };

  // Delete a stock from watchlist
  const handleDeleteStock = (index) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      setStockDetails(stockDetails.filter((_, i) => i !== index));
    }
  };

  // Filter stocks based on the selected filter
  const filteredData = stockDatawatchlist
    .filter((stock) => stock.stockName.toLowerCase().includes(stockName.toLowerCase()))
    .filter((stock) => {
      if (activeFilter === "Gainers") {
        return parseFloat(stock.threemonths) > 0;
      }
      if (activeFilter === "Losers") {
        return parseFloat(stock.threemonths) < 0;
      }
      return true;
    });

  return (
    <div>
      <Navbar />
      <h2 className="newwmutual" >
        Mutual Fund Watchlist
      </h2>
      <div className="networth-tabs">
        <Link to="/stockWatchlist">
          <button className="networth-tab" style={{ background: "white", color: "black",  }}>
            Stocks
          </button>
        </Link>
        <Link to="/mutualWatchlist">
          <button className="networth-tab" style={{ background: "#24b676", color: "white" }}>
            Mutual Fund
          </button>
        </Link>
        <Link to="/goldWatchlistall">
          <button className="networth-tab" style={{ background: "white", color: "black" }}>
            Gold
          </button>
        </Link>
      </div>
      <div className="stock-watchlist">
        <div className="watchlist-management">
          {watchlists.map((watchlist, index) => (
            <div className="watchlist-item" key={index}>
              <input
                type="radio"
                name="watchlist"
                defaultChecked={index === 0}
                style={{ width: "14px", height: "14px", accentColor: "#24b676" }}
              />
              <label className="watchlist-label">{watchlist}</label>
              <button className="menu-iconwatchlist" onClick={() => toggleDropdown(index)}>
                ⋮
              </button>
              {activeDropdown === index && (
                <div className="menu-dropdownwatchlist">
                  <button className="menu-itemwatchlist" onClick={() => handleRenameWatchlist(index)}>
                    Rename
                  </button>
                  <button className="menu-itemwatchlist" onClick={() => handleDeleteWatchlist(index)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <button className="create-watchlist" onClick={handleCreateWatchlist}>
            + Create Watchlist
          </button>
        </div>
        <h2 style={{marginLeft:"10px",fontSize:"19px"}}>Add Watchlist</h2>
        <div className="watchlist-header">
        <div className="scheme-exchange-cell">
          <div className="input-groupwatchlist">
            <label htmlFor="stockName">Scheme Name</label>
            <input
              id="stockName"
              type="text"
              placeholder="Type to search"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
          </div>
          <div className="input-groupwatchlist">
            <label htmlFor="exchange">Exchange</label>
            <input
              id="exchange"
              type="text"
              value={exchange}
              readOnly
              style={{ backgroundColor: "#f9f9f9", border: "1px solid #ccc", width: "50px" }}
            />
          </div>
          </div>
          <button className="add-btnwatchlist" onClick={handleAddStock}>
            + Add
          </button>
        </div>
      </div>
      <div className="content-containerwatchlist">
        <div className="top-sectionswatchlist" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
          <div className="filters-sectionwatchlist">
            <span className="filter-labelwatchlist">FILTER:</span>
            <button className={`filter-buttonwatchlist ${activeFilter === "All" ? "active" : ""}`} onClick={() => setActiveFilter("All")}>
              All
            </button>
            <button className={`filter-buttonwatchlist ${activeFilter === "Gainers" ? "active" : ""}`} onClick={() => setActiveFilter("Gainers")}>
              Gainers
            </button>
            <button className={`filter-buttonwatchlist ${activeFilter === "Losers" ? "active" : ""}`} onClick={() => setActiveFilter("Losers")}>
              Losers
            </button>
          </div>
          <div className="group-by-sectionwatchlist">
            <label style={{ marginRight: "8px" }}>Group By:</label>
              <input
                type="radio"
                name="groupBywatchlist"
                value="nonewatchlist"
                onClick={() => navigate("/mutualwatchlistall")}
                defaultChecked
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              None
              <input
                type="radio"
                name="groupBywatchlist"
                value="sectorwatchlist"
                onClick={() => navigate("/mutualwatchlistsector")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              AMC
              <input
                type="radio"
                name="groupBywatchlist"
                value="mcapwatchlist"
                onClick={() => navigate("/mutualwatchlisttype")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              Types of Funds
            </div>
          </div>
        <div className="table-containerwatchlist">
          <table className="stock-tablewatchlist">
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>NAV 1D change</th>
                <th>52 week High/Low</th>
                <th>1 month</th>
                <th>3 months</th>
                <th>5 Years</th>
                <th>10 years</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockDetails.length === 0 ? (
                <tr>
                  <td colSpan="8">No data found</td>
                </tr>
              ) : (
                stockDetails.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.stockName}</td>
                    <td>{stock.nav1dchange}</td>
                    <td>{stock.fiftytwoweekhighorlow}</td>
                    <td>{stock.onemonth}</td>
                    <td>{stock.threemonths}</td>
                    <td>{stock.fiveyears}</td>
                    <td>{stock.tenyears}</td>
                    <td>
                      <button className="delete-btnwatchlist" onClick={() => handleDeleteStock(index)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MutualWatchlist;