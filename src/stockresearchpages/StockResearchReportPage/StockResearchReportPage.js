import React from 'react';
import './StockResearchReportPage.css';
export default function StockResearchReportPage() {
  return (
    <div className="stockresearchreportpage-container">
      <h1 className="stockresearchreportpage-title">What is a Stock Research Report?</h1>
      <p className="stockresearchreportpage-description">
        A Stock Research Report, also called an Equity Research Report, is a detailed document created by an equity research analyst to help investors decide whether to buy, sell, or hold stocks of a specific public company. It includes an investment analysis, recommendations, and target prices, along with a comprehensive performance review of the stock and comparisons with relevant benchmarks.
      </p>

      <h2 className="stockresearchreportpage-subtitle">Types of Research Reports:</h2>
      <ul className="stockresearchreportpage-list">
        <li className="stockresearchreportpage-listitem">
          <strong className='stockresearchreportpagestrong'>Company Reports:</strong> These reports focus on the latest developments within a company, including earnings announcements, news, and stock recommendations—buy, sell, or hold.
        </li>
        <li className="stockresearchreportpage-listitem">
          <strong className='stockresearchreportpagestrong'>Initiation Reports:</strong> These reports are generated when an analyst begins covering a stock, offering an in-depth analysis of the company’s performance, products, and subdivisions.
        </li>
        <li className="stockresearchreportpage-listitem">
          <strong className='stockresearchreportpagestrong'>Industry Reports:</strong> Provide insights into an entire industry, detailing trends, economic factors, and regulations impacting the sector.
        </li>
        <li className="stockresearchreportpage-listitem">
          <strong className='stockresearchreportpagestrong'>Commodities Reports:</strong> These reports offer daily or weekly insights into commodities, often featuring market outlooks and opinions from commodity analysts.
        </li>
        <li className="stockresearchreportpage-listitem">
          <strong className='stockresearchreportpagestrong'>Flash Reports:</strong> These brief reports provide quick commentary on recent news or events that may affect the stock market or specific companies.
        </li>
      </ul>

      <h2 className="stockresearchreportpage-subtitle">Buy Side vs Sell Side Stock Research Reports</h2>
      <p className="stockresearchreportpage-description">
        Buy-side research reports are created by asset management companies or investment firms for internal use to guide portfolio managers in making investment decisions. Sell-side research, on the other hand, is produced by investment banks and offered to their clients, providing stock recommendations and target prices.
      </p>
    </div>
  );
}