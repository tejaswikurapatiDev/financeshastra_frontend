import React from 'react';
import './ProjectedSIPReturns.css';

const ProjectedSIPReturns = () => {
  const sipData = [
    { years: "10 years", value: "₹ 26.21 Lakhs" },
    { years: "15 years", value: "₹ 61.29 Lakhs" },
    { years: "20 years", value: "₹ 1.32 Crores" },
    { years: "25 years", value: "₹ 2.73 Crores" },
    { years: "30 years", value: "₹ 5.56 Crores" },
    { years: "35 years", value: "₹ 11.23 Crores" },
    { years: "40 years", value: "₹ 22.62 Crores" },
  ];

  return (
    <div className="projectedsipreturn-container">
      <h2 className="projectedsipreturn-title">Projected SIP returns</h2>
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

export default ProjectedSIPReturns;
