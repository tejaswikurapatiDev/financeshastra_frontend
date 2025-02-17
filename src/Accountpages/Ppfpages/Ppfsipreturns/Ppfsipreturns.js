
import React from 'react';


const Ppfsipreturn = () => {
  const sipData = [
    { years: "15 years", value: "₹ 3.95 Lakhs" },
    { years: "20 years", value: "₹ 13,469 Lakhs" },
    { years: "25 years", value: "₹ 16,103 Lakhs" },
    { years: "30 years", value: "₹ 18,140 Lakhs" },
    { years: "35 years", value: "₹ 24,432 Lakhs" },
    { years: "40 years", value: "₹ 32,907 Lakhs" },
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Projected PPF returns</h2>
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

export default Ppfsipreturn;