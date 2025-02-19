import React from "react";
import "./BestPerformers.css"; // Import CSS for styling

const bestPerformers = [
  { name: "ITC", returns: "+144.65%" },
  { name: "TCS", returns: "+100.19%" },
  { name: "HDFC Bank", returns: "+75.02%" },
];

const worstPerformers = [
  { name: "Adani Green", returns: "-44.93%" },
];

const BestPerformers = () => {
  return (
    <div>
        <div className="performerallstockanalysis">
        <div>
    <h3>Best Performers</h3></div>
    <div className="worstheader">
    <h3 >Worst Performers</h3></div></div>
    <div className="performance-containerstockanalysiss">
      {/* Best Performers Section */}
      <div className="performance-cardamnalysis">
      
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Returns %</th>
            </tr>
          </thead>
          <tbody>
            {bestPerformers.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td className="positive">{stock.returns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Worst Performers Section */}
      <div  className="worstheadertwo">
      <h3>Worst Performers</h3></div>
      <div className="performance-cardamnalysis">
    
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Returns %</th>
            </tr>
          </thead>
          <tbody>
            {worstPerformers.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td className="negative">{stock.returns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default BestPerformers;
