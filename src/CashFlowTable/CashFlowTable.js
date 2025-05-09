import React, { useState, useEffect } from "react";
import "./CashFlowTable.css";
import { API_BASE_URL } from "../config";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  textAlign: "center",
};

const CashFlowTable = () => {
  const [cashFlowData, setCashFlowData] = useState([]); // State to store transformed data
  const [years, setYears] = useState([]); // State to store fiscal years
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stockdetail/cashFlow`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Transform the data to match the table structure
        const transformedData = [
          {
            label: "Cash from Operations",
            values: result.map((item) => item.cash_from_operations),
          },
          {
            label: "Cash from Investing",
            values: result.map((item) => item.cash_from_investing),
          },
          {
            label: "Cash from Financing",
            values: result.map((item) => item.cash_from_financing),
          },
          {
            label: "Net Cash Flow",
            values: result.map((item) => item.net_cash_flow),
          },
        ];

        const fiscalYears = result.map((item) => item.fiscal_year);

        setCashFlowData(transformedData);
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
      <h2 className="cashhead">Cash Flow</h2>
      <p className="cashpara">
        Consolidated Figures in ₹ Crores / <a href="javascript:void(0)">View Standalone</a>
      </p>

      <div className="cash-flow-table">
        <table>
          <thead>
            <tr>
              <th></th>
              {years.map((year, index) => (
                <th key={index}>March {year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cashFlowData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={row.label === "Net Cash Flow" ? "bold-row" : ""}
              >
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

export default CashFlowTable;
