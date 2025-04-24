import React, { useState, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Line } from "recharts";
import Navbar from "../../Navbar/Navbar";
import Mutualportfoliodonut from "../Mutualportfoliodonut/Mutualportfoliodonut";
import { PortfolioMutualsContext } from "../context/PortfolioMutualsContext";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import Cookies from 'js-cookie'

const MutualAccountStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("transaction");

  const { mutualTransactions, setMutualTransactions } = useContext(PortfolioMutualsContext)
  const [expandedRows, setExpandedRows] = useState(() => ({}));
  console.log("Trans data: ", mutualTransactions)
  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    location.pathname === "/portfoliostockaccount"
  );

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Handlers
  const handleEdit = (transaction) => {
    navigate("/stockupdate", { state: { transaction } });
  };

  const handleAddMutual = () => {
    navigate('/addTransactionmutual')
  }

  const handleDeleteIconClick = (transaction) => {
    console.log("delete trans", transaction)
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    const token = Cookies.get("jwtToken")
    if (!transactionToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/myportfolio/DeleteMutualTransactions/${transactionToDelete.scheme}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("delete id", transactionToDelete.scheme)

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Update state after successful deletion
      setMutualTransactions((prev) => prev.filter((txn) => txn.id !== transactionToDelete.scheme));

      // Reset state
      setShowPopup(false);
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };


  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = (stock_name) => {
    setExpandedRows((prev) => ({ ...prev, [stock_name]: !prev[stock_name] }));
  };

  // Handle updates from navigation state
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setMutualTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]);

  const total_investment = mutualTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)

  const labels = [
    "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm"
  ];

  // Intraday chart options configuration
  const intradayOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `Price: ₹${context.raw}`, // Custom tooltip format
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: "#666", // Label color for X-axis
        },
      },
      y: {
        beginAtZero: false, // No need to start from zero
        ticks: {
          color: "#666", // Label color for Y-axis
        },
        grid: {
          borderDash: [5], // Dashed grid lines for readability
        },
      },
    },
  };

  // Simulating an up and down trend in the dataset
  const dataset = [
    300, 305, 295, 290, 296, 300, 305, 295, 300, 302 // Fluctuating values
  ];

  const borderColor = "#90EE90";  // Light Green color for the line (representing volatility)
  const backgroundColor = "rgba(144, 238, 144, 0.2)";  // Light Green background fill for the chart

  // Intraday chart data configuration
  const intradayData = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: dataset, // Fluctuating data (up and down)
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true, // Fill under the line for better visualization
        tension: 0.4, // Smooth curve for gradual transitions
        pointRadius: 3, // Small dots on the line
        borderWidth: 2, // Thicker line for better visibility
      },
    ],
  };

  return (
    <div>
      <Mutualportfoliodonut total_investment={total_investment} />
      <div className="portfolio-account-stock-container">
        {/* Header Section */}
        <div className="portfolio-account-stock-header">
          <h2 className="portfolio-account-stock-title">My Accounts</h2>
          <div className="portfolio-account-stock-controls">
            <div className="portfolio-account-stock-filters">
              <span className="filter-label">FILTER:</span>
              <button className="filter-button">All</button>
              <button className="filter-button">Gainers</button>
              <button className="filter-button">Losers</button>
            </div>
            <div className="portfolio-account-stock-actions-container">
              <div className="portfolio-account-stock-actions">
                <button className="add-transaction-button" onClick={() => handleAddMutual()}>+ Add Transaction</button>
                <button className="my-alerts-button">My Alerts</button>
              </div>
              <div className="portfolio-account-stock-group">
                <label>
                  Group By:
                  <input
                    type="radio"
                    name="groupBy"
                    value="none"
                    defaultChecked
                    onClick={() => navigate("/mutualnone")}
                  />{" "}
                  None
                  <input
                    type="radio"
                    name="groupBy"
                    value="sector"
                    onClick={() => navigate("/mutualsector")}
                  />{" "}
                  AMC
                  <input
                    type="radio"
                    name="groupBy"
                    value="mcap"
                    onClick={() => navigate("/mutualtype")}
                  />{" "}
                  Types of Funds
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Stock Table */}
        <table className="portfolio-account-stock-table">
          <thead>
            <tr>
              <th>Stocks Name</th>
              <th>Live Price<br />Weight (%)</th>
              <th>Day's Gain<br />Weight (%)</th>
              <th>Quantity<br />Per Unit Cost</th>
              <th>Investment Cost<br />Weight (%)</th>
              <th>Latest Value<br />Weight (%)</th>
              <th>Unrealized Gain<br />Change (%)</th>
              <th>Realized Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {mutualTransactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="stock-name">
                    <span className="dropdown-icon" onClick={() => toggleDropdown(transaction.scheme)}>
                      <FontAwesomeIcon icon={expandedRows[transaction.scheme] ? faCaretDown : faCaretUp} />
                    </span>
                    {transaction.scheme}
                    <span className="stock-actions">
                      <span className="action-text" onClick={() => { handleAddMutual() }}>Add | Sell</span>
                      <span className="trash-icon">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleDeleteIconClick(transaction)}
                        />
                      </span>
                    </span>
                  </td>
                  <td className="negative">291.40<br />-0.12</td>
                  <td className="negative">-0.48<br />-0.04%</td>
                  <td>{transaction.buy_quantity}</td>
                  <td>{transaction.amount}</td>
                  <td>1,165.60</td>
                  <td className="negative">-4<br />-0.38%</td>
                  <td>
                    {transaction.sell_price != 0 && transaction.sell_quantity != 0 ?
                      ((transaction.sell_price - transaction.buy_price) * transaction.buy_quantity).toFixed(2)
                      : 0}
                  </td>
                </tr>

                {/* Subcategory Row */}
                {expandedRows[transaction.scheme] && (
                  <>
                    <tr>
                      <td colSpan="8" className="subcategory-row">
                        <table className="subcategory-table">
                          <thead>
                            <tr>
                              <th className={`hover-effect ${activeTab === "transaction" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}
                                onClick={() => setActiveTab("transaction")}
                              >
                                <span>Transaction History</span>
                              </th>
                              <th className={`hover-effect ${activeTab === "overview" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}
                                onClick={() => setActiveTab("overview")}
                              >
                                <span>Overview</span>
                              </th>
                              <th className={`hover-effect ${activeTab === "performance" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}
                                onClick={() => setActiveTab("performance")}
                              >
                                <span>Fundamentals</span>
                              </th>

                            </tr>
                          </thead>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8" className="subcategory-row">
                        {activeTab === 'transaction' && (
                          <table className="subcategory-table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Net Amount</th>
                                <th>Realized Gain/Loss</th>
                                <th>Holding Balance</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mutualTransactions
                                .filter((txn) => txn.scheme === transaction.scheme)
                                .map((txn) => (
                                  <tr key={txn.id}>
                                    <td>{new Date(txn.nav_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                    <td>{txn.type}</td>
                                    <td>{txn.buy_quantity}</td>
                                    <td>{txn.amount}</td>
                                    <td>{txn.amount}</td>
                                    <td>{txn.realizedGainLoss}</td>
                                    <td>{txn.holdingBalance}</td>
                                    <td>
                                      <span className="icon-container">
                                        <FaEdit
                                          className="edit-icon"
                                          onClick={() => handleEdit(txn)}
                                        />
                                        <FontAwesomeIcon
                                          icon={faTrashAlt}
                                          className="delete-icon"
                                          onClick={() => handleDeleteIconClick(txn)}
                                        />
                                        <BiPlusCircle className="add-icon" onClick={() => { handleAddMutual() }} />
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                        {activeTab === "overview" && (
                          <div className="portfolio-manager-container">
                            <div className="portfolio-market-data">
                              <div className="market-data-container">
                                <div className="market-data-header">
                                  <h3 className="portheadmanager" style={{ margin: 0, borderRadius: "8px 8px 0 0" }}>
                                    Market Data
                                  </h3>
                                </div>
                                <div className="market-data-content">
                                  <div className="market-data-row">
                                    <span>Bid (Qty):</span>
                                    <span>0 (0)</span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>Ask (Qty):</span>
                                    <span>292.18 (56,744)</span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>Total B/S:</span>
                                    <span>-</span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>Volume:</span>
                                    <span>130.41 L</span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>Today's O/C:</span>
                                    <span>298.00 / 291.40</span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>Today's H/L:</span>
                                    <span>301.80 / <span className="highlight-red">287.65</span></span>
                                  </div>
                                  <div className="market-data-row">
                                    <span>52 WK H / L:</span>
                                    <span>384.30 / <span className="highlight-red">210.00</span></span>
                                  </div>
                                </div>
                              </div>

                              {/* Intraday Stock Trading Graph Section */}
                              <div className="chart-containerportfolio">
                                <h3 style={{ marginLeft: "50px" }}>Intraday Chart</h3>
                                <div className="chart-wrapper">
                                  <Line data={intradayData} options={intradayOptions} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "performance" && (
                          <table className="subcategory-table">
                            <thead>
                              {/* Column Headers */}
                              <tr>
                                <th>Particulars</th>
                                <th>Absolute Value (Cr)</th>
                                <th>QoQ Chg</th>
                                <th>YoY Chg</th>
                                <th>2 Y Chg</th>
                                <th>3 Y Chg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Sales</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Total Revenue</td>
                                <td>1016.20</td>
                                <td>95.43</td>
                                <td>312.3</td>
                                <td>414.4</td>
                                <td>42.32</td>
                              </tr>
                              <tr>
                                <td>Operating Profit</td>
                                <td>-22.31</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>Other Income</td>
                                <td>14.67</td>
                                <td>-2.46</td>
                                <td>52.65</td>
                                <td>40.25</td>
                                <td>12.37</td>
                              </tr>
                              <tr>
                                <td>Interest</td>
                                <td>61.65</td>
                                <td>15.82</td>
                                <td>-11.17</td>
                                <td>22.8</td>
                                <td>11.05</td>
                              </tr>
                              <tr>
                                <td>Tax</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>PAT</td>
                                <td>-70.11</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>EPS (Basic)</td>
                                <td>-0.73</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>

                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Delete All Transactions</h3>
              <p>Do you want to start fresh and clear all transactions and SIPs for all accounts?</p>
              <div className="popup-buttons">
                <button className="yes-button" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="no-button" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default MutualAccountStock;
