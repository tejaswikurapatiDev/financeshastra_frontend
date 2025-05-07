import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import useMutualFunds from "../Hooks/useMutualFunds";
import Fundscreenerdirect from "../Fundscreenerdirect/Fundscreenerdirect";
import Meta from "../../Meta";
import { useLocation } from "react-router-dom";

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

const Fundscreenerregular = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allFunds, loading, error } = useMutualFunds(); // Use the custom hook
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [activetab, setactivetab] = useState('regular')
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil((allFunds?.length || 0) / recordsPerPage));


  // Sort function
  const sortedData = () => {
    if (!sortConfig.key) return allFunds;

    const sorted = [...allFunds];
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
  const indexOfFirstItem = (currentPage - 1) * recordsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + recordsPerPage, allFunds.length);
  const currentData = sortedData().slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div>
      <Meta path={location.pathname} />
      <Navbar />
      <div className="funds-table-container">
        <div className="funds-header">
          <h2 className="funds-table-title">Mutual Funds</h2>
          <div className="topfundbutton-container">
            <button
              className="fund-button regular"
              style={activetab === "regular" ? { backgroundColor: "#24b676", color: "white" } : { backgroundColor: "white", color: "black" }}
              onClick={() => setactivetab("regular")}
            >
              Regular
            </button>
            <button
              className="fund-button direct"
              style={activetab === "direct" ? { backgroundColor: "#24b676", color: "white" } : { backgroundColor: "white", color: "black" }}
              onClick={() => setactivetab("direct")}
            >
              Direct
            </button>
          </div>
        </div>

        <p className="funds-table-description">
          Looking for the best mutual funds to build your wealth? At Value
          Research, we’ve simplified the process for you. Our detailed guide to
          top-performing mutual funds across <br />
          different categories helps you identify options that suit your
          financial objectives.
        </p>
        {activetab === "regular" ? <div>
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
                  {currentData.map((fund) => (
                    <tr key={fund.FundID} className="funds-table-row">
                      <td>
                        {fund.url ? (
                          <a
                            href={fund.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fund-name-link"
                          >
                            {fund.FundName}
                          </a>
                        ) : (
                          <Link to="/mutualfundgrowth" className="fund-name-link">
                            {fund.FundName}
                          </Link>
                        )}
                      </td>
                      <td>{fund.Rating.split(" ")[0]} ★</td>
                      <td>{fund.Riskometer}</td>
                      <td>{fund.NAV_Regular ? `₹${fund.NAV_Regular}` : "N/A"}</td>
                      <td>{`₹${fund.AUM} Cr`}</td>
                      <td>{`₹${fund.SIPAmount}`}</td>
                      <td>{`${fund.ExpenseRatio}%`}</td>
                      <td>
                        {fund.OneYearReturn ? `${fund.OneYearReturn}%` : "N/A"}
                      </td>
                      <td>
                        {fund.ThreeYearReturn
                          ? `${fund.ThreeYearReturn}%`
                          : "N/A"}
                      </td>
                      <td>
                        {fund.FiveYearReturn ? `${fund.FiveYearReturn}%` : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-topratedcontainer">
                <div className="pagination-topratedwrapper">
                  <div className="pagination-topratedinfo">
                    {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${allFunds.length} records`}
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

        </div> : <Fundscreenerdirect />}
      </div>

      <FooterForAllPage />
    </div>
  );
};
export default Fundscreenerregular;
