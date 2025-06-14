import React, { useState } from "react";
import "./Footerhomeeepage.css";
import finanlog from "../assest/finanlogo.svg";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons

const FooterForhomeAllPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const navigate = useNavigate();
  const footerData = [
    { title: "Stocks", links: ["Stock Screener", "High Growth Stocks", "Nifty 50 Companies", "Small Cap Stocks", "Mid Cap Stocks","Large Cap Stocks"] },
    { title: "Mutual Fund", links: ["Fund Screener", "Best Small Cap Fund", "Best Growth Fund", "Best Flexi Cap Fund", "Best ETF Fund"] },
    { title: "Markets", links: ["Stock News", "IPO Details", "Market Insights", "Quarterly Earnings", "Learn"] },
    { title: "Quick Links", links: ["Plan & Pricing", "Talk to Us", "Disclaimer", "Refund Policy", "Careers"] },
    { title: "About Us", links: ["Who We Are?", "Why FinanceShastra?", "Contact Us"] },
  ];
  const stockRoutes = {
    "Stock Screener": "/Stock-Screener",
    "High Growth Stocks": "/stocks/high-growth-stocks",
    "Nifty 50 Companies": "/nifty-50-stocks-list",
    "Small Cap Stocks": "/small-cap-stocks",
    "Mid Cap Stocks": "/mid-cap-stocks",
    "Large Cap Stocks":"/large-cap-stocks"
  };
  const mutualRoutes = {
    "Top Rated Funds": "/mutual-funds/top-rated-mutual-funds",
    "Fund Screener": "/mutual-funds/fund-screener",
    "Best Small Cap Fund": "/mutual-funds/best-small-cap-fund",
    "Best Growth Fund": "/mutual-funds/best-growth-funds",
    "Best Flexi Cap Fund": "/flexregular",
    "Best ETF Fund": "/mutual-funds/exchange-traded-funds",
  };
  const learnRoutes = {
    "Stock News": "/stock-market-news",
    "IPO Details": "/markets/ipo-details",
    "Blogs": "/blogs",
    "Market Insights": "/marketinsights",
    "Quarterly Earnings": "/markets/earnings",
    "Markets": "/learncard",
  };
  
  // Mapping object for Quick Links routes
  const quickLinksRoutes = {
    "Plan & Pricing": "/subscription",
    "Talk to Us": "/talktous",
    "Disclaimer": "/disclaimer",
    "Refund Policy": "/refundpolicy",
    "Careers": "/career",
  };
  const allRoutes = { ...stockRoutes, ...mutualRoutes, ...learnRoutes, ...quickLinksRoutes };
  return (
    <>
      {/* Desktop Footer */}
      <footer className="FooterForAllPage-footerrr">
        <div className="FooterForAllPage-top-section">
          <div className="FooterForAllPage-stock-list">
            <div className="FooterForAllPage-stock-letters">
              <span className="FooterForAllPage-stock-title">Stock List</span>
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <span key={letter} className="FooterForAllPage-letter">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="FooterForAllPage-main-section">
          <div className="FooterForAllPage-logo-social">
            <div className="FooterForAllPage-logo">
              <img src={finanlog} alt="FinanceShastra Logo" onClick={() => navigate("/")} style={{cursor:"pointer"}} className="FooterForAllPage-logo-img" />
            </div>
            <div className="FooterForAllPage-social-iconss">
              <a href="javascript:void(0)" className="FooterForAllPage-social-icon"><FaFacebookF /></a>
              <a href="javascript:void(0)" className="FooterForAllPage-social-icon"><FaTwitter /></a>
              <a href="javascript:void(0)" className="FooterForAllPage-social-icon"><AiFillInstagram /></a>
              <a href="javascript:void(0)" className="FooterForAllPage-social-icon"><FaLinkedinIn /></a>
              <a href="javascript:void(0)" className="FooterForAllPage-social-icon"><FaYoutube /></a>
            </div>
          </div>

          <div className="FooterForAllPage-links-section">
            {[
              { title: "Stocks", links: ["Stock Screener", "High Growth Stocks", "Nifty 50 Companies","Small Cap Stocks", "Mid Cap Stocks","Large Cap Stocks"] },
              { title: "Mutual Fund", links: ["Top Rated Funds","Fund Screener", "Best Small Cap Fund", "Best Growth Fund", "Best Flexi Cap Fund", "Best ETF Fund"] },
              { title: "Markets", links: ["Stock News", "IPO Details"," Blogs","Market Insights", "Quarterly Earnings", "Learn"] },
              { title: "Quick Links", links: ["Plan & Pricing", "Talk to Us", "Disclaimer", "Refund Policy", "Careers"] },
              { title: "About Us", links: ["Who We Are?", "Why FinanceShastra?", "Contact Us"] },
            ].map((section, index) => (
              <div key={index} className="FooterForAllPage-column">
              <h4 className="FooterForAllPage-column-title">{section.title}</h4>
              <ul className="FooterForAllPage-column-list">
                {section.links.map((link, linkIndex) => (
                 <li
                 key={linkIndex}
                 onClick={() => {
                   // Navigate if the link has a corresponding route
                   if (allRoutes[link]) {
                     navigate(allRoutes[link]);
                   }
                 }}
                 style={{
                   cursor: allRoutes[link] ? "pointer" : "default",
                 }}
               >
                 {link}
               </li>
                ))}
              </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="FooterForAllPage-bottom-section">
          <p className="FooterForAllPage-copyright">
            Copyright © 2024 FinanceShastra <br /> All Rights Reserved |{" "}
            <a href="javascript:void(0)" className="FooterForAllPage-link">Terms and Conditions</a> |{" "}
            <a href="javascript:void(0)" className="FooterForAllPage-link">Privacy Policy</a>
          </p>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="footermobileviewpages-footer">
      <div className="footermobileviewpages-main-section">
        {footerData.map((section, index) => (
          <div key={index} className="footermobileviewpages-column">
            <div
              className="footermobileviewpages-column-title"
              onClick={() => toggleSection(index)}
            >
              {section.title}
              <span className="footermobileviewpages-arrow">
                {openSection === index ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </div>
            {openSection === index && (
              <ul className="footermobileviewpages-column-list">
                {section.links.map((link, linkIndex) => (
                  <li
                  key={linkIndex}
                  onClick={() => {
                    // Navigate if the link has a corresponding route
                    if (allRoutes[link]) {
                      navigate(allRoutes[link]);
                    }
                  }}
                  style={{
                    cursor: allRoutes[link] ? "pointer" : "default",
                  }}
                >
                  {link}
                </li>
                ))}
              </ul>
           )}
         </div>
          ))}

          <div className="footermobileviewpages-stock-section">
            
            <div className="footermobileviewpages-stock-letters">
            <p className="footermobileviewpages-stock-title">Stock List</p>
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <span key={letter} className="footermobileviewpages-letter">{letter}</span>
              ))}
            </div>
          </div>

          <div className="footermobileviewpages-social-icons">
            <a href="javascript:void(0)" className="footermobileviewpages-social-icon"><FaFacebookF /></a>
            <a href="javascript:void(0)" className="footermobileviewpages-social-icon"><FaTwitter /></a>
            <a href="javascript:void(0)" className="footermobileviewpages-social-icon"><AiFillInstagram /></a>
            <a href="javascript:void(0)" className="footermobileviewpages-social-icon"><FaLinkedinIn /></a>
            <a href="javascript:void(0)" className="footermobileviewpages-social-icon"><FaYoutube /></a>
          </div>
          <div className="footermobileviewpages-bottom-section">
  <p className="footermobileviewpages-copyright">
    <span className="copyright-text">Copyright © 2024 FinanceShastra</span>
    <br />
    <span className="rights-text">
      All Rights Reserved |{" "}
      <a href="javascript:void(0)" className="footermobileviewpages-link">Terms and Conditions</a> |{" "}
      <a href="javascript:void(0)" className="footermobileviewpages-link">Privacy Policy</a>
    </span>
  </p>
</div>

        </div>

        
      </footer>
    </>
  );
};

export default FooterForhomeAllPage;
