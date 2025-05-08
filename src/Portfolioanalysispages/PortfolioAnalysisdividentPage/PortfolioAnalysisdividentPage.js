
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import itc from "../../assest/itc.png";
import tcs from '../../assest/tcs.png';
import hdfc from "../../assest/hdfcbank.png";
import varun from "../../assest/varunimg.png";
import adani from "../../assest/adaniimg.png";

const PortfolioAnalysisdividentPage = () => {
    const navigate = useNavigate();
  const [isHistoric, setIsHistoric] = useState(false);

  const PortfolioAnalysisdividentPagedata = [
    {
        logo: itc,
        company: "ITC Ltd.",
        announcementDate: "09-01-2025",
        type: "Special",
        exDate: "01-17-2025",
        recordDate: "17-01-2025",
        dps: "₹ 66",
        divPercentage: "6,600",
      },
      {
       logo: varun,
        company: "Varun Beverages Ltd.",
        announcementDate: "09-01-2025",
        type: "Interim 3",
        exDate: "01-17-2025",
        recordDate: "17-01-2025",
        dps: "₹ 10",
        divPercentage: "1,000",
      },
      {
       logo: tcs,
        company: "Tata Consultancy Services Ltd.",
        announcementDate: "10-10-2024",
        type: "Interim 2",
        exDate: "10-18-2024",
        recordDate: "18-10-2024",
        dps: "₹ 10",
        divPercentage: "1,000",
      },
      {
        logo: itc,
        company: "ITC Ltd.",
        announcementDate: "20-04-2024",
        type: "Final",
        exDate: "10-05-2024",
        recordDate: "10-05-2024",
        dps: "₹ 19.5",
        divPercentage: "1,950",
      },
      {
        logo: adani,
        company: "Adani Green Energy Ltd.",
        announcementDate: "30-07-2024",
        type: "Interim",
        exDate: "09-08-2024",
        recordDate: "09-08-2024",
        dps: "₹ 1.25",
        divPercentage: "25",
      },
      {
        logo: hdfc,
        company: "HDFC Bank Ltd.",
        announcementDate: "29-01-2024",
        type: "Interim",
        exDate: "08-02-2024",
        recordDate: "08-02-2024",
        dps: "₹ 6.25",
        divPercentage: "625",
      },
      {
         logo: adani,
        company: "Adani Green Energy Ltd.",
        announcementDate: "11-07-2024",
        type: "Interim",
        exDate: "07-19-2024",
        recordDate: "20-07-2024",
        dps: "₹ 10",
        divPercentage: "1,000",
      },
    
  ];

  return (
 
    <div className="portfolianalysiscorporatepage-table-wrapper">
      <div className="portfolianalysiscorporatepage-table">
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Announcement Date</th>
        <th>Type</th>
        <th>Ex-Date</th>
        <th>Record Date</th>
        <th>DPS</th>
        <th>Div %</th>
      </tr>
    </thead>
    <tbody>
      {PortfolioAnalysisdividentPagedata.map((item, index) => (
        <tr key={index}>
          <td className="portfolianalysiscorporatepage-company">
            <img src={item.logo} alt={`${item.company} Logo`} />
            <span>{item.company}</span>
          </td>
          <td>{item.announcementDate}</td>
          <td>{item.type}</td>
          <td>{item.exDate}</td>
          <td>{item.recordDate}</td>
          <td>{item.dps}</td>
          <td>{item.divPercentage}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  
  );
};

export default PortfolioAnalysisdividentPage;
