import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Localpaymentpremium.css";
import { LuCreditCard } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LocalPaymentPremiumForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    country: "India",
    state: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    billingCycle: "Annually",
    termsAccepted: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    // Clear specific field error
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card Number is required.";
    if (!formData.expirationDate.trim()) newErrors.expirationDate = "Expiration Date is required.";
    if (!formData.securityCode.trim()) newErrors.securityCode = "Security Code is required.";
    if (!formData.state.trim()) newErrors.state = "State/Region is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address Line 1 is required.";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal Code is required.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      alert("Payment successfully completed!");
    }
  };

 
  const handleDateChange = (date) => {
    // Format date as MM/YY
    const formattedDate = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear() % 100}`;
    setFormData({ ...formData, expirationDate: formattedDate });
    setShowDatePicker(false); // Hide the date picker after selection
  };

  const handleBillingCycleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, billingCycle: value });

    // Navigate to the corresponding page based on the selected billing cycle
    if (value === "Annually") {
      navigate("/localpaymentpremiumForm");
    } else if (value === "Half-year") {
      navigate("/localhalfpremiumForm");
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
  const cardnumber = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
    setFormData({ ...formData, cardNumber: numericValue });
  
    // Validate postal code if needed (e.g., check length)
    if (numericValue.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: 'Please enter a valid card number.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { cardNumber, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <div className="payment-form-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoIosArrowForward /> Back
      </button>
      <h2>Payment Method</h2>

      <div className="buttonpayment-group">
      <button type="button" className="payment-button active"  onClick={()=> navigate("/localpaymentpremiumForm")}>
          Local Payment
        </button>
        <button type="button" className="payment-button" onClick={() => navigate("/paymentForm")}>
          PayPal
        </button>
      </div>

      <p className="payment-instructions">
        We’ll direct you to PayPal to finish this step. Once your details are verified, PayPal will return
        you to FinanceShastra, where your payment method will be confirmed.
      </p>
     
      <div class="custom-radio-group">
  <label>
    <input
      type="radio"
      class="custom-radio"
      name="paymentMethod"
      value="creditordebit"
      style={{background:"green",color:"white",center:"white"}}
      onChange={handleChange}
      onClick={() => navigate("/localpaymentpremiumForm")}
    />
    <span>Enter a Credit or Debit card details</span>
  </label>
  <label>
    <input
      type="radio"
      class="custom-radio"
      name="paymentMethod"
      value="upi"
      onChange={handleChange}
      onClick={() => navigate("/upiPaymentFormpremium")}
    />
    <span>UPI Payment</span>
  </label>
</div>

      <form onSubmit={handleSubmit} className="payment-form">
        {/* Card Details */}
        <div className="form-section">
          <h3>Card Details</h3>
          <div className="form-row">
            <div className={`form-group ${errors.fullName ? "error" : ""}`}>
              <label>Cardholder Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className={`form-group ${errors.cardNumber ? "error" : ""}`}>
              <label>Card Number*</label>
              <div className="input-icon-container">
                <LuCreditCard className="input-icon" />
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={cardnumber}
                />
              </div>
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.expirationDate ? "error" : ""}`}>
            <label>Expiration Date *</label>
            <div className="input-icon-container">
        <input
          type="text"
          name="expirationDate"
          placeholder="MM/YY"
          value={formData.expirationDate}
          onChange={handleChange}
          required
          readOnly // Make the input read-only to prevent manual typing
        />
        <MdOutlineDateRange 
          className="input-icon"
          onClick={() => setShowDatePicker(!showDatePicker)} // Toggle date picker visibility
        />
        {showDatePicker && (
          <DatePicker
            selected={formData.expirationDate ? new Date(`01/${formData.expirationDate}`) : null} // Convert MM/YY to a Date object
            onChange={handleDateChange}
            dateFormat="MM/yy"
            showMonthYearPicker
            openToDate={new Date()} // Set initial view to the current month/year
            shouldCloseOnSelect={true} // Close the date picker after selection
            inline // This will display the date picker inline, not as a popup
          />
        )}
      </div>
    
              {errors.expirationDate && <span className="error-message">{errors.expirationDate}</span>}
            </div>

            <div className={`form-group ${errors.securityCode ? "error" : ""}`}>
              <label>Security Code*</label>
              <input
                type="text"
                name="securityCode"
                placeholder="CVV"
                value={formData.securityCode}
                onChange={handleChange}
              />
              {errors.securityCode && <span className="error-message">{errors.securityCode}</span>}
            </div>
          </div>
        </div>

        {/* Billing Address */}
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
              />
              {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
            </div>

            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
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
        <div className="form-rrow">
          <h3 className="premiumheading">Premium Plan</h3>
          <p>₹7,999.00</p>
          </div>
        
          <div className="form-rrrow" >
          <h3>Total</h3>
          <p style={{ color: "black", fontWeight: "bold" }}>₹7,999.00</p>

          </div>
          <div className="paymentparagraph">
          <p className="paragraphpremium">Next payment on Dec 29, 2025: Premium plan at regular price — ₹7,999.00.</p></div>
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

          <button type="submit" className="completepayment-button">
         Complete your Payment
        </button>
        </div>

        {/* PayPal Button */}
       
      </form>
      <Navbar/>
    </div>
  );
};

export default LocalPaymentPremiumForm;