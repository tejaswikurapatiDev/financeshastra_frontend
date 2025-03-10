
import "./StocksSmartSIPPS.css";
import smartsipimg from '../../assest/smartsipimg.jpeg';
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";
import React, {
 
  useContext,
} from "react"


import { useNavigate } from "react-router-dom";
function StocksSmartSIPPS() {
   const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
   
  return (
    <div className={darkMode ? "smartsip-darkcontainer" : "smartsip-container"}>
      <h1 className={darkMode ? "smartsip-darktitle" :"smartsip-title"}>Stocks SmartSIP</h1>
      <div className="smartsip-content">
        <img
          src={smartsipimg} // Replace this placeholder with your actual image URL
          alt="Stocks SmartSIP Illustration"
          className="smartsip-image"
        />
        <div className="smartsip-details">
          <h2 className={darkMode ? "smartsip-darkdetailsh2" :"smartsip-detailsh2"}>1. Benefits of SmartSIP</h2>
          <ul className={darkMode ? "smartsip-darklist" :"smartsip-list"}>
            <li>
              <strong>Rupee Cost Averaging:</strong> Spread out investments to
              reduce the impact of market volatility.
            </li>
            <li>
              <strong>Wealth Compounding:</strong> Leverage the power of
              compounding for long-term wealth creation.
            </li>
            <li>
              <strong>Lower Risk Exposure:</strong> Systematic, smaller
              investments minimize risks associated with lump-sum investments.
            </li>
            <li>
              <strong>Flexible Options:</strong> Modify or pause investments
              anytime without penalties.
            </li>
          </ul>
          <h2 className= {darkMode ? "smartsip-darkdetailsh2" :"smartsip-detailsh2"}>2. Who is SmartSIP For?</h2>
          <ul className={darkMode ? "smartsip-darklist" :"smartsip-list"}>
            <li>
              <strong>Beginners:</strong> Investors starting with small amounts
              who want to enter the share market systematically.
            </li>
            <li>
              <strong>Experienced Investors:</strong> Those seeking automated
              and data-backed portfolio management for consistent growth.
            </li>
            <li>
              <strong>Goal-Oriented Individuals:</strong> Investors with
              specific, long-term financial goals in mind.
            </li>
          </ul>
          <h2 className= {darkMode ? "smartsip-darkdetailsh2" :"smartsip-detailsh2"}>3. Additional Offerings</h2>
          <ul className={darkMode ? "smartsip-darklist" :"smartsip-list"}>
            <li>
              <strong>Smart Alerts:</strong> Notifications on underperforming or
              overperforming stocks for timely decisions.
            </li>
            <li>
              <strong>Tax-Efficient Strategies:</strong> Recommendations aligned
              with tax-saving opportunities.
            </li>
            <li>
              <strong>Premium Advisory:</strong> Personalized consultations for
              high-net-worth individuals (HNIs).
            </li>
          </ul>
        </div>
        <div className="smartsip-subscribe">
          <h3 >Subscribe Now!</h3>
          <p>Choose a plan that aligns with your investment goals!</p>
          <button className="smartsip-button"onClick={() => navigate("/pricehalf")}>Subscribe</button>
        </div>
      </div>
      <Navbar/>
      <div className="smartsipfooter"><FooterForAllPage/></div>
      
    </div>
  );
}

export default StocksSmartSIPPS;
