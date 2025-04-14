

import React from 'react';


const Lumpsumsipreturn = () => {
  const sipData = [
    { years: "10 years", value: "₹ 3.71 Lakhs" },
    { years: "15 years", value: "₹ 7.14 Lakhs" },
    { years: "20 years", value: "₹ 13.74 Lakhs" },
    { years: "25 years", value: "₹ 26.46 Lakhs" },
    { years: "30 years", value: "₹ 50.95 Lakhs" },
    { years: "35 years", value: "₹ 98.10 Lakhs" },
    { years: "40 years", value: "₹ 1.89 Crores" },
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Projected Lumpsum returns</h2>
      <table className="projectedsipreturn-table">
        <thead>
          <tr>
            <th>Years</th>
            <th>Future Value</th>
          </tr>
        </thead>
        <tbody>
          {sipData.map((item, index) => (
            <tr key={index}>
              <td>{item.years}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lumpsumsipreturn;