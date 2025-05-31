import React, { useState, useContext } from "react";
import { DarkModeContext } from "../Portfoilo/context/DarkModeContext";
import { json, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import googleimg from "../assest/googleicon.svg";
import linkedinimg from "../assest/lin.png";
import logoimg from "../assest/finanlogo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

import logo from "./../assest/Logo design (1).png";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

import "./Login.css";
import { height } from "@mui/system";
import { API_BASE_URL } from "../config";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { requestNotificationPermission } from "../firebase/firebaseMessaging"; // Import FCM function

import { UserProfileContext } from "../Portfoilo/context/UserProfileContext";
import Meta from "../Meta";

const override = {
  display: "block",
  textAlign: "center",
};

function Login() {
  //darkmode context
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail } = useContext(UserProfileContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Please enter Email Address*");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address*");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Please enter Password*");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters*");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      /*fcm integration start*/
      let fcmToken = await requestNotificationPermission(); // Get FCM token
      if (!fcmToken) {
        fcmToken = null;
        console.warn("FCM token not available.");
      }
      /*fcm integration end*/
      const url = `${API_BASE_URL}/users/signin`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fcmToken }),
        credentials: "include",
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }
      const { jwtToken, username, deviceId } = data;

      if (response.ok === true) {
        alert("You are logged in successfully!");
        // ✅ Store in Local Storage
        localStorage.setItem("username", username);
        localStorage.setItem("deviceId",deviceId);
        Cookies.set("jwtToken", jwtToken, {
          expires: 7,
          sameSite: "Strict",
        });
        navigate("/home");
      }

      if (response.status === 404) {
        setEmailError("Invalid email address*");
      }
      if (response.status === 400){
        setPasswordError("Incorrect Password, please try again*")
      }
      if (response.status === 429){
         alert("Too many failed attempts, please try again later.")
      }
    } catch (error) {
      setPasswordError(error.message || "Invalid email or password*");
    } finally {
      setIsLoading(false);
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
      if (userEmail) {
        setIsResetPasswordStep(true);
        setEmailError("");
      } else {
        setEmailError("Email not found. Please register.*");
      }
    } else {
      setEmailError("Enter a valid email address.*");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol.*"
      );
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
    const token = response.credential; // Extract token from Google response

    if (!token) {
      console.error("Token not received from Google!*");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store JWT token in cookies
        Cookies.set("jwtToken", data.jwtToken, {
          expires: 1, // Token expiration (1 day)
          sameSite: "Strict",
          secure: true, // Ensure secure cookies (only works with HTTPS)
        });

        // Store user details in local storage for quick access

        navigate("/home");
      } else {
        console.error("Authentication failed:", data.error);
        alert(`Authentication Failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Error sending token to backend:", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleFailure = (error) => {
    
    alert("Google Sign-In failed. Please try again.");
  };

  return (
    <div className={darkMode ? "login-containerdarkmode" : "login-container"}>
      <Meta path="/login" />
      <div className={darkMode ? "login-leftdarkmode" : "login-left"}>
        <img
          src={logoimg}
          onClick={() => navigate("/")}
          className={darkMode ? "logoforgtdarkmode" : "logoforgtsign"}
        />
      </div>
      <div className={darkMode ? "login-rightdarkmode" : "login-right"}>
        <div className={darkMode ? "login-boxdarkmode" : "login-box"}>
          <h2 className={darkMode ? "h2loginpagedarkmode" : "h2loginpage"}>
            {isForgotPassword
              ? "Enter your registered email to reset password."
              : "Log In"}
          </h2>

          {isForgotPassword ? (
            isResetPasswordStep ? (
              <form onSubmit={handleResetPassword}>
                <div
                  className={
                    darkMode ? "input-containerdarkmode" : "input-container"
                  }
                >
                  <label>New Password*</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className={
                      darkMode
                        ? passwordError
                          ? "input-errordarkmode"
                          : ""
                        : passwordError
                        ? "input-error"
                        : ""
                    }
                  />
                  {passwordError && (
                    <span
                      className={darkMode ? "error-textdarkmode" : "error-text"}
                    >
                      {passwordError}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className={darkMode ? "sign-in-btndarkmode" : "sign-in-btn"}
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  className={darkMode ? "cancel-btndarkmode" : "cancel-btn"}
                  onClick={() => setIsForgotPassword(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordEmailSubmit}>
                <div
                  className={
                    darkMode ? "input-containerdarkmode" : "input-container"
                  }
                >
                  <label>Email Address*</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={
                      darkMode
                        ? emailError
                          ? "input-errordarkmode"
                          : ""
                        : emailError
                        ? "input-error"
                        : ""
                    }
                  />
                  {emailError && (
                    <span
                      className={darkMode ? "error-textdarkmode" : "error-text"}
                    >
                      {emailError}
                    </span>
                  )}
                </div>
                <div className="button-container">
                  <button
                    type="submit"
                    className={darkMode ? "sign-in-btndarkmode" : "sign-in-btn"}
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    className={darkMode ? "cancel-btndarkmode" : "cancel-btn"}
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                className={
                  darkMode ? "input-containerdarkmode" : "input-container"
                }
              >
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    darkMode
                      ? emailError
                        ? "input-errordarkmode"
                        : ""
                      : emailError
                      ? "input-error"
                      : ""
                  }
                />
                <br />
                {emailError && (
                  <span
                    className={
                      darkMode ? "error-textdarkmode" : "error-textlogin"
                    }
                  >
                    {emailError}
                  </span>
                )}
              </div>

              <div
                className={
                  darkMode ? "input-containerdarkmode" : "input-container"
                }
              >
                <label>Password*</label>
                <div
                  className="password-field"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={
                      darkMode
                        ? passwordError
                          ? "input-errordarkmode"
                          : ""
                        : passwordError
                        ? "input-error"
                        : ""
                    }
                    // Ensure space for the icon
                  />
                  {password && (
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "33px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </span>
                  )}
                </div>
                {passwordError && (
                  <span
                    className={
                      darkMode ? "error-textdarkmode" : "error-textlogin"
                    }
                  >
                    {passwordError}
                  </span>
                )}
              </div>

              <div className="login-options">
                <div className="checksigninall">
                  <div className="signinall">
                    <div className="allsignall">
                      <label>
                        <input type="checkbox" />
                      </label>
                    </div>
                    <div>
                      <p
                        className={
                          darkMode ? "loginpageparadarkmode" : "loginpagepara"
                        }
                      >
                        Remember me
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/reset-password");
                    }}
                    className={
                      darkMode
                        ? "forgotpasswordlinkdarkmode"
                        : "forgotpasswordlink"
                    }
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className={darkMode ? "sign-in-btndarkmode" : "sign-in-btn"}
                style={{
                  backgroundColor: isFormValid ? "#24b676" : "#ccc",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
                visible={!isFormValid}
              >
                Log in
              </button>

              <ClipLoader
                cssOverride={override}
                size={35}
                data-testid="loader"
                loading={isLoading}
                speedMultiplier={1}
                color="green"
              />
            </form>
          )}

          <div className={darkMode ? "login-or-darkmode" : "login-or"}>
            Or Sign Up With
          </div>
          <div className="social-login">
            <GoogleLogin
              variant="contained"
              className="google-btn"
              onSuccess={handleSuccess}
              onError={handleFailure}
              text="Sign in with Google"
              width="150"
              theme={`${darkMode ? "filled_blue" : "outline"}`}
            />
            <br />
          </div>
          <div className="registerContgl">
            <p className="registerContglp">
              By clicking “Continue with Google/LinkedIn” or “Create Account”,
              you agree to Website’s
              <a href="termsAndConditions" className="registerContglblue-text">
                {" "}
                Terms & Conditions
              </a>
              <a href="javascript:void(0)" className="registerContglblack-text">
                {" "}
                and
              </a>
              <a href="privacyPolicypage" className="registerContglblue-text">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="register-link">
            <p className="register-linkp">
              Don't have an account?{" "}
              <a href="javascript:void(0)" onClick={handleRegisterClick}>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
