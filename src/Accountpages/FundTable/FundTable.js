import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import "./FundTable.css"; 
import { FaQuestionCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const fundsData = [
    {
        name: "Aditya Birla SL PSU Equity Fund(G)-Direct Plan",
        category: "Equity - Thematic Fund - Other",
        nav: "33.84",
        aum: "5,237",
        returnsSinceInception: "27.4 (30 Dec '19)",
        pastReturns: { "1 Yr": "15.20", "3 Yr": "32.73", "5 Yr": "40.12" },
        avgRolling: { "1 Yr": "20.55", "3 Yr": "37.33", "5 Yr": "45.67" },
      },
      {
        name: "Bank of India Small Cap Fund(G)-Direct Plan",
        category: "Equity - Small Cap Fund",
        nav: "53.96",
        aum: "1,613",
        returnsSinceInception: "32 (19 Dec '18)",
        pastReturns: { "1 Yr": "18.90", "3 Yr": "25.71", "5 Yr": "30.45" },
        avgRolling: { "1 Yr": "25.00", "3 Yr": "35.49", "5 Yr": "42.10" },
      },
      {
        name: "ICICI Pru Commodities Fund(G)-Direct Plan",
        category: "Equity - Thematic Fund - Other",
        nav: "40.90",
        aum: "2,399",
        returnsSinceInception: "30.8 (15 Oct '19)",
        pastReturns: { "1 Yr": "12.40", "3 Yr": "19.83", "5 Yr": "27.80" },
        avgRolling: { "1 Yr": "18.30", "3 Yr": "35.27", "5 Yr": "40.90" },
      },
      {
        name: "Tata Digital India Fund(G)-Direct Plan",
        category: "Equity - Sectoral Fund - Technology",
        nav: "62.15",
        aum: "12,963",
        returnsSinceInception: "22.4 (28 Dec '16)",
        pastReturns: { "1 Yr": "9.74", "3 Yr": "24.84", "5 Yr": "33.50" },
        avgRolling: { "1 Yr": "14.22", "3 Yr": "30.15", "5 Yr": "40.78" },
      },
      {
        name: "HDFC Infrastructure Fund(G)-Direct Plan",
        category: "Equity - Thematic Fund - Infrastructure",
        nav: "27.45",
        aum: "1,425",
        returnsSinceInception: "21.2 (07 Mar '17)",
        pastReturns: { "1 Yr": "13.30", "3 Yr": "20.10", "5 Yr": "25.40" },
        avgRolling: { "1 Yr": "18.75", "3 Yr": "27.90", "5 Yr": "35.80" },
      },
      {
        name: "Kotak Emerging Equity Fund(G)-Direct Plan",
        category: "Equity - Mid Cap Fund",
        nav: "65.32",
        aum: "19,213",
        returnsSinceInception: "29.5 (10 May '17)",
        pastReturns: { "1 Yr": "22.50", "3 Yr": "28.90", "5 Yr": "36.15" },
        avgRolling: { "1 Yr": "26.40", "3 Yr": "35.55", "5 Yr": "43.30" },
      },
      {
        name: "Franklin India Bluechip Fund(G)-Direct Plan",
        category: "Equity - Large Cap Fund",
        nav: "78.90",
        aum: "9,876",
        returnsSinceInception: "31.8 (15 Aug '16)",
        pastReturns: { "1 Yr": "20.70", "3 Yr": "27.45", "5 Yr": "34.60" },
        avgRolling: { "1 Yr": "24.50", "3 Yr": "33.90", "5 Yr": "41.20" },
      },
      {
        name: "SBI Small Cap Fund(G)-Direct Plan",
        category: "Equity - Small Cap Fund",
        nav: "115.34",
        aum: "37,582",
        returnsSinceInception: "28.2 (22 Dec '14)",
        pastReturns: { "1 Yr": "26.80", "3 Yr": "32.95", "5 Yr": "41.30" },
        avgRolling: { "1 Yr": "30.45", "3 Yr": "38.75", "5 Yr": "47.60" },
      },
      {
        name: "DSP Tax Saver Fund(G)-Direct Plan",
        category: "Equity - ELSS Fund",
        nav: "48.90",
        aum: "6,854",
        returnsSinceInception: "24.9 (01 Jan '15)",
        pastReturns: { "1 Yr": "19.40", "3 Yr": "26.10", "5 Yr": "33.80" },
        avgRolling: { "1 Yr": "22.90", "3 Yr": "30.50", "5 Yr": "39.10" },
      },
      {
        name: "Axis Long Term Equity Fund(G)-Direct Plan",
        category: "Equity - ELSS Fund",
        nav: "79.65",
        aum: "15,842",
        returnsSinceInception: "18.6 (01 Mar '08)",
        pastReturns: { "1 Yr": "17.20", "3 Yr": "22.10", "5 Yr": "28.50" },
        avgRolling: { "1 Yr": "20.10", "3 Yr": "26.90", "5 Yr": "34.10" }
      },
      {
        name: "Nippon India Small Cap Fund(G)-Direct Plan",
        category: "Equity - Small Cap Fund",
        nav: "89.78",
        aum: "9,345",
        returnsSinceInception: "34.5 (15 Dec '13)",
        pastReturns: { "1 Yr": "21.50", "3 Yr": "34.10", "5 Yr": "45.30" },
        avgRolling: { "1 Yr": "29.80", "3 Yr": "41.20", "5 Yr": "50.90" }
      },
      {
        name: "Mirae Asset Emerging Bluechip Fund(G)-Direct Plan",
        category: "Equity - Mid Cap Fund",
        nav: "56.34",
        aum: "14,215",
        returnsSinceInception: "29.3 (13 Jan '09)",
        pastReturns: { "1 Yr": "23.10", "3 Yr": "31.50", "5 Yr": "41.70" },
        avgRolling: { "1 Yr": "27.20", "3 Yr": "38.40", "5 Yr": "46.80" }
      },
      {
        name: "Aditya Birla SL Frontline Equity Fund(G)-Direct Plan",
        category: "Equity - Large Cap Fund",
        nav: "102.75",
        aum: "11,100",
        returnsSinceInception: "18.9 (10 Feb '02)",
        pastReturns: { "1 Yr": "19.00", "3 Yr": "24.50", "5 Yr": "30.80" },
        avgRolling: { "1 Yr": "22.30", "3 Yr": "30.10", "5 Yr": "37.90" }
      },
      {
        name: "UTI Nifty Index Fund(G)-Direct Plan",
        category: "Equity - Index Fund",
        nav: "56.94",
        aum: "8,015",
        returnsSinceInception: "11.2 (02 Apr '13)",
        pastReturns: { "1 Yr": "17.80", "3 Yr": "19.90", "5 Yr": "25.60" },
        avgRolling: { "1 Yr": "19.60", "3 Yr": "26.20", "5 Yr": "34.10" }
      },
      {
        name: "ICICI Pru Focused Bluechip Fund(G)-Direct Plan",
        category: "Equity - Large Cap Fund",
        nav: "119.78",
        aum: "10,643",
        returnsSinceInception: "25.8 (05 Feb '10)",
        pastReturns: { "1 Yr": "15.30", "3 Yr": "22.90", "5 Yr": "30.00" },
        avgRolling: { "1 Yr": "19.50", "3 Yr": "28.70", "5 Yr": "35.40" }
      },
      {
        name: "Franklin India Smaller Companies Fund(G)-Direct Plan",
        category: "Equity - Small Cap Fund",
        nav: "92.15",
        aum: "7,920",
        returnsSinceInception: "28.4 (15 Jul '11)",
        pastReturns: { "1 Yr": "18.20", "3 Yr": "25.60", "5 Yr": "33.10" },
        avgRolling: { "1 Yr": "22.50", "3 Yr": "31.30", "5 Yr": "39.50" }
      },
      {
        name: "Mirae Asset Tax Saver Fund(G)-Direct Plan",
        category: "Equity - ELSS Fund",
        nav: "58.20",
        aum: "5,677",
        returnsSinceInception: "21.1 (01 Apr '13)",
        pastReturns: { "1 Yr": "16.80", "3 Yr": "23.50", "5 Yr": "29.60" },
        avgRolling: { "1 Yr": "20.40", "3 Yr": "27.20", "5 Yr": "34.70" }
      },
      {
        name: "HDFC Equity Fund(G)-Direct Plan",
        category: "Equity - Large Cap Fund",
        nav: "110.65",
        aum: "16,573",
        returnsSinceInception: "20.3 (15 Feb '04)",
        pastReturns: { "1 Yr": "19.90", "3 Yr": "24.60", "5 Yr": "31.40" },
        avgRolling: { "1 Yr": "23.50", "3 Yr": "32.10", "5 Yr": "39.00" }
      },
      {
        name: "ICICI Pru Bluechip Fund(G)-Direct Plan",
        category: "Equity - Large Cap Fund",
        nav: "125.78",
        aum: "12,471",
        returnsSinceInception: "27.6 (13 Oct '04)",
        pastReturns: { "1 Yr": "18.90", "3 Yr": "23.80", "5 Yr": "30.20" },
        avgRolling: { "1 Yr": "21.90", "3 Yr": "28.60", "5 Yr": "36.50" }
      }
    ];

const FundTable = () => {
  const [selectedReturn, setSelectedReturn] = useState("3 Yr");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 7 rows per page
  
  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = fundsData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(fundsData.length / itemsPerPage);
  
  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
    <div className="fund-table-container">
      {/* Header with Dropdown */}
      <div className="fund-table-header">
        <h2>Best Mutual Funds to Invest in 2025</h2>
        {/* Return Dropdown */}
       
      </div>

      {/* Table */}
      <table className="fund-table">
      <div className="select-containerfuncalculator">
        <div className="spanreturnfunddiv">
          <span>Returns</span></div>
          <div className="spanreturnfund">
          <select
            className="select-box"
            value={selectedReturn}
            onChange={(e) => setSelectedReturn(e.target.value)}
          >
            <option>1 Yr</option>
            <option>3 Yr</option>
            <option>5 Yr</option>
          </select>
          </div>
        </div>
        <thead>
          <tr>
        
            <th>Fund Name</th>
            <th>Category</th>
            <th>NAV (Rs.)</th>
            <th>AUM (Cr.)</th>
            <th>Returns Since Inception (%)</th>
            <th>Past Returns</th>
            <th>Avg Rolling</th>
            <th>Fund DeciZen <FaQuestionCircle  className="quefundcircle"/><br />
              
            </th>
          </tr>
        </thead>
        <tbody>
          {currentStocks.map((fund, index) => (
            <tr key={index}>
              <td>{fund.name}</td>
              <td>{fund.category}</td>
              <td>{fund.nav}</td>
              <td>{fund.aum}</td>
              <td>{fund.returnsSinceInception}</td>
              <td>{fund.pastReturns[selectedReturn]}</td>
              <td>{fund.avgRolling[selectedReturn]}</td>
              <td className="text-center">
               <button className="screener-unlock-btn" >
                       <IoLockClosedOutline style={{ marginRight: '8px' }} />
                     <span className="button-text">Unlock</span>
                   </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-containerfundtable">
  <div className="pagination-info">
    {`Showing ${indexOfFirstItem + 1} to ${
      indexOfLastItem > fundsData.length ? fundsData.length : indexOfLastItem
    } of ${fundsData.length} records`}
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
<Navbar/>
</div>
<div className="foooterpagesatt">
    <FooterForAllPage />
  </div>
    </div>
  );
};

export default FundTable;
