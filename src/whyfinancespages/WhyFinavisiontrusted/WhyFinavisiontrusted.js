import React from "react";

import whyinvestmentImg5 from "../../assest/whyfinimg5.png"; // Replace with actual image
import whyinvestmentImg6 from "../../assest/whyfinimg6.png"; // Replace with actual image

const WhyFinavisiontrusted = () => {
  return (
    <div className="whyfinpersonalreal-containerr">
      <div className="whyfinpersonalreal-card">
        <h2 className="whyfinpersonalreal-title">Vision for Investor Empowerment</h2>
        <p className="whyfinpersonalreal-text">
        FinanceShastra’s mission is to transform over 350 million Indians into confident investors
         by providing the right tools and education to grow their wealth
        </p>
        <div className="whyfinpersonalreal-img-container">
          <img src={whyinvestmentImg5} alt="Investment Dashboard" className="whyfinpersonalreal-img" />
        </div>
      </div>
      <div className="whyfinrealmarket-card">
        <h2 className="whyfinrealmarket-title">Trusted Advisory for Growth</h2>
        <p className="whyfinrealmarket-text">
        With a deep understanding of the Indian market, FinanceShastra ensures personalized, 
        actionable advice that aligns with your risk appetite and financial goals.
        </p>
        <div className="whyfinrealmarket-img-container">
          <img src={whyinvestmentImg6} alt="Market Dashboard" className="whyfinrealmarket-img" />
        </div>
      </div>
      
      
    </div>
    
  );
};

export default WhyFinavisiontrusted;
