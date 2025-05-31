import React, { useState, useEffect } from "react";
import "./BalanceSheet.css";
import { API_BASE_URL } from "../config";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
const override = {
  display: "block",
  textAlign: "center",
};

const BalanceSheet = () => {
  const { id } = useParams();
  // State to toggle subcategories for "Borrowings", "Other Liabilities", "Fixed Assets", and "Other Assets"
  const [isBorrowingsExpanded, setBorrowingsExpanded] = useState(false);
  const [isOtherLiabilitiesExpanded, setOtherLiabilitiesExpanded] = useState(false);
  const [isFixedAssetsExpanded, setFixedAssetsExpanded] = useState(false);
  const [isOtherAssetsExpanded, setOtherAssetsExpanded] = useState(false); // New state for "Other Assets"

  // State for API data and loading/error handling
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/stockdetail/balanceSheet/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result Baln=ance sheet:", result)

        // Transform the data to match the table structure
        const transformedData = [
          {
            label: "Equity Capital",
            values: result.map((item) => item.equity_capital),
          },
          { label: "Reserves", values: result.map((item) => item.reserves) },
          {
            label: "Borrowings",
            values: result.map((item) => item.borrowings),
            subcategories: [
              { label: "Long term Borrowings", values: result.map((item) => item.long_term_borrowings) },
              { label: "Short term Borrowings", values: result.map((item) => item.short_term_borrowings) },
              { label: "Lease Liabilities", values: result.map((item) => item.lease_liabilities) },
              { label: "Other Borrowings", values: result.map((item) => item.other_borrowings) }
            ]
          },
          {
            label: "Other Liabilities",
            values: result.map((item) => item.other_liabilities),
            subcategories: [
              { label: "Trade Payables", values: result.map((item) => item.trade_payables) },
              { label: "Advance from Customers", values: result.map((item) => item.advance_from_customers) },
              { label: "Other Liability Items", values: result.map((item) => item.other_liability_items) }
            ]
          },
          {
            label: "Total Liabilities",
            values: result.map((item) => item.total_liabilities),
          },
          {
            label: "Fixed Assets",
            values: result.map((item) => item.fixed_assets),
            subcategories: [
              { label: "Land", values: result.map((item) => item.land) },
              { label: "Building", values: result.map((item) => item.building) },
              { label: "Plant Machinery", values: result.map((item) => item.plant_machinery) },
              { label: "Equipments", values: result.map((item) => item.equipments) },
              { label: "Furniture n fittings", values: result.map((item) => item.durniture_n_fittings) },
              { label: "Vehicles", values: result.map((item) => item.vehicles) },
              { label: "Other fixed assets", values: result.map((item) => item.other_fixed_assets) }
            ]
          },
          { label: "CWIP", values: result.map((item) => item.cwip) },
          {
            label: "Investments",
            values: result.map((item) => item.investments),
          },
          {
            label: "Other Assets",
            values: result.map((item) => item.other_assets),
            subcategories: [
              { label: "Inventories", values: result.map((item) => item.inventories) },
              { label: "Trade receivables", values: result.map((item) => item.trade_receivables) },
              { label: "Cash Equivalents", values: result.map((item) => item.cash_equivalents) },
              { label: "Loans n Advances", values: result.map((item) => item.loans_n_advances) },
              { label: "Other asset items", values: result.map((item) => item.other_asset_items) }
            ]
          },
          {
            label: "Total Assets",
            values: result.map((item) => item.total_assets),
          },
        ];

        const fiscalYears = result.map((item) => item.fiscal_year);

        setData(transformedData);
        setYears(fiscalYears);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleBorrowings = () => setBorrowingsExpanded(!isBorrowingsExpanded);
  const toggleOtherLiabilities = () => setOtherLiabilitiesExpanded(!isOtherLiabilitiesExpanded);
  const toggleFixedAssets = () => setFixedAssetsExpanded(!isFixedAssetsExpanded);
  const toggleOtherAssets = () => setOtherAssetsExpanded(!isOtherAssetsExpanded); // Toggle for "Other Assets"


  // Render loading or error states
  if (loading) {
    return <div className="loader-cont">
      <ClipLoader
        cssOverride={override}
        size={35}
        data-testid="loader"
        loading={loading}
        speedMultiplier={1}
        color="green"
      />
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="sheethead">Balance Sheet</h2>
      <p className="sheetpara">
        Consolidated Figures in ₹ Crores /{" "}
        <a className="sheeta" href="javascript:void(0)">
          View Standalone
        </a>
      </p>
      <div className="balance-sheet">
            <table>
              <thead>
                <tr>
                  <th></th>
                  {years.map((year, index) => (
                    <th key={index}>{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <React.Fragment key={index}>
                    {/* Main row */}
                    <tr className={row.label === "Total Liabilities" || row.label === "Total Assets" ? "highlight-row" : ""}>
                      <td className={row.subcategories ? "expandable" : ""}>
                        {row.label}
                        {row.label === "Borrowings" && (
                          <span onClick={toggleBorrowings} className="expand-toggle">
                            {isBorrowingsExpanded ? "−" : "+"}
                          </span>
                        )}
                        {row.label === "Other Liabilities" && (
                          <span onClick={toggleOtherLiabilities} className="expand-toggle">
                            {isOtherLiabilitiesExpanded ? "−" : "+"}
                          </span>
                        )}
                        {row.label === "Fixed Assets" && (
                          <span onClick={toggleFixedAssets} className="expand-toggle">
                            {isFixedAssetsExpanded ? "−" : "+"}
                          </span>
                        )}
                        {row.label === "Other Assets" && (
                          <span onClick={toggleOtherAssets} className="expand-toggle">
                            {isOtherAssetsExpanded ? "−" : "+"}
                          </span>
                        )}
                      </td>
                      {row.values.map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
      
                    {/* Render subcategories if expanded */}
                    {(isBorrowingsExpanded && row.label === "Borrowings" ||
                      isOtherLiabilitiesExpanded && row.label === "Other Liabilities" ||
                      isFixedAssetsExpanded && row.label === "Fixed Assets" ||
                      isOtherAssetsExpanded && row.label === "Other Assets") &&
                      row.subcategories?.map((subRow, subIndex) => (
                        <tr key={subIndex} className="subcategory-row">
                          <td>{subRow.label}</td>
                          {subRow.values.map((subValue, j) => (
                            <td key={j}>{subValue}</td>
                          ))}
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
           
          </div>
    </div>
  );
};

const Stockpeer = () => {
  const [peerData, setPeerData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/stockdetail/peerAnalysis`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPeerData(result); // Assuming the API returns an array of objects
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading or error states
  if (loading) {
    return <div className="loader-cont">
      <ClipLoader
        cssOverride={override}
        size={35}
        data-testid="loader"
        loading={loading}
        speedMultiplier={1}
        color="green"
      />
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="stock-peer-container">
      <h2 className="stockpeerheader">Peer Analysis</h2>
      <table className="peer-analysis-table">
        <thead>
          <tr>
            <th>Fiscal Year</th>
            <th>Equity Capital</th>
            <th>Reserves</th>
            <th>Borrowings</th>
            <th>Other Liabilities</th>
            <th>Total Liabilities</th>
            <th>Fixed Assets</th>
            <th>Investments</th>
            <th>Other Assets</th>
            <th>Total Assets</th>
          </tr>
        </thead>
        <tbody>
          {peerData.map((item, index) => (
            <tr key={index}>
              <td>{item.fiscal_year}</td>
              <td>{item.equity_capital}</td>
              <td>{item.reserves}</td>
              <td>{item.borrowings}</td>
              <td>{item.other_liabilities}</td>
              <td>{item.total_liabilities}</td>
              <td>{item.fixed_assets}</td>
              <td>{item.investments}</td>
              <td>{item.other_assets}</td>
              <td>{item.total_assets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheet;
export { Stockpeer };
