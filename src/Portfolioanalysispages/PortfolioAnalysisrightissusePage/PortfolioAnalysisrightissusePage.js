
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
