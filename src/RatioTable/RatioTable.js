import React, { useState, useEffect } from "react";
import "./RatioTable.css";
import { API_BASE_URL } from "../config";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center"
}

const RatioTable = () => {
  const [data, setData] = useState([]); // State to store transformed data
  const [years, setYears] = useState([]); // State to store fiscal years
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/stockdetail/financialRatios`,
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
            label: "Debtor Days",
            values: result.map((item) => item.debtor_days),
          },
          {
            label: "Inventory Days",
            values: result.map((item) => item.inventory_days),
          },
          {
            label: "Days Payable",
            values: result.map((item) => item.days_payable),
          },
          {
            label: "Cash Conversion Cycle",
            values: result.map((item) => item.cash_conversion_cycle),
          },
          {
            label: "Working Capital Days",
            values: result.map((item) => item.working_capital_days),
          },
          {
            label: "ROCE %",
            values: result.map((item) => item.roce_percentage),
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
      <h2 className="ratioheader" style={{ marginRight: "520px" }}>
        Ratios
      </h2>
      <p className="ratiopara">
        Consolidated Figures in ₹ Crores / <a>View Standalone</a>
      </p>
      <div className="ratio-table">
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
              <tr key={index}>
                <td
                  className={
                    row.label === "Cash Conversion Cycle" ? "highlighted" : ""
                  }
                >
                  {row.label}
                </td>
                {row.values.map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatioTable;
