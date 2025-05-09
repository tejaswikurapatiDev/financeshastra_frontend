import React, { useState, useEffect } from "react";
import "./BalanceSheet.css";
import { API_BASE_URL } from "../config";

const BalanceSheet = () => {
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
          `${API_BASE_URL}/stockdetail/balanceSheet`,
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
          },
          {
            label: "Other Liabilities",
            values: result.map((item) => item.other_liabilities),
          },
          {
            label: "Total Liabilities",
            values: result.map((item) => item.total_liabilities),
          },
          {
            label: "Fixed Assets",
            values: result.map((item) => item.fixed_assets),
          },
          { label: "CWIP", values: result.map((item) => item.cwip) },
          {
            label: "Investments",
            values: result.map((item) => item.investments),
          },
          {
            label: "Other Assets",
            values: result.map((item) => item.other_assets),
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

  // Render loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="sheethead">Balance Sheet</h2>
      <p className="sheetpara">
        Consolidated Figures in ₹ Crores /{" "}
        <a className="sheeta" href="">
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
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.label}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
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
    return <div>Loading...</div>;
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
