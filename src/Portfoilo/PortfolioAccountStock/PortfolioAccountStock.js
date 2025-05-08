import React, { useState, useEffect, useContext } from "react";
import "./PortfolioAccountStock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Portfoliodonut from "../Portfoliodonut/Portfoliodonut";
import Navbar from "../../Navbar/Navbar";
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../../config";
import { Line } from "react-chartjs-2";
import { PortfolioStocksContext } from "../context/PortfolioStocksContext";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { current } from "@reduxjs/toolkit";

const PortfolioAccountStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("transaction");

  const [expandedRows, setExpandedRows] = useState(() => ({}));
  const { stockTransactions, setStockTransactions } = useContext(PortfolioStocksContext);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleAddTransaction = () => {
    navigate("/stockadd");
  }

  const handleEdit = (transaction) => {
    navigate("/stockupdate", { state: { transaction } });
  };

  const handleDeleteIconClick = (transaction) => {
    console.log(transaction)
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;
    const token = Cookies.get("jwtToken")

    try {
      await fetch(`${API_BASE_URL}/myportfolio/DeletestockTransactions/${transactionToDelete.stock_name}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setStockTransactions((prev) => prev.filter((txn) => txn.id !== transactionToDelete.id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    } finally {
      setShowPopup(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = (stock_name) => {
    setExpandedRows((prev) => ({ ...prev, [stock_name]: !prev[stock_name] }));
  };


  // Update the transactions if coming back from the Edit page
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setStockTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]);

  const total_investment = stockTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)

  // Example chart data for stock price
  const data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Stock Price',
        data: [291, 292, 293, 290, 291],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Labels for the time intervals
  const labels = [
    "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm"
  ];

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

  return (
    <div>
      <Portfoliodonut total_investment={total_investment} />
      <div className="portfolio-account-stock-container">
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
                <button className="add-transaction-button" onClick={() => handleAddTransaction()}>
                  + Add Transaction
                </button>
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
                    onClick={() => navigate("/portfolio-management-stocks")}
                  />{" "}
                  None
                  <input
                    type="radio"
                    name="groupBy"
                    value="sector"
                    onClick={() => navigate("/stocksector")}
                  />{" "}
                  Sector
                  <input
                    type="radio"
                    name="groupBy"
                    value="mcap"
                    onClick={() => navigate("/stockmcap")}
                  />{" "}
                  M-Cap
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
            {stockTransactions.map((transaction, index) => (
              <React.Fragment key={index}>
                {/* Main Stock Row */}
                <tr>
                  <td className="stock-name">
                    <span className="dropdown-icon" onClick={() => toggleDropdown(transaction.stock_name)}>
                      <FontAwesomeIcon icon={expandedRows[transaction.stock_name] ? faCaretDown : faCaretUp} />
                    </span>
                    {transaction.stock_name}
                    <span className="stock-actions">
                      <span className="action-text" onClick={() => handleAddTransaction()}>Add | Sell</span>
                      <span className="trash-icon">
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteIconClick(transaction)} />
                      </span>
                    </span>
                  </td>
                  <td className="negative">291.40<br />-0.12</td>
                  <td className="negative">-0.48(-0.04%)</td>
                  <td>{Number(transaction.buy_quantity)}</td>
                  <td>{transaction.amount}</td>
                  <td>1,165.60</td>
                  <td className="negative">-4(-0.38%)</td>
                  <td>{transaction.sell_price != 0 && transaction.sell_quantity != 0 ?
                    ((transaction.sell_price - transaction.buy_price) * transaction.buy_quantity).toFixed(2)
                    : 0}
                  </td>
                </tr>

                {/* Expanded Subcategory Row */}
                {expandedRows[transaction.stock_name] && (
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
                              <th className={`hover-effect ${activeTab === "fundamentals" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}
                                onClick={() => setActiveTab("fundamentals")}
                              >
                                <span>Fundamentals</span>
                              </th>
                              <th className={`hover-effect ${activeTab === "alerts" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderRight: '1px solid #ccc', padding: '10px' }}
                                onClick={() => setActiveTab("alerts")}
                              >
                                <span>Alerts</span>
                              </th>
                              <th className={`hover-effect ${activeTab === "returns" ? "active-tab" : ""}`}
                                style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', padding: '10px' }}
                                onClick={() => setActiveTab("returns")}
                              >
                                <span>Returns</span>
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8" className="subcategory-row">
                        {activeTab === "transaction" && (
                          <table className="subcategory-table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Charges</th>
                                <th>Net Amount</th>
                                <th>Realized Gain/Loss</th>
                                <th>Holding Balance</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stockTransactions
                                .filter((txn) => txn.stock_name === transaction.stock_name)
                                .map((txn) => (
                                  <tr key={txn.id}>
                                    <td>{new Date(txn.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                    <td>{txn.type}</td>
                                    <td>{Number(txn.buy_quantity)}</td>
                                    <td>{txn.amount}</td>
                                    <td>{txn.total_charges}</td>
                                    <td>{txn.net_amount}</td>
                                    <td>
                                      {txn.sell_price != 0 && txn.sell_quantity != 0
                                        ? ((txn.sell_price - txn.buy_price) * txn.buy_quantity).toFixed(2)
                                        : 0}
                                    </td>
                                    <td>{txn.holdingBalance}</td>
                                    <td>
                                      <span className="icon-container">
                                        <FaEdit className="edit-icon" onClick={() => handleEdit(txn)} />
                                        <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeleteIconClick(txn)} />
                                        <BiPlusCircle className="add-icon" onClick={() => navigate("/stockadd")} />
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                        {activeTab === "overview" && (
                          <td colSpan="8">
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
                                  <div className="chart-wrapper" >
                                    <Line data={intradayData} options={intradayOptions} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                        {activeTab === "fundamentals" && (
                          <table className="subcategory-table">
                            <thead>
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
                              {[
                                { name: "Sales", values: [0, 0, 0, 0, 0] },
                                { name: "Total Revenue", values: [1016.2, 95.43, 312.3, 414.4, 42.32] },
                                { name: "Operating Profit", values: [-22.31, 0, 0, 0, 0] },
                                { name: "Other Income", values: [14.67, -2.46, 52.65, 40.25, 12.37] },
                                { name: "Interest", values: [61.65, 15.82, -11.17, 22.8, 11.05] },
                                { name: "Tax", values: [0, 0, 0, 0, 0] },
                                { name: "PAT", values: [-70.11, 0, 0, 0, 0] },
                                { name: "EPS (Basic)", values: [-0.73, 0, 0, 0, 0] },
                              ].map((row, index) => (
                                <tr key={index}>
                                  <td>{row.name}</td>
                                  {row.values.map((val, i) => (
                                    <td key={i}>{val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {activeTab === "alerts" && (
                          <table className="subcategory-table">
                            <thead>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                  No Alerts Found
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {activeTab === "returns" && (
                          <table className="subcategory-table">
                            <thead>
                            </thead>
                            <tbody>
                              <tr>
                                <td>YTD</td>
                                <td>-4.06%</td>
                                <td className="negative">🔻</td>
                              </tr>
                              <tr>
                                <td>1 Week</td>
                                <td>-0.97%</td>
                                <td className="negative">🔻</td>
                              </tr>
                              <tr>
                                <td>1 Month</td>
                                <td>21.72%</td>
                                <td className="positive">🔼</td>
                              </tr>
                              <tr>
                                <td>3 Months</td>
                                <td>2.02%</td>
                                <td className="positive">🔼</td>
                              </tr>
                              <tr>
                                <td>1 Year</td>
                                <td>12.23%</td>
                                <td className="positive">🔼</td>
                              </tr>
                              <tr>
                                <td>10 Years</td>
                                <td>147.4%</td>
                                <td className="positive">🔼</td>
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

export default PortfolioAccountStock;