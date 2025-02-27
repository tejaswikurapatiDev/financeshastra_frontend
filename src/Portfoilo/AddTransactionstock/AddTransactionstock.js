import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddSIPForm from "../AddSIPFormstock/AddSIPFormstock"; // Adjust path as needed
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Store/Slices/searchDataSlice";
import { debounce } from "lodash";

const AddTransactionstock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stocksData = useSelector((store) => store?.searchData?.searchData);

  // **Fetch All Data**
  useEffect(() => {
    if (!stocksData || stocksData.length === 0) {
      const getAllData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/search/allInfo`);
          const data = await response.json();
          console.log("hii api called");
          dispatch(setSearchData(data?.data || []));
        } catch (error) {
          console.error("Error fetching search data:", error);
        }
      };

      getAllData();
    }
  }, [dispatch, stocksData]);

  // Access the transaction to be edited, if passed via state
  const transaction = location.state?.transaction;

  // Initial State Setup
  const [transactionData, setTransactionData] = useState(
    transaction || {
      type: "Buy",
      stock_name: "",
      exchange: "NSE",
      date: "",
      quantity: 0,
      price: 0,
      amount: 0,
      net_amount: 0,
      total_charges: 0,
      notes: "",
      showSIP: false,
    }
  );
  const [filterData, setFilterData] = useState([]);

  // **Debounced Search Function**
  const debounceSearch = useCallback(
    debounce((searchText) => {
      if (!searchText) {
        setFilterData([]);
        return;
      }

      const results = stocksData.filter((item) => {
        const company = item.company?.toLowerCase() || "";

        return company.includes(searchText.toLowerCase());
      });

      setFilterData(results);
    }, 300),
    [stocksData]
  );

  // **Trigger Debounce on Input Change**
  useEffect(() => {
    debounceSearch(transactionData.stock_name);
    return () => debounceSearch.cancel();
  }, [transactionData.stock_name]);

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "quantity" || name === "price") {
      value = Number(value);
      if (value < 0) return; // Prevent negative values
    }

    setTransactionData((prev) => {
      const updatedTransaction = { ...prev, [name]: value };

      // Auto-calculate dependent fields
      if (name === "quantity" || name === "price") {
        const quantity = Number(updatedTransaction.quantity) || 0;
        const price = Number(updatedTransaction.price) || 0;
        updatedTransaction.amount = quantity * price;
        updatedTransaction.net_amount = updatedTransaction.amount;
        updatedTransaction.total_charges = updatedTransaction.net_amount; // Modify if extra charges apply
      }

      return updatedTransaction;
    });
  };

  // Handle save action
  const handleAddTransaction = async () => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/myportfolio/addStock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add transaction");
      }

      const result = await response.json();
      console.log("Transaction added successfully:", result);

      // Navigate after successful save
      navigate("/portfoliostockaccount", {
        state: { updatedTransaction: transactionData },
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(error.message);
    }
  };

  // Handle cancel action
  const handleCancel = () => navigate("/portfoliostockaccount");

  // Toggle SIP form visibility
  const handleToggleSIP = () => {
    setTransactionData((prev) => ({ ...prev, showSIP: !prev.showSIP }));
  };

  return (
    <div className="transaction-form">
      <h2 style={{ marginLeft: "40px" }}>Add Transaction</h2>
      <div className="tabsadd">
        <button className="tabadd active">Stocks</button>
        <button className="tabadd">Mutual Fund</button>
        <button className="tabadd">Gold</button>
      </div>
      <div className="addcontainer">
        <form className="transaction-row-wrapper">
          <div className="transaction-row">
            {/* Transaction Type */}
            <label>
              <p1 style={{ marginLeft: "49px" }}>Type</p1>
              <br />
              <select
                name="type"
                value={transactionData.type}
                onChange={handleInputChange}
                style={{ width: "80px", height: "30px", marginLeft: "50px" }}
                className="transaction-input"
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </label>

            {/* Stock Name */}
            <label>
              Stock Name
              <br />
              <input
                type="text"
                name="stock_name"
                value={transactionData.stock_name}
                onChange={handleInputChange}
                className="transaction-input"
              />
              {/* display input results  */}
              <div>
                {filterData.length > 0 ? (
                  <ul>
                    {filterData.map((data) => {
                      return <li key={data.id}>{data.company}</li>;
                    })}
                  </ul>
                ) : (
                  transactionData.stock_name && <p>No result found</p>
                )}
              </div>
            </label>

            {/* Exchange */}
            <label>
              Exchange
              <br />
              <input
                type="text"
                name="exchange"
                value="NSE"
                readOnly
                className="transaction-input read-only"
              />
            </label>

            {/* Date */}
            <label>
              Date
              <input
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleInputChange}
                className="transaction-input"
              />
            </label>

            {/* Quantity */}
            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                value={transactionData.quantity}
                onChange={handleInputChange}
                className="transaction-input"
                min="0"
              />
            </label>

            {/* Price */}
            <label>
              Price / Stock
              <input
                type="number"
                name="price"
                value={transactionData.price}
                onChange={handleInputChange}
                className="transaction-input"
                min="0"
              />
            </label>
          </div>

          <br />
          <br />

          <div
            className="transaction-row"
            style={{
              borderTop: "1px solid #ccc",
              marginBottom: "10px",
              paddingBottom: "10px",
            }}
          >
            {/* Amount */}
            <label className="amountupdate">
              <p1 style={{ marginLeft: "35px" }}>Amount</p1>
              <input
                type="number"
                name="amount"
                value={transactionData.amount}
                readOnly
                className="transaction-input read-only"
              />
            </label>

            {/* Net Amount */}
            <label>
              Net Amount
              <input
                type="number"
                name="net_amount"
                value={transactionData.net_amount}
                readOnly
                className="transaction-input read-only"
              />
            </label>

            {/* Total Charges */}
            <label>
              Total Charges
              <input
                type="number"
                name="total_charges"
                value={transactionData.total_charges}
                readOnly
                className="transaction-input read-only"
              />
            </label>

            {/* Notes */}
            <label>
              Notes
              <input
                type="text"
                name="notes"
                value={transactionData.notes}
                onChange={handleInputChange}
                className="transaction-input"
              />
            </label>

            {/* SIP Toggle */}
            <div className="sip-link">
              <a href="#" onClick={handleToggleSIP}>
                Add SIP for this Stock
              </a>
            </div>

            {/* SIP Form */}
            {transactionData.showSIP && (
              <div className="addsipform-container">
                <AddSIPForm />
              </div>
            )}
          </div>
        </form>

        {/* Action Buttons */}
        <div className="form-buttons">
          <button
            type="button"
            style={{
              marginLeft: "600px",
              background: "#24b676",
              color: "white",
            }}
            onClick={handleAddTransaction}
            className="save-button"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionstock;
