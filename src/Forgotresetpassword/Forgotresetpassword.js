import React, { useState, useEffect } from "react";
import "./Forgotresetpassword.css";
import resetlogoimg from "../assest/finanlogo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Forgotresetpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    setPasswordError("");
    setPasswordMatchError("");
  }, [password, confirmPassword]);

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
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!password) {
      setPasswordError("New password is required.");
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (!confirmPassword) {
      setPasswordMatchError("Confirm password is required.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    try {
      const url = `${API_BASE_URL}/users/reset-password/${token}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to reset password.");
        return;
      }

      alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-leftforgetreset">
        <img
          src={resetlogoimg}
          className="logoforgt"
          alt="Reset Logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="login-right">
        <div className="login-boxforgetcontain">
          <h2 className="title">Create a New Password</h2>
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="input-groupreset">
              <label>New Password*</label>
              <input
                type="password"
                className={`input-field ${passwordError ? "error-border" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {submitted && passwordError && (
                <p className="error-text">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-groupreset">
              <label>Confirm New Password*</label>
              <input
                type="password"
                className={`input-field ${passwordMatchError ? "error-border" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {submitted && passwordMatchError && (
                <p className="error-text">{passwordMatchError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-buttonresetpas"
              disabled={!password || !confirmPassword}
            >
              Submit
            </button>

            {/* Password Rules */}
            <div className="resetpasswordrule">
              <p>New password must contain:</p>
              <ul>
                <li>Between 8 and 12 characters</li>
                <li>At least one uppercase character</li>
                <li>At least one lowercase character</li>
                <li>At least one number</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgotresetpassword;
