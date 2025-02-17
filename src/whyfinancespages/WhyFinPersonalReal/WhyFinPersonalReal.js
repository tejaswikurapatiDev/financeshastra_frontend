import React from "react";
import "./WhyFinPersonalReal.css";
import whyinvestmentImg1 from "../../assest/whyfinimg1.png"; // Replace with actual image
import whyinvestmentImg2 from "../../assest/whyfinimg2.png"; // Replace with actual image

const WhyFinPersonalReal = () => {
  return (
    <div className="whyfinpersonalreal-container">
      <div className="whyfinpersonalreal-card">
        <h2 className="whyfinpersonalreal-title">Personalized Investment Strategies</h2>
        <p className="whyfinpersonalreal-text">
          Whether you're a beginner or a seasoned investor, FinanceShastra offers customized
          portfolio management and financial planning, ensuring every rupee works harder for you.
        </p>
        <div className="whyfinpersonalreal-img-container">
          <img src={whyinvestmentImg1} alt="Investment Dashboard" className="whyfinpersonalreal-img" />
        </div>
      </div>
      <div className="whyfinrealmarket-card">
        <h2 className="whyfinrealmarket-title">Real-Time Market Insights</h2>
        <p className="whyfinrealmarket-text">
          Stay ahead with the latest financial updates, market trends, and expert insights to make
          timely and informed decisions.
        </p>
        <div className="whyfinrealmarket-img-container">
          <img src={whyinvestmentImg2} alt="Market Dashboard" className="whyfinrealmarket-img" />
        </div>
      </div>
      
      
    </div>
    
  );
};

export default WhyFinPersonalReal;
