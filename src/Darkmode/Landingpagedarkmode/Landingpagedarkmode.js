import React, { useState, useEffect } from "react";

import "./LandingPagedarkmode.css";

import LandingAboutdarkPage from "./LandingAboutdarkPage/LandingAboutdarkPage";
import Landingdarknavbar from "./Landingdarknavbar/Landingdarknavbar";
import LandingdarkPageAdvantage from "./LandingdarkPageAdvantage/LandingdarkPageAdvantage";
import LandingdarkPageHowToEarn from "./LandingdarkPageHowToEarn/LandingdarkPageHowToEarn";
import LandingdarkPageOurService from "./LandingdarkPageOurService/LandingdarkPageOurService";
import LandingdarkPagePremiumElite from "./LandingdarkPagePremiumElite/LandingdarkPagePremiumElite";
import LandingdarkPageSmartSIP from "./LandingdarkPageSmartSIP/LandingdarkPageSmartSIP";
import PopupdarkUnlockLandingPage from "./PopupdarkUnlockLandingPage/PopupdarkUnlockLandingPage";
import LandingdarkPageUnlockInvest from "./LandingdarkPageUnlockInvest/LandingdarkPageUnlockInvest";
import FooterForAllPagedarkmode from "../FooterForAllPagedarkmode/FooterForAllPagedarkmode";

const LandingPagedarkmode = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    },180000); // Show after 3 minutes (180,000 ms)
  
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="landing-dark-mode">
      {showPopup && <PopupdarkUnlockLandingPage onClose={() => setShowPopup(false)} />}
      <LandingdarkPageUnlockInvest />
      <LandingdarkPageOurService />
      <LandingdarkPageHowToEarn />
      <LandingdarkPageAdvantage />
      <LandingdarkPageSmartSIP />
      <LandingdarkPagePremiumElite />
      <LandingAboutdarkPage/>
      <Landingdarknavbar/>
      <FooterForAllPagedarkmode/>
     
    </div>
  );
};

export default LandingPagedarkmode;
