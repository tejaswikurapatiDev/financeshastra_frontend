import React, { useState, useEffect } from "react";
import LandingPageUnlockInvest from "./LandingPageUnlockInvest/LandingPageUnlockInvest";
import LandingPageOurService from "./LandingPageOurService/LandingPageOurService";
import LandingPageHowToEarn from "./LandingPageHowToEarn/LandingPageHowToEarn";
import LandingPageAdvantage from "./LandingPageAdvantage/LandingPageAdvantage";
import LandingPageSmartSIP from "./LandingPageSmartSIP/LandingPageSmartSIP";
import LandingPagePremiumElite from "./LandingPagePremiumElite/LandingPagePremiumElite";
import LandingAboutPage from "./LandingAboutPage/LandingAboutPage";
import FooterForAllPage from "../FooterForAllPage/FooterForAllPage";
import Landingnavbar from "./Landingnavbar/Landingnavbar";
import PopupUnlockLandingPage from "./PopupUnlockLandingPage/PopupUnlockLandingPage";
import Cookies from 'js-cookie';
import Navbar from "../Navbar/Navbar";
import './landingpages.css';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const token = Cookies.get('jwtToken')

  useEffect(() => {
    if (!Cookies.get('jwtToken')){
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show after 5 seconds (5000 ms)
  
      return () => clearTimeout(timer);
    }
  }, []);

  
  return (
    <div className="landingpage-container">
      {!token && showPopup && <PopupUnlockLandingPage onClose={() => setShowPopup(false)} />}
      <LandingPageUnlockInvest />
      <LandingPageOurService />
      <LandingPageHowToEarn />
      <LandingPageAdvantage />
      <LandingPageSmartSIP />
      <LandingPagePremiumElite />
      <LandingAboutPage />
      {!token ? <Landingnavbar /> : <Navbar/>}
      <FooterForAllPage />
    </div>
  );
};

export default LandingPage;
