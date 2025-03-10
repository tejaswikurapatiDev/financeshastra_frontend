import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Openemaildarkmode.css'
import logoimg from '../../assest/navlogo.png';
import inboximgdark from '../../assest/emaildark.png';


function Openemaildarkmode() {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const override = {
    display: "block",
    textAlign: "center"
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
  
    if (!email.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError(""); // Clear error if valid
      console.log("Form submitted with email:", email);
      // Add API call or navigation here
    }
  };
  
  
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
      const res = await fetch("http://localhost:3001/auth/google", {
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
    <div className="login-containerdarkmode">
         
      <div className="login-leftforgetdarkmode">
      <img src={logoimg} className="logoforgtdarkmode"/>
     
      </div>
      <div className="login-rightdarkmode">
        <div className="login-boxforgetdarkmode">
                 
                <img src={inboximgdark} className="inboximggdarkmode"/>
                  <h2 className="h2loginpagefcheckinboxdarkmode">Check Your Inbox</h2>
                  <p className="paraforgotdarkmode">We sent a password reset link to your email, please<br/>
                  check your inbox</p>
                  
                
                      
        
                      
                  <button 
          type="submit" 
          className="signbtnopengamail" 
          onClick={() => window.open("https://mail.google.com/", "_blank")}
        >
          Open Gmail
        </button>
        
                      
                   
               
               
        
                 <p className="paragraphforgettdark">Didn’t received the email? <strong style={{color:"#24b676",cursor:"pointer"}}>Resend</strong></p>
                  
                </div>
      </div>
    </div>
  );
}

export default Openemaildarkmode;