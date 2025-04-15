import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./TopRatedFunds.css";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import useTopRatedFunds from "../Hooks/useTopRatedFunds";

const headers = [
  { key: "FundName", label: "Funds" },
  { key: "Rating", label: "Rating" },
  { key: "Riskometer", label: "Riskometer" },
  { key: "NAV", label: "NAV (₹)" },
  { key: "AUM", label: "AUM (Cr)" },
  { key: "SIPAmount", label: "SIP Amount" },
  { key: "ExpenseRatio", label: "Exp. Ratio %" },
  { key: "OneYearReturn", label: "1Y (%)" },
  { key: "ThreeYearReturn", label: "3Y (%)" },
  { key: "FiveYearReturn", label: "5Y (%)" },
];


const TopRatedFunds = () => {
  const navigate = useNavigate();
  const { topRatedFunds, loading, error } = useTopRatedFunds();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(topRatedFunds.length / recordsPerPage);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return topRatedFunds;
    return [...topRatedFunds].sort((a, b) => {
      const aValue = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
      const bValue = parseFloat(b[sortConfig.key]) || b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [sortConfig, topRatedFunds]);

  const indexOfFirstItem = (currentPage - 1) * recordsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + recordsPerPage, topRatedFunds.length);
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderSortIcons = (key) => {
    const isActive = sortConfig.key === key;
    const isAscending = isActive && sortConfig.direction === "asc";
    const isDescending = isActive && sortConfig.direction === "desc";

    return (
      <span className="sort-icons">
      <FaCaretUp className={`icon-up ${isAscending ? "active" : "inactive"}`} />
      <FaCaretDown className={`icon-down ${isDescending ? "active" : "inactive"}`} />
    </span>
    
    );
  };

  return (
    <div>
      <Navbar />
      <div className="funds-table-container">
        <div className="funds-header">
          <h2 className="funds-table-title">Top Rated Funds</h2>
          <div className="topfundbutton-container">
            <button
              className="fund-button regular"
              style={{ backgroundColor: "#24b676", color: "white" }}
              onClick={() => navigate("/mutualfund")}
            >
              Regular
            </button>
            <button
              className="fund-button direct"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => navigate("/mutualfunddirect")}
            >
              Direct
            </button>
          </div>
        </div>

        <p className="funds-table-description">
          Looking for the best mutual funds to build your wealth? At Value
          Research, we’ve simplified the process for you. Our detailed guide to
          top-performing mutual funds across different categories helps you
          identify options that suit your financial objectives.
        </p>

        {loading ? (
          <div className="spinner"></div>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : (
          <div className="table-wrapper">
            <table className="funds-table">
              <thead>
                <tr className="funds-table-header">
                  {headers.map(({ key, label }) => (
                    <th key={key} onClick={() => handleSort(key)}>
                      {label} {renderSortIcons(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((fund, index) => (
                  <tr key={index} className="funds-table-row">
                    <td>
                      <Link to={`/mutualfundgrowth/${fund.fund_id}`} className="fund-name-link">
                        {fund.name}
                      </Link>
                    </td>
                    <td>{fund.rating}★</td>
                    <td>{fund.riskometer}</td>
                    <td>{fund.nav ? `₹${fund.nav}` : "N/A"}</td>
                    <td>{`₹${fund.current_aum_cr} Cr`}</td>
                    <td>{`₹${fund.min_sip}`}</td>
                    <td>{`${fund.expense_ratio}%`}</td>
                    <td>{fund.return_1_year ? `${fund.return_1_year}%` : "N/A"}</td>
                    <td>{fund.return_3_years ? `${fund.return_3_years}%` : "N/A"}</td>
                    <td>{fund.return_5_years ? `${fund.return_5_years}%` : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
            <div className="pagination-topratedcontainer">
            <div className="pagination-topratedwrapper">
            <div className="pagination-topratedinfo">
              {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${topRatedFunds.length} records`}
            </div>
            <div className="pagination-topratedcontainer-buttons">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? "active" : ""}>{i + 1}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterForAllPage />
    </div>
  );
};

export default TopRatedFunds;