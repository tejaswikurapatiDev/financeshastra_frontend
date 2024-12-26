import React, { useState } from "react";
import { screenerStockvaluationData } from "../stockscreenervaluationdata";
import { FaSearch } from "react-icons/fa"; // Import FaSearch for the search bar

import { RiArrowDropDownLine } from "react-icons/ri";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";



const ScreenerStockvaluation = () => {
  const [stocks, setStocks] = useState(screenerStockvaluationData);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Valuation");
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
  const [filteredData, setFilteredData] = useState(screenerStockvaluationData); 

  const toggleDivYieldDropdown = () => {
    setDivYieldDropdownVisible(!isDivYieldDropdownVisible);
   
  };
  const [isEPSDropdownVisible, setEPSDropdownVisible] = useState(false);

  const [isROEDropdownVisible, setROEDropdownVisible] = useState(false);
  const toggleROEDropdown = () => {
    setROEDropdownVisible(!isROEDropdownVisible);
   
  };
  

  
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
    console.log(newFilters,"newfilter");
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      console.log(parseFloat(stock.price.replace(/₹|,/g, "")) <= parseFloat(newFilters.price,))
      console.log(stock.price.replace(/₹|,/g, ""))
      const matchesPrice =
        newFilters.price === "All" ||
        parseFloat(stock.price.replace(/₹|,/g, "")) <= parseFloat(newFilters.price);

        // const matchesMarketCap =
        // newFilters.marketCap.length !== 0 || // Check if it's empty
        // newFilters.marketCap.some((cap) => {
        //   const stockMarketCap = parseFloat(stock.marketCap.replace("T", ""));
        //   if (cap === "large" && stockMarketCap > 10) return true;
        //   if (cap === "mid" && stockMarketCap > 2 && stockMarketCap <= 10) return true;
        //   if (cap === "small" && stockMarketCap > 0.5 && stockMarketCap <= 2) return true;
        //   if (cap === "micro" && stockMarketCap <= 0.5) return true;
        //   if (cap === "others" && stockMarketCap > 0) return true;
        //   return false;
        // });
      

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

      // const matchesChange =
      //   newFilters.change === "All" ||
      //   (newFilters.change === "-5" && parseFloat(stock.change) <= -5) ||
      //   (newFilters.change === "0" && parseFloat(stock.change) >= 0) ||
      //   (newFilters.change === "5" && parseFloat(stock.change) >= 5) ||
      //   (newFilters.change === "10" && parseFloat(stock.change) >= 10);

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
        // matchesMarketCap &&
        matchesDivYield &&
        matchesSector &&
        // matchesChange &&
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


const resetchangeRange = () => {
    setChangeRange({ min: -50, max: 100 });
};


const resetRange = () => {
  setPerformanceRange({ min: -30, max: 40 });
};
  // Sector dropdown logic
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [isIndexDropdownVisible, setIndexDropdownVisible] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedMcap, setSelectedMcap] = useState([]);
  const [selectedPe, setSelectedPe] = useState([]);
  const [selectedeps, setSelectedeps] = useState([]);
  const [selecteddivyield, setSelecteddivyield] = useState([]);
  const [selectedroe, setSelectedroe] = useState([]);
  const [selectedpeg, setSelectedpeg] = useState([]);
  const [selectedrevenuegrowth, setSelectedrevenuegrowth] = useState([]);

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
  const marketCapCategory = ["Large Cap", "Mid Cap", "Small Cap", "Micro Cap", "Other"];
  const peFilterOptions = [
    { value: "50-above", label: "50 and above" },
    { value: "25-50", label: "25 to 50" },
    { value: "15-25", label: "15 to 25" },
    { value: "15-below", label: "15 and below" },
    { value: "0-above", label: "0 and above" }
  ];
  const epsDilGrowthOptions = [
    {
      label: "50% and above",
      value: "50-above",
    },
    {
      label: "25% and above",
      value: "25-above",
    },
    {
      label: "10% and below",
      value: "10-below",
    },
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below", // This is the one you're referring to
    },
    {
      label: "-25% and below",
      value: "-25-below",
    },
  ];
  const divYieldOptions = [
    {
      label: "10% and above",
      value: "10-above",
    },
    {
      label: "5% and above",
      value: "5-above",
    },
    {
      label: "2% and below",
      value: "2-below",
    },
    {
      label: "0% to 2%",
      value: "0-2", // This is the specific data you're referring to
    },
  ];
  const roeOptions = [
    {
      label: "30% and above",
      value: "30",
    },
    {
      label: "15% and above",
      value: "15",
    },
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below",
    },
    {
      label: "15% and below",
      value: "15-below",
    },
  ];
  const pegOptions = [
    {
      label: "2 and above",
      value: "2-above",
    },
    {
      label: "2 and below",
      value: "2-below",
    },
    {
      label: "1 and above",
      value: "1-above",
    },
    {
      label: "1 and below",
      value: "1-below",
    },
    {
      label: "0.9 to 1.1",
      value: "0.9-1.1",
    },
    {
      label: "0.5 and below",
      value: "0.5-below",
    },
  ];
  const revenueGrowthOptions = [
    {
      label: "50% and above",
      value: "50-above",
    },
    {
      label: "25% and above",
      value: "25-above",
    },
    {
      label: "10% and below",
      value: "10-below",
    },
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below",
    },
    {
      label: "-25% and below",
      value: "-25-below",
    },
  ];
  const toggleIndexDropdown = () => {
    setIndexDropdownVisible(!isIndexDropdownVisible);
  };
