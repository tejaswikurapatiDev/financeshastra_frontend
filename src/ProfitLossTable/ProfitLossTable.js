import React, { useEffect, useState } from "react";
import "./ProfitLossTable.css";
import { API_BASE_URL } from "../config";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  textAlign: "center"
}

const ProfitLossTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchfun = async () => {
      const response = await fetch(
        `${API_BASE_URL}/stockdetail/annualProfitLoss`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok === true) {
        setStockData(data);
        setLoading(false);
      } else {
        console.error("Error fetching stock data:", response.statusText);
        setLoading(false);
      }
    };
    fetchfun();
  }, []);

  if (loading) return <div className="loader-cont">
    <ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      loading={loading}
      speedMultiplier={1}
      color="green"
    />
  </div>;

  return (
    <div>
      <h2 className="profitlosshead">Profit & Loss</h2>
      <p className="profitlosspara">
        Consolidated Figures in ₹ Crores /{" "}
        <a className="profit">View Standalone</a>
      </p>
      <div className="profit-loss-container">
        <table className="profit-loss-table">
          <thead>
            <tr>
              <th>Metric</th>
              {stockData.map((item, index) => (
                <th key={index}>{"March " + item.fiscal_year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sales (₹ Cr.)</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.sales_cr}</td>
              ))}
            </tr>
            <tr>
              <td>Expenses</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.expenses}</td>
              ))}
            </tr>
            <tr>
              <td>Operating Profit</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.operating_profit}</td>
              ))}
            </tr>
            <tr>
              <td>OPM %</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.opm_percent}%</td>
              ))}
            </tr>
            <tr>
              <td>Other Income</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.other_income}</td>
              ))}
            </tr>
            <tr>
              <td>Interest</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.interest}</td>
              ))}
            </tr>
            <tr>
              <td>Depreciation</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.depreciation}</td>
              ))}
            </tr>
            <tr>
              <td>Profit Before Tax</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.profit_before_tax}</td>
              ))}
            </tr>
            <tr>
              <td>Tax (%)</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.tax_percent}%</td>
              ))}
            </tr>
            <tr>
              <td>Net Profit</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.net_profit}</td>
              ))}
            </tr>
            <tr>
              <td>EPS (₹)</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.eps}</td>
              ))}
            </tr>
            <tr>
              <td>Dividend Payout (%)</td>
              {stockData.map((item, index) => (
                <td key={index}>{item.dividend_payout}%</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLossTable;
