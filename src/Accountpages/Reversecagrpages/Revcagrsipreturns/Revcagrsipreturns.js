import React from 'react';


const RevCagrSIPReturns = () => {
  const sipData = [
    { years: "1 years", value: "₹ 11,487" },
    { years: "2 years", value: "₹ 13,195" },
    { years: "3 years", value: "₹ 15,157" },
    { years: "4 years", value: "₹ 17,411" },
    { years: "5 years", value: "₹ 20,000" },
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

export default RevCagrSIPReturns;