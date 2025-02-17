import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import Mutualportfoliodonut from "../Mutualportfoliodonut/Mutualportfoliodonut";

const MutualAccountStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    location.pathname === "/portfoliostockaccount"
  );
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "18/11/2024",
      type: "Buy My Account",
      quantity: 2,
      amount: 584.4,
      charges: 0.6,
      netAmount: 585,
      realizedGainLoss: "-",
      holdingBalance: 4,
    },
    {
      id: 2,
      date: "18/11/2024",
      type: "Buy My Account",
      quantity: 2,
      amount: 584.4,
      charges: 0.6,
      netAmount: 585,
      realizedGainLoss: "-",
      holdingBalance: 4,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Handlers
  const handleEdit = (transaction) => {
    navigate("/stockupdate", { state: { transaction } });
  };

  const handleDeleteIconClick = (transaction) => {
    setTransactionToDelete(transaction);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactions((prev) =>
        prev.filter((txn) => txn.id !== transactionToDelete.id)
      );
      setShowPopup(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setTransactionToDelete(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle updates from navigation state
  useEffect(() => {
    if (location.state?.updatedTransaction) {
      const updatedTransaction = location.state.updatedTransaction;

      setTransactions((prev) =>
        prev.map((txn) =>
          txn.id === updatedTransaction.id ? updatedTransaction : txn
        )
      );
    }
  }, [location.state]);

  return (
    <div>
      <Mutualportfoliodonut/>
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
                <button className="add-transaction-button">+ Add Transaction</button>
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
            <tr>
              <td className="stock-name">
                <span className="dropdown-icon" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={isDropdownOpen ? faCaretDown : faCaretUp} />
                </span>
                ITI (2)
                <span className="stock-actions">
                  <span className="action-text">Add | Sell</span>
                  <span className="trash-icon">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => handleDeleteIconClick()}
                    />
                  </span>
                </span>
              </td>
              <td className="negative">291.40<br />-0.12</td>
              <td className="negative">-0.48<br />-0.04%</td>
              <td>4</td>
              <td>1,170.00</td>
              <td>1,165.60</td>
              <td className="negative">-4<br />-0.38%</td>
              <td>-</td>
            </tr>

            {/* Subcategory Row */}
            {isDropdownOpen && (
              <tr>
                <td colSpan="8" className="subcategory-row">
                  <table className="subcategory-table">
                    <thead>
                      <tr>
                      <th
    className="hover-effect"
    style={{
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
      borderRight: '1px solid #ccc',
      padding: '10px',
    }}
  >
    <Link
      to="/mutualaccount"
      style={{ textDecoration: 'none', color: 'black' }}
    >
      Transaction History
    </Link>
  </th>
  <th
    className="hover-effect"
    style={{
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
      borderRight: '1px solid #ccc',
      padding: '10px',
    }}
  >
    <Link to="/mutualoverview" style={{ textDecoration: 'none', color: 'black' }}>
      Overview
    </Link>
  </th>
  <th
    className="hover-effect"
    style={{
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
      borderRight: '1px solid #ccc',
      padding: '10px',
    }}
  >
    <Link to="/accountperformance" style={{ textDecoration: 'none', color: 'black' }}>
      Performance
    </Link>
  </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.quantity}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.charges}</td>
                          <td>{transaction.netAmount}</td>
                          <td>{transaction.realizedGainLoss}</td>
                          <td>{transaction.holdingBalance}</td>
                          <td>
                            <span className="icon-container">
                              <FaEdit
                                className="edit-icon"
                                onClick={() => handleEdit(transaction)}
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="delete-icon"
                                onClick={() => handleDeleteIconClick(transaction)}
                              />
                              <BiPlusCircle className="add-icon" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
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
    </div>
  );
};

export default MutualAccountStock;
