import React from 'react';


const CagrSIPReturns = () => {
  const sipData = [
    { years: "0 years", value: "₹ 5,000" },
    { years: "1 years", value: "₹ 5,623" },
    { years: "2 years", value: "₹ 6,324" },
    { years: "3 years", value: "₹ 7,112" },
    { years: "4 years", value: "₹ 7,999" },
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Growth Table</h2>
      <table className="projectedsipreturn-table">
        <thead>
          <tr>
            <th>Years</th>
            <th>Investment Value</th>
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

export default CagrSIPReturns;