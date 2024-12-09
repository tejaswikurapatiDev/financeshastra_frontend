import React from 'react';

import Navbar from '../../Navbar/Navbar';

// Irregular SVG Line

const MutualFinancialTable = ({ title, data, headers }) => (
  <div className="financial-table">
    <h2 className="table-title">{title}</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          {(headers || [
            'Dec14', 'Dec15', 'Dec16', 'Dec17', 'Dec18', 'Dec19', 'Dec20', 'Dec21', 'Dec22', 'Dec23', 'YTD',
          ]).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {/* Row Title */}
            <td className="row-title">{row.title}</td>

            {/* Graph Column */}
            <td className="graph-cell">
             
            </td>

            {/* Data Columns */}
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

export default MutualFinancialTable;
