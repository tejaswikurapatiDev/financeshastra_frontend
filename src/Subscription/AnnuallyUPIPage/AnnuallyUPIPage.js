import React, { useState } from "react";
import phonepay from "../../assest/phonepe.png";
import googlepay from "../../assest/google-pay-logo.png";
import patym from "../../assest/patym.png";
import upilogo from '../../assest/upilogo.png'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import upilogoo from "../../assest/UPIColor.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faShieldAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const AnnuallyUPIPage = () => {
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopupSUCCESS, setsuccesspopup] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupGp, setShowPopupGp] = useState(false);
  const [showPopupPhonep, setShowPopupPhonep] = useState(false);
  const [showPopupPyt, setShowPopupPyt] = useState(false);
  const [showPopupforLogin, setShowPopupforLogin] = useState(false)
  const navigate = useNavigate()

  const onlogin = () => {
    navigate('/')
  }

  const handleUPIVerifyAndProceed = (e) => {
    e.preventDefault(); // Prevent form submission


    const newErrors = {};

    // UPI ID validation
    const upiIdRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiId || !upiIdRegex.test(upiId)) {
      newErrors.upiId = "Please enter a valid UPI ID.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with UPI Payment verification without timer or redirection

      const localuserDetails = (Cookies.get("jwtToken"))
      if (!localuserDetails) {
        setShowPopupforLogin(true)
      } else {
        setShowPopup(true)
        const decodedToken = jwtDecode(localuserDetails);
        const { email } = decodedToken;

        // Show the popup


        const userpaymentDetails = {
          'email': email,
          "planId": 1,
          "billingCycle": "yearly",
          "paymentMethod": "upi",
          'upiId': upiId
        }
        const localtoken = Cookies.get("jwtToken")
        const url = `${API_BASE_URL}/userPayment/paymentDetails1`
        const options = {
          method: "post",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${localtoken}`
          },
          body: JSON.stringify(userpaymentDetails)
        }
        fetch(url, options)
          .then(response => console.log(response))
          .then(data => {
            setShowPopup(false)
            setsuccesspopup(true);
            setTimeout(() => {
              setsuccesspopup(false); // Close success popup after 3s
              window.location.reload(); // Reload page
            }, 3000);

          })
          .catch(error => {
            console.error("Payment error:", error);
            // Optionally show an error popup
          })
      }

    }
  };
  const handleGPayClick = () => {
    setShowPopupGp(true);
    setTimeout(() => {
      setShowPopupGp(false);
      // Google Pay ki actual URL
    }, 3000); // 2 seconds ke baad redirect hoga
  };
  const handlePhPayClick = () => {
    setShowPopupPhonep(true);
    setTimeout(() => {
      setShowPopupPhonep(false);
      // Google Pay ki actual URL
    }, 3000); // 2 seconds ke baad redirect hoga
  };
  const handlePytClick = () => {
    setShowPopupPyt(true);
    setTimeout(() => {
      setShowPopupPyt(false);
      // Google Pay ki actual URL
    }, 5000); // 2 seconds ke baad redirect hoga
  };


  return (
    <div>
      <div className="upiallll">
        <div>
          <h2 className="paypalprofilepage-title">Pay with UPI</h2></div>
        <div>
          <img src={upilogoo} alt="upi logo" className="upi-logo" />
        </div>
      </div>
      <div className="upiprofilepage-icons">
        <img src={phonepay} alt="PhonePe" onClick={handlePhPayClick} style={{ cursor: "pointer" }} />
        {showPopupPhonep && (
          <div className="paypal-popup">
            <div className="paypal-popup-content">
              <img src={phonepay} alt="Google Pay Logo" className="paypal-logo" />

              <h2>Redirecting to PhonePay</h2>
            </div>
          </div>
        )}
        <img src={googlepay} alt="Google Pay" onClick={handleGPayClick} style={{ cursor: "pointer" }} />
        {showPopupGp && (
          <div className="paypal-popup">
            <div className="paypal-popup-content">
              <img src={googlepay} alt="Google Pay Logo" className="paypal-logo" />

              <h2>Redirecting to Gpay</h2>
            </div>
          </div>
        )}

        <img src={patym} alt="Paytm" onClick={handlePytClick} style={{ cursor: "pointer" }} />
        {showPopupPyt && (
          <div className="paypal-popup">
            <div className="paypal-popup-content">
              <img src={patym} alt="Google Pay Logo" className="paypal-logo" />

              <h2>Redirecting to Patym</h2>
            </div>
          </div>
        )}
      </div>
      <form className="upiprofilepage-form">
        <div className="upiprofilepage-field">
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className={`upi-input ${errors.upiId ? "error-border" : ""}`}
          />
          {errors.upiId && <p className="upiprofilepage-error-text">{errors.upiId}</p>}
        </div>

        <button className="upiprofilepage-verify-button" onClick={handleUPIVerifyAndProceed}>
          Verify & Proceed
        </button>
      </form>



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
      {showPopupSUCCESS && (
        <div className="payment-popup">
          <div className="payment-popup-content">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h2>Payment Successful!</h2>
            <p className="amount-paid">Amount Paid: ₹3999/-</p>
            <p className="payment-plan">Plan: Elite (Annually)</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnuallyUPIPage;