import React, { useState } from "react";
import paypal from '../../assest/paypal.png';
const AnnuallyPremiumPaypalProfilePage = () => {
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
  return (
<>
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
          </>
        
  );
};

export default AnnuallyPremiumPaypalProfilePage;
