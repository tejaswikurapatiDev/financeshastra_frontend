import React, { useEffect, useState } from 'react';
import './ResearchDashboard.css'; // External CSS file
import useResearchStocksData from '../ResearchStocksData';
import { API_BASE_URL } from '../../config';

const ResearchDashboard = () => {

  const { stock_research_stocks_data, isLoading } = useResearchStocksData(API_BASE_URL);
  const [financialstocks, setfinancialstocks] = useState([])
  const [metrics, setmetrics] = useState([])

  useEffect(() => {
    if (!isLoading && stock_research_stocks_data?.financeial_ratios) {
      const stocsfinance = stock_research_stocks_data.financeial_ratios;
      const metrics = stock_research_stocks_data.key_metrics;

      const transformedData = [
        { label: "ROE (TTM)", values: stocsfinance.map((item) => item.roe) },
        { label: "ROCE (TTM)", value: stocsfinance.map((item) => item.roce) },
        { label: "Net Profit Margin (TTM)", value: stocsfinance.map((item) => item.net_profit_margin) },
        { label: "Dividend Yield (TTM)", value: stocsfinance.map((item) => item.dividend_yeild) },
        { label: "Debt to Equity (TTM)", value: stocsfinance.map((item) => item.debt_to_equity) },
      ]

      const stockinfotransformed = [
        { label: "Symbol", value: metrics.map((item) => item.cmp) },
        { label: "CMP", value: metrics.map((item) => item.cmp) },
        { label: "P/E Ratio", value: metrics.map((item) => item.pe_ratio) },
        { label: "Enterprise Value", value: metrics.map((item) => item.enterprise_value) },
        { label: "Market CAP", value: metrics.map((item) => item.market_cap) },
      ]

      const shareholdingData = [
    { label: "Promoters", mar: "33.19", jun: "33.19", sep: "33.19" },
    { label: "Share Holding Pledge", mar: "0", jun: "0", sep: "0" },
    { label: "FII", mar: "20.28", jun: "20.32", sep: "19.95" },
    { label: "Public", mar: "22.87", jun: "22.97", sep: "24.02" },
    { label: "Total DII", mar: "23.66", jun: "23.52", sep: "22.84" },
  ];

      setmetrics(stockinfotransformed)

      setfinancialstocks(transformedData);
    }

  }, [isLoading, stock_research_stocks_data]);


  const shareholdingData = [
    { label: "Promoters", mar: "33.19", jun: "33.19", sep: "33.19" },
    { label: "Share Holding Pledge", mar: "0", jun: "0", sep: "0" },
    { label: "FII", mar: "20.28", jun: "20.32", sep: "19.95" },
    { label: "Public", mar: "22.87", jun: "22.97", sep: "24.02" },
    { label: "Total DII", mar: "23.66", jun: "23.52", sep: "22.84" },
  ];
  const financialRatios = [
    { label: "ROE (TTM)", value: "3.57" },
    { label: "ROCE (TTM)", value: "8.62" },
    { label: "Net Profit Margin (TTM)", value: "7.51" },
    { label: "Dividend Yield (TTM)", value: "2.31" },
    { label: "Debt to Equity (TTM)", value: "0.32" },
  ];

  const stockInfo = [
    { label: "Symbol", value: "TATASTEEL" },
    { label: "CMP", value: "₹162.55" },
    { label: "P/E Ratio", value: "51.4" },
    { label: "Enterprise Value", value: "₹2,54,989 Cr" },
    { label: "Market CAP", value: "₹1,65,531 Cr" },
  ];
  return (
    <div className="researchnewtabledash-container">

      {/* Stock Info */}
      <div className="researchnewtabledash-cardd">
        <h2 className="researchnewtabledash-title">Stock Info</h2>
        <div className="researchnewtabledash-card">

          <ul className="researchnewtabledash-list financial-ratio-list">
            {metrics.map((item, index) => (
              <li key={index} className="financial-ratio-row">
                <span className="ratio-label">{item.label}:</span>
                <span className="ratio-value">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Financial Ratios */}


      <div className="researchnewtabledash-cardd" >
        <h2 className="researchnewtabledash-title">Financial Ratios</h2>
        <div className="researchnewtabledash-card">

          <ul className="researchnewtabledash-list financial-ratio-list">
            {financialstocks.map((item, index) => (
              <li key={index} className="financial-ratio-row">
                <span className="ratio-label">{item.label}:</span>
                <span className="ratio-value">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Shareholding Pattern */}
      <div >
        <h2 className="researchnewtabledash-titlee">Shareholding Pattern</h2>
        <table className="researchnewtabledash-table">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Mar 24</th>
              <th>Jun 24</th>
              <th>Sep 24</th>
            </tr>
          </thead>
          <tbody>
            {shareholdingData.map((row, index) => (
              <tr key={index}>
                <td>{row.label}</td>
                <td>{row.mar}</td>
                <td>{row.jun}</td>
                <td>{row.sep}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ResearchDashboard;
