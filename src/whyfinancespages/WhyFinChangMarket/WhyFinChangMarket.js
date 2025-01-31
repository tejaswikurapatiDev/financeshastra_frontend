import React from "react";
import "./WhyFinChangMarket.css";
import whyinvestmentImg7 from "../../assest/whyfinimg7.png"; // Replace with actual image

const WhyFinChangMarket = () => {
  return (
    <div className="whyfinchangmarket-container">
      <div className="whyfinchangmarket-content">
        <img
          src={whyinvestmentImg7}
          alt="FinanceShastra Website"
          className="whyfinchangmarket-image"
        />
        <div className="whyfinchangmarket-text">
          <h2>
            In an ever-changing market, <span className="whyfinchangmarket-texthighlight">FinanceShastra</span> is your trusted
            partner to simplify investing, optimize returns, and secure financial independence.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WhyFinChangMarket;
