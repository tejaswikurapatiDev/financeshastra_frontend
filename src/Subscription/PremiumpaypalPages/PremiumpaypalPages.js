import React, { useState } from "react";

import { FaPaypal } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { MdOutlineQrCodeScanner, MdPayment } from "react-icons/md";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import paypal from '../../assest/paypal.png';
const PremiumPaypalProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@gmail\.com$/; // Ensures "@gmail.com" is included
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, one uppercase letter, one number, one special character

  const handlePaypalProfileLogin = () => {
    const newErrors = {};

    // Validate email using regex
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password using regex
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@$!%?&).";
    }

    setErrors(newErrors);

    // If there are no errors, proceed with showing the popup
    if (Object.keys(newErrors).length === 0) {
      
      setShowPopup(true); // Show the popup
      setTimeout(() => {
        setShowPopup(false); // Automatically close the popup after 5 seconds
        // Add your actual redirect or API call logic here if needed
      }, 5000); // Popup duration set to 5 seconds
    }

  };





  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/premiumSubscriptionPages"); // Navigate to /billingDetailsPage
  };

  // Handle navigation on PayPal button click
  const handlePayPalClick = () => {
    navigate("/premiumPaypalProfilePage"); // Navigate to /PaypalProfilePage
  };
  const handleupiClick = () => {
    navigate("/premiumUPIPage"); // Navigate to /PaypalProfilePage
  };
  const handleScanAndPayProfilePage = () => {
    navigate("/premiumScanPage");
  };
  return (
    <div className="profilepageee-container">
      <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
      Premium Plan Subscription
      </h1>

      <div className="billing-detailspages-container">
        <div className="billing-detailspages-card">
          <h2 className="billing-detailspages-amount">
            <span style={{ color: "black" }}>Rs 5999</span> <br />
            <span style={{ color: "#888" }}>Due Feb 02, 2024</span>
          </h2>

          <p className="billing-detailspages-to"><strong style={{ color: "#888" }}>To </strong><span className="billing-detailspages-to-black">William</span></p>
          <p className="billing-detailspages-plan">
            <strong style={{ color: "#888" }}>Plan </strong>
            <span style={{ color: "black" }}>Premium</span>
            <span style={{ color: "#24b676" }}> (half Year)</span>
          </p>
 <div className="plan-features">
            <h4 className='plan-featuresh4'>
              <FontAwesomeIcon icon={faCircleCheck} />Features:
            </h4>
            <ul className="plan-featuresul">
              <li className="plan-featuresli">
                <span className="plan-featuresspan">50 Stock Recommendations</span>
                <span className="plan-featuresp"> : Expert recommendations to build a focused and profitable portfolio.</span>
              </li>
              <li className="plan-featuresli">
                <span>Stocks Screener</span>
                <span className="plan-featuresp"> : Access essential tools to analyze and screen stocks effectively.</span>
              </li>
              <li className="plan-featuresli">
                <span>Research Tool</span>
                <span className="plan-featuresp"> : Utilize advanced resources for in-depth stock research.</span>
              </li>
              <li className="plan-featuresli">
                <span>Discover Top-rated Stocks</span>
                <span className="plan-featuresp"> : Easily find the best-performing stocks.</span>
              </li>
            </ul>
          </div>

          <div className="plan-additional-benefits">
            <h4 className='plan-featuresh4'> <FontAwesomeIcon icon={faCircleCheck} />Additional Benefits:</h4>
            <ul className="plan-featuresul">
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Stock of the Month</span>
                <span className="plan-featuresp"> : One carefully selected stock handpicked by our investment committee every month.</span>
              </li>
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Research Reports</span>
                <span className="plan-featuresp"> : Access the real-time research report on any stock.</span>
              </li>
              <li className="plan-featuresli">
                <span className="plan-featuresspan">Momentum Stocks</span>
                <span className="plan-featuresp"> : Identify and capitalize on the best momentum stocks for any market phase.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="billing-detailspages-payment">
          <div className="billing-detailspages-payment-options">
            <button className="billing-detailspages-method" onClick={handleCardClick}>
              <div className="payment-option-content">
                <IoCard size={20} />
                <span>Card</span>
              </div>
            </button>

            <button className="billing-detailspages-method active" onClick={handlePayPalClick}>
              <div className="payment-option-content">
                <FaPaypal size={20} />
                <span>PayPal</span>
              </div>
            </button>

            <button className="billing-detailspages-method" onClick={handleupiClick}>
              <div className="payment-option-content">
                <MdPayment size={20} />
                <span>UPI</span>
              </div>
            </button>

            <button className="billing-detailspages-method" onClick={handleScanAndPayProfilePage}>
              <div className="payment-option-content">
                <MdOutlineQrCodeScanner size={20} />
                <span>Scan & Pay</span>
              </div>
            </button>
          </div>

          <h2 className="paypalprofilepage-title">Pay with PayPal</h2>

          <form className="paypalprofilepage-form">
            {/* Email Input */}
            <div className="paypalprofilepage-field">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`paypalprofilepage-input ${errors.email ? "error-border" : ""}`}
              />
              {errors.email && <p className="paypalprofilepage-error-text">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="paypalprofilepage-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`paypalprofilepage-input ${errors.password ? "error-border" : ""}`}
              />
              {errors.password && <p className="paypalprofilepage-error-text">{errors.password}</p>}
            </div>

            <p className="paypalprofilepage-forgot-password">Having trouble logging in?</p>

            <button
              type="button"
              className="paypalprofilepage-login-button"
              onClick={handlePaypalProfileLogin}
            >
              Log in
            </button>

            <div className="paypalprofilepage-divider">or</div>

            <button type="button" className="paypalprofilepage-create-account">
              Create an Account
            </button>
          </form>
          {/* Popup */}
          {showPopup && (
            <div className="paypal-popup">
              <div className="paypal-popup-content">
                <img
                  src={paypal}
                  alt="PayPal Logo"
                  className="paypal-logo"
                />
                <p>Redirecting to PayPal</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar />
      <FooterForAllPage />
    </div>
  );
};

export default PremiumPaypalProfilePage;
