
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import restrimg from "../../assest/restrictedimg.png";
import varun from "../../assest/varunimg.png";
import './PortfolioAnalysisrightissusePage.css'


const PortfolioAnalysisrightissusePage = () => {
    const navigate = useNavigate();
    
  const [activeTab, setActiveTab] = useState("Rights - Issue");
  const [isHistoric, setIsHistoric] = useState(false);

  return (
    <div className="data-not-present-container">
      <div className="data-not-present-icon">
        <img
          src={restrimg}
          alt="Data Not Present Icon"
        />
      </div>
      <p className="data-not-present-text">Data Not Present</p>
    </div>

  
  );
};

export default PortfolioAnalysisrightissusePage;
