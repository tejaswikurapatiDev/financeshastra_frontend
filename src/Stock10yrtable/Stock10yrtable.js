import React from 'react';
import './Stock10yrtable.css';
import Navbar from '../Navbar/Navbar';

// Irregular SVG Line
const IrregularLine = () => (
  <svg className="irregular-line" viewBox="0 0 100 50">
    <path
      d="M0 30 C20 10, 30 40, 50 20 C70 0, 80 50, 100 20 C120 0, 130 40, 150 20"
      stroke="#0349a8"
      fill="transparent"
      strokeWidth="2"
    />
  </svg>
);

const FinancialTable = ({ title, data, headers }) => (
  <div className="financial-table">
    <h2 className="table-title">{title}</h2>
    <table>
      <thead>
        <tr>
          <th>Row Title</th> {/* Adjust header label */}
          {(headers || [
            'FY15', 'FY16', 'FY17', 'FY18', 'FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'TTM',
          ]).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <div className="row-title-container">
                <span className="row-title" style={{ marginTop: '5px' }}>{row.title}</span>
                <IrregularLine style={{ marginTop: '0px' }} /> {/* Irregular line is now inside the same cell */}
              </div>
            </td>
            {row.data.map((value, index) => {
              // Determine the class based on the value
              let cellClass = '';
              if (value === 'NA' || parseFloat(value) === 0) {
                cellClass = 'neutral'; // Black color for 'NA' or 0
              } else if (parseFloat(value) < 0) {
                cellClass = 'negative'; // Red color for negative values
              } else {
                cellClass = 'positive'; // Green color for positive values
              }

              return (
                <td key={index} className={cellClass}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
    <Navbar />
  </div>
);

export default FinancialTable;