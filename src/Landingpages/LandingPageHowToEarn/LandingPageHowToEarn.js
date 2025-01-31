import React from 'react';
import './LandingPageHowToEarn.css';
import howtoearnimg from '../../assest/landinghowtoearnimg.jpeg'

const LandingPageHowToEarn = () => {
  return (
    <div className="landingpagehowtoearn-container">
      <h3 className="landingpagehowtoearn-heading">
        How to Earn with FinanceShastra ?
      </h3>
      <div className="landingpagehowtoearn-content">
        <div className="landingpagehowtoearn-steps">
          <div className="landingpagehowtoearn-step">
            1. Invest Smartly with Expert Guidance
          </div>
          <div className="landingpagehowtoearn-step">
            2. Affiliate and Referral Program
          </div>
          <div className="landingpagehowtoearn-step">
            3. Learn and Profit
          </div>
          <div className="landingpagehowtoearn-step">
            4. Become a Partner or Collaborator
          </div>
        </div>
        <div className="landingpagehowtoearn-image">
          <img 
            src={howtoearnimg}
            alt="How to Earn" 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageHowToEarn;
