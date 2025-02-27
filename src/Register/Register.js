import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import logoimg from '../assest/finanlogo.svg';
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import googleimg from '../assest/googleicon.svg';
import linkedinimg from '../assest/lin.png'
import logo from "../assest/Logo design (1).png";
import { API_BASE_URL } from "../config";



const override = {
  display: "block",
  textAlign: "center"
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading]= useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setIsLoading(true)
    if (!validateEmail(formData.email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const url= `${API_BASE_URL}/users/register`
      const options= {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
      const response= await fetch(url, options)
      
      setIsLoading(false)
      if (response.status===400){ 
        alert("User already registered with this email, please login.");
      }else{
        alert("Sign-Up Successful");
        navigate("/");
      }
      
      /*const existingUserData = JSON.parse(localStorage.getItem(formData.email));*/
      /*if (existingUserData) {
        alert("User already registered with this email.");
      } else {

        localStorage.setItem(formData.email, JSON.stringify(formData));
        alert("Sign-Up Successful");
        navigate("/");
      }*/
    }
    /*if (isValid) {
      const existingUserData = JSON.parse(localStorage.getItem(formData.email));
      if (existingUserData) {
        alert("User already registered with this email.");
      } else {
        localStorage.setItem(formData.email, JSON.stringify(formData));
        alert("Sign-Up Successful");
        navigate("/");
      }
    }*/
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSuccess = async (response) => {
    const token = response.credential;
 
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
 
      const data = await res.json();
      if (res.ok) {
        console.log("Backend Response: ", data);
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
              <img src={logoimg} className="logoforgt"/>
      </div>
      <div className="login-right">
        <div className="login-box">
        <h2 className="h2loginpage">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Name*</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
  name="password"
  value={formData.password}
  onChange={handleChange}
  required
  
  className={passwordError ? "input-error" : ""}
/>

                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  
                </span>
              </div>
              {passwordError && <span className="error-text">{passwordError}</span>}
            </div>
             <button type="submit" className="sign-in-btn">
              Sign Up
              
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
          <div className="login-or">Or Login With</div>
          <div className="sociall-login">
  <GoogleOAuthProvider clientId="911634901536-usv7quddvlrir3t8rv86ouqo5oehpsj6.apps.googleusercontent.com">
    <Button
      variant="contained"
      className="google-btn"
      startIcon={<img src={googleimg} alt="Google Icon" className="btn-icon-small" />}
      onClick={() => document.querySelector(".GoogleLogin button")?.click()} // Trigger Google Login button
      sx={{ fontSize: "14px" }} // Decrease font size
    >
      Sign in with Google
    </Button>

    <div style={{ display: "none" }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  </GoogleOAuthProvider>

  <br />

  <Button
  variant="contained"
  className="linkedin-btn"
  startIcon={<img src={linkedinimg} alt="LinkedIn Icon" className="btn-icon-small" />}
  component="a"
  href="https://www.linkedin.com/feed/"
  sx={{ fontSize: "14px" }} // Decrease font size
>
  Sign in with LinkedIn
</Button>

</div>
<div className="registerContgl">
  <p className="registerContglp">
    By clicking “Continue with Google/LinkedIn” or “Create Account”, you agree to Website’s  
    <a href="#"  className="registerContglblue-text"> Terms & Conditions</a>
    <a href="#"  className="registerContglblack-text"> and</a>
    <a href="#"  className="registerContglblue-text"> Privacy Policy</a>.
  </p>
</div>
          <div className="register-link">
          <p className="register-linkp">
              Already registered?{" "}
              <a href="#" onClick={handleSignInClick} className="sign-in-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;