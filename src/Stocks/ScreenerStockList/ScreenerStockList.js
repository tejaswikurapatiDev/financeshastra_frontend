import React, { useState } from "react";
import { screenerStockListData } from "../screenerStockListData";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { FaSearch } from "react-icons/fa"; // Import FaSearch for the search bar
import { IoLockClosedOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./ScreenerStockList.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";

const ScreenerStockList = () => {
  const [stocks, setStocks] = useState(screenerStockListData);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [filters, setFilters] = useState({
    epsDilGrowth: [], // Initialize as an empty array
    pe: [],           // Initialize as an empty array
    roe: [],          // Initialize as an empty array
    price: "All",
    marketCap: "All",
    divYield: [],
    sector: "All",
    change: "All",
  });
  
  const [isDivYieldDropdownVisible, setDivYieldDropdownVisible] = useState(false);

  const toggleDivYieldDropdown = () => {
    setDivYieldDropdownVisible(!isDivYieldDropdownVisible);
   
  };
  const [isEPSDropdownVisible, setEPSDropdownVisible] = useState(false);
    
  
  const toggleEPSDropdown = () => {
    setEPSDropdownVisible(!isEPSDropdownVisible);
  };
  const [isPEDropdownVisible, setPEDropdownVisible] = useState(false);
 
  const togglePEDropdown = () => {
    setPEDropdownVisible(!isPEDropdownVisible);
  };
  const [isMarketCapDropdownVisible, setIsMarketCapDropdownVisible] = useState(false);
  const [marketCapFilters, setMarketCapFilters] = useState([]);

  const toggleMarketCapDropdown = () => setIsMarketCapDropdownVisible(!isMarketCapDropdownVisible);

  const handleMarketCapChange = (value) => {
    setMarketCapFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const resetMarketCapFilters = () => {
    setMarketCapFilters([]);
  };

  const applyMarketCapFilters = () => {
    console.log("Applied Market Cap filters:", marketCapFilters);
    // Optionally, update the main filters state with the Market Cap selections
    setFilters((prevFilters) => ({
      ...prevFilters,
      marketCap: marketCapFilters,
    }));
  };
  const [isChangeDropdownVisible, setChangeDropdownVisible] = useState(false);
  const [changeRange, setChangeRange] = useState({ min: -30, max: 40 });

  const toggleChangeDropdown = () => {
    setChangeDropdownVisible(!isChangeDropdownVisible);
  };
  const handleChangeRange = (key, value) => {
    setChangeRange((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const resetValues = () => {
    setMinValue(0);
    setMaxValue(100);
  };

  const applyFilter = () => {
    console.log(`Filter applied: ${minValue} to ${maxValue}`);
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);

    if (e.target.name === 'min') {
      // Ensure the left slider cannot move past the right slider
      setMinValue((prev) => Math.min(value, maxValue - 1));
    } else if (e.target.name === 'max') {
      // Ensure the right slider cannot move before the left slider
      setMaxValue((prev) => Math.max(value, minValue + 1));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };

    if (key === "roe") {
      const currentValues = newFilters[key];
      if (currentValues.includes(value)) {
        newFilters[key] = currentValues.filter((v) => v !== value);
      } else {
        newFilters[key] = [...currentValues, value];
      }
    } else {
      newFilters[key] = value;
    }

    setFilters(newFilters);
    applyFilters(newFilters);
  };
  const resetFilters = () => {
    setFilters({
      epsDilGrowth: [],
      pe: [],
      roe: [],
      divYield: [],
      price: "All",
      marketCap: "All",
      sector: "All",
      change: "All",
    });
  };
  const applyFilters = (newFilters) => {
    const filteredStocks = screenerStockListData.filter((stock) => {
      const matchesPrice =
        newFilters.price === "All" ||
        parseFloat(stock.price.replace("₹", "")) <= parseFloat(newFilters.price);

        const matchesMarketCap =
        newFilters.marketCap.length === 0 || // Check if it's empty
        newFilters.marketCap.some((cap) => {
          const stockMarketCap = parseFloat(stock.marketCap.replace("T", ""));
          if (cap === "large" && stockMarketCap > 10) return true;
          if (cap === "mid" && stockMarketCap > 2 && stockMarketCap <= 10) return true;
          if (cap === "small" && stockMarketCap > 0.5 && stockMarketCap <= 2) return true;
          if (cap === "micro" && stockMarketCap <= 0.5) return true;
          if (cap === "others" && stockMarketCap > 0) return true;
          return false;
        });
      

        const matchesDivYield =
        newFilters.divYield.length === 0 ||
        newFilters.divYield.some((divYieldValue) => {
          const stockDivYield = parseFloat(stock.divYield.replace("%", ""));
          if (divYieldValue === "10-above" && stockDivYield >= 10) return true;
          if (divYieldValue === "5-above" && stockDivYield >= 5) return true;
          if (divYieldValue === "2-below" && stockDivYield <= 2) return true;
          if (divYieldValue === "0-2" && stockDivYield > 0 && stockDivYield <= 2) return true;
          return false;
        });
        
      const matchesSector =
        newFilters.sector === "All" || stock.sector === newFilters.sector;

      const matchesChange =
        newFilters.change === "All" ||
        (newFilters.change === "-5" && parseFloat(stock.change) <= -5) ||
        (newFilters.change === "0" && parseFloat(stock.change) >= 0) ||
        (newFilters.change === "5" && parseFloat(stock.change) >= 5) ||
        (newFilters.change === "10" && parseFloat(stock.change) >= 10);

      const matchesROE =
        newFilters.roe.length === 0 ||
        newFilters.roe.some((roeValue) => {
          if (roeValue === "30" && parseFloat(stock.roe) >= 30) return true;
          if (roeValue === "15" && parseFloat(stock.roe) >= 15) return true;
          if (roeValue === "0-above" && parseFloat(stock.roe) >= 0) return true;
          if (roeValue === "0-below" && parseFloat(stock.roe) < 0) return true;
          if (roeValue === "15-below" && parseFloat(stock.roe) < 15) return true;
          return false;
        });
        const matchesEPSDilGrowth =
      newFilters.epsDilGrowth.length === 0 ||
      newFilters.epsDilGrowth.some((epsValue) => {
        const stockEPS = parseFloat(stock.epsDilGrowth.replace("%", ""));
        if (epsValue === "50-above" && stockEPS >= 50) return true;
        if (epsValue === "25-above" && stockEPS >= 25) return true;
        if (epsValue === "10-below" && stockEPS <= 10) return true;
        if (epsValue === "0-above" && stockEPS >= 0) return true;
        if (epsValue === "0-below" && stockEPS < 0) return true;
        if (epsValue === "-25-below" && stockEPS <= -25) return true;
        return false;
      });
     
      
  // PE filter
  const matchesPE =
  newFilters.pe.length === 0 ||
  newFilters.pe.some((peValue) => {
    const stockPE = parseFloat(stock.pe || "0");
    if (peValue === "50-above" && stockPE >= 50) return true;
    if (peValue === "25-50" && stockPE >= 25 && stockPE < 50) return true;
    if (peValue === "15-25" && stockPE >= 15 && stockPE < 25) return true;
    if (peValue === "0-15" && stockPE >= 0 && stockPE < 15) return true;
    if (peValue === "25-below" && stockPE < 25) return true;
    if (peValue === "15-below" && stockPE < 15) return true;
    if (peValue === "0-above" && stockPE >= 0) return true;
    return false;
  });
      return (
        matchesPrice &&
        matchesMarketCap &&
        matchesDivYield &&
        matchesSector &&
        matchesChange &&
        matchesROE &&
        matchesEPSDilGrowth &&
        matchesPE
      );
    });

    setStocks(filteredStocks);
  };
  
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
const [isPegDropdownVisible, setPegDropdownVisible] = useState(false);
const togglePegDropdown = () => setPegDropdownVisible(!isPegDropdownVisible);
const [isRevenueGrowthDropdownVisible, setRevenueGrowthDropdownVisible] = useState(false);
const toggleRevenueGrowthDropdown = () => {
  setRevenueGrowthDropdownVisible((prevVisible) => !prevVisible);
};
const [isPerfDropdownVisible, setPerfDropdownVisible] = useState(false);

// Define the togglePerfDropdown function
const togglePerfDropdown = () => {
  setPerfDropdownVisible(prevVisible => !prevVisible);
};

const [performanceRange, setPerformanceRange] = useState({ min: -30, max: 40 });

const handlePerformanceRangeChange = (value) => {
  setPerformanceRange((prevRange) => ({
    ...prevRange,
    min: value,
    max: value, // Both min and max are the same, creating a single slider
  }));
};

const applyRange = () => {
  console.log("Performance Range Applied:", performanceRange);
  setPerfDropdownVisible(false); // Close dropdown after applying
};

const resetRange = () => {
  setPerformanceRange({ min: -30, max: 40 });
};
  // Sector dropdown logic
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);
  

  const sectors = [
    "Agriculture and Chemicals",
    "Capital Goods",
    "Consumer Durables",
    "Financial Services",
    "Healthcare",
    "Metals & Mining",
    "Private Bank",
    "Services",
    "Automobile and Auto Components",
    "Construction & Materials",
    "Consumer Services",
    "Fast Moving Consumer Goods",
    "IT",
    "Media Entertainment & Publication",
    "Public Bank",
    "Telecommunication",
    "Aviation",
    "Construction",
    "Energy (Oil & Gas)",
    "Forest Materials",
    "Logistics and Shipping",
    "Power",
    "Real Estate",
    "Textiles",
  ];
  const [isIndexDropdownVisible, setIndexDropdownVisible] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  

  const indexes = [
    "Nifty 50",
    "Nifty 500",
    "Nifty Midcap 100",
    "Nifty Smallcap 100",
    "Nifty Alpha 50",
    "Nifty Bank",
    "Nifty 100",
    "Nifty Next 50",
    "Nifty Midcap 150",
    "Nifty Smallcap 250",
    "Nifty50 Value 20",
    "Nifty Commodities",
    "Nifty 200",
    "Nifty LargeMidcap 250",
    "Nifty Midcap 50",
    "Nifty Smallcap 50",
    "Nifty Auto",
    "Nifty CPSE",
  ];
  const toggleIndexDropdown = () => {
    setIndexDropdownVisible(!isIndexDropdownVisible);
  };
  const handleCheckboxChange = (sector) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSectors = sectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredIndexes = indexes.filter((index) =>
    index.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setSelectedSectors([]);
    setSearchTerm("");
  };

  const handleApply = () => {
    console.log("Selected Sectors:", selectedSectors);
    setIsOpen(false);
    setFilters((prev) => ({ ...prev, sector: selectedSectors.join(", ") }));
    applyFilters({ ...filters, sector: selectedSectors.join(", ") });
  };

  return (
    <div className="screener-container">
      <h1 className="screener-header">Stocks Screener</h1>
      <div className="screener-filters">
        {/* Filter for each parameter */}
        <div style={{ position: "relative"}}>
      {/* Dropdown Button */}
      <button
        onClick={toggleIndexDropdown}
        style={{
          backgroundColor: "white", // Corrected CSS property
    border: "1px solid #333",
    padding: "4px 10px", // Added horizontal padding for better spacing
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "6px", // Space between the text and the icon
    borderRadius: "5px",
  }}
      >
        Index <RiArrowDropDownLine size={24} />
      </button>

      {/* Dropdown Menu */}
      {isIndexDropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "0",
            width: "600%",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
       
        >
          {/* Search Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              padding: "2px",
              border: "1px solid black",
              borderRadius: "12px",
              width:"400px"
            }}
          >
            <FaSearch style={{ marginRight: "4px", color: "#333" }} />
            <input
              type="text"
              placeholder="Search Index"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
              }}
            />
          </div>

          {/* Checkbox List */}
          <div
            style={{
              display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                 
                  overflowY: "auto",
            }}
          >
            {filteredIndexes.map((index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIndexes.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  style={{ width: "18%" }}
                />
                {index}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
            }}
          >
            <button
              onClick={handleReset}
              style={{
                padding: "5px 10px",
                    border: "1px solid #24b676",
                    borderRadius: "4px",
                    color: "#24b676",
                    backgroundColor: "white",
                    cursor: "pointer",
                    marginLeft:"320px"
              }}
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              style={{
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                color: "white",
                backgroundColor: "#24b676",
                cursor: "pointer",
                marginRight:"50px",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="filter-group price-filter">
      <div className="dropdown-change-wrapper">
        {/* Toggle button */}
        <button
          className="dropdown-change-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
        >
          Price <RiArrowDropDownLine size={24} />
        </button>

        {/* Dropdown options */}
        {isDropdownOpen && (
          <div className="dropdown-change-options">
            <div className="slider-wrapper">
              {/* Input Fields for Min and Max */}
              <div className="dropdown-change-range">
                <input
                  type="number"
                  value={minValue}
                  onChange={(e) =>
                    setMinValue(Math.min(Number(e.target.value), maxValue - 1))
                  }
                />
                <span>To</span>
                <input
                  type="number"
                  value={maxValue}
                  onChange={(e) =>
                    setMaxValue(Math.max(Number(e.target.value), minValue + 1))
                  }
                />
              </div>

              {/* Slider */}
              <div className="range-slider">
                {/* Dynamic Track Background */}
                <div
                  className="slider-track"
                  style={{
                    background: `linear-gradient(to right, #ddd 0%, #ddd ${minValue}%, #24b676 ${minValue}%, #24b676 ${maxValue}%, #ddd ${maxValue}%, #ddd 100%)`,
                  }}
                ></div>
                {/* Left Handle */}
                <input
                  type="range"
                  name="min"
                  min="0"
                  max="100"
                  value={minValue}
                  onChange={handleSliderChange}
                  className="slider thumb-left"
                />
                {/* Right Handle */}
                <input
                  type="range"
                  name="max"
                  min="0"
                  max="100"
                  value={maxValue}
                  onChange={handleSliderChange}
                  className="slider thumb-right"
                />
              </div>

              {/* Buttons */}
              <div className="dropdown-change-actions">
                <button className="reset-change-button" onClick={resetValues}>
                  Reset
                </button>
                <button className="apply-change-button" onClick={applyFilter}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        <div className="filter-group change-filter">
      <div className="dropdown-change-wrapper">
        <button
          className="dropdown-change-toggle"
          onClick={toggleChangeDropdown}
        >
          Change % <RiArrowDropDownLine size={24} />
        </button>
        {isChangeDropdownVisible && (
          <div className="dropdown-change-options">
            <div className="dropdown-change-range">
              <label>
                <input
                  type="number"
                  value={changeRange.min}
                  onChange={(e) => handleChangeRange("min", e.target.value)}
                  className="change-input"
                />
               
              </label>
              <span>To</span>
              <label>
                <input
                  type="number"
                  value={changeRange.max}
                  onChange={(e) => handleChangeRange("max", e.target.value)}
                  className="change-input"
                />
              
              </label>
            </div>

            <input
  type="range"
  min="-50"
  max="100"
  value={changeRange.min}
  onChange={(e) => handleChangeRange("min", e.target.value)}
  className="change-slider"
  step="1"
  aria-label="Minimum change percentage"
/>


            <div className="dropdown-change-actions">
              <button className="reset-change-button" onClick={resetRange}>
                Reset
              </button>
              <button className="apply-change-button" onClick={applyRange}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

        <div className="market-cap-filter">
      <div className="dropdown-market-cap-wrapper">
        <button className="dropdown-market-cap-toggle" onClick={toggleMarketCapDropdown}>
          Market Cap<RiArrowDropDownLine size={24} />
        </button>
        {isMarketCapDropdownVisible && (
          <div className="dropdown-market-cap-options">
            <label className="dropdown-market-cap-label">
              <input
                type="checkbox"
                value="large"
                checked={marketCapFilters.includes("large")}
                onChange={() => handleMarketCapChange("large")}
                style={{ width: "40%" }}
              />
              Large Cap
            </label>
            <label className="dropdown-market-cap-label">
              <input
                type="checkbox"
                value="mid"
                checked={marketCapFilters.includes("mid")}
                onChange={() => handleMarketCapChange("mid")}
                style={{ width: "40%" }}
              />
              Mid Cap
            </label>
            <label className="dropdown-market-cap-label">
              <input
                type="checkbox"
                value="small"
                checked={marketCapFilters.includes("small")}
                onChange={() => handleMarketCapChange("small")}
                style={{ width: "40%" }}
              />
              Small Cap
            </label>
            <label className="dropdown-market-cap-label">
              <input
                type="checkbox"
                value="micro"
                checked={marketCapFilters.includes("micro")}
                onChange={() => handleMarketCapChange("micro")}
                style={{ width: "40%" }}
              />
              Micro Cap
            </label>
            <label className="dropdown-market-cap-label">
              <input
                type="checkbox"
                value="others"
                checked={marketCapFilters.includes("others")}
                onChange={() => handleMarketCapChange("others")}
                style={{ width: "40%" }}
              />
              Others
            </label>
            <div className="dropdown-market-cap-actions">
              <button className="dropdown-market-cap-reset" onClick={resetMarketCapFilters}>
                Reset
              </button>
              <button className="dropdown-market-cap-apply" onClick={applyMarketCapFilters}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
        <div className="filter-group pe-filter">
      <div className="dropdown-pe-wrapper">
        <button className="dropdown-pe-toggle" onClick={togglePEDropdown}>
          P/E <RiArrowDropDownLine size={24} />
        </button>
        {isPEDropdownVisible && (
          <div className="dropdown-pe-options">
            <label className="dropdown-pe-label">
              <input
                type="checkbox"
                value="50-above"
                checked={filters.pe.includes("50-above")}
                onChange={() => handleFilterChange("pe", "50-above")}
                style={{ width: "40%" }}
              />
              50 and above
            </label>
            <label className="dropdown-pe-label">
              <input
                type="checkbox"
                value="25-50"
                checked={filters.pe.includes("25-50")}
                onChange={() => handleFilterChange("pe", "25-50")}
                style={{ width: "40%" }}
              />
              25 to 50
            </label>
            <label className="dropdown-pe-label">
              <input
                type="checkbox"
                value="15-25"
                checked={filters.pe.includes("15-25")}
                onChange={() => handleFilterChange("pe", "15-25")}
                style={{ width: "40%" }}
              />
              15 to 25
            </label>
            <label className="dropdown-pe-label">
              <input
                type="checkbox"
                value="15-below"
                checked={filters.pe.includes("15-below")}
                onChange={() => handleFilterChange("pe", "15-below")}
                style={{ width: "40%" }}
              />
              15 and below
            </label>
            <label className="dropdown-pe-label">
              <input
                type="checkbox"
                value="0-above"
                checked={filters.pe.includes("0-above")}
                onChange={() => handleFilterChange("pe", "0-above")}
                style={{ width: "40%" }}
              />
              0 and above
            </label>
            <div className="dropdown-pe-actions">
              <button className="dropdown-pe-reset" onClick={resetFilters}>
                Reset
              </button>
              <button className="dropdown-pe-apply" onClick={applyFilters}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

        <div className="filter-group eps-dil-growth-filter">
      <div className="dropdown-eps-wrapper">
        <button
          className="dropdown-eps-toggle"
          onClick={toggleEPSDropdown}
        >
          EPS Dil Growth <RiArrowDropDownLine size={24} />
        </button>
        {isEPSDropdownVisible && (
          <div className="dropdown-eps-options">
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="50-above"
                checked={filters.epsDilGrowth.includes("50-above")}
                onChange={() => handleFilterChange("epsDilGrowth", "50-above")}
                style={{ width: "40%" }}
              />
              50% and above
            </label>
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="25-above"
                checked={filters.epsDilGrowth.includes("25-above")}
                onChange={() => handleFilterChange("epsDilGrowth", "25-above")}
                style={{ width: "40%" }}
              />
              25% and above
            </label>
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="10-below"
                checked={filters.epsDilGrowth.includes("10-below")}
                onChange={() => handleFilterChange("epsDilGrowth", "10-below")}
                style={{ width: "40%" }}
              />
              10% and below
            </label>
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="0-above"
                checked={filters.epsDilGrowth.includes("0-above")}
                onChange={() => handleFilterChange("epsDilGrowth", "0-above")}
                style={{ width: "40%" }}
              />
              0% and above
            </label>
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="0-below"
                checked={filters.epsDilGrowth.includes("0-below")}
                onChange={() => handleFilterChange("epsDilGrowth", "0-below")}
                style={{ width: "40%" }}
              />
              0% and below
            </label>
            <label className="dropdown-eps-label">
              <input
                type="checkbox"
                value="-25-below"
                checked={filters.epsDilGrowth.includes("-25-below")}
                onChange={() => handleFilterChange("epsDilGrowth", "-25-below")}
                style={{ width: "40%" }}
              />
              -25% and below
            </label>
            <div className="dropdown-eps-actions">
              <button
                className="dropdown-eps-reset"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className="dropdown-eps-apply"
                onClick={applyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

        <div className="filter-group div-yield-filter">
      <div className="dropdown-div-yield-wrapper">
        <button
          className="dropdown-div-yield-toggle"
          onClick={toggleDivYieldDropdown}
        >
          Div Yield % <RiArrowDropDownLine size={24} />
        </button>
        {isDivYieldDropdownVisible && (
          <div className="dropdown-div-yield-options">
            <label className="dropdown-div-yield-label">
              <input
                type="checkbox"
                value="10-above"
                checked={filters.divYield.includes("10-above")}
                onChange={() => handleFilterChange("divYield", "10-above")}
                style={{ width: "40%" }}
              />
              10% and above
            </label>
            <label className="dropdown-div-yield-label">
              <input
                type="checkbox"
                value="5-above"
                checked={filters.divYield.includes("5-above")}
                onChange={() => handleFilterChange("divYield", "5-above")}
                style={{ width: "40%" }}
              />
              5% and above
            </label>
            <label className="dropdown-div-yield-label">
              <input
                type="checkbox"
                value="2-below"
                checked={filters.divYield.includes("2-below")}
                onChange={() => handleFilterChange("divYield", "2-below")}
                style={{ width: "40%" }}
              />
              2% and below
            </label>
            <label className="dropdown-div-yield-label">
              <input
                type="checkbox"
                value="0-2"
                checked={filters.divYield.includes("0-2")}
                onChange={() => handleFilterChange("divYield", "0-2")}
                style={{ width: "40%" }}
              />
              0% to 2%
            </label>
            <div className="dropdown-div-yield-actions">
              <button
                className="dropdown-div-yield-reset"
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    divYield: [],
                  }))
                }
              >
                Reset
              </button>
              <button
                className="dropdown-div-yield-apply"
                onClick={() =>
                  console.log("Div Yield Filters Applied:", filters.divYield)
                }
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

        {/* Sector Dropdown */}
        <div style={{ position: "relative"}}>
        <button
  onClick={() => setIsOpen((prev) => !prev)}
  style={{
    backgroundColor: "white", // Corrected CSS property
    border: "1px solid #333",
    padding: "4px 10px", // Added horizontal padding for better spacing
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "6px", // Space between the text and the icon
    borderRadius: "5px",
  }}
>
  Sector <RiArrowDropDownLine size={24} />
</button>



          {/* Dropdown Menu */}
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                width: "600%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  padding: "2px",
                  border: "1px solid black",
                  borderRadius: "12px",
                  width:"400px"
                 
                }}
              >
                <FaSearch style={{ marginRight: "4px", color: "#333" }} />
                <input
                  type="text"
                  placeholder="Search Sector"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                 
                  overflowY: "auto",
                }}
              >
                {filteredSectors.map((sector) => (
                  <label
                    key={sector}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes(sector)}
                      onChange={() => handleCheckboxChange(sector)}
                      style={{ width: "18%" }}
                    />
                    {sector}
                  </label>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={handleReset}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #24b676",
                    borderRadius: "4px",
                    color: "#24b676",
                    backgroundColor: "white",
                    cursor: "pointer",
                    marginLeft:"350px"
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor: "#24b676",
                    cursor: "pointer",
                    marginRight:"50px",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      

        <div className="filter-group performance-filter">
  <div className="dropdown-performance-wrapper">
    <button
      className="dropdown-performance-toggle"
      onClick={togglePerfDropdown}
    >
      Perf% <RiArrowDropDownLine size={24} />
    </button>
    {isPerfDropdownVisible && (
      <div className="dropdown-performance-options">
        <div className="dropdown-performance-range">
          <label>
            <input
              type="number"
              value={performanceRange.min}
              onChange={(e) => handlePerformanceRangeChange(e.target.value)}
              className="performance-input"
            />
            %
          </label>
          <span>To</span>
          <label>
            <input
              type="number"
              value={performanceRange.max}
              onChange={(e) => handlePerformanceRangeChange(e.target.value)}
              className="performance-input"
            />
            %
          </label>
        </div>

        <div className="dropdown-performance-slider">
          <input
            type="range"
            min="-50"
            max="100"
            value={performanceRange.min}
            
            onChange={(e) => handlePerformanceRangeChange(e.target.value)}
            className="performance-slider"
            step="1"
            style={{
              backgroundSize: `${((performanceRange.min + 50) / 150) * 100}% 100%`,
             
            }}
          />
        </div>

        <div className="dropdown-performance-actions">
          <button className="reset-performance-button" onClick={resetRange}>
            Reset
          </button>
          <button className="apply-performance-button" onClick={applyRange}>
            Apply
          </button>
        </div>
      </div>
    )}
  </div>
</div>

{/* Revenue Growth Dropdown */}
<div className="filter-group revenue-growth-filter">
  <div className="dropdown-revenue-growth-wrapper">
    <button
      className="dropdown-revenue-growth-toggle"
      onClick={toggleRevenueGrowthDropdown}
    >
      Revenue Growth <RiArrowDropDownLine size={24} />
    </button>
    {isRevenueGrowthDropdownVisible && (
      <div className="dropdown-revenue-growth-options">
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="50-above"
            checked={filters.revenueGrowth.includes("50-above")}
            onChange={() => handleFilterChange("revenueGrowth", "50-above")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
          />
          50% and above
        </label>
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="25-above"
            checked={filters.revenueGrowth.includes("25-above")}
            onChange={() => handleFilterChange("revenueGrowth", "25-above")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
          />
          25% and above
        </label>
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="10-below"
            checked={filters.revenueGrowth.includes("10-below")}
            onChange={() => handleFilterChange("revenueGrowth", "10-below")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
          />
          10% and below
        </label>
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="0-above"
            checked={filters.revenueGrowth.includes("0-above")}
            onChange={() => handleFilterChange("revenueGrowth", "0-above")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
          
          />
          0% and above
        </label>
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="0-below"
            checked={filters.revenueGrowth.includes("0-below")}
            onChange={() => handleFilterChange("revenueGrowth", "0-below")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
            
          />
          0% and below
        </label>
        <label className="dropdown-revenue-growth-label">
          <input
            type="checkbox"
            value="-25-below"
            checked={filters.revenueGrowth.includes("-25-below")}
            onChange={() => handleFilterChange("revenueGrowth", "-25-below")}
            style={{ width: "40%" }}
            className="dropdown-revenue-growth-checkbox"
           
          />
          -25% and below
        </label>
        <div className="dropdown-revenue-growth-actions">
          <button
            className="dropdown-revenue-growth-reset"
            onClick={() =>
              setFilters((prevFilters) => ({ ...prevFilters, revenueGrowth: [] }))
            }
          >
            Reset
          </button>
          <button
            className="dropdown-revenue-growth-apply"
            onClick={() => console.log("Revenue Growth Filters Applied:", filters.revenueGrowth)}
          >
            Apply
          </button>
        </div>
      </div>
    )}
  </div>
</div>

         {/* PEG Dropdown */}
<div className="filter-group peg-filter-container">
  <div className="dropdown-peg-wrapper">
    <button className="dropdown-peg-toggle" onClick={togglePegDropdown}>
      PEG <RiArrowDropDownLine size={24} />
    </button>
    {isPegDropdownVisible && (
      <div className="dropdown-peg-options">
        <label>
          <input
            type="checkbox"
            value="2-above"
            checked={filters.peg.includes("2-above")}
            onChange={() => handleFilterChange("peg", "2-above")}
            style={{ width: "40%" }}
          />
          2 and above
        </label>
        <label>
          <input
            type="checkbox"
            value="2-below"
            checked={filters.peg.includes("2-below")}
            onChange={() => handleFilterChange("peg", "2-below")}
            style={{ width: "40%" }}
          />
          2 and below
        </label>
        <label>
          <input
            type="checkbox"
            value="1-above"
            checked={filters.peg.includes("1-above")}
            onChange={() => handleFilterChange("peg", "1-above")}
            style={{ width: "40%" }}
          />
          1 and above
        </label>
        <label>
          <input
            type="checkbox"
            value="1-below"
            checked={filters.peg.includes("1-below")}
            onChange={() => handleFilterChange("peg", "1-below")}
            style={{ width: "40%" }}
          />
          1 and below
        </label>
        <label>
          <input
            type="checkbox"
            value="0.9-1.1"
            checked={filters.peg.includes("0.9-1.1")}
            onChange={() => handleFilterChange("peg", "0.9-1.1")}
            style={{ width: "40%" }}
          />
          0.9 to 1.1
        </label>
        <label>
          <input
            type="checkbox"
            value="0.5-below"
            checked={filters.peg.includes("0.5-below")}
            onChange={() => handleFilterChange("peg", "0.5-below")}
            style={{ width: "40%" }}
          />
          0.5 and below
        </label>
        <div className="dropdown-peg-actions">
          <button
            className="dropdown-peg-reset"
            onClick={() => setFilters((prevFilters) => ({ ...prevFilters, peg: [] }))}
          >
            Reset
          </button>
          <button
            className="dropdown-peg-apply"
            onClick={() => console.log("PEG Filters Applied:", filters.peg)}
          >
            Apply
          </button>
        </div>
      </div>
    )}
  </div>
</div>

        <div className="filter-group roe-filter">
          <div className="dropdownscreenerstock">
            <button className="dropdownscreenerstock-button" onClick={toggleDropdown}>
              ROE <RiArrowDropDownLine size={24} />
            </button>
            {isDropdownVisible && (
              <div className="dropdownscreenerstock-content">
                <label>
                  <input
                    type="checkbox"
                    value="30"
                    checked={filters.roe.includes("30")}
                    onChange={() => handleFilterChange("roe", "30")}
                    style={{ width: "40%" }}
                  />
                  30% and above
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="15"
                    checked={filters.roe.includes("15")}
                    onChange={() => handleFilterChange("roe", "15")}
                    style={{ width: "40%" }}
                  />
                  15% and above
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="0-above"
                    checked={filters.roe.includes("0-above")}
                    onChange={() => handleFilterChange("roe", "0-above")}
                    style={{ width: "40%" }}
                  />
                  0% and above
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="0-below"
                    checked={filters.roe.includes("0-below")}
                    onChange={() => handleFilterChange("roe", "0-below")}
                    style={{ width: "40%" }}
                  />
                  0% and below
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="15-below"
                    checked={filters.roe.includes("15-below")}
                    onChange={() => handleFilterChange("roe", "15-below")}
                    style={{ width: "40%" }}
                  />
                  15% and below
                </label>
                <div className="dropdownscreenerstock-buttons">
                  <button className="resetscreener-button" onClick={() => handleFilterChange("roe", [])}>
                    Reset
                  </button>
                  <button className="applyscreener-button" onClick={() => console.log("Filters Applied:", filters)}>
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
<div className="tab-container">
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
</div>

{/* Conditional Rendering */}

<div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>
  <table className="screener-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676' }}>
            <tr>
              <th>Symbol</th>
              <th>
                Price 
                <button className="screenerbtnlist" onClick={() => handleSort("price")}>
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
                Market Cap 
                <button className="screenerbtnlist" onClick={() => handleSort("marketCap")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                P / E
                <button className="screenerbtnlist" onClick={() => handleSort("p/e")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                EPS (₹)
                <button className="screenerbtnlist" onClick={() => handleSort("eps")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                EPS Gr % 
                <button className="screenerbtnlist" onClick={() => handleSort("epsDilGrowth")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                Div Yield % 
                <button className="screenerbtnlist" onClick={() => handleSort("divYield")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                Sector
                <button className="screenerbtnlist" onClick={() => handleSort("sector")}>
                  <PiCaretUpDownFill />
                </button>
              </th>
              <th>
                Analyst Rating
                <button className="screenerbtnlist" onClick={() => handleSort("analystrating")}>
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
      <td>{stock.price}</td>
      <td
        style={{
          color: parseFloat(stock.change) > 0 ? "#24b676" : parseFloat(stock.change) < 0 ? "red" : "inherit",
        }}
      >
       {parseFloat(stock.change) > 0 ? `${stock.change}` : stock.change}

      </td>
                <td>{stock.volume}</td>
                <td>{stock.marketCap}</td>
                <td>{stock.pToE}</td>
                <td>{stock.eps}</td>
                <td
        style={{
          color: parseFloat(stock.epsDilGrowth) > 0 ? "#24b676" : parseFloat(stock.epsDilGrowth) < 0 ? "red" : "inherit",
        }}
      >
       {parseFloat(stock.epsDilGrowth) > 0 ? `${stock.epsDilGrowth}` : stock.epsDilGrowth}

      </td>
                <td>{stock.divYield}</td>
                <td
  style={{
    color: "blue",
    
  }}
>
  {stock.sector}
</td>


<td>
  <button className="screener-unlock-btn" >
    <IoLockClosedOutline style={{ marginRight: '8px' }} /> {/* Adds lock icon with margin */}
    <span className="button-text">Unlock</span> {/* The text inside the button */}
  </button>
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

export default ScreenerStockList;