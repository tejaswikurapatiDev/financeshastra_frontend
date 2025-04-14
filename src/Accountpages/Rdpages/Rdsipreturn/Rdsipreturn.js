


import React from 'react';


const Rdsipreturn= () => {
  const sipData = [
    { Months: "36 months", value: "₹ 3.95 Lakhs" },
    { Months: "60 months", value: "₹ 13,469 Lakhs" },
    {Months: "96 months", value: "₹ 16,103 Lakhs" },
    { Months: "120 months", value: "₹ 18,140 Lakhs" },
    { Months: "180 months", value: "₹ 24,432 Lakhs" },
    { Months: "240 months", value: "₹ 32,907Lakhs" },
    { Months: "300 months", value: "₹ 44,320 Lakhs" },
    { Months: "360 months", value: "₹ 59,693 Lakhs" },
    { Months: "420 months", value: "₹ 80,398 Lakhs" },
    { Months: "480 months", value: "₹ 1.08 Lakhs" },
   
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Projected RD returns</h2>
      <table className="projectedsipreturn-table">
        <thead>
          <tr>
            <th>Months</th>
            <th>Future Value</th>
          </tr>
        </thead>
        <tbody>
          {sipData.map((item, index) => (
            <tr key={index}>
              <td>{item.Months}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rdsipreturn;