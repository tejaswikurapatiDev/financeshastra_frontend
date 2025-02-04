


import React from 'react';


const Fdsipreturn = () => {
  const sipData = [
    { years: "10 years", value: "₹ 1.59 Lakhs" },
    { years: "15 years", value: "₹ 1.79 Lakhs" },
    { years: "20 years", value: "₹ 2.40 Lakhs" },
    { years: "25 years", value: "₹ 3.21 Lakhs" },
    { years: "30 years", value: "₹ ₹ 4.29 Lakhs" },
    { years: "35 years", value: "₹ 5.74 Lakhs" },
    { years: "40 years", value: "₹ 7.69 Lakhs" },
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Growth Table</h2>
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

export default Fdsipreturn;