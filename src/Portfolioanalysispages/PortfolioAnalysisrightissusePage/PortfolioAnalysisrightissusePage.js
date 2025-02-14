
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import restrimg from "../../assest/restrictedimg.png";
import varun from "../../assest/varunimg.png";
import './PortfolioAnalysisrightissusePage.css'


const PortfolioAnalysisrightissusePage = () => {
    const navigate = useNavigate();
    
  const [activeTab, setActiveTab] = useState("Rights - Issue");
  const [isHistoric, setIsHistoric] = useState(false);

  
  const PortfolioAnalysisCorporatePagetabs = [
    { label: "Board - Meetings", navigationPath: "/portfolioAnalysisCorporatePage" },
    { label: "Dividends", navigationPath: "/portfolioAnalysisdividentPage" },
    { label: "Bonus", navigationPath: "/portfolioAnalysisbonusPage" },
    { label: "Splits", navigationPath: "/portfolioAnalysisSplitsPage" },
    { label: "Rights - Issue", navigationPath: "/portfolioAnalysisRightsPage" },
    { label: "AGM / EGM", navigationPath: "/portfolioAnalysisAgmPage" },
  
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
    
    <div className="data-not-present-container">
      <div className="data-not-present-icon">
        <img
          src={restrimg}
          alt="Data Not Present Icon"
        />
      </div>
      <p className="data-not-present-text">Data Not Present</p>
    </div>
    </div>

  
  );
};

export default PortfolioAnalysisrightissusePage;
