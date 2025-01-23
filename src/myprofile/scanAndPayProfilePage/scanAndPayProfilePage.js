import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { IoCard } from "react-icons/io5";
import { FaPaypal } from "react-icons/fa";
import { MdPayment, MdOutlineQrCodeScanner } from "react-icons/md";
import qrcode from '../../assest/upilogoo.png';
import { useNavigate } from "react-router-dom";
import "./scanAndPayProfilePage.css";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const ScanPayProfilePage = () => {
    const navigate = useNavigate();
  
    const handleScanAndPayProfilePage = () => {
     navigate("/scanPayProfilePage");
    };
  
    const handleCardClick = () => {
      navigate("/billingDetailsPage"); // Navigate to /billingDetailsPage
    };
  
    const handlePayPalClick = () => {
      navigate("/PaypalProfilePage"); // Navigate to /PaypalProfilePage
    };
  
    const handleUPIClick = () => {
      navigate("/uPIProfilePage"); // Navigate to /uPIProfilePage
    };
  
  return (
    <div className="profilepageee-container">
      <h1 className="profilepage-title" style={{ fontFamily: "Calibri" }}>
        Billing Details
      </h1>

      {/* Navigation Tabs */}
      <div className="profilepage-tabsorderusers" >
        <span className="profilepage-tabb"onClick={() => navigate("/userDetailsupdate")}
       >My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb"  style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }}onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb" onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb"onClick={() => navigate('/myReferalPage')}>My referrals</span>
      </div>
      {/* Billing Details Section */}
      <div className="billing-detailspages-container">
        <div className="billing-detailspages-card">
          <h2 className="billing-detailspages-amount">
            <span style={{ color: "black" }}>Rs 2000</span> <br />
            <span style={{ color: "#888" }}>Due Feb 02, 2024</span>
          </h2>

          <p className="billing-detailspages-to">
            <strong style={{ color: "#888" }}>To </strong>
            <span className="billing-detailspages-to-black">William</span>
          </p>
          <p className="billing-detailspages-plan">
            <strong style={{ color: "#888" }}>Plan </strong>
            <span style={{ color: "black" }}>Elite</span>
            <span style={{ color: "#24b676" }}> (Half Year)</span>
          </p>

          {/* Plan Features */}
          <div className="plan-features">
            <h4 className="plan-featuresh4">
              <FontAwesomeIcon icon={faCircleCheck} /> Features:
            </h4>
            <ul className="plan-featuresul">
              <li className="plan-featuresli">
                <span className="plan-featuresspan">50 Stock Recommendations</span>
                <span className="plan-featuresp">
                  : Expert recommendations to build a focused and profitable
                  portfolio.
                </span>
              </li>
              <li className="plan-featuresli">
                <span>Stocks Screener</span>
                <span className="plan-featuresp">
                  : Access essential tools to analyze and screen stocks
                  effectively.
                </span>
              </li>
              <li className="plan-featuresli">
                <span>Research Tool</span>
                <span className="plan-featuresp">
                  : Utilize advanced resources for in-depth stock research.
                </span>
              </li>
              <li className="plan-featuresli">
                <span>Discover Top-rated Stocks</span>
                <span className="plan-featuresp">
                  : Easily find the best-performing stocks.
                </span>
              </li>
            </ul>
          </div>

          {/* Additional Benefits */}
          <div className="plan-additional-benefits">
            <h4 className="plan-featuresh4">
              <FontAwesomeIcon icon={faCircleCheck} /> Additional Benefits:
            </h4>
            <ul className="plan-featuresul">
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Stock of the Month</span>
                <span className="plan-featuresp">
                  : One carefully selected stock handpicked by our investment
                  committee every month.
                </span>
              </li>
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Research Reports</span>
                <span className="plan-featuresp">
                  : Access the real-time research report on any stock.
                </span>
              </li>
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Momentum Stocks</span>
                <span className="plan-featuresp">
                  : Identify and capitalize on the best momentum stocks for any
                  market phase.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="billing-detailspages-payment">
          <div className="billing-detailspages-payment-options">
            <button className="billing-detailspages-method" onClick={handleCardClick}>
              <div className="payment-option-content">
                <IoCard size={20} />
                <span>Card</span>
              </div>
            </button>

            <button className="billing-detailspages-method" onClick={handlePayPalClick}>
              <div className="payment-option-content">
                <FaPaypal size={20} />
                <span>PayPal</span>
              </div>
            </button>

            <button className="billing-detailspages-method " onClick={handleUPIClick}>
              <div className="payment-option-content">
                <MdPayment size={20} />
                <span>UPI</span>
              </div>
            </button>

            <button
              className="billing-detailspages-method active"
              onClick={handleScanAndPayProfilePage}
            >
              <div className="payment-option-content">
                <MdOutlineQrCodeScanner size={20} />
                <span>Scan & Pay</span>
              </div>
            </button>
          </div>

          {/* QR Code Section */}
          
            <div className="scanAndPayProfilePage-qr-section">
              <h2 className="scanAndPayProfilePage-qr-sectionh2">Dynamic QR Generated</h2>
              <p className="scanAndPayProfilePage-qr-sectionp">Is it more convenient to pay by phone?</p>
              <p>
                <strong className="scanAndPayProfilePage-qr-sectionstong">Scan QR code</strong>
              </p>
              <div className="scanAndPayProfilePage-qr-code">
                <img
                  src={qrcode}
                  alt="QR Code"
                />
              </div>
            </div>
          </div>
        </div>
        <Navbar/>
        <FooterForAllPage/>
      </div>
   
  );
};

export default ScanPayProfilePage;
