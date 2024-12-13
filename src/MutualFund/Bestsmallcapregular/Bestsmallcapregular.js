import { fundsmallData } from "../fundsmallData"; // Adjust the path if necessary
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";


const Bestsmallcapregular = () => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Sort function
  const sortedData = () => {
    if (!sortConfig.key) return fundsmallData ;

    const sorted = [...fundsmallData ];
    sorted.sort((a, b) => {
      const aValue = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
      const bValue = parseFloat(b[sortConfig.key]) || b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
    return sorted;
  };


  // Handle sort toggle
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortIcons = (key) => {
    const isActive = sortConfig.key === key;
    const isAscending = isActive && sortConfig.direction === "asc";
    const isDescending = isActive && sortConfig.direction === "desc";
  // Render sort icons based on sortConfig
 
    return (
      <span className="sort-icons">
        <FaCaretUp className={isAscending ? "active" : "inactive"} />
        <FaCaretDown className={isDescending ? "active" : "inactive"} />
      </span>
    );
  };

  const sortedFunds = sortedData();

  return (
    <div>
      <Navbar />
      <div className="funds-table-container">
        <div className="funds-header">
          <h2 className="funds-table-title">Best small cap Fund</h2>
          <div className="button-container">
            <button
              className="fund-button regular"
              style={{ backgroundColor: "#24b676", color: "white"}}
              onClick={() => navigate("/bestsmallcapregular")}
            >
              Regular
            </button>
            <button
              className="fund-button direct"
              style={{ backgroundColor: "white", color: "black"  }}
              onClick={() => navigate("/Bestsmallcapdirect")}
            >
              Direct
            </button>
          </div>
        </div>

        <p className="funds-table-description">
          Looking for the best mutual funds to build your wealth? At Value
          Research, we’ve simplified the process for you. Our detailed guide to
          top-performing mutual funds across <br />different categories helps you
          identify options that suit your financial objectives.
        </p>

        <div className="table-wrapper">
        <table className="funds-table">
          <thead>
            <tr className="funds-table-header">
              <th onClick={() => handleSort("name")}>
                Funds 
              </th>
              
              <th onClick={() => handleSort("nav")}>
                NAV (₹) {renderSortIcons("nav")}
              </th>
              <th onClick={() => handleSort("aum")}>
                AUM (Cr) {renderSortIcons("aum")}
              </th>
              <th onClick={() => handleSort("sip")}>
                SIP Amount {renderSortIcons("sip")}
              </th>
              <th onClick={() => handleSort("expRatio")}>
                Exp. Ratio % {renderSortIcons("expRatio")}
              </th>
              <th onClick={() => handleSort("returns")}>
                1Y (%) {renderSortIcons("returns")}
              </th>
              <th onClick={() => handleSort("returns")}>
                3Y (%) {renderSortIcons("returns")}
              </th>
              <th onClick={() => handleSort("returns")}>
                5Y (%) {renderSortIcons("returns")}
              </th>
              </tr>
            </thead>
            <tbody>
              {sortedFunds.map((fund, idx) => (
               <tr key={idx} className="funds-table-row">
               <td>
                 {fund.url ? (
                   <a href={fund.url} target="_blank" rel="noopener noreferrer" className="fund-name-link">
                     {fund.name}
                   </a>
                 ) : (
                   <Link to="/mutualfundgrowth" className="fund-name-link">
                     {fund.name}
                   </Link>
                 )}
               </td>
              
               <td>{fund.nav}</td>
               <td>{fund.aum}</td>
               <td>{fund.sip}</td>
               <td>{fund.expRatio}</td>
               <td>{fund.returns["1Y"]}</td>
               <td>{fund.returns["3Y"]}</td>
               <td>{fund.returns["5Y"]}</td>
             </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bestsmallcapregular;