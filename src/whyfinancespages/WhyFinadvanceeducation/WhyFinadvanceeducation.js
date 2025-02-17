import React from "react";
import './WhyFinadvanceeducation.css';
import whyinvestmentImg3 from "../../assest/whyfinimg3.png"; // Replace with actual image
import whyinvestmentImg4 from "../../assest/whyfinimg4.png"; // Replace with actual image

const WhyFinadvanceeducation = () => {
  return (
    <div className="whyfinpersonalreal-containerr">
      <div className="whyfinpersonalreal-card">
        <h2 className="whyfinpersonalreal-title">Advanced Tools for Smarter Investments</h2>
        <p className="whyfinpersonalreal-text">
        Harness the power of reporting structure, and cutting-edge technology to analyze and 
        visualize data, identifying patterns and trends that maximize returns. 
        </p>
        <div className="whyfinpersonalreal-img-container">
          <img src={whyinvestmentImg3} alt="Investment Dashboard" className="whyfinpersonalreal-img" />
        </div>
      </div>
      <div className="whyfinrealmarket-card">
        <h2 className="whyfinrealmarket-title">Educational Support for Investors</h2>
        <p className="whyfinrealmarket-text">
        FinanceShastra bridges the gap between knowledge and action with investment courses,
         easy-to-digest financial news, and expert Q&A sessions for premium users.
        </p>
        <div className="whyfinrealmarket-img-container">
          <img src={whyinvestmentImg4} alt="Market Dashboard" className="whyfinrealmarket-img" />
        </div>
      </div>
      
      
    </div>
    
  );
};

export default WhyFinadvanceeducation;
