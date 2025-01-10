import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the sorting icon
import './Stockcalender.css'
import Navbar from "../../Navbar/Navbar";

import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Stockcalender = () => {
    const earningsData = [
        {
            company: "Avanti Feeds Ltd",
            ltp: "₹682.3",
            change: "13.80%",
            marketCap: "₹8,168.6 Cr",
            high52W: "791.1",
            low52W: "421.7",
            date: "2025-01-03",
            currentPE: "19.52",
            clarification: "Know more",
          },
          {
            company: "CRISIL Ltd",
            ltp: "₹6,884",
            change: "11.64%",
            marketCap: "₹43,786.5 Cr",
            high52W: "6,119",
            low52W: "3,665",
            date: "30 Dec 2024",
            currentPE: "65.40",
            clarification: "Know more",
          },
          {
            company: "Godfrey Phillips India Ltd",
            ltp: "₹5,218",
            change: "8.88%",
            marketCap: "₹24,916.8 Cr",
            high52W: "8,480",
            low52W: "2,066",
            date: "2 Oct 2024",
            currentPE: "27.87",
            clarification: "Know more",
          },
          {
            company: "NLC India Ltd",
            ltp: "₹251.5",
            change: "7.16%",
            marketCap: "₹32,544.4 Cr",
            high52W: "311.6",
            low52W: "193.0",
            date: "7 Dec 2024",
            currentPE: "26.47",
            clarification: "Know more",
          },
          {
            company: "Torrent Power Ltd",
            ltp: "₹1,484",
            change: "5.30%",
            marketCap: "₹71,012.6 Cr",
            high52W: "2,037",
            low52W: "931.0",
            date: "3 Dec 2024",
            currentPE: "30.98",
            clarification: "Know more",
          },
          {
            company: "IFCI Ltd",
            ltp: "₹62.23",
            change: "5.22%",
            marketCap: "₹15,456.8 Cr",
            high52W: "91.39",
            low52W: "28.29",
            date: "10 Dec 2024",
            currentPE: "433.57",
            clarification: "Know more",
          },
          {
            company: "Thermax Ltd",
            ltp: "₹4,072",
            change: "3.79%",
            marketCap: "₹46,747.4 Cr",
            high52W: "5,835",
            low52W: "2,979",
            date: "30 Dec 2024",
            currentPE: "63.04",
            clarification: "Know more",
          },
          {
            company: "UCO Bank",
            ltp: "₹43.85",
            change: "3.44%",
            marketCap: "₹50,681.3 Cr",
            high52W: "70.66",
            low52W: "39.20",
            date: "3 Dec 2024",
            currentPE: "23.22",
            clarification: "Know more",
          },
        ];
        
    
    
        
    
        const [selectedEarningsTab, setSelectedEarningsTab] = useState("Today");
         const navigate = useNavigate();
       
         useState("All");
        const [sortOrder, setSortOrder] = useState({});
       
        const [sortedData, setSortedData] = useState([...earningsData]);
   
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const [calendarOpen, setCalendarOpen] = useState(false);
      

    const handleEarningsTabChange = (tab) => {
        setSelectedEarningsTab(tab);
    };

    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    };


   
    const filterEarningsDataByDate = (earningsData, selectedEarningsTab, today = new Date()) => {
      return earningsData.filter((data) => {
        const dataDate = new Date(data.date);
        dataDate.setHours(0, 0, 0, 0); // Normalize data date to ignore time
        const normalizedToday = new Date(today);
        normalizedToday.setHours(0, 0, 0, 0);
    
        switch (selectedEarningsTab) {
          case "Yesterday":
            const yesterday = new Date(normalizedToday);
            yesterday.setDate(normalizedToday.getDate() - 1);
            return dataDate.getTime() === yesterday.getTime();
    
          case "Today":
            return dataDate.getTime() === normalizedToday.getTime();
    
          case "Tomorrow":
            const tomorrow = new Date(normalizedToday);
            tomorrow.setDate(normalizedToday.getDate() + 1);
            return dataDate.getTime() === tomorrow.getTime();
    
          case "This Week":
            const startOfWeek = new Date(normalizedToday);
            startOfWeek.setDate(normalizedToday.getDate() - normalizedToday.getDay()); // Sunday
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
            return dataDate >= startOfWeek && dataDate <= endOfWeek;
    
          case "Next Week":
            const startOfNextWeek = new Date(normalizedToday);
            startOfNextWeek.setDate(normalizedToday.getDate() + (7 - normalizedToday.getDay())); // Next Sunday
            const endOfNextWeek = new Date(startOfNextWeek);
            endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // Next Saturday
            return dataDate >= startOfNextWeek && dataDate <= endOfNextWeek;
    
          default:
            return false;
        }
      });
    };


    



    const handleSort = (column) => {
      const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
  
      const sorted = [...earningsData].sort((a, b) => {
          let valueA = a[column];
          let valueB = b[column];
  
          // Handle numeric fields (e.g., LTP, Change %, etc.)
          if (["ltp", "change", "marketCap", "high52W", "low52W", "currentPE"].includes(column)) {
              valueA = parseFloat(valueA.replace(/₹|%|,/g, ""));
              valueB = parseFloat(valueB.replace(/₹|%|,/g, ""));
              return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
          }
  
          // Handle date field
          if (column === "date") {
              valueA = new Date(valueA);
              valueB = new Date(valueB);
              return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
          }
  
          // Fallback for string fields
          return newSortOrder === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
      });
  
      setSortOrder((prevSortOrder) => ({
          ...prevSortOrder,
          [column]: newSortOrder,
      }));
  
      setSortedData(sorted);
  };
  
  const renderSortIcon = (column) => {
    if (sortOrder[column] === "asc") {
        return <PiCaretUpDownFill style={{ transform: "rotate(0deg)" }} />;
    } else if (sortOrder[column] === "desc") {
        return <PiCaretUpDownFill style={{ transform: "rotate(180deg)" }} />;
    }
    return <PiCaretUpDownFill style={{ color: "black" }} />;
};

    
const handleDateChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);

  // Filter data based on the selected date range
  if (start && end) {
      filterData(start, end);
  } else {
      setSortedData([...earningsData]); // Reset data if no range is selected
  }
};

