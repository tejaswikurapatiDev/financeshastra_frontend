import React, { useContext, useState, useEffect } from "react";
import upiLogo from '../../assest/upii.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FaPaypal } from 'react-icons/fa';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { MdPayment } from 'react-icons/md';
import upilogo from '../../assest/upilogo.png'
import { jwtDecode } from "jwt-decode";
import upiLogoimg from '../../assest/upi.webp';
import upilogoo from "../../assest/UPIColor.png";
import card1 from '../../assest/visa.png';
import card2 from '../../assest/mastercard.png';
import Cookies from 'js-cookie'
import card3 from '../../assest/american express.png';
import card4 from '../../assest/unionpay.png';
import { faShieldAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config"
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import './AnnuallyPremiumSubscriptionPages.css';
import AnnuallyPremiumPaypalProfilePage from "../AnnuallyPremiumPaypalProfilePage/AnnuallyPremiumPaypalProfilePage";
import AnnuallyPremiumUPIPage from "../AnnuallyPremiumUPIPage/AnnuallyPremiumUPIPage";
import AnnuallyPremiumScanPage from "../AnnuallyPremiumScanPage/AnnuallyPremiumScanPage";

registerLocale("en-GB", enGB);
const AnnuallyPremiumSubscriptionPages = () => {
  const { user } = useContext(UserProfileContext)
  const { userEmail } = useContext(UserProfileContext)
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupforLogin, setShowPopupforLogin] = useState(false)
  const [showPopupPaymentsuccess, setsuccesspopup]= useState(false)
  const [activepage, setactivepage] = useState('upi')
  const [userName, setUsername] = useState("");

  useEffect(() => {
      // Fetch username from localStorage when the component mounts
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);

  const validateInputs = () => {
    let hasErrors = false;
    const newErrors = {};

    if (!cardNumber || cardNumber.length !== 16) {
      newErrors.cardNumber = "Invalid card number";
      hasErrors = true;
    }
    if (!expiryDate) {
      newErrors.expiryDate = "Invalid expiry date";
      hasErrors = true;
    }
    if (!cvc || cvc.length !== 3) {
      newErrors.cvc = "Invalid CVC";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const onlogin = () => {
    navigate('/login')
  }

  const handlePaymentBillingDetailsPage = async () => {
    setShowPopup(true);
    if (validateInputs()) {
      // All fields are valid, show the popup
      const localuserDetails = (Cookies.get("jwtToken"))
      if (!localuserDetails) {
        setShowPopupforLogin(true)
        console.log(localuserDetails)
      } else {
        const decodedToken = jwtDecode(localuserDetails);
        const { email } = decodedToken;
        const month = expiryDate.getMonth() + 1
        const year = expiryDate.getFullYear()
        const expiryDateFormated = `${year}-0${month}-01`
        const userpaymentDetails = {
          'email': email,
          "planId": 2,
          "billingCycle": "yearly",
          "paymentMethod": "card",
          "cardNum": cardNumber,
          "cardExpiryDate": expiryDateFormated
        }
        const token = Cookies.get('jwtToken')
        const options = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(userpaymentDetails)
        }
        const url = `${API_BASE_URL}/userPayment/paymentDetails1`
        const response = await fetch(url, options)
        console.log(response)
        setTimeout(() => {
        setShowPopup(false);

      }, 5000);
        setsuccesspopup(true)
        setCardNumber('')
        setExpiryDate(null)
        setCvc('')
      }

      // Simulate redirecting to PayPal or payment process
       // Hide the popup after 3 seconds
      setTimeout(() => {
        setsuccesspopup(false);

      }, 5000); 
    }
  };

  const CustomInput = ({ value, onClick }) => (
    <div className="custom-datepicker-input" onClick={onClick}>
      <input
        type="text"
        value={value}
        placeholder="MM / YYYY"
        readOnly
        className="billing-detailspages-expiry-input"
      />
      <FaCalendarAlt className="calendar-iconnns" />
    </div>
  );
  const navigate = useNavigate();
  const handleCardClick = () => {
    setactivepage('card')
    navigate("/subscribe-Premium"); // Navigate to /billingDetailsPage
  };

  // Handle navigation on PayPal button click
  const handlePayPalClick = () => {
    setactivepage('paypal') // Navigate to /PaypalProfilePage
  };
  const handleupiClick = () => {
    setactivepage('upi') // Navigate to /PaypalProfilePage
  };
  const handleScanAndPayProfilePage = () => {
    setactivepage('scan')
  };


  return (
    <div>
      <div className="profilepageeeccontainer">

        <h1 className="profilepagtitle" style={{ fontFamily: 'Calibri' }}>
          Premium Plan Subscription</h1>


        <div className="billing-detailspages-container">
          <div className="billing-detailspages-card">
            <h2 className="billing-detailspages-amount">
              <span style={{ color: "black" }}>Rs 7999</span> <br />
              <span style={{ color: "#888" }}>Due Feb 02, 2024</span>

            </h2>

            <p className="billing-detailspages-to"><strong style={{ color: "#888" }}>To </strong>  <span className="billing-detailspages-to-black">{userName}</span></p>
            <p className="billing-detailspages-plan">
              <strong style={{ color: "#888" }}>Plan </strong>
              <span style={{ color: "black" }}> Premium</span>
              <span style={{ color: "#24b676" }}> (Annually)</span>
            </p>

            <div class="plan-features">
              <h4 className='plan-featuresh4'>
                <FontAwesomeIcon icon={faCircleCheck} />Features:
              </h4>
              <ul className="plan-featuresul">
                <li className="plan-featuresli">
                  <span className='plan-featuresspan'> 50 Stock Recommendations</span>
                  <span className='plan-featuresp'> : Expert recommendations to build a focused and profitable portfolio.</span>
                </li>
                <li className="plan-featuresli">
                  <span>Stocks Screener </span>
                  <span className='plan-featuresp'> : Access essential tools to analyze and screen stocks effectively.</span>
                </li>
                <li className="plan-featuresli">
                  <span> Research Tool </span>
                  <span className='plan-featuresp'> : Utilize advanced resources for in-depth stock research.</span>
                </li>
                <li className="plan-featuresli">
                  <span>  Discover Top-rated Stocks</span>
                  <span className='plan-featuresp'> : Easily find the best-performing stocks.</span>
                </li>
              </ul>
            </div>
            <div class="plan-additional-benefits">
              <h4 className='plan-featuresh4'> <FontAwesomeIcon icon={faCircleCheck} />Additional Benefits:</h4>
              <ul className="plan-featuresul">
                <li className="plan-featuresli">
                  <span className='plan-featuresspan'> Stock of the Month</span>
                  <span className='plan-featuresp'> : One carefully selected stock handpicked by our investment committee every month.</span>
                </li>
                <li className="plan-featuresli">
                  <span className='plan-featuresspan'>Research Reports </span>
                  <span className='plan-featuresp'> : Access the real-time research report on any stock.</span>
                </li>
                <li className="plan-featuresli">
                  <span className='plan-featuresspan'>Momentum Stocks </span>
                  <span className="plan-featuresp"> : Identify and capitalize on the best momentum stocks for any market phase.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="billing-detailspages-payment">
            <div className="billing-detailspages-payment-options">
             

             
              <button className={activepage === "upi" ? "billing-detailspages-method active" : "billing-detailspages-method"} onClick={handleupiClick}>
                <div className="payment-option-content">
                   <img src={upiLogo} alt="UPI Logo" style={{ height: "20px", marginRight: "8px" }}  />
                  <span>UPI</span>
                </div>
              </button>
              <button className={activepage === "scan" ? "billing-detailspages-method active" : "billing-detailspages-method"} onClick={handleScanAndPayProfilePage}>
                <div className="payment-option-content">
                  <MdOutlineQrCodeScanner size={20} />
                  <span>Scan & Pay</span>
                </div>
              </button>
            </div>
          

                
             
              {activepage === 'upi' && <AnnuallyPremiumUPIPage/>}
              {activepage === "scan" && <AnnuallyPremiumScanPage/>}

            {/* Popup */}
            {showPopupforLogin && (
              <div className="payment-popup">
                <div className="payment-popup-content">
                  <h2>You Are not Logged in!</h2>
                  <p className="amount-paid">Please Login</p>
                  <button type="button" onClick={onlogin}
                    className="loginbtn billing-detailspages-pay-button">Login</button>
                </div>
              </div>
            )}
            {showPopup && (
        <div className="paypal-popup">
          <div className="paypal-popup-content">
            <img
              src={upilogo}
              alt="UPI Logo"
              className="paypal-logo"
            />
            <p>Verifying UPI ID...</p>
          </div>
        </div>
      )}
            {showPopupPaymentsuccess && (
              <div className="payment-popup">
                <div className="payment-popup-content">
                  <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                  <h2>Payment Successful!</h2>
                  <p className="amount-paid">Amount Paid: ₹7999/-</p>
                  <p className="payment-plan">Plan: Premium (Annually)</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Navbar />

      </div>
      <div >
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default AnnuallyPremiumSubscriptionPages;