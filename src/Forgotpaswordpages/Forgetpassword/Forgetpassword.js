import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgetpassword.css";
import logoimg from "../../assest/finanlogo.svg";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleForgotPasswordEmailSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    // Validation
    if (!trimmedEmail) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    try {
      const url = `${API_BASE_URL}/users/forget-password`;
      const token = Cookies.get("jwtToken");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset link sent to your email!");
        navigate("/openemailforgotpass", { state: { email } });
      } else if (response.status === 404) {
        setEmailError("Email not found. Please enter a correct email.");
      } else {
        setEmailError(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-leftforget">
        <img
          src={logoimg}
          className="logoforgt"
          onClick={() => navigate("/login")}
          alt="Logo"
        />
      </div>

      <div className="login-right">
        <div className="login-boxforget">
          <h2 className="h2loginpageforgot">Forgot Password</h2>
          <p className="paraforgot">
            No worries! Enter your email address below and we’ll
            <br />
            send you a link to reset your password.
          </p>

          <form onSubmit={handleForgotPasswordEmailSubmit}>
            <div className="input-container">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className={`email-input ${emailError ? "input-error" : ""}`}
              />
              {emailError && (
                <span className="forgeterror-text">{emailError}</span>
              )}
            </div>

            <button
              type="submit"
              className={`sign-in-btn ${email ? "active" : "inactive"}`}
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className="paragraphforgett">
            Remember password?{" "}
            <strong
              style={{ color: "#0349A8", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login instead!
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
