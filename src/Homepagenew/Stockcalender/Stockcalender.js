import React, { useState, useEffect } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the sorting icon
import './Stockcalender.css'
import Navbar from "../../Navbar/Navbar";

import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Stockcalender = () => {
      
  const [selectedEarningsTab, setSelectedEarningsTab] = useState("Today");
  const [sortOrder, setSortOrder] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [allStocks, setAllStocks] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Date formatting function
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/stocksScreener/stockCalender`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setAllStocks(data);
      setSortedData(data); // Directly set sorted data to all stocks initially
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
    const sorted = [...sortedData].sort((a, b) => compareValues(a, b, column, newSortOrder));
    setSortOrder((prevSortOrder) => ({ ...prevSortOrder, [column]: newSortOrder }));
    setSortedData(sorted);
  };

  const compareValues = (a, b, column, order) => {
    let valueA = a[column];
    let valueB = b[column];

    if (["ltp_inr", "change_percent", "market_cap_cr", "High_52W_INR", "Low_52W_INR", "pe"].includes(column)) {
      valueA = parseFloat(valueA.replace(/₹|%|,/g, ""));
      valueB = parseFloat(valueB.replace(/₹|%|,/g, ""));
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (column === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  };

  const renderSortIcon = (column) => {
    const sortIconStyle = { transform: sortOrder[column] === "asc" ? "rotate(0deg)" : "rotate(180deg)" };
    return <PiCaretUpDownFill style={sortIconStyle} />;
  };

  const handleEarningsTabChange = (tab) => {
    setSelectedEarningsTab(tab);
    filterEarningsData(tab);
  };

  const filterEarningsData = (tab) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for comparison to ignore the time
  
    const filtered = allStocks.filter((data) => {
      const dataDate = new Date(data.date);
      dataDate.setHours(0, 0, 0, 0); // Normalize the data date by setting hours to 0
  
      switch (tab) {
        case "Yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1); // Set to yesterday
          return yesterday.getTime() === dataDate.getTime();
  
        case "Today":
          return today.getTime() === dataDate.getTime();
  
        case "Tomorrow":
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1); // Set to tomorrow
          return tomorrow.getTime() === dataDate.getTime();
  
        case "This Week":
          return isWithinWeek(dataDate, today);
  
        case "Next Week":
          return isWithinNextWeek(dataDate, today);
  
        default:
          return false;
      }
    });
  
    setSortedData(filtered);
  };

  const isWithinWeek = (dataDate, today) => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the start of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the end of the week (Saturday)
    return dataDate >= startOfWeek && dataDate <= endOfWeek;
  };

  const isWithinNextWeek = (dataDate, today) => {
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() + (7 - today.getDay())); // Set to next Sunday
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // Set to next Saturday
    return dataDate >= startOfNextWeek && dataDate <= endOfNextWeek;
  };

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      filterDataByDate(start, end);
    } else {
      setSortedData(allStocks); // Reset to all stocks when no range is selected
    }
  };

  const filterDataByDate = (startDate, endDate) => {
    const filteredData = allStocks.filter((row) => {
      const rowDate = new Date(row.date);
      return rowDate >= startDate && rowDate <= endDate;
    });
    setSortedData(filteredData);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentStocks = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="DashboardMainPagetable-container">
      <div className="DashboardMainPagetable-headercalculator">
        <button className="DashboardMainPagetable-tab"  onClick={() => navigate("/home")}>Stock Sector</button>
      <button
      className="DashboardMainPagetable-tab"
      onClick={() => navigate("/stockindexall")}
    >
      Stock Index
    </button>
        <button className="DashboardMainPagetable-tab active" onClick={() => navigate("/calenderchartmain")}>Stock Calendar</button>
        <button className="DashboardMainPagetable-tab"  onClick={() => navigate("/stockanalystall")}>Stock Analyst</button>
      </div>
        <div className="earnings-insight-learn-wrapperr">
         

            <div className="earnings-insight-learn-controls">
                <div className="earnings-insight-learn-header-row">
                    <div className="earningquterlyrowalll">
                    <div className="earnings-insight-learn-tabs">
  {["Yesterday", "Today", "Tomorrow", "This Week", "Next Week"].map((tab) => (
    <button
      key={tab}
      className={`earnings-insight-learn-tab-button ${
        selectedEarningsTab === tab ? "active" : ""
      }`}
      onClick={() => handleEarningsTabChange(tab)}
    >
      {tab}
    </button>
  ))}
</div>
<div >
                    <div className="earnings-insight-learn-date-picker">
                        <div className="dateinsighttt">
                            <label htmlFor="dateRange" className="date-picker-label">Select Date Range: </label>
                            <div className="calendar-icon" onClick={() => setCalendarOpen(!calendarOpen)} >
                                <FaRegCalendarAlt />
                            </div>
                            </div>
                            {calendarOpen && (
                               <ReactDatePicker
                               selected={startDate}
                               onChange={handleDateChange}
                               startDate={startDate}
                               endDate={endDate}
                               selectsRange
                               inline
                               dateFormat="yyyy-MM-dd"
                               onClick={() => setCalendarOpen(false)} // Close the calendar when clicking outside
                           />
                            )}
                        </div>
                     
                    
                    </div>
                    
          
                </div>
            </div>
            <div className="DashboardMainPagetable-table-container">
            <table className="DashboardMainPagetable-tablee">
                <thead>
                    <tr>
                      
                        <th>Company</th>
                       
                        <th onClick={() => handleSort("ltp_inr")} style={{ cursor: "pointer" }}>
                            LTP ₹ {renderSortIcon("ltp_inr")}
                        </th>
                        <th onClick={() => handleSort("change_percent")} style={{ cursor: "pointer" }}>
                            Change % {renderSortIcon("change_percent")}
                        </th>
                        <th onClick={() => handleSort("market_cap_cr")} style={{ cursor: "pointer" }}>
    Market Cap (Cr.) {renderSortIcon("market_cap_cr")}
</th>
                        <th onClick={() => handleSort("High_52W_INR")} style={{ cursor: "pointer" }}>
                        52W High (₹) {renderSortIcon("High_52W_INR")}
                        </th>
                        <th onClick={() => handleSort("Low_52W_INR")} style={{ cursor: "pointer" }}>
                        52W Low (₹) {renderSortIcon("Low_52W_INR")}
                        </th>
                        
                        <th onClick={() => handleSort("event_date")} style={{ cursor: "pointer" }}>
                        Date{renderSortIcon("event_date")}
                        </th>
                       
                        <th onClick={() => handleSort("pe")} style={{ cursor: "pointer" }}>
                        Current P/E {renderSortIcon("pe")}
                        </th>
                        <th >
                        Clarification
                        </th>
                    </tr>
                </thead>
                <tbody>
  {allStocks.length > 0 ? (
    currentStocks.map((row, index) => (
      
      <tr key={index}>
        <td>
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            {row.company}
          </a>
        </td>
        <td>{row.ltp_inr}</td>
        <td
          style={{
            color: row.change_percent && row.change_percent.includes("-") ? "red" : "#24b676", // Red for negative, green for positive
          }}
        >
          {row.change_percent}
        </td>
        <td>{row.market_cap_cr}</td>
        <td>{row.High_52W_INR}</td>
        <td>{row.Low_52W_INR}</td>
        <td>{formatDate(row.event_date)}</td>
        <td>{row.pe}</td>
        <td>
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            className="clarificationstockcalender-link"
            style={{ color: "#24b676", cursor: "pointer" }}
          >
            {row.clarification}
          </a>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" style={{ textAlign: "center" }}>
        No data available for {selectedEarningsTab}
      </td>
    </tr>
  )}
</tbody>

            </table>
            </div>
         {/* Pagination Section */}
<div className="pagination-containercalender">
  <div className="pagination-info">
    {`Showing ${indexOfFirstItem + 1} to ${
      indexOfLastItem > sortedData.length ? sortedData.length : indexOfLastItem
    } of ${sortedData.length} records`}
  </div>
  <div className="pagination-slider">
    <button
      className="pagination-button"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      &lt;
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={`pagination-button ${
          currentPage === i + 1 ? "active-page" : ""
        }`}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="pagination-button"
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      &gt;
    </button>
  </div>
</div>

            </div>
    <Navbar/>
        </div>
        </div>
    
    );
};

export default Stockcalender