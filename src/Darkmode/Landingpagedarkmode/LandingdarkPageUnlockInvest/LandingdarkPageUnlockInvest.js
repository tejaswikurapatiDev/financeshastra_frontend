import React from "react";
import "./LandingdarkPageUnlockInvest.css";
import landingimg1 from '../../../assest/landingimg1.jpeg';


const LandingdarkPageUnlockInvest = () => {
  return (
    <div className="landingpageunlockinvestdarkcontainer">
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
             
              className="landingpageunlockinvestdarkinput"
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
            className="landingpageunlockinvestdarkimage"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingdarkPageUnlockInvest;
