import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./StockWatchlistnone.css";
import Navbar from "../../Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Sidebar from "../../Sidebar/Sidebar";
import Meta from "../../Meta";

const StockWatchlist = ({ children }) => {
  // Hooks and refs
  const location = useLocation();
  const navigate = useNavigate();
  const getStockData = useSelector((store) => store?.searchData?.searchData || []);

  // Refs
  const renamePopupRef = useRef(null);
  const deletePopupRef = useRef(null);
  const deleteWatchlistPopupRef = useRef(null);
  const dropdownRefs = useRef([]);

  // State management with useReducer pattern for complex state
  const [stockInput, setStockInput] = useState({
    name: "",
    selected: null,
    filterResults: [],
  });

  const [watchlistState, setWatchlistState] = useState({
    list: [],
    selected: null,
    stockDetails: [],
  });

  const [uiState, setUiState] = useState({
    activeDropdown: null,
    renamePopup: false,
    renameIndex: null,
    newWatchlistName: "",
    deletePopup: false,
    deleteIndex: null,
    deleteWatchlistPopup: false,
    deleteWatchlistId: null,
    activeFilter: "All"
  });

  // Memoized values
  const selectedWatchlistName = useMemo(() => {
    const selected = watchlistState.list.find(
      w => w.watchlist_id === watchlistState.selected
    );
    return selected?.name || "";
  }, [watchlistState.list, watchlistState.selected]);

  // Authentication check
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchWatchlists();
  }, [navigate]);

  // API calls
  const fetchWatchlists = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setWatchlistState(prev => ({
        ...prev,
        list: data,
        selected: prev.selected || data[0]?.watchlist_id,
      }));
    } catch (error) {
      console.error("Fetch watchlists error:", error);
      alert(error.message || "Failed to fetch watchlists.");
    }
  };

  const fetchWatchlistAssets = useCallback(async () => {
    if (!watchlistState.selected) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/getWatchlistAssets?watchlist_id=${watchlistState.selected}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setWatchlistState(prev => ({ ...prev, stockDetails: data }));
    } catch (error) {
      console.error("Fetch assets error:", error);
      alert(error.message || "Failed to fetch watchlist assets.");
    }
  }, [watchlistState.selected]);

  // Debounced search
  const debounceSearch = useCallback(
    debounce((searchText) => {
      setStockInput((prev) => ({
        ...prev,
        filterResults: searchText
          ? getStockData.filter(
            (item) =>
              item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
              item.symbol?.toLowerCase().includes(searchText.toLowerCase())
          )
          : [],
      }));
    }, 300),
    [getStockData]
  );

  // Event handlers
  const handleSelectStock = (stock) => {
    setStockInput({
      name: stock,
      selected: stock,
      filterResults: [],
    });
  };

  const handleStockNameChange = (event) => {
    const value = event.target.value;
    setStockInput(prev => ({ ...prev, name: value }));
    debounceSearch(value);
  };

  const handleAddStock = async () => {
    if (!stockInput.name.trim()) {
      alert("Stock name cannot be empty!");
      return;
    }

    const normalizedStockName = stockInput.name.toUpperCase();

    if (watchlistState.stockDetails.some(
      stock => stock.asset_symbol === normalizedStockName
    )) {
      alert("This stock is already in your watchlist.");
      return;
    }

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/addStockToWatchklist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            asset_symbol: normalizedStockName,
            watchlist_id: watchlistState.selected,
            asset_type: "Stock",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const newStock = await response.json();
      setWatchlistState(prev => ({
        ...prev,
        stockDetails: [
          ...prev.stockDetails,
          { ...newStock, asset_symbol: normalizedStockName },
        ],
      }));

      setStockInput(prev => ({ ...prev, name: "", selected: null }));
    } catch (error) {
      console.error("Add stock error:", error);
      alert(error.message || "Failed to add stock.");
    }
  };

  const handleCreateWatchlist = async () => {
    const newWatchlistName = `My Watchlist ${watchlistState.list.length + 1}`;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/CreateWatchList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newWatchlistName }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const newWatchlist = await response.json();
      setWatchlistState(prev => ({
        ...prev,
        list: [...prev.list, newWatchlist],
        selected: newWatchlist.watchlist_id || prev.selected,
      }));
    } catch (error) {
      console.error("Create watchlist error:", error);
      alert(error.message || "Error creating watchlist");
    }
  };

  const handleDeleteWatchlist = async () => {
    if (!uiState.deleteWatchlistId) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/deleteWatchlist?watchlist_id=${uiState.deleteWatchlistId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => {
        const updatedList = prev.list.filter(
          w => w.watchlist_id !== uiState.deleteWatchlistId
        );

        let newSelectedId = prev.selected;
        if (prev.selected === uiState.deleteWatchlistId) {
          const deletedIndex = prev.list.findIndex(
            w => w.watchlist_id === uiState.deleteWatchlistId
          );
          newSelectedId = updatedList[deletedIndex]?.watchlist_id ||
            updatedList[Math.max(0, deletedIndex - 1)]?.watchlist_id ||
            updatedList[0]?.watchlist_id;
        }

        return {
          ...prev,
          list: updatedList,
          selected: newSelectedId,
          stockDetails: newSelectedId ? prev.stockDetails : []
        };
      });

      setUiState(prev => ({
        ...prev,
        deleteWatchlistPopup: false,
        deleteWatchlistId: null
      }));
    } catch (error) {
      console.error("Delete watchlist error:", error);
      alert(error.message || "Failed to delete watchlist.");
    }
  };

  const handleRenameWatchlist = (watchlistId) => {
    const watchlist = watchlistState.list.find(w => w.watchlist_id === watchlistId);
    setUiState(prev => ({
      ...prev,
      renameIndex: watchlistId,
      newWatchlistName: watchlist?.name || "",
      renamePopup: true,
      activeDropdown: null
    }));
  };

  const handleRenameConfirm = async (newName) => {
    if (!newName.trim()) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/renameWatchlist`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            watchlist_id: uiState.renameIndex,
            name: newName,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => ({
        ...prev,
        list: prev.list.map(w =>
          w.watchlist_id === uiState.renameIndex ? { ...w, name: newName } : w
        ),
      }));

      setUiState(prev => ({
        ...prev,
        renamePopup: false,
        renameIndex: null,
      }));
    } catch (error) {
      console.error("Rename error:", error);
      alert(error.message || "Failed to rename watchlist.");
    }
  };

  const handleDeleteStock = (index) => {
    setUiState(prev => ({
      ...prev,
      deleteIndex: index,
      deletePopup: true,
    }));
  };

  const confirmDeleteStock = async () => {
    if (uiState.deleteIndex === null) return;

    const stockToDelete = watchlistState.stockDetails[uiState.deleteIndex];

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/Watchlist/removeStockFromWatchlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            watchlist_id: watchlistState.selected,
            asset_symbol: stockToDelete.asset_symbol,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => ({
        ...prev,
        stockDetails: prev.stockDetails.filter((_, i) => i !== uiState.deleteIndex),
      }));

      setUiState(prev => ({
        ...prev,
        deletePopup: false,
        deleteIndex: null,
      }));
    } catch (error) {
      console.error("Delete stock error:", error);
      alert(error.message || "Failed to delete stock.");
    }
  };

  const toggleDropdown = (index) => {
    setUiState(prev => {
      const isOpening = prev.activeDropdown !== index;
      // Add/remove menu-active class from watchlist-management
      const watchlistManagement = document.querySelector('.watchlist-management');
      if (watchlistManagement) {
        if (isOpening) {
          watchlistManagement.classList.add('menu-active');
        } else {
          watchlistManagement.classList.remove('menu-active');
        }
      }

      return {
        ...prev,
        activeDropdown: isOpening ? index : null,
      };
    });
  };

  // Also make sure to remove the class when component unmounts
  useEffect(() => {
    return () => {
      const watchlistManagement = document.querySelector('.watchlist-management');
      if (watchlistManagement) {
        watchlistManagement.classList.remove('menu-active');
      }
    };
  }, []);

  const getChangeColor = (change) => change >= 0 ? "green" : "red";

  const selectWatchlist = (watchlistId) => {
    setWatchlistState(prev => ({ ...prev, selected: watchlistId }));
  };

  const promptDeleteWatchlist = (watchlistId) => {
    setUiState(prev => ({
      ...prev,
      deleteWatchlistId: watchlistId,
      deleteWatchlistPopup: true,
    }));
  };

  // Effects
  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  useEffect(() => {
    fetchWatchlistAssets();
  }, [watchlistState.selected, fetchWatchlistAssets]);

  // Click outside handler
  const handleClickOutside = useCallback((event) => {
    if (renamePopupRef.current && !renamePopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, renamePopup: false }));
    }

    if (deletePopupRef.current && !deletePopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, deletePopup: false }));
    }

    if (deleteWatchlistPopupRef.current &&
      !deleteWatchlistPopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, deleteWatchlistPopup: false }));
    }

    if (uiState.activeDropdown !== null) {
      const activeDropdownElement = dropdownRefs.current[uiState.activeDropdown];
      if (activeDropdownElement && !activeDropdownElement.contains(event.target)) {
        setUiState(prev => ({ ...prev, activeDropdown: null }));
      }
    }
  }, [uiState.activeDropdown]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Component rendering
  const RenamePopup = () => {
    const [localName, setLocalName] = useState(uiState.newWatchlistName);

    const handleSave = () => handleRenameConfirm(localName);
    const handleCancel = () => {
      setLocalName(uiState.newWatchlistName);
      setUiState(prev => ({ ...prev, renamePopup: false }));
    };

    return (
      <div className="popup-overlay">
        <Meta path={location.pathname} />
        <div className="popup-container" ref={renamePopupRef}>
          <h3>Rename Watchlist</h3>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <div className="watchlistpopup-btn">
            <button className="popup-btnconfirm" onClick={handleSave}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteStockPopup = () => (
    <div className="popup-overlay">
      <div className="popup-container" ref={deletePopupRef}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this stock?</p>
        <div className="watchlistpopup-btn">
          <button className="popup-btnconfirm" onClick={confirmDeleteStock}>
            Confirm
          </button>
          <button onClick={() => setUiState(prev => ({ ...prev, deletePopup: false }))}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const DeleteWatchlistPopup = () => {
    const watchlistToDelete = watchlistState.list.find(
      w => w.watchlist_id === uiState.deleteWatchlistId
    );

    return (
      <div className="popup-overlay">
        <div className="popup-container" ref={deleteWatchlistPopupRef}>
          <h3>Confirm Watchlist Deletion</h3>
          <p>Are you sure you want to delete "{watchlistToDelete?.name}"? This action cannot be undone.</p>
          <div className="watchlistpopup-btn">
            <button className="popup-btnconfirm" onClick={handleDeleteWatchlist}>
              Confirm
            </button>
            <button onClick={() => setUiState(prev => ({ ...prev, deleteWatchlistPopup: false }))}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h2 className="newwmutual">Stock Watchlist</h2>

      {/* Navigation tabs */}
      <div className="networth-tabswatclist">
        <Link to="/stock-watchlist">
          <button className="networth-tab active-tab">
            Stocks
          </button>
        </Link>
        <Link to="/mutual-fund-watchlist">
          <button className="networth-tab">
            Mutual Fund
          </button>
        </Link>
        <Link to="/gold-watchlist">
          <button className="networth-tab">
            Gold
          </button>
        </Link>
      </div>

      <div>
        <div className="stock-watchlist">
          {/* Watchlist Section */}
          <div className="watchlist-management">
            {watchlistState.list.map((watchlist, index) => (
              <div className="watchlist-item" key={watchlist.watchlist_id}>
                <input
                  type="radio"
                  name="watchlist"
                  checked={watchlistState.selected === watchlist.watchlist_id}
                  onChange={() => selectWatchlist(watchlist.watchlist_id)}
                  className="watchlist-radio"
                />
                <label className="watchlist-label">{watchlist.name}</label>
                <button
                  className="menu-iconwatchlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                  aria-label="Watchlist options"
                >
                  ⋮
                </button>
                {uiState.activeDropdown === index && (
                  <div
                    className="menu-dropdownwatchlist"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <button
                      className="menu-itemwatchlist"
                      onClick={() => handleRenameWatchlist(watchlist.watchlist_id)}
                    >
                      Rename
                    </button>
                    <button
                      className="menu-itemwatchlist"
                      onClick={() => promptDeleteWatchlist(watchlist.watchlist_id)}
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

          <h2 className="allh2">Add Watchlist</h2>

          {/* Input Section */}
          <div className="watchlist-header">
            <div className="scheme-exchange-cell">
              <div className="input-groupwatchlist">
                <label htmlFor="stockName">Stock Name</label>
                <input
                  id="stockName"
                  type="text"
                  placeholder="Enter stock name..."
                  value={stockInput.name}
                  onChange={handleStockNameChange}
                  aria-label="Stock name input"
                />
                {stockInput.name && (
                  <div className={`search-resultswatchlistsector ${stockInput.filterResults.length ? "active" : ""}`}>
                    {stockInput.filterResults.length > 0 ? (
                      <ul>
                        {stockInput.filterResults.map((data) => (
                          <li
                            key={data.id}
                            onClick={() => handleSelectStock(data.symbol)}
                          >
                            {data.name} ({data.symbol})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-results">No result found</p>
                    )}
                  </div>
                )}
              </div>

              <div className="input-groupwatchlist">
                <label htmlFor="exchange">Exchange</label>
                <input
                  id="exchange"
                  type="text"
                  value="NSE"
                  readOnly
                  className="exchange-input"
                />
              </div>
            </div>

            <button
              className="add-btnwatchlist"
              onClick={handleAddStock}
              disabled={!stockInput.name.trim()}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="content-containerwatchlist">
          {/* Top filters section */}
          <div className="top-sectionswatchlistsectorr">
            <div className="filters-sectionwatchlist">
              <span className="filter-labelwatchlist">FILTER:</span>
              <button className="filter-buttonwatchlist">All</button>
              <button className="filter-buttonwatchlist">Gainers</button>
              <button className="filter-buttonwatchlist">Losers</button>
            </div>

            <div className="group-by-sectionwatchlist">
              <label>Group By:</label>
              <input
                type="radio"
                name="groupBywatchlist"
                value="nonewatchlist"
                onClick={() => navigate("/stock-watchlist")}
                defaultChecked
                className="group-by-radio"
              />
              None
              <input
                type="radio"
                name="groupBywatchlist"
                value="sectorwatchlist"
                onClick={() => navigate("/stockwatchlistsector")}
                className="group-by-radio"
              />
              Sector
              <input
                type="radio"
                name="groupBywatchlist"
                value="mcapwatchlist"
                onClick={() => navigate("/stockwatchlistmcap")}
                className="group-by-radio"
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
                {watchlistState.stockDetails.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">No data found</td>
                  </tr>
                ) : (
                  watchlistState.stockDetails.map((stock, index) => (
                    <tr key={`${stock.asset_symbol}-${index}`}>
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
                          onClick={() => handleDeleteStock(index)}
                          aria-label={`Delete ${stock.asset_symbol}`}
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

        {/* Popups */}
        {uiState.renamePopup && <RenamePopup />}
        {uiState.deletePopup && <DeleteStockPopup />}
        {uiState.deleteWatchlistPopup && <DeleteWatchlistPopup />}
      </div>
      <div className="layout">
        <Sidebar />
        <div className="main-contentover">
          <div className="contentover">{children}</div>
          <div className="oversidefooter">
            <FooterForAllPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockWatchlist;