import React from 'react';
import './LandingdarkPageHowToEarn.css';
import howtoearnimg from '../../../assest/howtoearimage.png'

const LandingdarkPageHowToEarn = () => {
  return (
    <div className="landingpagehowtoearndarkcontainer">
      <h3 className="landingpagehowtoearndarkheading">
        How to Earn with FinanceShastra ?
      </h3>
      <div className="landingpagehowtoearn-content">
        <div className="landingpagehowtoearn-steps">
          <div className="landingpagehowtoearndarkstep">
            1. Invest Smartly with Expert Guidance
          </div>
          <div className="landingpagehowtoearndarkstep">
            2. Affiliate and Referral Program
          </div>
          <div className="landingpagehowtoearndarkstep">
            3. Learn and Profit
          </div>
          <div className="landingpagehowtoearndarkstep">
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

export default LandingdarkPageHowToEarn;
