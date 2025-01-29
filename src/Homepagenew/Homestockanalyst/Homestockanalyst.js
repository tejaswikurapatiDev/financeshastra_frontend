import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi"; // Sorting icon
import Navbar from "../../Navbar/Navbar";
import './Homestockanalyst.css';
import { useNavigate } from "react-router-dom";

const Homestockanalyst = () => {
  const analystdata = [
    {
        
            company: 'Kotak Mahindra Bank Ltd',
            ltp: '₹186.30',
            change: '2.49%',
            marketCap: '₹3,46,518.8 Cr',
            roe: '15.35',
            pe: '90.71',
            pbv: '3.13',
            evEbitda: '56.62',
            salesGrowth: '18.33%',
            profitGrowth: '22.08%',
             Clarification:"Know more"
          },
          {
            company: 'Hindustan Aeronautics Ltd',
            ltp: '₹4,176.50',
            change: '2.45%',
            marketCap: '₹2,72,642.8 Cr',
            roe: '28.85',
            pe: '32.01',
            pbv: '8.74',
            evEbitda: '19.88',
            salesGrowth: '48.71%',
            profitGrowth: '26.62%',
             Clarification:"Know more"
          },
          {
            company: 'Oil & Natural Gas Corporation Ltd',
            ltp: '₹239.05',
            change: '2.44%',
            marketCap: '₹2,93,560.8 Cr',
            roe: '14.39',
            pe: '57.28',
            pbv: '0.90',
            evEbitda: '33.42',
            salesGrowth: '23.43%',
            profitGrowth: '48.49%',
             Clarification:"Know more"
          },
          {
            company: 'Indian Overseas Bank',
            ltp: '₹4,251.72',
            change: '2.29%',
            marketCap: '₹3,95,570.6 Cr',
            roe: '11.13',
            pe: '13.50',
            pbv: '3.71',
            evEbitda: '84.45',
            salesGrowth: '43.24%',
            profitGrowth: '0.00%',
             Clarification:"Know more"
          },
          {
            company: 'Trent Ltd',
            ltp: '₹7,116.15',
            change: '2.23%',
            marketCap: '₹2,47,458.4 Cr',
            roe: '24.92',
            pe: '24.32',
            pbv: '48.55',
            evEbitda: '92.22',
            salesGrowth: '36.34%',
            profitGrowth: '46.58%',
             Clarification:"Know more"
          },
          {
            company: 'Bank Of Baroda',
            ltp: '₹240.5',
            change: '-0.02%',
            marketCap: '₹1,24,397.1 Cr',
            roe: '16.91',
            pe: '66.49',
            pbv: '0.98',
            evEbitda: '35.16',
            salesGrowth: '19.33%',
            profitGrowth: '83.80%',
             Clarification:"Know more"
          },
          {
            company: 'Titan Company Ltd',
            ltp: '₹3,253.65',
            change: '-0.09%',
            marketCap: '₹2,89,120.9 Cr',
            roe: '26.81',
            pe: '87.59',
            pbv: '19.31',
            evEbitda: '54.11',
            salesGrowth: '19.83%',
            profitGrowth: '18.33%',
             Clarification:"Know more"
          },
          {
            company: 'Asian Paints Ltd',
            ltp: '₹212.05',
            change: '-0.19%',
            marketCap: '₹2,19,315.8 Cr',
            roe: '31.48',
            pe: '48.00',
            pbv: '12.17',
            evEbitda: '29.94',
            salesGrowth: '13.02%',
            profitGrowth: '20.45%',
            Clarification:"Know more"
          
    },
    // Add other stocks similarly...
  ];

  const [stocks, setStocks] = useState(analystdata);
  const [sortDirection, setSortDirection] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
 const navigate = useNavigate();
  

  
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 5; // Show 7 rows per page
 
 // Calculate the current page's data
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentStocks = stocks?.slice(indexOfFirstItem, indexOfLastItem) || [];
 
 
 const totalPages = Math.ceil(stocks.length / itemsPerPage);
 
 // Change page
 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
 };
 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  
    if (tab === "All") {
      setStocks(analystdata); // Reset to all stocks
    } else if (tab === "Gainers") {
      setStocks(analystdata.filter((stock) => parseFloat(stock.change) > 0));
    } else if (tab === "Losers") {
      setStocks(analystdata.filter((stock) => parseFloat(stock.change) < 0));
    } else if (tab === "LTP") {
    
      // Sort by LTP in descending order
      const sortedByLTP = [...analystdata].sort((a, b) => {
        const valA = parseFloat(a.ltp.replace(/[₹,]/g, "")); // Remove ₹ and commas
        const valB = parseFloat(b.ltp.replace(/[₹,]/g, ""));
        return valB - valA; // Descending order
      });
      setStocks(sortedByLTP);
    } 
    else if (tab === "Market Cap") {
        // Sort by Market Cap in descending order
        const sortedByMarketCap = [...analystdata].sort((a, b) => {
          // Extract numeric value from the 'marketCap' field (removing ₹, commas and "Cr")
          const valA = parseFloat(a.marketCap.replace(/[₹,Cr]/g, ""));
          const valB = parseFloat(b.marketCap.replace(/[₹,Cr]/g, ""));
          return valB - valA; // Descending order
        });
        setStocks(sortedByMarketCap);
      }
      else if (tab === "ROE") {
        // Sort by ROE in descending order
        const sortedByROE = [...analystdata].sort((a, b) => {
          // Extract numeric value from the 'roe' field (removing ₹, commas, and "Cr" if present)
          const valA = parseFloat(a.roe.replace(/[₹,Cr%]/g, "")) || 0; // Default to 0 if parsing fails
          const valB = parseFloat(b.roe.replace(/[₹,Cr%]/g, "")) || 0; // Default to 0 if parsing fails
          return valB - valA; // Descending order
        });
        setStocks(sortedByROE);
      }
      
      else if (tab === "P/E") {
        // Sort by P/E ratio in descending order
        const sortedByPE = [...analystdata].sort((a, b) => {
          // Extract numeric value from the 'pe' field (P/E ratio)
          const valA = parseFloat(a.pe);  // P/E ratio is already a number, no need for additional replacement
          const valB = parseFloat(b.pe);
          return valB - valA; // Descending order (higher P/E first)
        });
        setStocks(sortedByPE);
    } else if (tab === "P/BV") {
        // Sort by P/BV ratio in descending order
        const sortedByPBV = [...analystdata].sort((a, b) => {
          const valA = parseFloat(a.pbv);  // P/BV ratio is already a number
          const valB = parseFloat(b.pbv);
          return valB - valA; // Descending order (higher P/BV first)
        });
        setStocks(sortedByPBV);
      } 
      else if (tab === "EV/EBITDA") {
        // Sort by EV/EBITDA ratio in descending order
        const sortedByEVEBITDA = [...analystdata].sort((a, b) => {
          const valA = parseFloat(a.evEbitda);  // EV/EBITDA ratio is already a number
          const valB = parseFloat(b.evEbitda);
          return valB - valA; // Descending order (higher EV/EBITDA first)
        });
        setStocks(sortedByEVEBITDA);
      }
      else if (tab === "5Y Sales Gr") {
        // Sort by 5Y Sales Growth in descending order
        const sortedBySalesGrowth = [...analystdata].sort((a, b) => {
          const valA = parseFloat(a.salesGrowth.replace(/[%,]/g, ""));  // Remove "%" and parse as number
          const valB = parseFloat(b.salesGrowth.replace(/[%,]/g, ""));
          return valB - valA; // Descending order (higher sales growth first)
        });
        setStocks(sortedBySalesGrowth);
    }
    else if (tab === "5Y Profit Gr") {
        // Sort by 5Y Profit Growth in descending order
        const sortedByProfitGrowth = [...analystdata].sort((a, b) => {
          const valA = parseFloat(a.profitGrowth.replace(/[%,]/g, ""));  // Remove "%" and parse as number
          const valB = parseFloat(b.profitGrowth.replace(/[%,]/g, ""));
          return valB - valA; // Descending order (higher profit growth first)
        });
        setStocks(sortedByProfitGrowth);
      }
      
      
    else {
      // Sorting for other metrics
      const sortedData = [...analystdata].sort((a, b) => {
        const valA = parseFloat(a[tab.toLowerCase().replace(" ", "")]?.replace(/[₹,%]/g, "") || 0);
        const valB = parseFloat(b[tab.toLowerCase().replace(" ", "")]?.replace(/[₹,%]/g, "") || 0);
        return sortDirection ? valB - valA : valA - valB;
      });
      setStocks(sortedData);
      setSortDirection(!sortDirection);
    }
  };
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  
    // Sorting logic
    const sortedStocks = [...stocks].sort((a, b) => {
      const valA = a[column] ?? 0;
      const valB = b[column] ?? 0;
  
      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
  
      if (typeof valA === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }
  
      return 0;
    });
  
    setStocks(sortedStocks); // Update the state with sorted data
  };
  

  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <PiCaretUpDownFill style={{ transform: "rotate(0deg)" }} />
      ) : (
        <PiCaretUpDownFill style={{ transform: "rotate(180deg)" }} />
      );
    }
    return <PiCaretUpDownFill style={{ color: "black" }} />;
  };
  return (
    <div className="DashboardMainPagetable-container">
    <div className="DashboardMainPagetable-headeranalyst">
      <button className="DashboardMainPagetable-tab"  onClick={() => navigate("/home")}>Stock Sector</button>
    <button
    className="DashboardMainPagetable-tab"
    onClick={() => navigate("/stockindexall")}
  >
    Stock Index
  </button>
      <button className="DashboardMainPagetable-tab" onClick={() => navigate("/calenderchartmain")}>Stock Calendar</button>
      <button className="DashboardMainPagetable-tab active">Stock Analyst</button>
    </div>
    <div>
      <div className="screener-containerr">
        {/* Tabs */}
        <div className="tabsnifty50-containerdash">
  {["All", "Gainers", "Losers", "LTP", "Change %", "Market Cap", "ROE", "P/E", "P/BV", "EV/EBITDA", "5Y Sales Gr", "5Y Profit Gr"].map((tab) => (
    <button
      key={tab}
      className={`tabnifty50-buttondash ${activeTab === tab ? "active" : ""}`}
      onClick={() => handleTabClick(tab)}
    >
      {tab}
    </button>
  ))}
</div>


        {/* Table */}
        
<div className="DashboardMainPagetable-table-containerrrrr">
<table className="DashboardMainPagetable-tableeee">
          <thead>
  <tr>
    <th style={{ height: '40px', padding: '8px',  }}>Company</th>
    <th
      onClick={() => handleSort("ltp")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span>LTP (₹)</span>
      {renderSortIcon("ltp")}
    </th>
    <th
      onClick={() => handleSort("change")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Change % {renderSortIcon("change")}
      </span>
    </th>
    <th
      onClick={() => handleSort("marketCap")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Market Cap (Cr) {renderSortIcon("marketCap")}
      </span>
    </th>
    <th
      onClick={() => handleSort("roe")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        ROE {renderSortIcon("roe")}
      </span>
    </th>
    <th
      onClick={() => handleSort("pe")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        P/E {renderSortIcon("pe")}
      </span>
    </th>
    <th
      onClick={() => handleSort("pbv")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        P/BV {renderSortIcon("pbv")}
      </span>
    </th>
    <th
      onClick={() => handleSort("evEbitda")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        EV/EBITDA {renderSortIcon("evEbitda")}
      </span>
    </th>
    <th
      onClick={() => handleSort("salesGrowth")}
      style={{ height: '40px', padding: '8px' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        5Y Sales Gr. (%) {renderSortIcon("salesGrowth")}
      </span>
    </th>
    <th
      onClick={() => handleSort("profitGrowth")}
      style={{ height: '40px', padding: '8px'}}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        5Y Profit Gr.(%) {renderSortIcon("profitGrowth")}
      </span>
    </th>
    <th style={{ height: '40px', padding: '8px'}}>Clarification</th>
  </tr>
</thead>

<tbody>
  {currentStocks.map((stock, index) => (
    <tr key={index}>
     <td 
  className={`${activeTab === "company" ? "active-column" : ""}`}
>
  {stock.company}
</td>

      <td className={activeTab === "LTP" ? "active-column" : ""}>
        {stock.ltp}
      </td>
      <td
        className={activeTab === "Change %" ? "active-column" : ""}
        style={{
          color: parseFloat(stock.change) > 0 ? "#24b676" : "red",
        }}
      >
        {stock.change}
      </td>
      <td className={activeTab === "Market Cap" ? "active-column" : ""}>
        {stock.marketCap}
      </td>
      <td className={activeTab === "ROE" ? "active-column" : ""}>
        {stock.roe}
      </td>
      <td className={activeTab === "P/E" ? "active-column" : ""}>
        {stock.pe}
      </td>
      <td className={activeTab === "P/BV" ? "active-column" : ""}>
        {stock.pbv}
      </td>
      <td className={activeTab === "EV/EBITDA" ? "active-column" : ""}>
        {stock.evEbitda}
      </td>
      <td className={activeTab === "5Y Sales Gr" ? "active-column" : ""}>
        {stock.salesGrowth}
      </td>
      <td className={activeTab === "5Y Profit Gr" ? "active-column" : ""}>
        {stock.profitGrowth}
      </td>
      <td style={{ color: "#24b676", cursor: "pointer" }}>
        {stock.Clarification}
      </td>
    </tr>
  ))}
</tbody>


          </table>
        </div>

        {/* Pagination */}
      
      {/* Pagination Section */}
<div className="pagination-containeranalyst">
  <div className="pagination-info">
    {`Showing ${indexOfFirstItem + 1} to ${
      indexOfLastItem > stocks.length ? stocks.length : indexOfLastItem
    } of ${stocks.length} records`}
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
       

        <Navbar />
      </div>
    </div>
    </div>
  );
};

export default Homestockanalyst;