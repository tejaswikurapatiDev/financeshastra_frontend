import React, { useState, useEffect } from "react";
import "./EarningsReport.css";
import ShareholdingChart from "../CircleChart/CircleChart";
import { API_BASE_URL } from "../config";

const QuarterlyEarningsReport = () => {
  const [data, setData] = useState([]); // State to store transformed data
  const [quarters, setQuarters] = useState([]); // State to store quarters
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stockdetail/quarterlyFinancials`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Transform the data to match the table structure
        const transformedData = [
          { label: "Sales (₹ Cr.)", values: result.map((item) => item.sales_cr) },
          { label: "Expenses", values: result.map((item) => item.expenses) },
          {
            label: "Operating Profit",
            values: result.map((item) => item.operating_profit),
          },
          { label: "OPM %", values: result.map((item) => item.opm_percent) },
          {
            label: "Other Income",
            values: result.map((item) => item.other_income),
          },
          { label: "Interest", values: result.map((item) => item.interest) },
          {
            label: "Depreciation",
            values: result.map((item) => item.depreciation),
          },
          {
            label: "Profit before tax",
            values: result.map((item) => item.profit_before_tax),
          },
          {
            label: "Tax (%)",
            values: result.map((item) => item.tax_percent),
          },
          {
            label: "Net Profit",
            values: result.map((item) => item.net_profit),
          },
          { label: "EPS (₹)", values: result.map((item) => item.eps) },
        ];

        const quarterLabels = result.map((item) => `March ${item.year}`);

        setData(transformedData);
        setQuarters(quarterLabels);
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
      <h2 className="earningheader" style={{ marginRight: "520px" }}>
        Quarterly Earnings Report
      </h2>
      <p className="earningpara">
        Consolidated Figures in ₹ Crores / <a href="">View Standalone</a>
      </p>

      <div className="earnings-report">
        <table className="earnings-table">
          <thead>
            <tr>
              <th></th>
              {quarters.map((quarter, index) => (
                <th key={index}>{quarter}</th>
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

        <div className="shareholding-section">
          <div className="shareholding-chart">
            <ShareholdingChart /> {/* Use CircleChart component */}
          </div>
          <div className="shareholding-history">
            <h3>Shareholding History</h3>
            <table>
              <thead>
                <tr>
                  <th>Holders</th>
                  <th>FY 2024</th>
                  <th>FY 2023</th>
                  <th>FY 2022</th>
                  <th>FY 2021</th>
                  <th>FY 2020</th>
                  <th>FY 2019</th>
                  <th>FY 2018</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Promoters</td>
                  <td>90.00%</td>
                  <td>90.3%</td>
                  <td>90.2%</td>
                  <td>90.6%</td>
                  <td>90.3%</td>
                  <td>90.0%</td>
                  <td>90.0%</td>
                </tr>
                <tr>
                  <td>Foreign Institutions</td>
                  <td>0.04%</td>
                  <td>0.04%</td>
                  <td>0.08%</td>
                  <td>0.04%</td>
                  <td>0.02%</td>
                  <td>0.02%</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>DII</td>
                  <td>0.01%</td>
                  <td>0.01%</td>
                  <td>0.00%</td>
                  <td>0.00%</td>
                  <td>0.00%</td>
                  <td>0.02%</td>
                  <td>0.03%</td>
                </tr>
                <tr>
                  <td>Retail & Others</td>
                  <td>9.92%</td>
                  <td>9.73%</td>
                  <td>9.95%</td>
                  <td>9.88%</td>
                  <td>9.66%</td>
                  <td>9.97%</td>
                  <td>7.31%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyEarningsReport;
