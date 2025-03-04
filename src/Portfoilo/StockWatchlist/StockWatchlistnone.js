import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./StockWatchlistnone.css";
import Navbar from "../../Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const StockWatchlist = () => {
  const [stockName, setStockName] = useState("");
  const [stockDetails, setStockDetails] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [renamePopup, setRenamePopup] = useState(false);
  const [renameIndex, setRenameIndex] = useState(null);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteWatchlistPopup, setDeleteWatchlistPopup] = useState(false);


  const navigate = useNavigate();
  const getStockData = useSelector((store) => store?.searchData?.searchData);

  // Debounced Search Function
  const debounceSearch = useCallback(
    debounce((searchText) => {
      setFilterData(
        searchText ? getStockData.filter((item) => item.company?.toLowerCase().includes(searchText.toLowerCase())) : []
      );
    }, 300),
    [getStockData]
  );
  const handleSelectStock = (stock) => {
    setStockName(stock.company); // Display selected stock name in input
    setSelectedStock(stock); // Store full stock details for later use
    setFilterData([]); // Hide suggestions
  };

  // Fetch Watchlists
  const fetchWatchlists = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) return alert("Unauthorized: No token provided");

    try {
      const response = await fetch(`${API_BASE_URL}/Watchlist/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch watchlists");

      const data = await response.json();
      setWatchlists(data);

      // Set only if no watchlist is selected
      setSelectedWatchlist((prev) => prev ?? data[0]?.watchlist_id);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to fetch watchlists.");
    }
  };

  // Fetch Watchlist Assets
  const fetchWatchlistAssets = useCallback(async () => {
    if (!selectedWatchlist) return;
    const token = Cookies.get("jwtToken");
    if (!token) return alert("Unauthorized: No token provided");

    try {
      const response = await fetch(`${API_BASE_URL}/Watchlist/getWatchlistAssets?watchlist_id=${selectedWatchlist}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch watchlist assets");
      setStockDetails(await response.json());
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to fetch watchlist assets.");
    }
  }, [selectedWatchlist]);

  // Handle stock addition
  const handleAddStock = async () => {
    if (!stockName.trim()) return alert("Stock name cannot be empty!");

    const normalizedStockName = stockName.toUpperCase();

    if (stockDetails.some((stock) => stock.asset_symbol === normalizedStockName)) {
      return alert("This stock is already in your watchlist.");
    }

    const token = Cookies.get("jwtToken");
    if (!token) return alert("Unauthorized: No token provided");

    try {
      const response = await fetch(`${API_BASE_URL}/Watchlist/addStockToWatchklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset_symbol: normalizedStockName,
          watchlist_id: selectedWatchlist || null,
          asset_type: "Stock",
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      // Get the new stock details from API response
      const newStock = await response.json();

      // Ensure stock is added with the correct property names
      setStockDetails((prevStocks) => [
        ...prevStocks,
        { ...newStock, asset_symbol: normalizedStockName },
      ]);

      setStockName(""); // Clear input field after adding
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to add stock.");
    }
  };


  //handle stocks name
  const handleStockNameChange = (event) => {
    setStockName(event.target.value);
  };


  // Determine the color for the change value
  const getChangeColor = (change) => {
    return change >= 0 ? "green" : "red";
  };

  const handleDeleteWatchlist = async () => {
    if (!selectedWatchlist) return;
    const token = Cookies.get("jwtToken");
    if (!token) return alert("Unauthorized: No token provided");
  
    try {
      const response = await fetch(`${API_BASE_URL}/Watchlist/deleteWatchlist?watchlist_id=${selectedWatchlist}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error("Failed to delete watchlist");
  
      // Remove deleted watchlist from state
      setWatchlists((prevWatchlists) => prevWatchlists.filter(watchlist => watchlist.watchlist_id !== selectedWatchlist));
  
      setSelectedWatchlist(null);
      setStockDetails([]);
      setDeleteWatchlistPopup(false);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to delete watchlist.");
    }
  };
  
  const handleRenameWatchlist = (index) => {
    setRenameIndex(index);
    setNewWatchlistName(watchlists[index].name);
    setRenamePopup(true);
  };

  const handleRenameConfirm = () => {
    if (!newWatchlistName.trim()) return;
    setWatchlists((prev) =>
      prev.map((w, i) => (i === renameIndex ? { ...w, name: newWatchlistName } : w))
    );
    setRenamePopup(false);
  };


  const handleDeleteStock = (index) => {
    setDeleteIndex(index);
    setDeletePopup(true);
  };

  const confirmDeleteStock = () => {
    if (deleteIndex !== null) {
      setStockDetails((prevStocks) => prevStocks.filter((_, i) => i !== deleteIndex));
      setDeletePopup(false);
    }
  };
  const handleCreateWatchlist = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) return alert("Unauthorized: No token provided");
  
    const newWatchlistTemp = { 
      id: Date.now(), 
      name: `My Watchlist ${watchlists.length + 1}` 
    };
  
    setWatchlists(prev => [...prev, newWatchlistTemp]); // Temporary optimistic update
  
    try {
      const response = await fetch(`${API_BASE_URL}/Watchlist/CreateWatchList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newWatchlistTemp.name }),
      });
  
      if (!response.ok) throw new Error("Failed to create watchlist");
  
      const newWatchlist = await response.json();
      console.log("New Watchlist from API:", newWatchlist);
  
      setWatchlists(prev => prev.map(w => 
        w.id === newWatchlistTemp.id ? newWatchlist : w
      ));
  
      setSelectedWatchlist(newWatchlist.watchlist_id); // Ensure selection updates
    } catch (error) {
      alert(error.message || "Error creating watchlist");
  
      // Revert UI if API call fails
      setWatchlists(prev => prev.filter(w => w.id !== newWatchlistTemp.id));
    }
  };

  const toggleDropdown = (index) => setActiveDropdown(activeDropdown === index ? null : index);

  useEffect(() => {
    fetchWatchlists();
  }, [])

  useEffect(() => {
    debounceSearch(stockName);
    return () => debounceSearch.cancel();
  }, [stockName]);

  useEffect(() => {
    fetchWatchlistAssets();
  }, [selectedWatchlist]);


  return (
    <div>
      <Navbar />
      <h2 className="newwmutual">Stock Watchlist</h2>
      <div className="networth-tabs">
        <Link to="/stockwatchlist">
          <button
            className="networth-tab"
            style={{ background: "#24b676", color: "white" }}
          >
            Stocks
          </button>
        </Link>
        <Link to="/mutualWatchlist">
          <button
            className="networth-tab"
            style={{ background: "white", color: "black" }}
          >
            Mutual Fund
          </button>
        </Link>
        <Link to="/goldWatchlistall">
          <button
            className="networth-tab"
            style={{ background: "white", color: "black" }}
          >
            Gold
          </button>
        </Link>
      </div>
      <div>
        <div className="stock-watchlist">
          {/* Watchlist Section */}
          <div className="watchlist-management">
            {watchlists.map((watchlist, index) => (
              <div className="watchlist-item" key={index}>
                <input
                  type="radio"
                  name="watchlist"
                  checked={selectedWatchlist === watchlist.watchlist_id}
                  onChange={() => setSelectedWatchlist(watchlist.watchlist_id)}
                  style={{
                    width: "14px",
                    height: "14px",
                    accentColor: "#24b676",
                  }}
                />
                <label className="watchlist-label">{watchlist.name}</label>
                <button
                  className="menu-iconwatchlist"
                  onClick={() => toggleDropdown(index)}
                >
                  ⋮
                </button>
                {activeDropdown === index && (
                  <div className="menu-dropdownwatchlist">
                    <button
                      className="menu-itemwatchlist"
                      onClick={() => handleRenameWatchlist(watchlists[index].watchlist_id)}
                    >
                      Rename
                    </button>
                    <button
                      className="menu-itemwatchlist"
                      onClick={() => setDeleteWatchlistPopup(true)}
                    >
                      Delete
                    </button>

                  </div>
                )}
              </div>
            ))}
            <button
              className="create-watchlist"
              onClick={handleCreateWatchlist}
            >
              + Create Watchlist
            </button>
          </div>
          <h2 style={{ marginLeft: "20px", fontSize: "19px" }}>
            Add Watchlist
          </h2>
          {/* Input Section */}
          <div className="watchlist-header">
            <div className="scheme-exchange-cell">
              <div className="input-groupwatchlist">
                <label htmlFor="stockName">Stock Name</label>
                <input
                  id="stockName"
                  type="text"
                  placeholder="Enter stock name..."
                  value={stockName}
                  onChange={handleStockNameChange}
                />

                {/* display input results  */}
                <div>
                {/* display input results */}
{stockName && (
  <div className={`search-resultswatchlistsector ${filterData.length > 0 ? "active" : ""}`}>
    {filterData.length > 0 ? (
      <ul>
        {filterData.map((data) => (
          <li key={data.id} onClick={() => handleSelectStock(data)}>
            {data.company}
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ padding: "8px" }}>No result found</p>
    )}
  </div>
)}

                </div>
              </div>

              <div className="input-groupwatchlist">
                <label htmlFor="exchange">Exchange</label>
                <input
                  id="exchange"
                  type="text"
                  value="NSE"
                  readOnly
                  style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ccc",
                    width: "50px",
                  }} // Optional styling for non-editable input
                />
              </div>
            </div>

            <button className="add-btnwatchlist" onClick={handleAddStock}>
              + Add
            </button>
          </div>
        </div>
        {/* Content Container */}

        <div className="content-containerwatchlist">
          <div className="top-sectionswatchlistsectorr">
            {/* Filters Section */}
            <div className="filters-sectionwatchlist">
              <span className="filter-labelwatchlist">FILTER:</span>
              <button className="filter-buttonwatchlist">All</button>
              <button className="filter-buttonwatchlist">Gainers</button>
              <button className="filter-buttonwatchlist">Losers</button>
            </div>

            {/* Group By Section */}
            <div className="group-by-sectionwatchlist">
              <label style={{ marginRight: "8px" }}>Group By:</label>
              <input
                type="radio"
                name="groupBywatchlist"
                value="nonewatchlist"
                onClick={() => navigate("/stockwatchlistall")}
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
                onClick={() => navigate("/stockwatchlistsector")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              Sector
              <input
                type="radio"
                name="groupBywatchlist"
                value="mcapwatchlist"
                onClick={() => navigate("/stockwatchlistmcap")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              M-Cap
            </div>
          </div>

          {/* Stock Table */}
          <div className="table-containerwatchlist">
            <table className="stock-tablewatchlist">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Live Price</th>
                  <th>Change</th>
                  <th>Change %</th>
                  <th>Volume</th>
                  <th>Today's High</th>
                  <th>Today's Low</th>
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
                      <td>{stock.asset_symbol}</td>
                      <td>{stock.livePrice}</td>
                      <td style={{ color: getChangeColor(stock.change) }}>
                        {stock.change >= 0 ? `+${stock.change}` : stock.change}
                      </td>
                      <td>{stock.changePercent}%</td>
                      <td>{stock.volume}</td>
                      <td>{stock.high}</td>
                      <td>{stock.low}</td>
                      <td>
                        <button
                          className="delete-btnwatchlist"
                          onClick={() => handleDeleteStock(index, stock.asset_symbol)}
                        >
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
        {renamePopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Rename Watchlist</h3>
            <input
              type="text"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
            />
            <div className="watchlistpopup-btn">
              <button  className="popup-btnconfirm"onClick={handleRenameConfirm}>Save</button>
              <button onClick={() => setRenamePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


{deletePopup && (
        <div className="popup-overlaywatchlist">
          <div className="popup-containerwatchlist">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this stock?</p>
            <div className="watchlistpopup-btn">
              <button className="popup-btnconfirm" onClick={confirmDeleteStock}>Confirm</button>
              <button onClick={() => setDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

{deleteWatchlistPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Confirm Watchlist Deletion</h3>
            <p>Are you sure you want to delete this watchlist? This action cannot be undone.</p>
            <div className="watchlistpopup-btn">
            <button className="popup-btnconfirm" onClick={() => handleDeleteWatchlist()}>Confirm</button>

              <button onClick={() => setDeleteWatchlistPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
        <FooterForAllPage/>
      </div>
  
    </div>
  );
};

export default StockWatchlist;