// Function to filter the data based on the date range
const filterData = (startDate, endDate) => {
  const filteredData = earningsData.filter((row) => {
      const rowDate = new Date(row.date); // Convert row.date to Date object
      return rowDate >= startDate && rowDate <= endDate;
  });
  setSortedData(filteredData);
};




  
    return (
      <div className="DashboardMainPagetable-container">
      <div className="DashboardMainPagetable-headerr">
        <button className="DashboardMainPagetable-tab"  onClick={() => navigate("/dashboardchartmain")}>Stock Sector</button>
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
            <table className="DashboardMainPagetable-table">
                <thead>
                    <tr>
                      
                        <th>Company</th>
                       
                        <th onClick={() => handleSort("ltp")} style={{ cursor: "pointer" }}>
                            LTP ₹ {renderSortIcon("ltp")}
                        </th>
                        <th onClick={() => handleSort("change")} style={{ cursor: "pointer" }}>
                            Change % {renderSortIcon("change")}
                        </th>
                        <th onClick={() => handleSort("marketCap")} style={{ cursor: "pointer" }}>
    Market Cap (Cr.) {renderSortIcon("marketCap")}
</th>
                        <th onClick={() => handleSort("high52W")} style={{ cursor: "pointer" }}>
                        52W High (₹) {renderSortIcon("high52W")}
                        </th>
                        <th onClick={() => handleSort("low52W")} style={{ cursor: "pointer" }}>
                        52W Low (₹) {renderSortIcon("low52W")}
                        </th>
                        
                        <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                        Date{renderSortIcon("date")}
                        </th>
                       
                        <th onClick={() => handleSort("currentPE")} style={{ cursor: "pointer" }}>
                        Current P/E {renderSortIcon("currentPE")}
                        </th>
                        <th >
                        Clarification
                        </th>
                    </tr>
                </thead>
                <tbody>
  {earningsData.length > 0 ? (
    sortedData.map((row, index) => (
      <tr key={index}>
        <td>
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            {row.company}
          </a>
        </td>
        <td>{row.ltp}</td>
        <td
          style={{
            color: row.change.includes("-") ? "red" : "#24b676", // Red for negative, green for positive
          }}
        >
          {row.change}
        </td>
        <td>{row.marketCap}</td>
        <td>{row.high52W}</td>
        <td>{row.low52W}</td>
        <td>{row.date}</td>
        <td>{row.currentPE}</td>
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
            </div>
    <Navbar/>
        </div>
        </div>
    
    );
};

export default Stockcalender