import React from "react";
import "./MtuFundDetails.css";

const MtuFundDetails = () => {
  return (
    <div className="mtufund-details-container">
      {/* Exit Load & Tax Implication */}
      <div className="mtufund-exit-load-section">
        <h2 className="mtufund-section-title">Exit Load & Tax Implication</h2>
        <div className="mtufund-section-content">
          1.00% - If units purchased or switched in from another scheme of the Fund are redeemed or switched out within 15 days from the date of allotment.
         
          Nil - If units purchased or switched in from another scheme of the Fund are redeemed or switched out after 15 days from the date of allotment.
        </div>
      </div>

      {/* Fund Objective */}
      <div className="mtufund-objective-section">
        <h2 className="mtufund-section-title">Fund Objective</h2>
        <div className="mtufund-section-content">
          To generate long-term capital appreciation by investing in equity and equity-related securities of technology-intensive companies.
        </div>
      </div>

      {/* Fund Managers */}
      <div className="mtufund-managers-section">
        <h2 className="mtufund-section-title">Fund Managers</h2>
        <div className="mtufund-section-content mtufund-manager-name">
          Vaibhav Dusad
        </div>
      </div>
    </div>
  );
};

export default MtuFundDetails;
