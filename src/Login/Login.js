import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie'
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
import logo from "./../assest/Logo design (1).png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import './Login.css'
import { height } from "@mui/system";

const override = {
  display: "block",
  textAlign: "center"
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading]= useState(false)
  const [isCookiesPresent, setCookiesPresent]= useState(false)
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Reset errors
  setEmailError("");
  setPasswordError("");

  // Validate inputs
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!isEmailValid) {
    setEmailError("Enter a valid email address.");
  }

  if (!isPasswordValid) {
    setPasswordError("Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol.");
  }

  if (!isEmailValid || !isPasswordValid) {
    setIsLoading(false);
    return; // Stop further execution if validation fails
  }

  if (!isForgotPassword) {
    try {
      const url = `/users/signin`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        Cookies.set("jwtToken", data.jwtToken);
        alert("Login Successful");
        navigate("/home");
      } else {
        // Handle specific errors
        if (response.status === 404) {
          setEmailError("Email not found. Please register.");
        } else if (response.status === 400) {
          setPasswordError("Incorrect password.");
        } else if (response.status === 401) {
          alert("Please Verify your mail.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
      alert("An error occurred. Please check your connection and try again.");
    }
        /*const userRegistrationData = JSON.parse(localStorage.getItem(email));
        if (userRegistrationData && userRegistrationData.email === email) {
          if (userRegistrationData.password === password) {
            alert("Login Successful");
            navigate("/home");
          } else {
            setPasswordError("Incorrect password.");
          }
        } else {
          setEmailError("Email not found. Please register.");
        }*/
  }
};

  /*const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid && !isForgotPassword) {
      const userRegistrationData = JSON.parse(localStorage.getItem(email));
      if (userRegistrationData && userRegistrationData.email === email) {
        if (userRegistrationData.password === password) {
          alert("Login Successful");
          navigate("/home");
        } else {
          setPasswordError("Incorrect password.");
        }
      } else {
        setEmailError("Email not found. Please register.");
      }
    }
  };*/

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setIsResetPasswordStep(false);
  };

  const handleForgotPasswordEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      const userRegistrationData = JSON.parse(localStorage.getItem(email));
      if (userRegistrationData) {
        setIsResetPasswordStep(true);
        setEmailError("");
      } else {
        setEmailError("Email not found. Please register.");
      }
    } else {
      setEmailError("Enter a valid email address.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setPasswordError("Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol.");
      return;
    }

    const userRegistrationData = JSON.parse(localStorage.getItem(email));

    if (userRegistrationData) {
      userRegistrationData.password = newPassword;
      localStorage.setItem(email, JSON.stringify(userRegistrationData));
      alert("Your password has been reset successfully.");
      setIsForgotPassword(false);
      setNewPassword("");
    } else {
      alert("Email not found. Please register.");
    }
  };
  const handleSuccess = async (response) => {
    const token = response.credential;
 
    try {
      const res = await fetch(`/users/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
 
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        console.log("Backend Response: ", data);
        alert("Login Successful");
        navigate("/home");
      } else {
        console.error("Authentication failed: ", data);
      }
    } catch (err) {
      console.error("Error sending token to backend: ", err);
    }
  };
 
 
  const handleFailure = (error) => {
    console.log("Login Failed: ", error);
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Login to FinanceShastra</h1>
        <p>Log in to continue your journey towards financial<br/> growth and informed investing.</p>
      </div>
      <div className="login-right">
        <div className="login-box">
          <img src={logo} alt="FinanceShastra Logo" className="logo" />
          <h2>{isForgotPassword ? "Reset Your Password" : "Welcome Back to FinanceShastra"}</h2>
          <p>{isForgotPassword ? "Enter your registered email to reset password." : "Login to get started using FinanceShastra"}</p>
          
          {isForgotPassword ? (
            isResetPasswordStep ? (
              <form onSubmit={handleResetPassword}>
                <div className="input-container">
                  <label>New Password*</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className={passwordError ? "input-error" : ""}
                  />
                  {passwordError && <span className="error-text">{passwordError}</span>}
                </div>
                <button type="submit" className="sign-in-btn">Reset Password</button>
                <button type="button" className="cancel-btn" onClick={() => setIsForgotPassword(false)}>Cancel</button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordEmailSubmit}>
                <div className="input-container">
                  <label>Email Address*</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={emailError ? "input-error" : ""}
                  />
                  {emailError && <span className="error-text">{emailError}</span>}
                </div>
                <div className="button-container">
    <button type="submit" className="sign-in-btn">Reset Password</button>
    <button type="button" className="cancel-btn" onClick={() => setIsForgotPassword(false)}>Cancel</button>
</div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={emailError ? "input-error" : ""}
                />
                {emailError && <span className="error-text">{emailError}</span>}
              </div>
              <div className="input-container">
                <label>Password*</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={passwordError ? "input-error" : ""}
                  />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
                {passwordError && <span className="error-text">{passwordError}</span>}
              </div>
              <div className="login-options">
                <div className="checksigninall">
                  <div className="signinall">
                  <div className="allsignall">
              <label >
  <input type="checkbox" />
  </label>
  </div>
  <div>
  <p>
  Remember me</p>
  </div>
  </div>
</div>
<div>
  <a href="#" onClick={handleForgotPasswordClick} className="forgot-password-link">
    Forgot Password?
  </a>
  </div>
</div>
              
                  <button type="submit" className="sign-in-btn">
                  Sign in
                  </button>
              
              <ClipLoader
                cssOverride={override}
                size={35}
                data-testid="loader"
                loading= {isLoading}
                speedMultiplier={1}
                color="green"
                
              />
            </form>
          )}

          <div className="login-or">Or Login With</div>
          <div className="sociall-login">
            <GoogleOAuthProvider clientId="505405282471-r6mpu3r3ib1ce06mlks7rhl2b7bodhq9.apps.googleusercontent.com" >
              <div className="Googlealll-btn" >
                <GoogleLogin 
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                />
              </div>
            </GoogleOAuthProvider>

            <br />
            <br />
            <Button
              variant="outlined"
              className="Googlelink-btn"
              startIcon={<FaLinkedin style={{fontSize:"26px"}}/>}
              component="a"
              href="https://www.linkedin.com/feed/"
              style={{ textTransform: "none" }}
            
            >
              Continue with LinkedIn
            </Button>
          </div>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#" onClick={handleRegisterClick}>Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;