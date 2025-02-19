
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import varun from "../../assest/varunimg.png";


const PortfolioAnalysisbonusPage = () => {
    const navigate = useNavigate();
    
  const [activeTab, setActiveTab] = useState("Bonus");
  const [isHistoric, setIsHistoric] = useState(false);

  const PortfolioAnalysisbonusPagedata = [
    {
        logo: varun,
        company: "Varun Beverages Ltd.",
        announcementDate: "19-05-2022",
        exDate: "2022-06-06",
        recordDate: "07-06-2022",
        bonusRatio: "1:2",
      },
      {
       logo: varun,
        company: "Varun Beverages Ltd.",
        announcementDate: "21-05-2021",
        exDate: "2021-10-06",
        recordDate: "12-06-2021",
        bonusRatio: "1:2",
      },
      {
        logo: varun,
        company: "Varun Beverages Ltd.",
        announcementDate: "10-07-2019",
        exDate: "2019-07-25",
        recordDate: "27-07-2019",
        bonusRatio: "1:2",
      },
    
  ];

  const PortfolioAnalysisCorporatePagetabs = [
    { label: "Board - Meetings", navigationPath: "/porfolioanalysisallpagecall"},
    { label: "Dividends", navigationPath: "/portfolioanalysisdividendcall"},
    { label: "Bonus", navigationPath: "/portfoliobonuscall" },
    { label: "Splits", navigationPath: "/portfoliosplitcall" },
    { label: "Rights - Issue", navigationPath: "/portfolioanalysisrightscall" },
    { label: "AGM / EGM", navigationPath: "/portfolioAGMcall" },
  
  ];

  return (
 
    <div className="portfolianalysiscorporatepage-container">
      <div className="portfolianalysiscorporatepage-header">
        <h2>Corporate Action</h2>
        <div className="portfolianalysiscorporatepage-toggle">
        <label className="portfolianalysiscorporatepageswitch">
    <input
      type="checkbox"
      checked={isHistoric}
      onChange={() =>  setIsHistoric(!isHistoric)}
    />
    <span className="portfolianalysiscorporatepageslider"></span>
  </label>
  <span>Historic</span>
  
</div>

      </div>
      <div className="portfolianalysiscorporatepage-tabs">
      {PortfolioAnalysisCorporatePagetabs.map((tab) => (
        <div
          key={tab.label}
          className={`portfolianalysiscorporatepage-tab ${
            activeTab === tab.label ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab(tab.label);
            navigate(tab.navigationPath);
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
    <div className="portfolianalysiscorporatepage-table-wrapper">
      <div className="portfolianalysiscorporatepage-table">
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Announcement Date</th>
        <th>Ex-Date</th>
        <th>Record Date</th>
        <th>Bonus Ratio</th>
      </tr>
    </thead>
    <tbody>
      {PortfolioAnalysisbonusPagedata.map((item, index) => (
        <tr key={index}>
          <td className="portfolianalysiscorporatepage-company">
            <img src={item.logo} alt={`${item.company} Logo`} />
            <span>{item.company}</span>
          </td>
          <td>{item.announcementDate}</td>
          <td>{item.exDate}</td>
          <td>{item.recordDate}</td>
          <td>{item.bonusRatio}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>

    </div>
  
  );
};

export default PortfolioAnalysisbonusPage;
