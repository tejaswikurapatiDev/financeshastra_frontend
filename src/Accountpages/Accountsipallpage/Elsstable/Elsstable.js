import React, { useState } from "react";
 import './Elsstable.css'
import { FaQuestionCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";


const fundsData = [
    {
        name: "Sundaram LT Tax Adv Fund-Sr III-(G)-Direct",
        category: "ELSS",
        nav: "28.14",
        aum: "36",
        returnsSinceInception: "16.4 (28 Mar '18)",
        pastReturns: { "1 Yr": "15.00", "3 Yr": "20.10", "5 Yr": "23.85" },
        avgRolling: { "1 Yr": "18.25", "3 Yr": "25.00", "5 Yr": "28.05" }
      },
      {
        name: "Sundaram LT Tax Adv Fund-Sr III-Reg(G)",
        category: "ELSS",
        nav: "27.30",
        aum: "36",
        returnsSinceInception: "15.9 (28 Mar '18)",
        pastReturns: { "1 Yr": "14.90", "3 Yr": "19.80", "5 Yr": "23.85" },
        avgRolling: { "1 Yr": "18.00", "3 Yr": "24.50", "5 Yr": "27.67" }
      },
      {
        name: "Quant ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "385.90",
        aum: "10,513",
        returnsSinceInception: "21 (07 Jan '13)",
        pastReturns: { "1 Yr": "13.50", "5 Yr": "18.70", "3 Yr": "16.96" },
        avgRolling: { "1 Yr": "20.25", "3 Yr": "23.40", "5 Yr": "24.58" }
      },
      {
        name: "Parag Parikh ELSS Tax Saver Fund(G)-Direct",
        category: "ELSS",
        nav: "32.08",
        aum: "4,385",
        returnsSinceInception: "23.7 (24 Jul '19)",
        pastReturns: { "1 Yr": "17.50", "3 Yr": "19.20", "5 Yr": "18.93" },
        avgRolling: { "1 Yr": "22.50", "3 Yr": "23.80", "5 Yr": "24.46" }
      },
      {
        name: "Parag Parikh ELSS Tax Saver Fund-Reg(G)",
        category: "ELSS",
        nav: "30.02",
        aum: "4,385",
        returnsSinceInception: "22.2 (24 Jul '19)",
        pastReturns: { "1 Yr": "17.40", "3 Yr": "19.00", "5 Yr": "18.93" },
        avgRolling: { "1 Yr": "22.00", "3 Yr": "23.30", "5 Yr": "22.91" }
      },
      {
        name: "Bank of India Midcap Tax Fund-Sr 2(G)-Direct",
        category: "ELSS",
        nav: "32.48",
        aum: "36",
        returnsSinceInception: "20.8 (19 Oct '18)",
        pastReturns: { "1 Yr": "14.70", "3 Yr": "16.80", "5 Yr": "17.07" },
        avgRolling: { "1 Yr": "20.10", "3 Yr": "21.90", "5 Yr": "22.72" }
      },
      {
        name: "Bank of India Midcap Tax Fund-Sr 1(G)-Direct",
        category: "ELSS",
        nav: "27.30",
        aum: "67",
        returnsSinceInception: "15.7 (19 Feb '18)",
        pastReturns: { "1 Yr": "14.50", "3 Yr": "16.70", "5 Yr": "17.11" },
        avgRolling: { "1 Yr": "19.90", "3 Yr": "21.70", "5 Yr": "22.61" }
      },
      {
        name: "Bank of India Midcap Tax Fund-Sr 1-Reg(G)",
        category: "ELSS",
        nav: "26.43",
        aum: "67",
        returnsSinceInception: "15.1 (19 Feb '18)",
        pastReturns: { "1 Yr": "14.30", "3 Yr": "16.50", "5 Yr": "17.11" },
        avgRolling: { "1 Yr": "19.70", "3 Yr": "21.50", "5 Yr": "22.00" }
      },
    {
        name: "Mirae Asset ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "51.55",
        aum: "25,315",
        returnsSinceInception: "19.9 (28 Dec '15)",
        pastReturns: { "1 Yr": "12.50", "3 Yr": "17.20", "5 Yr": "15.85" },
        avgRolling: { "1 Yr": "16.80", "3 Yr": "19.50", "5 Yr": "18.99" }
      },
      {
        name: "Bank of India ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "187.89",
        aum: "1,453",
        returnsSinceInception: "18.9 (01 Jan '13)",
        pastReturns: { "1 Yr": "14.30", "3 Yr": "18.20", "5 Yr": "19.74" },
        avgRolling: { "1 Yr": "18.70", "3 Yr": "19.50", "5 Yr": "18.36" }
      },
      {
        name: "DSP ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "146.84",
        aum: "16,835",
        returnsSinceInception: "18.6 (31 Dec '12)",
        pastReturns: { "1 Yr": "14.20", "3 Yr": "18.00", "5 Yr": "20.41" },
        avgRolling: { "1 Yr": "19.10", "3 Yr": "18.40", "5 Yr": "17.83" }
      },
      {
        name: "JM ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "55.02",
        aum: "186",
        returnsSinceInception: "18.5 (01 Jan '13)",
        pastReturns: { "1 Yr": "13.90", "3 Yr": "17.30", "5 Yr": "19.30" },
        avgRolling: { "1 Yr": "17.80", "3 Yr": "18.10", "5 Yr": "17.69" }
      },
      {
        name: "DSP ELSS Tax Saver Fund-Reg(G)",
        category: "ELSS",
        nav: "132.87",
        aum: "16,835",
        returnsSinceInception: "15.5 (18 Jan '07)",
        pastReturns: { "1 Yr": "13.70", "3 Yr": "17.00", "5 Yr": "20.41" },
        avgRolling: { "1 Yr": "17.50", "3 Yr": "17.90", "5 Yr": "17.56" }
      },
      {
        name: "Bank of India ELSS Tax Saver-Reg(G)",
        category: "ELSS",
        nav: "162.34",
        aum: "1,453",
        returnsSinceInception: "19.2 (26 Feb '09)",
        pastReturns: { "1 Yr": "14.20", "3 Yr": "18.10", "5 Yr": "19.74" },
        avgRolling: { "1 Yr": "18.60", "3 Yr": "19.30", "5 Yr": "17.35" }
      },
      {
        name: "Kotak Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "131.02",
        aum: "6,232",
        returnsSinceInception: "16.8 (01 Jan '13)",
        pastReturns: { "1 Yr": "12.70", "3 Yr": "16.80", "5 Yr": "18.25" },
        avgRolling: { "1 Yr": "17.20", "3 Yr": "18.60", "5 Yr": "17.24" }
      },
      {
        name: "JM ELSS Tax Saver Fund(G)",
        category: "ELSS",
        nav: "48.49",
        aum: "186",
        returnsSinceInception: "31.9 (03 Mar '08)",
        pastReturns: { "1 Yr": "13.40", "3 Yr": "17.10", "5 Yr": "19.30" },
        avgRolling: { "1 Yr": "17.60", "3 Yr": "18.00", "5 Yr": "17.03" }
      },
      {
        name: "Canara Rob ELSS Tax Saver(G)-Direct Plan",
        category: "ELSS",
        nav: "37.09",
        aum: "8,696",
        returnsSinceInception: "16.5 (01 Jan '13)",
        pastReturns: { "1 Yr": "11.90", "3 Yr": "14.70", "5 Yr": "13.21" },
        avgRolling: { "1 Yr": "15.80", "3 Yr": "16.20", "5 Yr": "16.40" }
      },
      {
        name: "Kotak ELSS Tax Saver Fund(G)-Direct Plan",
        category: "ELSS",
        nav: "112.50",
        aum: "6,232",
        returnsSinceInception: "13.5 (23 Nov '06)",
        pastReturns: { "1 Yr": "12.10", "3 Yr": "15.60", "5 Yr": "18.25" },
        avgRolling: { "1 Yr": "16.10", "3 Yr": "17.10", "5 Yr": "16.21" }
      }
    
    ];

    const ElssTable = () => {
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
              <h2>Best ELSS Mutual Funds 2025</h2>
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
      
      export default ElssTable;
      