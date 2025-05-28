import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Openemailforgotpass.css";
import logoimg from "../../assest/finanlogo.svg";
import inboximg from "../../assest/inbox.jpeg";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";

function Openemailforgotpass() {
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const override = {
    display: "block",
    textAlign: "center",
  };

  const resendEmailLink = async (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setIsLoading(true);

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid && !isForgotPassword) {
      const data = {
        email,
        password,
      };
      const url =
        "https://financeshastra-backendupdated.onrender.com/api/signin";
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      setIsLoading(false);
      if (response.status === 404) {
        setEmailError("Email not found. Please register.");
      } else if (response.status === 400) {
        setPasswordError("Incorrect password.");
      } else {
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
      setPasswordError(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol."
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
    const token = response.credential;

    try {
      const res = await fetch("http://localhost:3001/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        
      } else {
        console.error("Authentication failed: ", data);
      }
    } catch (err) {
      console.error("Error sending token to backend: ", err);
    }
  };

  const handleFailure = (error) => {
    
  };
  return (
    <div className="login-container">
      <div className="login-leftforget">
        <img src={logoimg} className="logoforgt" 
          onClick={() => {
            navigate("/");
          }}/>
      </div>
      <div className="login-right">
        <div className="login-boxforgetemail">
          <img src={inboximg} className="inboximgg" />
          <h2 className="h2loginpagefcheckinbox">Check Your Inbox</h2>
          <p className="paraforgot">
            We sent a password reset link to your email, please
            <br />
            check your inbox
          </p>
   {/* <button
            type="submit"
            className="signbtnopengamail"
            onClick={() => window.open("https://mail.google.com/", "_blank")}
          >
            Open Email
          </button>
*/}

          <p className="paragraphforgett">
            Didn’t received the email ?{" "}
            <strong
              style={{ color: "#0349A8", cursor: "pointer" }}
              onClick={resendEmailLink}
            >
              Resend
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Openemailforgotpass;
