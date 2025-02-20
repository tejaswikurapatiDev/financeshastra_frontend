import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import googleimg from '../../assest/googleicon.svg';
import linkedinimg from '../../assest/lin.png';
import logoimg from '../../assest/navlogo.png';
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import './Logindarkmode.css'
import { height } from "@mui/system";

const override = {
  display: "block",
  textAlign: "center"
};

function Logindarkmode() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setIsLoading(true)

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
      const data= {
        email,
        password
      }
      const url='https://financeshastra-backendupdated.onrender.com/api/signin'
      const options={
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const response= await fetch(url, options)
      setIsLoading(false)
      if (response.status===404){
        setEmailError("Email not found. Please register.");
      }else if (response.status===400){
        setPasswordError("Incorrect password.");
      }else{
        alert("Login Successful");
        navigate("/dashboardchartmain");
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
    navigate("/registerdarkmode");
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
      <div className="login-leftdarkmode">
     
      <img src={logoimg} className="logoforgtdarkmode"/>
     
     
      </div>
      <div className="login-rightdarkmode">
        <div className="login-boxdarkmode">
         
        
          <h2 className="h2loginpagedarkmode">{isForgotPassword ? "Enter your registered email to reset password." : "LogIn"}</h2>
          
          {isForgotPassword ? (
            isResetPasswordStep ? (
              <form onSubmit={handleResetPassword}>
                <div className="input-containerdarkmode">
                  <label>New Password*</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className={passwordError ? "input-errordarkmode" : ""}
                  />
                  {passwordError && <span className="error-textdarkmode">{passwordError}</span>}
                </div>
                <button type="submit" className="sign-in-btndarkmode">Reset Password</button>
                <button type="button" className="cancel-btndarkmode" onClick={() => setIsForgotPassword(false)}>Cancel</button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordEmailSubmit}>
                <div className="input-containerdarkmode">
                  <label>Email Address*</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={emailError ? "input-errordarkmode" : ""}
                  />
                  {emailError && <span className="error-textdarkmode">{emailError}</span>}
                </div>
                <div className="button-containerdarkmode">
    <button type="submit" className="sign-in-btndarkmode">Reset Password</button>
    <button type="button" className="cancel-btndarkmode" onClick={() => setIsForgotPassword(false)}>Cancel</button>
</div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-containerdarkmode">
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={emailError ? "input-errordarkmode" : ""}
                />
                {emailError && <span className="error-textdarkmode">{emailError}</span>}
              </div>
              <div className="input-containerdarkmode">
                <label>Password*</label>
                <div className="password-fielddarkmode">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={passwordError ? "input-errordarkmode" : ""}
                  />
                  <span className="toggle-passworddarkmode" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
                {passwordError && <span className="error-textdarkmode">{passwordError}</span>}
              </div>
              <div className="login-optionsdarkmode">
                <div className="checksigninalldarkmode">
                  <div className="signinalldarkmode">
                  <div className="allsignalldarkmode">
              <label >
  <input type="checkbox" />
  </label>
  </div>
  <div>
  <p className="loginpageparadarkmode">
  Remember me</p>
  </div>
  </div>
</div>
<div>
  <a href="#" onClick={handleForgotPasswordClick} className="forgotpasswordlinkdarkmode">
    Forgot Password?
  </a>
  </div>
</div>
              
                  <button type="submit" className="sign-in-btndarkmode">
                  Log in
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

          <div className="login-ordarkmode">Or Sign Up With</div>
          <div className="sociall-logindarkmode">
  <GoogleOAuthProvider clientId="911634901536-usv7quddvlrir3t8rv86ouqo5oehpsj6.apps.googleusercontent.com">
    <Button
      variant="contained"
      className="google-btndarkmode"
      startIcon={<img src={googleimg} alt="Google Icon" className="btn-icon-smalldarkmode" />}
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
  className="linkedin-btndarkmode"
  startIcon={<img src={linkedinimg} alt="LinkedIn Icon" className="btn-icon-smalldarkmode" />}
  component="a"
  href="https://www.linkedin.com/feed/"
  sx={{ fontSize: "14px" }} // Decrease font size
>
  Sign in with LinkedIn
</Button>

</div>
<div className="registerContgldarkmode">
  <p className="registerContglpdarkmode">
    By clicking “Continue with Google/LinkedIn” or “Create Account”, you agree to Website’s  
    <a href="#" className="registerContglblue-textdarkmode"> Terms & Conditions</a>
    <a href="#" className="registerContglblack-textdarkmode"> and</a>
    <a href="#" className="registerContglblue-textdarkmode"> Privacy Policy</a>.
  </p>
</div>


          <div className="register-linkdarkmode">
            <p className="register-linkpdarkmode">
              Don't have an account? <a href="#" onClick={handleRegisterClick}>Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logindarkmode;