;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSectors = sectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredIndexes = indexes.filter((index) =>
    index.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredmarketCapCategory = marketCapCategory.filter((marketCapCategory) =>
    marketCapCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setSelectedSectors([]); // Reset selected sectors
    setSearchTerm(""); // Reset search term
     setSelectedIndexes([]);
     setSelectedMcap([]);
     setSelectedPe([]);
     setSelectedeps([]);
     setSelecteddivyield([]);
     setSelectedroe([]);
     setSelectedpeg([]);
     setSelectedrevenuegrowth([]);

  };

  const handleApply = () => {
    // Update the filters with the selected indexes and sectors
    setFilters((prevFilters) => ({
      ...prevFilters,
      index: selectedIndexes,
    
    }));
  
    // Apply the filter based on the selected indexes and sectors
    const filteredStocks = screenerStockvaluationData.filter((stock) =>
      selectedIndexes.includes(stock.index) 
    );
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setIsDropdownVisible(false);
  
    // Optionally, scroll to the table (assuming your table has an id or ref)
    const tableElement = document.getElementById('stocks-table');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlesectorApply = () => {
    // Update the filters with the selected indexes and sectors
    setFilters((prevFilters) => ({
      ...prevFilters,
     
      sector: selectedSectors, // Assuming selectedSectors is an array of selected sectors
    }));
  
    // Apply the filter based on the selected indexes and sectors
    const filteredStocks = screenerStockvaluationData.filter((stock) =>
       selectedSectors.includes(stock.sector)
    );
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setIsDropdownVisible(false);
  
    // Optionally, scroll to the table (assuming your table has an id or ref)
    const tableElement = document.getElementById('stocks-table');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlemcapApply = () => {
    // Update the filters with the selected market cap categories
    setFilters((prevFilters) => ({
      ...prevFilters,
      marketCapCategory: selectedMcap, // Assuming selectedMcap is an array of selected categories
    }));
  
    // Filter the stocks based on the selected market cap categories
    const filteredStocks = screenerStockvaluationData.filter((stock) =>
      selectedMcap.includes(stock.marketCapCategory)
    );
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setIsDropdownVisible(false);
  
    // Optionally, scroll to the table (assuming your table has an id or ref)
    const tableElement = document.getElementById('stocks-table');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  const handlePeApply = () => {
    // Filter stocks based on the selected P/E range
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockPe = parseFloat(stock.pToE);
      return selectedPe.some((range) => {
        switch (range) {
          case "50-above":
            return stockPe >= 50;
          case "25-50":
            return stockPe >= 25 && stockPe < 50;
          case "15-25":
            return stockPe >= 15 && stockPe < 25;
          case "15-below":
            return stockPe < 15;
          case "0-above":
            return stockPe >= 0; // Includes all positive values
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setPEDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleEPSApply = () => {
    // Filter stocks based on the selected EPS Dil Growth range
    const filteredStocks =screenerStockvaluationData.filter((stock) => {
      const stockEpsGrowth = parseFloat(stock.epsDilGrowth); // Assuming `epsDilGrowth` is the field in the stock data
      return selectedeps.some((range) => {
        switch (range) {
          case "50-above":
            return stockEpsGrowth >= 50;
          case "25-above":
            return stockEpsGrowth >= 25;
          case "10-below":
            return stockEpsGrowth <= 10;
          case "0-above":
            return stockEpsGrowth >= 0;
          case "0-below":
            return stockEpsGrowth <= 0;
          case "-25-below":
            return stockEpsGrowth <= -25;
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setEPSDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleDivYieldApply = () => {
    // Filter stocks based on the selected Dividend Yield range
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockDivYield = parseFloat(stock.divYield); // Assuming `divYield` is the field in the stock data
      return selecteddivyield.some((range) => {
        switch (range) {
          case "10-above":
            return stockDivYield >= 10;
          case "5-above":
            return stockDivYield >= 5;
          case "2-below":
            return stockDivYield <= 2;
          case "0-2":
            return stockDivYield >= 0 && stockDivYield <= 2; // Covers 0% to 2%
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setDivYieldDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleROEApply = () => {
    // Filter stocks based on the selected ROE range
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockROE = parseFloat(stock.roe); // Assuming `roe` is the field in the stock data
      return selectedroe.some((range) => {
        switch (range) {
          case "30":
            return stockROE >= 30; // 30% and above
          case "15":
            return stockROE >= 15; // 15% and above
          case "0-above":
            return stockROE >= 0; // 0% and above
          case "0-below":
            return stockROE <= 0; // 0% and below
          case "15-below":
            return stockROE <= 15; // 15% and below
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setROEDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handlePEGApply = () => {
    // Filter stocks based on the selected PEG range
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockPEG = parseFloat(stock.peg); // Assuming `peg` is the field in the stock data
      return selectedpeg.some((range) => {
        switch (range) {
          case "2-above":
            return stockPEG >= 2; // 2 and above
          case "2-below":
            return stockPEG <= 2; // 2 and below
          case "1-above":
            return stockPEG >= 1; // 1 and above
          case "1-below":
            return stockPEG <= 1; // 1 and below
          case "0.9-1.1":
            return stockPEG >= 0.9 && stockPEG <= 1.1; // 0.9 to 1.1
          case "0.5-below":
            return stockPEG <= 0.5; // 0.5 and below
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setPegDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleRevenueGrowthApply = () => {
    // Filter stocks based on the selected Revenue Growth range
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockRevenueGrowth = parseFloat(stock.revenueGrowth); // Assuming `revenueGrowth` is the field in the stock data
      return selectedrevenuegrowth.some((range) => {
        switch (range) {
          case "50-above":
            return stockRevenueGrowth >= 50; // 50% and above
          case "25-above":
            return stockRevenueGrowth >= 25; // 25% and above
          case "10-below":
            return stockRevenueGrowth <= 10; // 10% and below
          case "0-above":
            return stockRevenueGrowth >= 0; // 0% and above
          case "0-below":
            return stockRevenueGrowth <= 0; // 0% and below
          case "-25-below":
            return stockRevenueGrowth <= -25; // -25% and below
          default:
            return false;
        }
      });
    });
  
    // Update the stocks with the filtered data
    setStocks(filteredStocks);
  
    // Close the dropdown
    setRevenueGrowthDropdownVisible(false);
  
    // Optionally scroll to the table
    const tableElement = document.getElementById("stocks-table");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  
  const handleCheckboxChange = (index, sector,marketCapCategory,pToE,epsDilGrowth,divYield,roe,peg,revenueGrowth) => {
    setSelectedIndexes((prev) => 
      prev.includes(index) 
      ? prev.filter((s) => s !== index) 
      : [...prev, index]
    );
    setSelectedSectors((prev) =>
      prev.includes(sector) // Check if the sector is already in the selected list
        ? prev.filter((s) => s !== sector) // If so, remove it
        : [...prev, sector] // Otherwise, add it
    );
    setSelectedMcap((prev) =>
      prev.includes(marketCapCategory) // Check if the category is already selected
        ? prev.filter((s) => s !== marketCapCategory) // If it is, remove it
        : [...prev, marketCapCategory] // If it isn't, add it to the list
    );
    setSelectedPe((prev) =>
      prev.includes( pToE) // Check if the category is already selected
        ? prev.filter((s) => s !== pToE) // If it is, remove it
        : [...prev,pToE] // If it isn't, add it to the list
    );
    setSelectedeps((prev) =>
      prev.includes(epsDilGrowth) // Check if the category is already selected
        ? prev.filter((s) => s !== epsDilGrowth) // If it is, remove it
        : [...prev,epsDilGrowth] // If it isn't, add it to the list
    );
    setSelecteddivyield((prev) =>
      prev.includes(divYield) // Check if the category is already selected
        ? prev.filter((s) => s !== divYield) // If it is, remove it
        : [...prev,divYield] // If it isn't, add it to the list
    );
    setSelectedroe((prev) =>
      prev.includes(roe) // Check if the category is already selected
        ? prev.filter((s) => s !== roe) // If it is, remove it
        : [...prev,roe] // If it isn't, add it to the list
    );
    setSelectedroe((prev) =>
      prev.includes(peg) // Check if the category is already selected
        ? prev.filter((s) => s !== peg) // If it is, remove it
        : [...prev,peg] // If it isn't, add it to the list
    );
    setSelectedrevenuegrowth((prev) =>
      prev.includes(revenueGrowth) // Check if the category is already selected
        ? prev.filter((s) => s !== revenueGrowth) // If it is, remove it
        : [...prev,revenueGrowth] // If it isn't, add it to the list
    );
  }

  const filterStocksByChangeRange = () => {
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockChange = parseFloat(stock.change); // Assuming 'change' is the field in the stock data
      return stockChange >= changeRange.min && stockChange <= changeRange.max;
    });

    // Update the stocks with the filtered data
    setStocks(filteredStocks);
    console.log("Filtered by Change Range:", changeRange);
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
                     onChange={(e) => {
                       e.stopPropagation();
                       handleCheckboxChange(index);
                     }}
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
   
         {/* Display Filtered Data */}
         <div>
           {filteredData.length > 0 ? (
             filteredData.map((item) => (
               <div key={item.id}>
                 <p>{item.name}</p>
               </div>
             ))
           ) : (
             <p>No data available for the selected index.</p>
           )}
         </div>
            
         
       </div>

        {/* Price Filter */}
        <div className="filter-group">
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
          >
            <option value="All" disabled hidden>
              Price
            </option>
            <option value="500">Up to ₹500</option>
            <option value="1000">Up to ₹1000</option>
            <option value="5000">Up to ₹5000</option>
          </select>
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
              <button className="reset-change-button" onClick={resetchangeRange}>
                Reset
              </button>
              <button className="apply-change-button" onClick={filterStocksByChangeRange}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

        <div className="market-cap-filter">
           <div className="dropdown-market-cap-wrapper">
               {/* Filter for each parameter */}
               <div style={{ position: "relative"}}>
             {/* Dropdown Button */}
             <button className="dropdown-market-cap-toggle"
               onClick={toggleMarketCapDropdown}
               
             >
                   Market Cap <RiArrowDropDownLine size={24} />
             </button>
       
             {/* Dropdown Menu */}
             {isMarketCapDropdownVisible && (
               <div className="dropdown-market-cap-options"
                
               >
                 {/* Search Box */}
                
       
                 {/* Checkbox List */}
               
               
         {marketCapCategory.map((category) => (
           <label className="dropdown-market-cap-label"key={category} >
             <input
               type="checkbox"
               checked={selectedMcap.includes(category)} // Check if the category is selected
               onChange={(e) => {
                 e.stopPropagation();
                 setSelectedMcap((prev) =>
                   prev.includes(category)
                     ? prev.filter((item) => item !== category) // Remove category from selected
                     : [...prev, category] // Add category to selected
                 );
               }}style={{ width: "40%" }}
               
             />
             {category}
           </label>
         ))}
       
       
                  
                
       
                 {/* Buttons */}
                 <div className="dropdown-market-cap-actions">
                   <button
                     onClick={handleReset}
                     className="dropdown-market-cap-reset"
                   >
                     Reset
                   </button>
                   <button
                     onClick={handlemcapApply}
                     className="dropdown-market-cap-apply"
                   >
                     Apply
                   </button>
                 </div>
               </div>
             )}
       </div>
             {/* Display Filtered Data */}
             <div>
               {filteredData.length > 0 ? (
                 filteredData.map((item) => (
                   <div key={item.id}>
                     <p>{item.name}</p>
                   </div>
                 ))
               ) : (
                 <p>No data available for the selected index.</p>
               )}
             </div>
                </div>
           </div>

       <div className="market-cap-filter">
          <div className="dropdown-market-cap-wrapper">
              {/* Filter for each parameter */}
              <div style={{ position: "relative"}}>
            {/* Dropdown Button */}
            <button className="dropdown-market-cap-toggle"
              onClick={togglePEDropdown}
              
            >
                 P/E <RiArrowDropDownLine size={24} />
            </button>
      
            {/* Dropdown Menu */}
            {isPEDropdownVisible && (
              <div className="dropdown-market-cap-options"
               
              >
                
            
                
                 
      
                {/* Checkbox List */}
               
           
        {peFilterOptions.map((category) => (
          <label  className="dropdown-market-cap-label" key={category.value}>
            <input
              type="checkbox"
              checked={selectedPe.includes(category.value)} // Check by the category value
              onChange={(e) => {
                e.stopPropagation();
                setSelectedPe((prev) =>
                  prev.includes(category.value)
                    ? prev.filter((item) => item !== category.value) // Remove category
                    : [...prev, category.value] // Add category
                );
              }}
              style={{ width: "30%" }}
            />
            {category.label} {/* Correctly render the label */}
          </label>
        ))}
      
      
                {/* Buttons */}
                <div className="dropdown-market-cap-actions">
                  <button
                    onClick={handleReset}
                      className="dropdown-market-cap-reset"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handlePeApply}
                     className="dropdown-market-cap-apply"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
      </div>
            {/* Display Filtered Data */}
            <div>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                  </div>
                ))
              ) : (
                <p>No data available for the selected index.</p>
              )}
            </div>
               </div>
          </div>

       <div className="market-cap-filter">
           <div className="dropdown-market-cap-wrapper">
               {/* Filter for each parameter */}
               <div style={{ position: "relative"}}>
             {/* Dropdown Button */}
             <button className="dropdown-market-cap-toggle"
               onClick={toggleEPSDropdown}
               
             >
                  EPS Dil Growth <RiArrowDropDownLine size={24} />
             </button>
       
             {/* Dropdown Menu */}
             {isEPSDropdownVisible && (
               <div className="dropdown-market-cap-options"
                
               >
                 
             
                 
                  
       
                 {/* Checkbox List */}
                
            
         {epsDilGrowthOptions.map((category) => (
           <label  className="dropdown-market-cap-label" key={category.value}>
             <input
               type="checkbox"
               checked={selectedeps.includes(category.value)} // Check by the category value
               onChange={(e) => {
                 e.stopPropagation();
                 setSelectedeps((prev) =>
                   prev.includes(category.value)
                     ? prev.filter((item) => item !== category.value) // Remove category
                     : [...prev, category.value] // Add category
                 );
               }}
               style={{ width: "30%" }}
             />
             {category.label} {/* Correctly render the label */}
           </label>
         ))}
       
       
                 {/* Buttons */}
                 <div className="dropdown-market-cap-actions">
                   <button
                     onClick={handleReset}
                       className="dropdown-market-cap-reset"
                   >
                     Reset
                   </button>
                   <button 
                     onClick={handleEPSApply}
                      className="dropdown-market-cap-apply"
                   >
                     Apply
                   </button>
                 </div>
               </div>
             )}
       </div>
             {/* Display Filtered Data */}
             <div>
               {filteredData.length > 0 ? (
                 filteredData.map((item) => (
                   <div key={item.id}>
                     <p>{item.name}</p>
                   </div>
                 ))
               ) : (
                 <p>No data available for the selected index.</p>
               )}
             </div>
                </div>
           </div>

         <div className="market-cap-filter">
           <div className="dropdown-market-cap-wrapper">
               {/* Filter for each parameter */}
               <div style={{ position: "relative"}}>
             {/* Dropdown Button */}
             <button className="dropdown-market-cap-toggle"
               onClick={toggleDivYieldDropdown}
               
             >
                   Div Yield % <RiArrowDropDownLine size={24} />
             </button>
       
             {/* Dropdown Menu */}
             {isDivYieldDropdownVisible && (
               <div className="dropdown-market-cap-options"
                
               >
                 
             
                 
                  
       
                 {/* Checkbox List */}
                
            
         {divYieldOptions.map((category) => (
           <label  className="dropdown-market-cap-label" key={category.value}>
             <input
               type="checkbox"
               checked={selecteddivyield.includes(category.value)} // Check by the category value
               onChange={(e) => {
                 e.stopPropagation();
                 setSelecteddivyield((prev) =>
                   prev.includes(category.value)
                     ? prev.filter((item) => item !== category.value) // Remove category
                     : [...prev, category.value] // Add category
                 );
               }}
               style={{ width: "30%" }}
             />
             {category.label} {/* Correctly render the label */}
           </label>
         ))}
       
       
                 {/* Buttons */}
                 <div className="dropdown-market-cap-actions">
                   <button
                     onClick={handleReset}
                       className="dropdown-market-cap-reset"
                   >
                     Reset
                   </button>
                   <button 
                     onClick={handleDivYieldApply}
                      className="dropdown-market-cap-apply"
                   >
                     Apply
                   </button>
                 </div>
               </div>
             )}
       </div>
             {/* Display Filtered Data */}
             <div>
               {filteredData.length > 0 ? (
                 filteredData.map((item) => (
                   <div key={item.id}>
                     <p>{item.name}</p>
                   </div>
                 ))
               ) : (
                 <p>No data available for the selected index.</p>
               )}
             </div>
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
         Sectors <RiArrowDropDownLine size={24} />
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
       
                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", overflowY: "auto" }}>
         {filteredSectors.map((sector, index) => (
           <label key={sector} style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
             <input
         type="checkbox"
         checked={selectedSectors.includes(sector)} // Check if the sector is selected
         onChange={(e) => {
           e.stopPropagation();
           setSelectedSectors((prev) => 
             prev.includes(sector) 
               ? prev.filter((s) => s !== sector) 
               : [...prev, sector]
           );
         }}
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
                         onClick={handlesectorApply}
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
               <div>
               {filteredData.length > 0 ? (
                 filteredData.map((item) => (
                   <div key={item.id}>
                     <p>{item.name}</p>
                   </div>
                 ))
               ) : (
                 <p>No data available for the selected index.</p>
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
       <div className="market-cap-filter">
           <div className="dropdown-market-cap-wrapper">
               {/* Filter for each parameter */}
               <div style={{ position: "relative"}}>
             {/* Dropdown Button */}
             <button className="dropdown-market-cap-toggle"
               onClick={toggleRevenueGrowthDropdown}
               
             >
                   Revenue Growth <RiArrowDropDownLine size={24} />
             </button>
       
             {/* Dropdown Menu */}
             {isRevenueGrowthDropdownVisible && (
               <div className="dropdown-market-cap-options"
                
               >
                 
             
                 
                  
       
                 {/* Checkbox List */}
                
            
         {revenueGrowthOptions.map((category) => (
           <label  className="dropdown-market-cap-label" key={category.value}>
             <input
               type="checkbox"
               checked={selectedrevenuegrowth.includes(category.value)} // Check by the category value
               onChange={(e) => {
                 e.stopPropagation();
                 setSelectedrevenuegrowth((prev) =>
                   prev.includes(category.value)
                     ? prev.filter((item) => item !== category.value) // Remove category
                     : [...prev, category.value] // Add category
                 );
               }}
               style={{ width: "30%" }}
             />
             {category.label} {/* Correctly render the label */}
           </label>
         ))}
       
       
                 {/* Buttons */}
                 <div className="dropdown-market-cap-actions">
                   <button
                     onClick={handleReset}
                       className="dropdown-market-cap-reset"
                   >
                     Reset
                   </button>
                   <button 
                     onClick={handleRevenueGrowthApply}
                      className="dropdown-market-cap-apply"
                   >
                     Apply
                   </button>
                 </div>
               </div>
             )}
       </div>
             {/* Display Filtered Data */}
             <div>
               {filteredData.length > 0 ? (
                 filteredData.map((item) => (
                   <div key={item.id}>
                     <p>{item.name}</p>
                   </div>
                 ))
               ) : (
                 <p>No data available for the selected index.</p>
               )}
             </div>
                </div>
           </div>
         {/* PEG Dropdown */}
                 <div className="market-cap-filter">
            <div className="dropdown-market-cap-wrapper">
                {/* Filter for each parameter */}
                <div style={{ position: "relative"}}>
              {/* Dropdown Button */}
              <button className="dropdown-market-cap-toggle"
                onClick={togglePegDropdown}
                
              >
                    PEG <RiArrowDropDownLine size={24} />
              </button>
        
              {/* Dropdown Menu */}
              {isPegDropdownVisible && (
                <div className="dropdown-market-cap-options"
                 
                >
                  
              
                  
                   
        
                  {/* Checkbox List */}
                 
             
          {pegOptions.map((category) => (
            <label  className="dropdown-market-cap-label" key={category.value}>
              <input
                type="checkbox"
                checked={selectedpeg.includes(category.value)} // Check by the category value
                onChange={(e) => {
                  e.stopPropagation();
                  setSelectedpeg((prev) =>
                    prev.includes(category.value)
                      ? prev.filter((item) => item !== category.value) // Remove category
                      : [...prev, category.value] // Add category
                  );
                }}
                style={{ width: "30%" }}
              />
              {category.label} {/* Correctly render the label */}
            </label>
          ))}
        
        
                  {/* Buttons */}
                  <div className="dropdown-market-cap-actions">
                    <button
                      onClick={handleReset}
                        className="dropdown-market-cap-reset"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={handlePEGApply}
                       className="dropdown-market-cap-apply"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
        </div>
              {/* Display Filtered Data */}
              <div>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div key={item.id}>
                      <p>{item.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No data available for the selected index.</p>
                )}
              </div>
                 </div>
            </div>
           <div className="market-cap-filter">
               <div className="dropdown-market-cap-wrapper">
                   {/* Filter for each parameter */}
                   <div style={{ position: "relative"}}>
                 {/* Dropdown Button */}
                 <button className="dropdown-market-cap-toggle"
                   onClick={toggleROEDropdown}
                   
                 >
                       ROE <RiArrowDropDownLine size={24} />
                 </button>
           
                 {/* Dropdown Menu */}
                 {isROEDropdownVisible && (
                   <div className="dropdown-market-cap-options"
                    
                   >
                     
                 
                     
                      
           
                     {/* Checkbox List */}
                    
                
             {roeOptions.map((category) => (
               <label  className="dropdown-market-cap-label" key={category.value}>
                 <input
                   type="checkbox"
                   checked={selectedroe.includes(category.value)} // Check by the category value
                   onChange={(e) => {
                     e.stopPropagation();
                     setSelectedroe((prev) =>
                       prev.includes(category.value)
                         ? prev.filter((item) => item !== category.value) // Remove category
                         : [...prev, category.value] // Add category
                     );
                   }}
                   style={{ width: "30%" }}
                 />
                 {category.label} {/* Correctly render the label */}
               </label>
             ))}
           
           
                     {/* Buttons */}
                     <div className="dropdown-market-cap-actions">
                       <button
                         onClick={handleReset}
                           className="dropdown-market-cap-reset"
                       >
                         Reset
                       </button>
                       <button 
                         onClick={handleROEApply}
                          className="dropdown-market-cap-apply"
                       >
                         Apply
                       </button>
                     </div>
                   </div>
                 )}
           </div>
                 {/* Display Filtered Data */}
                 <div>
                   {filteredData.length > 0 ? (
                     filteredData.map((item) => (
                       <div key={item.id}>
                         <p>{item.name}</p>
                       </div>
                     ))
                   ) : (
                     <p>No data available for the selected index.</p>
                   )}
                 </div>
                    </div>
               </div>
               </div>
           
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
        <div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>
  <table className="screener-table" style={{ borderCollapse: 'collapse', width: '100%',marginTop:'10px' }}>
    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', zIndex: 10, boxShadow: '0 4px 6px #24b676' }}>
  <tr>
    <th>Symbol</th>
    <th>
      Market Cap
      <button className="screenerbtnlist" onClick={() => handleSort("marketCap")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Market Cap %
      <button className="screenerbtnlist" onClick={() => handleSort("marketCapPerf")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      P/E
      <button className="screenerbtnlist" onClick={() => handleSort("pToE")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      P/S
      <button className="screenerbtnlist" onClick={() => handleSort("pToS")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      P/B
      <button className="screenerbtnlist" onClick={() => handleSort("pToB")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      P/CF
      <button className="screenerbtnlist" onClick={() => handleSort("pToS")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      P/FCF
      <button className="screenerbtnlist" onClick={() => handleSort("pToCF")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      Price
      <button className="screenerbtnlist" onClick={() => handleSort("price")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EV
      <button className="screenerbtnlist" onClick={() => handleSort("ev")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EV/Revenue
      <button className="screenerbtnlist" onClick={() => handleSort("evSales")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EV/EBIT
      <button className="screenerbtnlist" onClick={() => handleSort("evEbit")}>
        <PiCaretUpDownFill />
      </button>
    </th>
    <th>
      EV/EBITDA
      <button className="screenerbtnlist" onClick={() => handleSort("evEbitda")}>
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
      <td>{stock.marketCap}</td>
     
      <td
        style={{
          color: parseFloat(stock.marketCapPerf) > 0 ? "#24b676" : parseFloat(stock.marketCapPerf) < 0 ? "red" : "inherit",
        }}
      >
        {stock.marketCapPerf}
      </td>
     
                  <td>{stock.pToE}</td>
                  <td>{stock.pToB}</td>
                  <td>{stock.peg}</td>
                  <td>{stock.pToS}</td>
                  <td>{stock.pToCF}</td>
                  <td>{stock.price}</td>
                  <td>{stock.ev}</td>
                  <td>{stock.evEbitda}</td>
                  <td>{stock.evSales}</td>
                  <td>{stock.evEbit}</td>
                 
                 


              </tr>
            ))}
          </tbody>
        </table>
      </div>
<Navbar/>
    </div>
  );
};

export default ScreenerStockvaluation;
