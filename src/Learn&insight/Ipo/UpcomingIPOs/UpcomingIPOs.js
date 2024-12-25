import React from 'react';
import './UpcomingIPOs.css';
import imgipo from '../../../assest/ipolast.jpeg';
const UpcomingIPOs = () => {
  const ipoData = [
    { name: "Sanathan Textiles", priceBand: "₹305 - 321", biddingDate: "19-Dec-2024 to 23-Dec-2024" },
    { name: "NewMalayalam Steel", priceBand: "₹85 - 90", biddingDate: "19-Dec-2024 to 23-Dec-2024" },
    { name: "Mamata Machinery", priceBand: "₹230 - 243", biddingDate: "19-Dec-2024 to 23-Dec-2024" },
    { name: "Transrail Lighting", priceBand: "₹410 - 432", biddingDate: "19-Dec-2024 to 23-Dec-2024" },
  ];

  const analysisData = [
    "Sanathan Textiles IPO analysis",
    "DAM Capital Advisors IPO analysis",
    "Concord Enviro IPO analysis",
    "Transrail Lighting IPO analysis",
  ];

  return (
    <div>
    <div className="upcomingipo-container">

      <div className='imgipoupcoming'>
        <img src={imgipo}/>
      </div>
      {/* Upcoming IPOs Section */}
      <div className="upcomingipo-section">
        <h2 className="upcomingipo-title">Upcoming IPOs</h2>
        <div className="upcomingipo-table-wrapper">
          <table className="upcomingipo-table">
            <thead>
              <tr>
                <th className="upcomingipo-header">Name</th>
                <th className="upcomingipo-header">Price Band (₹)</th>
                <th className="upcomingipo-header">Bidding Date</th>
              </tr>
            </thead>
            <tbody>
              {ipoData.map((ipo, index) => (
                <tr key={index} className="upcomingipo-row">
                  <td className="upcomingipo-cell">{ipo.name}</td>
                  <td className="upcomingipo-cell">{ipo.priceBand}</td>
                  <td className="upcomingipo-cell">{ipo.biddingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis Section */}
      
     
    </div>
    <h3 className='ipoupcomsubs'>Subscribe to FinanceShastra Stock Advisor now and start shaping your financial destiny.</h3>
    </div>
  );
};

export default UpcomingIPOs;