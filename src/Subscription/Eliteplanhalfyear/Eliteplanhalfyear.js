
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai"; 
import { RxCross2 } from "react-icons/rx";

const Eliteplanhalfyear = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    country: "India",
    state: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    billingCycle: "Half-year",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [otpStep, setOtpStep] = useState(false); // OTP step state
  const [otp, setOtp] = useState(""); // OTP input state
  // Define phone number regex for 10-digit Indian numbers
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Clear errors for the field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
    const handlePhoneNumberChange = (e) => {
      const { value } = e.target;
      const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
      setFormData({ ...formData, phoneNumber: numericValue });
     
  
      // Validation for phone number (example: should be 10 digits)
      if (numericValue.length !== 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Please enter a valid 10-digit phone number.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { phoneNumber, ...rest } = prevErrors;
          return rest;
        });
      }
    };
  const handlePostalCodeChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
    setFormData({ ...formData, postalCode: numericValue });
  
    // Validate postal code if needed (e.g., check length)
    if (numericValue.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        postalCode: 'Please enter a valid postal code.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { postalCode, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit  phone number.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State/Region is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      // Proceed with further logic
      alert("Payment successfully done");
    }
  };

  const handleBillingCycleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, billingCycle: value });

    // Navigate to the corresponding page based on the selected billing cycle
    if (value === "Annually") {
      navigate("/elitepaymentForm");
    } else if (value === "Half-year") {
      navigate("/eliteplanhalfyear");
    }
  };

  const handleAddClick = () => setShowPopup(true);

  const handlePopupClose = () => {
    setShowPopup(false);
    setOtpStep(false); // Reset OTP step
    setOtp(""); // Clear OTP input
  };

  const handleSmsIconClick = () => {
    if (phoneRegex.test(formData.phoneNumber)) {
      setOtpStep(true); // Proceed to OTP step
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number.",
      }));
    }
  };


  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleOtpSubmit = () => {
    if (!otp.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Verification code is required.",
      }));
    } else if (otp !== "1234") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Invalid OTP. Please try again.",
      }));
    } else {
      alert("Account verified successfully!");
      handlePopupClose();
    }
  };

  return (
    <div className="payment-form-container">
      <button className="back-button">
        <IoIosArrowForward /> Back
      </button>
      <h2>Payment Method</h2>
      <div className="buttonpayment-group">
      <button type="button" className="payment-button "  onClick={()=> navigate("/localpaymentpremiumForm")}>
          Local Payment
        </button>
        <button type="button" className="payment-button active" onClick={() => navigate("/paymentForm")}>
          PayPal
        </button>
      </div>
      <p>
        We’ll direct you to PayPal to finish this step. Please remain patient and avoid skipping or
        interrupting the process. Once your details are verified, PayPal will automatically return
        you to FinanceShastra, where your payment method will be confirmed.
      </p>
     

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-section">
          <h3>Details</h3>
          <div className="form-row">
            <div className={`form-group ${errors.fullName ? "error" : ""}`}>
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
            <div className={`form-group ${errors.phoneNumber ? "error" : ""}`}>
              <label>Phone Number*</label>
              <div className="formm-group">
                <input
                  type="tel" // Changed to 'tel' for better mobile experience
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                />
                <button type="button" className="addpayment" onClick={handleAddClick}>
                  ADD +
                </button>
              </div>
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Billing Address</h3>
          <div className="form-row">
            <div className={`form-group ${errors.country ? "error" : ""}`}>
              <label>Country*</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="India">India</option>
                {/* Add more countries here */}
              </select>
            </div>
            <div className={`form-group ${errors.state ? "error" : ""}`}>
              <label>State/Region*</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state or region"
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className={`form-group ${errors.city ? "error" : ""}`}>
              <label>City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className={`form-group ${errors.postalCode ? "error" : ""}`}>
              <label>Zip/Postal Code*</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handlePostalCodeChange}
                placeholder="Enter your postal code"
              />
              {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.addressLine1 ? "error" : ""}`}>
              <label>Address Line 1*</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Enter your address"
              />
              {errors.addressLine1 && (
                <span className="error-message">{errors.addressLine1}</span>
              )}
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
          </div>
        </div>

        {/* Billing Cycle Section */}
        <div className="containerupi">
        <div class="billing-cycle-options">
  <label class="custom-radio-container">
    <input
      type="radio"
      class="custom-radio"
      name="paymentMethod"
      value="Annually"
      checked={formData.billingCycle === "Annually"}
      onChange={handleBillingCycleChange}
    />
    <span class="custom-radio-label">Annually</span>
    <p class="billingpayment">Most flexible option. Billed annually.</p>
  </label>

  <label class="custom-radio-container">
    <input
      type="radio"
      class="custom-radio"
      name="paymentMethod"
      value="Half-year"
      checked={formData.billingCycle === "Half-year"}
      onChange={handleBillingCycleChange}
    />
    <span class="custom-radio-label">Half-year</span>
    <p class="billingpayment">Most flexible option. Billed half-yearly.</p>
  </label>
   </div>
   </div>

        {/* Plan Summary */}
        <div className="plan-summary">
          <div className="form-rrowelite">
            <h3 className="premiumheading">Elite Plan</h3>
            <p>₹2,999.00</p>
          </div>

          <div className="form-rrrow">
            <h3>Total</h3>
            <p style={{ color: "black", fontWeight: "bold" }}>₹2,999.00</p>
          </div>
          <div className="paymentparagraph">
            <p className="paragraphpremium">
              Next payment on Dec 29, 2025: Premium plan at regular price — ₹2,999.00.
            </p>
          </div>
          <div className="checkboxpayment-container">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label>
              I authorize FinanceShastra to charge me on a recurring basis until I choose to cancel my
              subscription. I have read and agree to TradingView's Terms of Service and Privacy Policy.
            </label>
          </div>

          <button type="submit" className="paypal-button">
            PayPal
          </button>
        </div>
      </form>
      <Navbar />
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      {/* Close icon */}
      <button className="close-icon" onClick={handlePopupClose}>
        <RxCross2 />
      </button>

      <h3 className='accountverification'>Account Verification</h3>
      <p className="popupparagraph">
  Provide your phone number to receive a verification code.<br/> It will only be used for account verification purposes.
</p>

      <div className="popup-input">
        <span>+91</span>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button className="sms-icon-button" onClick={handleSmsIconClick}>
          <AiOutlineMessage />
        </button>
      </div>
      <p className="popuppara">
        By providing my phone number, I consent to receiving follow-up SMS/text messages
        and phone calls from FinanceShastra, in compliance with their
        <span className="privacy-policyspan"> Privacy Policy</span>.
      </p>

      {/* Conditionally render OTP section below the privacy policy */}
      {otpStep && (
  <div className="otp-section">
    <h3 className="otpverification">Verification Code</h3>
    <div className="otp-input-container">
      <input
        type="text"
        maxLength="4"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value); // Update OTP value on change
          setErrors((prevErrors) => ({ ...prevErrors, otp: "" })); // Clear errors on change
        }}
        className={`otp-input ${errors.otp ? "error-border" : ""}`} // Apply red border if there's an error
      />
      <button className="verifybtn" onClick={handleOtpSubmit}>
        Submit
      </button>
    </div>
    {errors.otp && <span className="error-message">{errors.otp}</span>} {/* Error message */}
  </div>
)}

</div>
  </div>
)}

    
    </div>
  );
};
export default Eliteplanhalfyear;