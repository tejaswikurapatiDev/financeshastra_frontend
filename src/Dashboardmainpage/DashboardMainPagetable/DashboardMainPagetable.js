import React from "react";
import "./DashboardMainPagetable.css";

// Data for the cards and table
const DashboardPagetable = [
  { id: 1, sector: "IT", stocks: 60, value: "₹1,02,580.30", change: "6.8%", changeType: "up" },
  { id: 2, sector: "Energy", stocks: 43, value: "₹70,564.20", change: "4.2%", changeType: "up" },
  { id: 3, sector: "Health", stocks: 74, value: "₹1,11,580.30", change: "8.6%", changeType: "up" },
  { id: 4, sector: "Power", stocks: 10, value: "₹30,524.32", change: "5.8%", changeType: "down" },
  { id: 5, sector: "Textiles", stocks: 32, value: "₹84,586.72", change: "6.6%", changeType: "down" },
  { id: 6, sector: "Finance", stocks: 58, value: "₹1,33,580.69", change: "9.4%", changeType: "up" },
  { id: 7, sector: "Telecommunication", stocks: 24, value: "₹72,586.42", change: "4.2%", changeType: "down" },
];

const DashboardtableData = [
  { id: 1, company: "Maestros Electronics", ltp: 216.7, change: "19.99%", marketCap: "₹99.49", high: 198.9, low: 91.5, sector: "Telecom", pe: 19.8 },
  { id: 2, company: "Pasari Spg Mills", ltp: 10.17, change: "19.93%", marketCap: "₹11.70", high: 14.8, low: 6, sector: "Textiles", pe: 27.28 },
  { id: 3, company: "ABM Knowledgeware", ltp: 150.9, change: "17.98%", marketCap: "₹255.9", high: 171, low: 96.5, sector: "IT", pe: 16.16 },
  { id: 4, company: "ITI", ltp: 378.6, change: "15.41%", marketCap: "₹31,517", high: 403.8, low: 210.2, sector: "Telecom", pe: 0.0 },
  { id: 5, company: "Astrazeneca Pharma", ltp: 7328, change: "14.94%", marketCap: "₹15,939", high: 8139.9, low: 4050.2, sector: "Healthcare", pe: 194.57 },
  { id: 6, company: "Adani Total Gas", ltp: 755.4, change: "11.20%", marketCap: "₹74,710", high: 1198, low: 550.3, sector: "Power & Oil", pe: 107.83 },
];

const DashboardMainPagetable = () => {
  return (
    <div className="DashboardMainPagetable-container">
      <div className="DashboardMainPagetable-header">
        <button className="DashboardMainPagetable-tab active">Stock Sector</button>
        <button className="DashboardMainPagetable-tab">Stock Index</button>
        <button className="DashboardMainPagetable-tab">Stock Calendar</button>
        <button className="DashboardMainPagetable-tab">Stock Analyst</button>
      </div>
      <div className="DashboardMainPagetable-cards">
  {DashboardPagetable.map((card) => (
    <div key={card.id} className="DashboardMainPagetable-card">
      <div className="DashboardMainPagetable-card-header">
        <div className="DashboardMainPagetable-header-left">
          {/* Icon Section */}
          <span className={`DashboardMainPagetable-icon icon-${card.sector.toLowerCase()}`}></span>
          <p className="DashboardMainPagetable-sector">{card.sector}</p>
        </div>
        <span className="DashboardMainPagetable-stocks">{card.stocks} Stock</span>
      </div>
      <p className="DashboardMainPagetable-value">{card.value}</p>
      <p className={`DashboardMainPagetable-change ${card.changeType === "up" ? "change-up" : "change-down"}`}>
        {card.changeType === "up" ? "▲" : "▼"} {card.change}
      </p>
    </div>
  ))}
</div>


      <table className="DashboardMainPagetable-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>LTP (₹) ⇵</th>
            <th>Change % ⇵</th>
            <th>Market Cap (Cr)</th>
            <th>52W High (₹)</th>
            <th>52W Low (₹)</th>
            <th>Sector ⇵</th>
            <th>Current P/E</th>
            <th>Clarification</th>
          </tr>
        </thead>
        <tbody>
          {DashboardtableData.map((row) => (
            <tr key={row.id}>
              <td>{row.company}</td>
              <td>{row.ltp}</td>
              <td className="DashboardMainPagetable-positive">{row.change}</td>
              <td>{row.marketCap}</td>
              <td>{row.high}</td>
              <td>{row.low}</td>
              <td>{row.sector}</td>
              <td>{row.pe}</td>
              <td>
                <a href="#" className="clarification-link">Know more</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardMainPagetable;
