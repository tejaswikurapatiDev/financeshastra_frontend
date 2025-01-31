import React from "react";
import "./LandingPageUnlockInvest.css";
import landingimg1 from '../../assest/landingimg1.jpeg';


const LandingPageUnlockInvest = () => {
  return (
    <div className="landingpageunlockinvest-container">
      <div className="landingpageunlockinvest-background">
        {/* Left Side Content */}
        <div className="landingpageunlockinvest-content">
          <div className="landingpageunlockinvestheadingsearchall">
          <h1 className="landingpageunlockinvest-heading">
            Unlock your Investing with <span>Financeshastra.</span>
          </h1>
          <div className="landingpageunlockinvest-searchbar">
         
            <input
              type="text"
              placeholder="Search for Stocks, Mutual..."
             
              className="landingpageunlockinvest-input"
            />
            
            </div>
          
            <button className="landingpageunlockinvest-button">
              Explore now
            </button>
            
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="landingpageunlockinvest-illustration">
          <img
            src={landingimg1}
            alt="Finance Chart Illustration"
            className="landingpageunlockinvest-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageUnlockInvest;
