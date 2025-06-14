import React, { useState, useEffect, useRef, useMemo } from "react";
import { screenerStockvaluationData } from "../../Stocks/stockscreenervaluationdata";
import { FaSearch } from "react-icons/fa"; // Import FaSearch for the search bar

import { RiArrowDropDownLine } from "react-icons/ri";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center",
};


const Largecapvaluation = () => {
   const indexDropdownRef = useRef(null);
          const priceDropdownRef = useRef(null);
          const changeDropdownRef = useRef(null);
          const marketCapDropdownRef = useRef(null);
          const peDropdownRef = useRef(null);
          const epsDropdownRef = useRef(null);
          const divYieldDropdownRef = useRef(null);
          const sectorDropdownRef = useRef(null);
          const performanceDropdownRef = useRef(null);
          const revenueDropdownRef = useRef(null);
          const pegDropdownRef = useRef(null);
          const roeDropdownRef = useRef(null);
  const [stocks, setStocks] = useState(screenerStockvaluationData);
  const [isloading, setisloading] = useState(true)
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Valuation");
  const [currentPage, setCurrentPage] = useState(1);
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

  const [dropdowns, setDropdowns] = useState({
    divYield: false,
    price: false,
    change: false,
    eps: false,
    roe: false,
    pe: false,
    marketcap: false,
    performance: false,
    peg: false,
    revenue: false,
    index: false,
    sector: false,
  });
  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + ' K';
    return num.toString();
  };

  useEffect(() => {
    const fetchfun = async () => {
      const url = `${API_BASE_URL}/stocks/largecapValue`;
      const response = await fetch(url);
      if (response.ok === true) {
        const data = await response.json();
        console.log(data)
        const formattedData = data.map((each) => ({
          id: each.id,
          symbol: each.Symbol,
          price: each.Price,
          marketCap: formatNumber(each.MarketCap),
          pToE: each.PERatio,
          pToB: each.PSRatio,
          roe: each.ROE,
          marketCapPerf: each.MarketCapPercentage,
          peg: each.PBRatio,
          pToS: each.PCFRatio,
          pToCF: each.PFCFRatio,
          ev: each.EnterpriseValue,
          evEbitda: each.EVRevenue,
          evSales: each.EVEBIT,
          evEbit: each.EVEBITDA,

        }));
        setStocks(formattedData);
      }
      setisloading(false)
    };
    fetchfun();
  }, []);



  const recordsPerPage = 10;
  const totalPages = Math.ceil(stocks.length / recordsPerPage);

  //  Ensure currentData updates correctly
  const indexOfFirstItem = (currentPage - 1) * recordsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + recordsPerPage, stocks.length);
  const currentData = useMemo(() => {
    return stocks.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, stocks]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //  Debugging Effect: Confirm re-rendering when `currentPage` updates
  useEffect(() => {
    
  }, [currentPage]);

  //  Pagination Range Calculation
  const { startPage, endPage } = useMemo(() => {
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return { startPage: start, endPage: end };
  }, [currentPage, totalPages]);

 useEffect(() => {
       const handleClickOutside = (event) => {
         const isOutsideAll = Object.entries({
           index: indexDropdownRef,
           price: priceDropdownRef,
           change: changeDropdownRef,
           marketcap: marketCapDropdownRef,
           pe: peDropdownRef,
           eps: epsDropdownRef,
           divYield: divYieldDropdownRef,
           sector: sectorDropdownRef,
           performance: performanceDropdownRef,
           revenue: revenueDropdownRef,
           peg: pegDropdownRef,
           roe: roeDropdownRef,
         }).every(([key, ref]) => {
           return !dropdowns[key] || (ref.current && !ref.current.contains(event.target));
         });
   
         if (isOutsideAll) {
           setDropdowns({
             index: false,
             price: false,
             change: false,
             marketcap: false,
             pe: false,
             eps: false,
             divYield: false,
             sector: false,
             performance: false,
             revenue: false,
             peg: false,
             roe: false,
           });
         }
       };
   
       document.addEventListener("mousedown", handleClickOutside);
       return () => {
         document.removeEventListener("mousedown", handleClickOutside);
       };
     }, [dropdowns]);
   
     const toggleDropdown = (key) => {
       setDropdowns((prev) => {
         // Create a new object where all dropdowns are closed except the one being toggled
         const updatedDropdowns = Object.keys(prev).reduce((acc, currKey) => {
           acc[currKey] = currKey === key ? !prev[currKey] : false;
           return acc;
         }, {});
         return updatedDropdowns;
       });
     };

  const [filteredData, setFilteredData] = useState(screenerStockvaluationData);

  const [marketCapFilters, setMarketCapFilters] = useState([]);

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
    
    // Optionally, update the main filters state with the Market Cap selections
    setFilters((prevFilters) => ({
      ...prevFilters,
      marketCap: marketCapFilters,
    }));
  };
  const [changeRange, setChangeRange] = useState({ min: -30, max: 40 });

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

  const [performanceRange, setPerformanceRange] = useState({ min: -30, max: 40 });

  const handlePerformanceRangeChange = (value) => {
    setPerformanceRange((prevRange) => ({
      ...prevRange,
      min: value,
      max: value, // Both min and max are the same, creating a single slider
    }));
  };


  const applyRange = () => {
    
    //setPerfDropdownVisible(false); // Close dropdown after applying
  };


  const resetchangeRange = () => {
    setChangeRange({ min: -50, max: 100 });
    setChangeRange({ min: -50, max: 100 });
  };


  const resetRange = () => {
    setPerformanceRange({ min: -30, max: 40 });
  };
  // Sector dropdown logic
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedMcap, setSelectedMcap] = useState([]);
  const [selectedPe, setSelectedPe] = useState([]);
  const [selectedeps, setSelectedeps] = useState([]);
  const [selecteddivyield, setSelecteddivyield] = useState([]);
  const [selectedroe, setSelectedroe] = useState([]);
  const [selectedpeg, setSelectedpeg] = useState([]);
  const [selectedrevenuegrowth, setSelectedrevenuegrowth] = useState([]);
  const [selectedprice, setSelectedprice] = useState([]);
  const [selectedchange, setSelectedchange] = useState([]);
  const [selectedperf, setSelectedperf] = useState([]);
  
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
    { value: "0-above", label: "0 and above" },
    { value: "15-below", label: "15 and below" },
    { value: "15-25", label: "15 to 25" },
    { value: "25-50", label: "25 to 50" },
    { value: "50-above", label: "50 and above" }
  ];

  const epsDilGrowthOptions = [
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below", // This is the one you're referring to
    },
    {
      label: "10% and below",
      value: "10-below",
    },
    {
      label: "25% and above",
      value: "25-above",
    },
    {
      label: "50% and above",
      value: "50-above",
    },
    {
      label: "-25% and below",
      value: "-25-below",
    },
  ];

  const divYieldOptions = [
    {
      label: "0% to 2%",
      value: "0-2", // This is the specific data you're referring to
    },
    {
      label: "2% and below",
      value: "2-below",
    },
    {
      label: "5% and above",
      value: "5-above",
    },
    {
      label: "10% and above",
      value: "10-above",
    },
  ];

  const roeOptions = [
    {
      label: "0% and above",
      value: "0-above",
    },
    {
      label: "0% and below",
      value: "0-below",
    },
    {
      label: "15% and above",
      value: "15",
    },
    {
      label: "15% and below",
      value: "15-below",
    },
    {
      label: "30% and above",
      value: "30",
    },
  ];

  const pegOptions = [
    {
      label: "0.9 to 1.1",
      value: "0.9-1.1",
    },
    {
      label: "0.5 and below",
      value: "0.5-below",
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
      label: "2 and above",
      value: "2-above",
    },
    {
      label: "2 and below",
      value: "2-below",
    },
  ];

  const revenueGrowthOptions = [
    { label: "0% and above", value: "0-above" },
    { label: "0% and below", value: "0-below" },
    { label: "10% and below", value: "10-below" },
    { label: "25% and above", value: "25-above" },
    { label: "50% and above", value: "50-above" },
    { label: "-25% and below", value: "-25-below" },
  ];

  const priceOptions = [
    { label: "5 and below", value: "5-below" },
    { label: "10 and below", value: "10-below" },
    { label: "10 to 100", value: "10-100" },
    { label: "100 and above", value: "100" },
    { label: "Up to 500", value: "500" },
    { label: "Up to 1000", value: "1000" },
    { label: "Up to 5000", value: "5000" },
  ];
  const changeOptions = [
    { label: "0% and below", value: "0-below" },
    { label: "0% and above", value: "0-above" },
    { label: "0% to 5%", value: "0-5" },
    { label: "5% and above", value: "5-above" },
    { label: "10% and above", value: "10-above" },
    { label: "20% and above", value: "20-above" },
    { label: "30% and above", value: "30-above" },
    { label: "-5% to 0%", value: "-5-0" },
    { label: "-5% and below", value: "-5-below" },
    { label: "-10% and below", value: "-10-below" },
    { label: "-20% and below", value: "-20-below" },
    { label: "-30% and below", value: "-30-below" },
  ];
  const perfOptions = [
    { label: "0% and below", value: "0-below" },
    { label: "0% and above", value: "0-above" },
    { label: "0% to 5%", value: "0-5" },
    { label: "5% and above", value: "5-above" },
    { label: "10% and above", value: "10-above" },
    { label: "20% and above", value: "20-above" },
    { label: "30% and above", value: "30-above" },
    { label: "-5% to 0%", value: "-5-0" },
    { label: "-5% and below", value: "-5-below" },
    { label: "-10% and below", value: "-10-below" },
    { label: "-20% and below", value: "-20-below" },
    { label: "-30% and below", value: "-30-below" },
  ];

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
    setSelectedSectors([]);  // Reset selected sectors
    setSearchTerm("");       // Reset search term
    setSelectedIndexes([]);
    setSelectedMcap([]);
    setSelectedPe([]);
    setSelectedeps([]);
    setSelecteddivyield([]);
    setSelectedroe([]);
    setSelectedpeg([]);
    setSelectedrevenuegrowth([]);
    setSelectedprice([]);
    setSelectedchange([]);
    setSelectedperf([]);

    //close the dropdown
    setDropdowns((prev) => ({
      ...prev,
      peg: false,
      roe: false,
      revenue: false,
      price: false,
      change: false,
      divYield: false,
      eps: false,
      pe: false,
      marketcap: false,
      index: false,
      sector: false,
      performance: false,
      // Close PEG dropdown

    }));
  };

    const handleApply = () => {
         // If no index is selected, show the default stock data
         if (!screenerStockvaluationData || !Array.isArray(screenerStockvaluationData)) return;
       
         if (selectedIndexes.length === 0) {
           setStocks(stocks); // Show default data
           setDropdowns((prev) => ({
             ...prev,
             index: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Update selected filters
         setFilters((prevFilters) => ({
           ...prevFilters,
           index: selectedIndexes,
         }));
       
         // Apply the filter based on the selected indexes
         const filteredStocks = screenerStockvaluationData.filter((stock) =>
           selectedIndexes.includes(stock.index)
         );
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           index: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handlesectorApply = () => {
         if (!screenerStockvaluationData || !Array.isArray(screenerStockvaluationData)) return;
       
         // If no sector is selected, show default data
         if (selectedSectors.length === 0) {
           setStocks(stocks); // Show all stocks (default)
           setDropdowns((prev) => ({
             ...prev,
             sector: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Update filters
         setFilters((prevFilters) => ({
           ...prevFilters,
           sector: selectedSectors,
         }));
       
         // Filter stocks based on selected sectors
         const filteredStocks = screenerStockvaluationData.filter((stock) =>
           selectedSectors.includes(stock.sector)
         );
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           sector: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
         const handlemcapApply = () => {
         if (!screenerStockvaluationData || !Array.isArray(screenerStockvaluationData)) return;
       
         // If nothing is selected, show default data
         if (selectedMcap.length === 0) {
           setStocks(stocks); // Show all stocks (default)
           setDropdowns((prev) => ({
             ...prev,
             marketcap: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Update the filters with the selected market cap categories
         setFilters((prevFilters) => ({
           ...prevFilters,
           marketCapCategory: selectedMcap,
         }));
       
         // Filter the stocks based on the selected market cap categories
         const filteredStocks = screenerStockvaluationData.filter((stock) =>
           selectedMcap.includes(stock.marketCapCategory)
         );
       
         setStocks(filteredStocks);
       
         // Close dropdown
         setDropdowns((prev) => ({
           ...prev,
           marketcap: false,
         }));
       
         // Scroll to stocks table
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
       
         const handlePeApply = () => {
         if (!screenerStockvaluationData || !Array.isArray(screenerStockvaluationData)) return;
       
         // If no P/E range selected, show default data
         if (selectedPe.length === 0) {
           setStocks(stocks); // Show all stocks
           setDropdowns((prev) => ({
             ...prev,
             pe: false, // Close dropdown
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
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
                 return stockPe >= 0;
               default:
                 return false;
             }
           });
         });
       
         // Update the stocks with the filtered data
         setStocks(filteredStocks);
       
         // Close the dropdown
         setDropdowns((prev) => ({
           ...prev,
           pe: false,
         }));
       
         // Scroll to stocks table
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handleEPSApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // If no EPS filter selected, show default stock list
         if (selectedeps.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             eps: false, // Close dropdown
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Filter stocks based on the selected EPS Dil Growth range
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockEpsGrowth = parseFloat(stock.epsDilGrowth);
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
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           eps: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handleDivYieldApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // If no dividend yield filter is selected, show default stock data
         if (selecteddivyield.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             divYield: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Filter stocks based on selected dividend yield range
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockDivYield = parseFloat(stock.divYield);
           return selecteddivyield.some((range) => {
             switch (range) {
               case "10-above":
                 return stockDivYield >= 10;
               case "5-above":
                 return stockDivYield >= 5;
               case "2-below":
                 return stockDivYield <= 2;
               case "0-2":
                 return stockDivYield >= 0 && stockDivYield <= 2;
               default:
                 return false;
             }
           });
         });
       
         // Update filtered data
         setStocks(filteredStocks);
       
         // Close dropdown
         setDropdowns((prev) => ({
           ...prev,
           divYield: false,
         }));
       
         // Scroll to table
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handleROEApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar koi ROE filter select nahi kiya gaya hai toh default data dikhao
         if (selectedroe.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             roe: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return; // Yahan return kar do taki baaki code na chale
         }
       
         // Agar filter selected hai tabhi filtering karo
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockROE = parseFloat(stock.roe);
           return selectedroe.some((range) => {
             switch (range) {
               case "30":
                 return stockROE >= 30;
               case "15":
                 return stockROE >= 15;
               case "0-above":
                 return stockROE >= 0;
               case "0-below":
                 return stockROE <= 0;
               case "15-below":
                 return stockROE <= 15;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           roe: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
         const [pegDropdownVisible, setPegDropdownVisible] = useState(false);
       
        const handlePEGApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar koi PEG filter selected nahi hai, toh pura default data set karo
         if (!selectedpeg || selectedpeg.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             peg: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Agar filter selected hai tabhi filter lagao
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockPEG = parseFloat(stock.peg);
           return selectedpeg.some((range) => {
             switch (range) {
               case "2-above":
                 return stockPEG >= 2;
               case "2-below":
                 return stockPEG <= 2;
               case "1-above":
                 return stockPEG >= 1;
               case "1-below":
                 return stockPEG <= 1;
               case "0.9-1.1":
                 return stockPEG >= 0.9 && stockPEG <= 1.1;
               case "0.5-below":
                 return stockPEG <= 0.5;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           peg: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
         const handleRevenueGrowthApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar koi Revenue Growth filter select nahi hai toh pura data show karo
         if (!selectedrevenuegrowth || selectedrevenuegrowth.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             revenue: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Agar filter select hai tab filtering karo
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockRevenueGrowth = parseFloat(stock.revenueGrowth);
           return selectedrevenuegrowth.some((range) => {
             switch (range) {
               case "50-above":
                 return stockRevenueGrowth >= 50;
               case "25-above":
                 return stockRevenueGrowth >= 25;
               case "10-below":
                 return stockRevenueGrowth <= 10;
               case "0-above":
                 return stockRevenueGrowth >= 0;
               case "0-below":
                 return stockRevenueGrowth <= 0;
               case "-25-below":
                 return stockRevenueGrowth <= -25;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           revenue: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
         const handlePriceApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar koi price filter select nahi hai toh default data show karo
         if (!selectedprice || selectedprice.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             price: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Agar filter select hai toh filtering karo
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockPrice = parseFloat(stock.price.replace(/₹|,/g, ""));
           return selectedprice.some((range) => {
             switch (range) {
               case "5000":
                 return stockPrice <= 5000;
               case "1000":
                 return stockPrice <= 1000;
               case "500":
                 return stockPrice <= 500;
               case "100":
                 return stockPrice >= 100;
               case "10-100":
                 return stockPrice >= 10 && stockPrice < 100;
               case "10-below":
                 return stockPrice < 10 && stockPrice >= 5;
               case "5-below":
                 return stockPrice < 5;
               case "above-ema-50":
                 return stock.priceEMA50 && stockPrice > stock.priceEMA50;
               case "below-ema-50":
                 return stock.priceEMA50 && stockPrice < stock.priceEMA50;
               case "crosses-bb-upper":
                 return stock.bbUpper && stockPrice > stock.bbUpper;
               case "crosses-bb-lower":
                 return stock.bbLower && stockPrice < stock.bbLower;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           price: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handleChangeApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar koi filter select nahi hai toh default data set karo
         if (!selectedchange || selectedchange.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             change: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Filter lagao agar filter selected hain
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           if (!stock.change) return false;
       
           const stockChangePercentage = parseFloat(
             stock.change.replace(/%|₹|,/g, "")
           );
       
           return selectedchange.some((range) => {
             switch (range) {
               case "30-above":
                 return stockChangePercentage >= 30;
               case "20-above":
                 return stockChangePercentage >= 20;
               case "10-above":
                 return stockChangePercentage >= 10;
               case "5-above":
                 return stockChangePercentage >= 5;
               case "0-5":
                 return stockChangePercentage >= 0 && stockChangePercentage <= 5;
               case "0-above":
                 return stockChangePercentage >= 0;
               case "0-below":
                 return stockChangePercentage < 0;
               case "-5-0":
                 return stockChangePercentage < 0 && stockChangePercentage >= -5;
               case "-5-below":
                 return stockChangePercentage < -5;
               case "-10-below":
                 return stockChangePercentage < -10;
               case "-20-below":
                 return stockChangePercentage < -20;
               case "-30-below":
                 return stockChangePercentage < -30;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           change: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
       
        const handleperfApply = () => {
         if (
           !screenerStockvaluationData ||
           !Array.isArray(screenerStockvaluationData)
         )
           return;
       
         // Agar selectedperf empty ho toh default poora data show karo
         if (!selectedperf || selectedperf.length === 0) {
           setStocks(stocks);
           setDropdowns((prev) => ({
             ...prev,
             performance: false,
           }));
           setTimeout(() => {
             const tableElement = document.getElementById("stocks-table");
             if (tableElement) {
               tableElement.scrollIntoView({ behavior: "smooth" });
             }
           }, 100);
           return;
         }
       
         // Agar filters select hain toh filtered stocks dikhao
         const filteredStocks = screenerStockvaluationData.filter((stock) => {
           const stockperf = stock.perf
             ? parseFloat(stock.perf.replace(/%|₹|,/g, ""))
             : 0;
       
           return selectedperf.some((range) => {
             switch (range) {
               case "30-above":
                 return stockperf >= 30;
               case "20-above":
                 return stockperf >= 20;
               case "10-above":
                 return stockperf >= 10;
               case "5-above":
                 return stockperf >= 5;
               case "0-5":
                 return stockperf >= 0 && stockperf <= 5;
               case "0-above":
                 return stockperf >= 0;
               case "0-below":
                 return stockperf < 0;
               case "-5-0":
                 return stockperf < 0 && stockperf >= -5;
               case "-5-below":
                 return stockperf < -5;
               case "-10-below":
                 return stockperf < -10;
               case "-20-below":
                 return stockperf < -20;
               case "-30-below":
                 return stockperf < -30;
               default:
                 return false;
             }
           });
         });
       
         setStocks(filteredStocks);
       
         setDropdowns((prev) => ({
           ...prev,
           performance: false,
         }));
       
         setTimeout(() => {
           const tableElement = document.getElementById("stocks-table");
           if (tableElement) {
             tableElement.scrollIntoView({ behavior: "smooth" });
           }
         }, 100);
       };
  const handleCheckboxChange = (index, sector, marketCapCategory, pToE, epsDilGrowth, divYield, roe, peg, revenueGrowth, price, change, perf) => {
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
      prev.includes(pToE) // Check if the category is already selected
        ? prev.filter((s) => s !== pToE) // If it is, remove it
        : [...prev, pToE] // If it isn't, add it to the list
    );
    setSelectedeps((prev) =>
      prev.includes(epsDilGrowth) // Check if the category is already selected
        ? prev.filter((s) => s !== epsDilGrowth) // If it is, remove it
        : [...prev, epsDilGrowth] // If it isn't, add it to the list
    );
    setSelecteddivyield((prev) =>
      prev.includes(divYield) // Check if the category is already selected
        ? prev.filter((s) => s !== divYield) // If it is, remove it
        : [...prev, divYield] // If it isn't, add it to the list
    );
    setSelectedroe((prev) =>
      prev.includes(roe) // Check if the category is already selected
        ? prev.filter((s) => s !== roe) // If it is, remove it
        : [...prev, roe] // If it isn't, add it to the list
    );
    setSelectedroe((prev) =>
      prev.includes(peg) // Check if the category is already selected
        ? prev.filter((s) => s !== peg) // If it is, remove it
        : [...prev, peg] // If it isn't, add it to the list
    );
    setSelectedrevenuegrowth((prev) =>
      prev.includes(revenueGrowth) // Check if the category is already selected
        ? prev.filter((s) => s !== revenueGrowth) // If it is, remove it
        : [...prev, revenueGrowth] // If it isn't, add it to the list
    );
    setSelectedprice((prev) =>
      prev.includes(price) // Check if the category is already selected
        ? prev.filter((s) => s !== price) // If it is, remove it
        : [...prev, price] // If it isn't, add it to the list
    );
    setSelectedchange((prev) =>
      prev.includes(change) // Check if the category is already selected
        ? prev.filter((s) => s !== change) // If it is, remove it
        : [...prev, change] // If it isn't, add it to the list
    );
    setSelectedperf((prev) =>
      prev.includes(perf) // Check if the category is already selected
        ? prev.filter((s) => s !== perf) // If it is, remove it
        : [...prev, perf] // If it isn't, add it to the list
    );
  }

  const filterStocksByChangeRange = () => {
    const filteredStocks = screenerStockvaluationData.filter((stock) => {
      const stockChange = parseFloat(stock.change); // Assuming 'change' is the field in the stock data
      return stockChange >= changeRange.min && stockChange <= changeRange.max;
    });

    // Update the stocks with the filtered data
    setStocks(filteredStocks);
    
  };
  const handleNavigate = () => {
    navigate('/subscription'); // Navigate to the desired route
  };

  return (
    <div>
      <div className="screener-container">
        <h1 className="screener-header">List of Top Large Cap Companies</h1>
         <div className="screener-filters">
                        {/* Filter for each parameter */}
                       <div
                    className="indexscreenerbuttonstockcontainar"
                    ref={indexDropdownRef}
                  >
                          {/* Dropdown Button */}
                          <button
                            className="indexscreenerbuttonstock"
                            onClick={() => toggleDropdown("index")}
                          >
                            Index <RiArrowDropDownLine size={24} />
                          </button>
              
                          {/* Dropdown Menu */}
                          {dropdowns.index && (
                            <div className="stockindexscreeneropt">
                              {/* Search Box */}
                              <div className="searchboxindexscreener">
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
                                className="index-optionsstocks" // Added class name to the container of options
                              >
                                {filteredIndexes.map((index, idx) => (
                                  <label
                                    key={`${index}-${idx}`}
                                    className="index-optionscreener" // Added class name to each option
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedIndexes.includes(index)}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleCheckboxChange(index);
                                      }}
                                      style={{ width: "20%" }}
                                    />
                                    {index}
                                  </label>
                                ))}
                              </div>
              
                              {/* Buttons */}
                              <div className="resetapplybuttoncontainer">
                                <button className="resetstockscreener" onClick={handleReset}>
                                  Reset
                                </button>
                                <button className="applystockscreener" onClick={handleApply}>
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
                         <div className="market-cap-filter">
                           <div className="dropdown-market-cap-wrapper">
                             {/* Filter for each parameter */}
                             <div ref={priceDropdownRef} >
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("price")}
                               >
                                 Price <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.price && (
                                 <div className="dropdown-market-cap-options">
                                   {/* Checkbox List */}
                                   {priceOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedprice.includes(category.value)}
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedprice((prev) =>
                                             prev.includes(category.value)
                                               ? prev.filter((item) => item !== category.value)
                                               : [...prev, category.value]
                                           );
                                         }}
                                         style={{ width: "30%" }}
                                       />
                                       {category.label}
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
                                       onClick={handlePriceApply}
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
                             <div ref={changeDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("change")}
                               >
                                 Change% <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.change && (
                                 <div className="dropdown-change-options">
                                   {/* Checkbox List */}
               
                                   {changeOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedchange.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedchange(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                                       onClick={handleChangeApply}
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
                             <div ref={marketCapDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("marketcap")}
                               >
                                 Market Cap <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.marketcap && (
                                 <div className="dropdown-marketcap-options">
                                   {/* Search Box */}
               
                                   {/* Checkbox List */}
               
                                   {marketCapCategory.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedMcap.includes(category)} // Check if the category is selected
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedMcap(
                                             (prev) =>
                                               prev.includes(category)
                                                 ? prev.filter((item) => item !== category) // Remove category from selected
                                                 : [...prev, category] // Add category to selected
                                           );
                                         }}
                                         style={{ width: "40%" }}
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
                             <div ref={peDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("pe")}
                               >
                                 P/E <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.pe && (
                                 <div className="dropdown-pe-options">
                                   {/* Checkbox List */}
               
                                   {peFilterOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedPe.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedPe(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                             <div ref={epsDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("eps")}
                               >
                                 EPS Dil Growth <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.eps && (
                                 <div className="dropdown-eps-options">
                                   {/* Checkbox List */}
               
                                   {epsDilGrowthOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedeps.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedeps(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                             <div ref={divYieldDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("divYield")}
                               >
                                 Div Yield % <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.divYield && (
                                 <div className="dropdown-div-options">
                                   {/* Checkbox List */}
                                   {divYieldOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selecteddivyield.includes(category.value)}
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelecteddivyield((prev) =>
                                             prev.includes(category.value)
                                               ? prev.filter((item) => item !== category.value)
                                               : [...prev, category.value]
                                           );
                                         }}
                                         style={{ width: "30%" }}
                                       />
                                       {category.label}
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
                         <div
                           className="indexscreenerbuttonstockcontainar"
                           ref={sectorDropdownRef}
                         >
                           <button
                             className="indexscreenerbuttonstock"
                             onClick={() => toggleDropdown("sector")}
                           >
                             Sectors <RiArrowDropDownLine size={24} />
                           </button>
               
                           {/* Dropdown Menu */}
                           {dropdowns.sector && (
                             <div className="stockindexscreenesectoropt">
                               <div className="searchboxindexscreener">
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
               
                               <div className="index-optionsstocks">
                                 {filteredSectors.map((sector, index) => (
                                   <label key={sector} className="index-optionscreener">
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
                                       style={{ width: "20%" }}
                                     />
                                     {sector}
                                   </label>
                                 ))}
                               </div>
                               <div className="resetapplybuttoncontainer">
                                 <button className="resetstockscreener" onClick={handleReset}>
                                   Reset
                                 </button>
                                 <button
                                   className="applystockscreener"
                                   onClick={handlesectorApply}
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
               
                         {/* Performance Dropdown */}
                         <div className="market-cap-filter">
                           <div className="dropdown-market-cap-wrapper">
                             {/* Filter for each parameter */}
                             <div ref={performanceDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("performance")}
                               >
                                 Perf% <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.performance && (
                                 <div className="dropdown-perf-options">
                                   {/* Checkbox List */}
               
                                   {perfOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedperf.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedperf(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                                       onClick={handleperfApply}
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
                         {/* Revenue Growth Dropdown */}
                         <div className="market-cap-filter">
                           <div className="dropdown-market-cap-wrapper">
                             {/* Filter for each parameter */}
                             <div ref={revenueDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("revenue")}
                               >
                                 Revenue Growth <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.revenue && (
                                 <div className="dropdown-revgro-options">
                                   {/* Checkbox List */}
               
                                   {revenueGrowthOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedrevenuegrowth.includes(
                                           category.value
                                         )} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedrevenuegrowth(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                             <div ref={pegDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("peg")}
                               >
                                 PEG <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.peg && (
                                 <div className="dropdown-peg-options">
                                   {/* Checkbox List */}
               
                                   {pegOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedpeg.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedpeg(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
                             <div ref={roeDropdownRef}>
                               {/* Dropdown Button */}
                               <button
                                 className="dropdown-market-cap-toggle"
                                 onClick={() => toggleDropdown("roe")}
                               >
                                 ROE <RiArrowDropDownLine size={24} />
                               </button>
               
                               {/* Dropdown Menu */}
                               {dropdowns.roe && (
                                 <div className="dropdown-roe-options">
                                   {/* Checkbox List */}
               
                                   {roeOptions.map((category) => (
                                     <label
                                       className="dropdown-market-cap-label"
                                       key={category.value}
                                     >
                                       <input
                                         type="checkbox"
                                         checked={selectedroe.includes(category.value)} // Check by the category value
                                         onChange={(e) => {
                                           e.stopPropagation();
                                           setSelectedroe(
                                             (prev) =>
                                               prev.includes(category.value)
                                                 ? prev.filter(
                                                   (item) => item !== category.value
                                                 ) // Remove category
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
              navigate("/large-cap-stocks");
            }}
          >
            Overview
          </button>

          <button
            className={`tab-button ${activeTab === "Valuation" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("Valuation");
              navigate('/large-cap-stocks-valuation'); // Navigate to the ScreenerStockvaluation page
            }}
          >
            Valuation
          </button>

          <button
            className={`tab-button ${activeTab === "Income Statement" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("Income Statement");
              navigate('/large-cap-stocks-incomestatement'); // Add a route for Income Statement if needed
            }}
          >
            Income Statement
          </button>
        </div>{
          isloading ? <div className='loader-cont'><ClipLoader
            cssOverride={override}
            size={35}
            data-testid="loader"
            loading={isloading}
            speedMultiplier={1}
            color="green"
          /></div> :
            <div className="screener-table-wrapper" style={{ overflowY: 'auto', height: '500px' }}>
              <table className="screener-table" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
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
                  {currentData.map((stock, index) => (
                  <tr key={index} className="screener-row">
                    <td
                      className="symbol-cell"
                      onClick={() => {
                        navigate(stock.url, { state: { stock } });
                      }}
                    >
                      <img
                        src={stock.icon}
                        alt={`${stock.symbol} logo`}
                        className="company-icon"
                      />

                      <a href={stock.url} style={{textAlign: "left",}}>{stock.symbol}</a>
                    </td>
                    <td>₹{stock.marketCap}</td>

                    <td
                      style={{
                        color:
                          parseFloat(stock.marketCapPerf) > 0
                            ? "#24b676"
                            : parseFloat(stock.marketCapPerf) < 0
                              ? "red"
                              : "inherit",
                      }}
                    >
                      {parseFloat(stock.marketCapPerf) > 0
                        ? `+${stock.marketCapPerf}`
                        : stock.marketCapPerf}
                    </td>

                    <td>{stock.pToE}</td>
                    <td>{stock.pToB}</td>
                    <td>{stock.peg}</td>
                    <td>{stock.pToS}</td>
                    <td>{stock.pToCF}</td>
                    <td>{stock.price}</td>
                    <td>₹{stock.ev}</td>
                    <td>{stock.evEbitda}</td>
                    <td>{stock.evSales}</td>
                    <td>{stock.evEbit}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>}
        {/* Pagination Section */}
        <div className="pagination-stockcontainer">
          <div className="pagination-infostock">
            {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${stocks.length} records`}
          </div>

          <div className="pagination-sliderr">
            <button className="pagination-button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>

            {startPage > 1 && (
              <>
                <button className="pagination-button" onClick={() => handlePageChange(1)}>1</button>
                {startPage > 2 && <span>...</span>}
              </>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={startPage + i}
                className={`pagination-button ${currentPage === startPage + i ? "active-page" : ""}`}
                onClick={() => handlePageChange(startPage + i)}
              >
                {startPage + i}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span>...</span>}
                <button className="pagination-button" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
              </>
            )}

            <button className="pagination-button" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
          </div>
        </div>
        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default Largecapvaluation;
