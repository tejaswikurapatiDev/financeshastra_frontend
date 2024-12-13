import React from 'react';
import Navbar from '../../Navbar/Navbar';
import './Mutual10yrtable';

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
            <td className="graph-cell"></td>

            {/* Data Columns */}
            {row.data.map((value, index) => {
              // Determine the style based on whether the value contains '%' or is negative
              const isPercentage = value.includes('%'); // Check for percentage
              const isNegative = value.startsWith('-'); // Check for negative value
              const textColor = isNegative ? 'red' : isPercentage ? 'green' : 'black'; // Set color dynamically

              return (
                <td
                  key={index}
                  style={{
                    color: textColor, // Apply the determined color
                  }}
                >
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
