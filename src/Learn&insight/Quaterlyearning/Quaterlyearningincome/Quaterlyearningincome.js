import React from 'react';
import './Quaterlyearningincome.css';

const QuarterlyEarningdetailincome = ({ quarterlyReport }) => {
  // Define the row configuration with labels and corresponding data keys
  const rowConfig = [
    { label: "Revenue (Cr.)", key: "revenue", format: value => `₹${parseFloat(value).toLocaleString('en-IN')}` },
    { label: "Net Profit (Cr.)", key: "net_profit", format: value => parseFloat(value).toLocaleString('en-IN') },
    { label: "EPS", key: "eps", format: value => value },
    { label: "BVPS", key: "bvps_percentage", format: value => `${value}%` },
    { label: "ROE", key: "roe", format: value => value },
    { label: "NIM", key: "nim", format: value => value }
  ];

  // Extract unique years from the quarterlyReport data
  const getUniqueYears = () => {
    if (!quarterlyReport || quarterlyReport.length === 0) return [];
    return [...new Set(quarterlyReport.map(item => item.year))].sort();
  };

  // Organize data by year for easy access
  const getDataByYear = () => {
    const dataByYear = {};
    quarterlyReport?.forEach(item => {
      dataByYear[item.year] = item;
    });
    return dataByYear;
  };

  const years = getUniqueYears();
  const dataByYear = getDataByYear();

  return (
    <div>
      <h2 className="earningheaderrpeer">
        Quarterly Results
      </h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores / <a style={{ color: '#24b676' }}>View Standalone</a>
      </p>
      <div className="earnings-report">
        <table className="earnings-tableeincome">
          <thead>
            <tr>
              <th></th>
              {years.map(year => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowConfig.map((row, index) => (
              <tr key={index}>
                <td>{row.label}</td>
                {years.map(year => {
                  const yearData = dataByYear[year];
                  const value = yearData ? yearData[row.key] : '-';
                  return (
                    <td key={`${year}-${row.key}`}>
                      {yearData ? row.format(value) : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterlyEarningdetailincome;