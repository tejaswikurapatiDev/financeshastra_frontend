import React from "react";
import "./StocksSmartSIPPSdark.css";
import smartsipimg from '../../assest/smartsipimgdark.png';
import Navbar from "../../Navbar/Navbar";

import FooterForAllPagedarkmode from "../FooterForAllPagedarkmode/FooterForAllPagedarkmode";
import Navbardarkmode from "../Navbardarkmode/Navbardarkmode";

function StocksSmartSIPPSdark() {
  return (
    <div className="smartsip-darkcontainer">
      <h1 className="smartsip-darktitle">Stocks SmartSIP</h1>
      <div className="smartsip-content">
        <img
          src={smartsipimg} // Replace this placeholder with your actual image URL
          alt="Stocks SmartSIP Illustration"
          className="smartsip-image"
        />
        <div className="smartsip-details">
          <h2 className="smartsip-darkdetailsh2">1. Benefits of SmartSIP</h2>
          <ul className="smartsip-darklist">
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
          <h2 className="smartsip-darkdetailsh2">2. Who is SmartSIP For?</h2>
          <ul className="smartsip-darklist">
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
          <h2 className="smartsip-darkdetailsh2">3. Additional Offerings</h2>
          <ul className="smartsip-darklist">
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
          <h3>Subscribe Now!</h3>
          <p>Choose a plan that aligns with your investment goals!</p>
          <button className="smartsip-button">Subscribe</button>
        </div>
      </div>
      <Navbardarkmode/>
      <div className="smartsipfooter"><FooterForAllPagedarkmode/></div>
      
    </div>
  );
}

export default StocksSmartSIPPSdark;
