import React, { useState } from "react";
import "./MutualFundsSchemeAllocation.css";

const MutualFundsSchemeAllocation = () => {
  const [activeTab, setActiveTab] = useState("By Holdings");

  // Data for "By Holdings"
  const holdingsData = [
    { name: "Infosys", value: 22.22 },
    { name: "TCS", value: 11.72 },
    { name: "Bharti Airtel", value: 8.54 },
    { name: "HCL Technologies", value: 5.43 },
    { name: "LTIMindtree", value: 5.43 },
  ];

  // Data for "By Sector"
  const sectorData = [
    { name: "IT-Software", value: 63.75 },
    { name: "Telecom-Services", value: 12.87 },
    { name: "Retailing", value: 6.59 },
    { name: "IT-Services", value: 4.11 },
    { name: "Debt", value: 2.5 },
  ];

  // Data for "By Assets"
  const assetsData = [
    { name: "Equity", value: 92.84 },
    { name: "Reverse Repos", value: 5.54 },
    { name: "Foreign Equity", value: 3.33 },
    { name: "T-Bills", value: 2.78 },
    { name: "Derivatives", value: 1.75 },
  ];

  // Determine which data to display based on the active tab
  const schemeData =
    activeTab === "By Holdings"
      ? holdingsData
      : activeTab === "By Sector"
      ? sectorData
      : assetsData;

  return (
    <div>
    <h2 className="scheme-allocation-title">Scheme Allocation</h2>
    <div className="scheme-allocation-container">
    
      <div className="scheme-allocation-tabs">
        <button
          className={`tab-button ${activeTab === "By Holdings" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("By Holdings")}
        >
          By Holdings
        </button>
        <button
          className={`tab-button ${activeTab === "By Sector" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("By Sector")}
        >
          By Sector
        </button>
        <button
          className={`tab-button ${activeTab === "By Assets" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("By Assets")}
        >
          By Assets
        </button>
      </div>

      <div className="scheme-allocation-content">
        {schemeData.map((item, index) => (
          <div key={index} className="allocation-row">
            <div className="allocation-name">{item.name}</div>
            <div className="allocation-bar-wrapper">
              <div
                className="allocation-bar"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <div className="allocation-percentage">{item.value}%</div>
          </div>
        ))}
      </div>

      <div className="view-holdings-container">
        <a href="#" className="view-holdings-link">
          View all Holdings &gt;
        </a>
      </div>
    </div>
    </div>
  );
};

export default MutualFundsSchemeAllocation;
