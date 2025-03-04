import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Forgetresetpassworddarkmode.css'
import resetlogoimg from '../../assest/navlogo.png';



function Forgetresetpassworddarkmode() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Store error for confirm password
    const [passwordError, setPasswordError] = useState(""); // Error related to password
    const [passwordMatchError, setPasswordMatchError] = useState(""); // Error for password match
    const [submitted, setSubmitted] = useState(false);

    const validatePassword = (pwd) => {
        if (pwd.length < 8 || pwd.length > 12) {
            return "Password must be between 8 and 12 characters.";
        } 
        if (!/[A-Z]/.test(pwd)) {
            return "Password must contain at least one capital letter.";
        } 
        if (!/[a-z]/.test(pwd)) {
            return "Password must contain at least one lowercase letter.";
        } 
        if (!/\d/.test(pwd)) {
            return "Password must contain at least one number.";
        } 
        if (!/[!@#$%^&*]/.test(pwd)) {
            return "Password must contain at least one special character (!@#$%^&*).";
        }
        return ""; // No error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true); // Indicate that the form is submitted

        // Validate new password field
        if (!password) {
            setError("New password is required.");
            return; // Exit the function if the password field is empty
        }

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError); // Set password error if validation fails
            return;
        }

        // Validate confirm password field
        if (!confirmPassword) {
            setError("Confirm password is required.");
            return; // Exit if confirm password is empty
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match.");
            return;
        } else {
            setPasswordMatchError(""); // Clear error if passwords match
        }

        // If everything is fine, reset errors and show success
        setError("");
        setPasswordError("");
        alert("Password successfully reset!");
    };
  return (
    <div className="login-containerdarkmode">
         
      <div className="login-leftforgetresetdarkmode">
      <img src={resetlogoimg}  className="logoforgtdarkmode"/>
     
      </div>
      <div className="login-rightdarkmode">
        <div className="login-boxforgetcontaindarkmode">
    
     
        <h2 className="titledarkmode">Create a New Password</h2>
        <form onSubmit={handleSubmit}>
                        {/* New Password Field */}
                        <div className="input-groupreset">
                        
    <label className="titledarkmodenew">New Password*</label>
    <input
        type="password"
        className={`input-field ${submitted && !password ? "error-border" : ""}`}
        value={password}
        onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(validatePassword(e.target.value));  // Set error on password change
        }}
    />
    {/* Display 'New password is required.' error if the field is empty */}
    {submitted && !password && (
        <p className="error-text">New password is required.</p>
    )}
    {/* Display password validation error below input if the password is not empty */}
    {submitted && password && passwordError && (
        <p className="error-text">{passwordError}</p>
    )}
</div>


                        {/* Confirm Password Field */}
                        <div className="input-groupreset">
    <label className="titledarkmodenew">Confirm New Password*</label>
    <input
        type="password"
        className={`input-field ${submitted && !confirmPassword ? "error-border" : ""}`}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
    />
    {/* Display 'Confirm password is required.' error if the field is empty */}
    {submitted && !confirmPassword && (
        <p className="error-text">Confirm password is required.</p>
    )}
    {/* Display 'Passwords do not match' if passwords don't match */}
    {submitted && confirmPassword && password !== confirmPassword && (
        <p className="error-text">Passwords do not match.</p>
    )}
</div>


                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="submit-buttonresetpas" 
                            visible={!password || !confirmPassword || error || passwordError || passwordMatchError}
                        >
                            Submit
                        </button>

                        {/* Password Requirements */}
                        <div className="resetpasswordruledarkmode">
                            <p>New password must contain:</p>
                            <ul>
                                <li>Between 8 and 12 characters</li>
                                <li>At least one uppercase character</li>
                                <li>At least one lowercase character</li>
                                <li>At least one number and special character</li>
                            </ul>
                        </div>
                    </form>
        </div>
      </div>
    </div>
  );
}

export default Forgetresetpassworddarkmode;