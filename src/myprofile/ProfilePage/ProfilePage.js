import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phoneNumber: "",
    country: "India",
    state: "",
    city: "",
    occupation: "",
    pincode: "",
    industry: "",
    income: "",
  });

  const [errors, setErrors] = useState({}); // For validation errors




  const profilePageCancel = () => {
    console.log("Form data cleared");
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      phoneNumber: "",
      country: "India",
      state: "",
      city: "",
      occupation: "",
      pincode: "",
      industry: "",
      income: "",
    });
  };
  const profilePageSaveUpdate = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dob",
      "email",
      "phoneNumber",
      "state",
      "city",
      "pincode",
    ];
    let validationErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = `${field} is required.`;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data saved:", formData);
      setIsPopupVisible(true);
    }
  };

  
  const closePopup = () => {
    setIsPopupVisible(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setNewEmail(formData.email); // Set current email as the initial value
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveEmail = () => {
    if (!emailRegex.test(newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
    setIsModalOpen(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPopupp, setShowPopupp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Regex for phone number validation
  const phoneRegex = /^[0-9]{10}$/;

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number.",
      }));
    }
  };


  const handlemobileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" })); // Clear phone number errors
  };


  const handlePopupOpen = () => {
    if (!formData.phoneNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required.",
      }));
      return;
    }
    setShowPopup(true);
  };


  const handlePopupClose = () => {
    setShowPopup(false);
    setOtpStep(false); // Reset OTP step
  };



  const handleSmsIconClick = () => {
    if (phoneRegex.test(formData.phoneNumber)) {
      setOtpStep(true); // Show OTP section
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid 10-digit phone number before proceeding.",
      }));
    }
  };
  const handleOtpSubmitemail = () => {
    if (otp !== "1234") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Invalid OTP. Please try again.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, otp: "" }));
      setShowVerifiedPopup(true); // Show success popup
      setOtpStep(false); // Reset OTP step
      setIsEmailVerified(true); // Mark email as verified
      setIsModalOpen(false); // Close modal
    }
  };
  const handleOtpSubmit = () => {
    if (otp !== "1234") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "Invalid OTP. Please try again.",
      }));
    } else {
      setShowPopupp(true); // Show success popup
      setShowPopup(false); // Close OTP popup
      setOtpStep(false); // Reset OTP step
      setIsVerified(true); // Mark as verified
    }
  };
  const handlePopupClosee = () => {
    setShowPopupp(false);
  };

  const popupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popup: {
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "18px",
      cursor: "pointer",
      border: "none",
      background: "none",
    },
    content: {
      textAlign: "center",
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px", // Adjust size as needed
      height: "50px", // Same as width for a perfect circle
      borderRadius: "50%", // Makes it circular
      border: "5px solid #24b676", // Corrected the syntax
      backgroundColor: "white", // Background color of the circle
      color: "#24b676", // Tick color matching the border
      fontSize: "24px", // Adjust font size for the tick
      fontWeight: "bold", // Makes the tick bold
      margin: "0 auto", // Centers the icon horizontally in the popup
    },

  };
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Email verification status
  const [showVerifiedPopup, setShowVerifiedPopup] = useState(false); // Control verified success popup
  const handleSendOtpClick = () => {
    // Validate the email first
    if (!emailRegex.test(newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // Clear any previous errors
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));

    // Simulate sending OTP
    console.log(`Sending OTP to ${newEmail}`);

    setOtpStep(true); // Show OTP input step
  };



  const handleVerifiedPopupClose = () => setShowVerifiedPopup(false);
  const handleEmailVerifyClick = () => {
    setIsModalOpen(true); // Open the modal to initiate email verification
  };

  const SuccessModal = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>&times;</button>
          <div className="success-icon">
            <span>&#10004;</span>
          </div>
          <p className="success-message">Your Profile Updated successfully!</p>
        </div>
      </div>
    );
  };
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const profilePageSaveUpdated = () => {
    setIsPopupVisible(true);
  };

 


  return (
    <div className="profilepage-container">
      <h1 className="profilepage-title">My profile</h1>
      <div className="profilepage-tabs">
        <span className="profilepage-tab active">Profile</span>
        <span className="profilepage-tab">Account and Billing</span>
        <span className="profilepage-tab">Password & Security</span>
        <span className="profilepage-tab">Active Devices</span>
      </div>
      <div className="profilepage-form">
        {/* First Name and Last Name */}
        <div className="profilepage-row">
          <div className={`profilepage-field ${errors.firstName ? "error" : ""}`}>
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="profilepage-input"
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-text">This field is required</span>}
          </div>


          <div className={`profilepage-field ${errors.lastName ? "error" : ""}`}>
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="profilepage-input"
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-text">This field is required</span>}

          </div>
        </div>
        <div className="profilepage-row">
          <div className={`profilepage-field ${errors.dob ? "error" : ""}`}>
            <label>Date of Birth*</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="profilepage-input"

            />
            {errors.dob && <span className="error-text">This field is required</span>}
          </div>

          <div className="profilepage-field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="profilepage-select"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="allemailphone">
        <div className="emailphoneal">
          <div className="profilepage-roww">
            <div className={`profilepage-field email-field ${errors.email ? "error" : ""}`}>
              {/* content */}
            </div>

            <label>Email ID*</label>
            <div
              className="profile-email-container"
              
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => validateEmail(e.target.value)}
                className="profilepage-email-input"
                placeholder="Enter your email"
                disabled={isEmailVerified} // Disable if verified
              />
              {isEmailVerified ? (
                <span style={{ color: "#24b676" }}>Verified</span>
              ) : (
                <>
                <div className="emailedit">
                  <button onClick={toggleModal} className="profilepage-editemail-btn">
                    <FaRegEdit />
                  </button>
                  </div>
                  <button className="profilepage-verifyemail-btn" onClick={handleEmailVerifyClick}>
                    Verify
                  </button>
                </>
              )}
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Modal for Editing Email */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Account Verification</h3>
                <p>Enter the email ID to update your account details:</p>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  className="modal-input"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}

                {!otpStep ? (
                  <div className="modal-buttons">
                    <button onClick={handleSendOtpClick} className="save-button">
                      Send OTP
                    </button>
                    <button onClick={toggleModal} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Enter the OTP sent to your email:</p>
                    <input
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className={`otp-input ${errors.otp ? "error-border" : ""}`}

                    />
                    <button onClick={handleOtpSubmitemail} className="save-button">
                      Submit
                    </button>
                  </div>

                )}
                {errors.otp && <span className="error-text">{errors.otp}</span>}
              </div>
            </div>
          )}

          {/* Verification Success Popup */}
          {showVerifiedPopup && (
            <div style={popupStyles.overlay}>
              <div style={popupStyles.popup}>
                <button style={popupStyles.close} onClick={handleVerifiedPopupClose}>
                  &times;
                </button>
                <div style={popupStyles.content}>
                  <div style={popupStyles.icon}>✔</div>
                  <h3>Email verified successfully!</h3>
                  <p>
                    You have successfully verified your email <strong>{formData.email}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="profile-roww">
          <div className={`profile-group ${errors.phoneNumber ? "error" : ""}`}>
            <label>Phone Number*</label>
            <div className="profile-phone-container" >
              <div >
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlemobileChange}
                  onBlur={(e) => validatePhoneNumber(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className="profile-phone-input"

                  disabled={isVerified} // Disable if verified
                />
                {isVerified ? (
                  <span style={{ color: "#24b676" }}>Verified</span>
                ) : null}
              </div>

              {/* Conditionally render buttons based on isVerified */}
             
              {!isVerified && (
  <div className="editalliconnn">
    <button
      onClick={handlePopupOpen}
      className="profilepage-editemail-btn"
    >
      <FaRegEdit />
    </button>
    <button
      type="button"
      className="profile-verify-btn"
      onClick={handleSmsIconClick}
    >
      Verify
    </button>
  </div>
)}

            </div>
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button className="close-icon" onClick={handlePopupClose}>
                  <RxCross2 />
                </button>
                <h3 className="accountverification">Account Verification</h3>
                <p className="popupparagraph">
                  Provide your phone number to receive a verification code.
                  <br />
                  It will only be used for account verification purposes.
                </p>
                {!otpStep && (
                  <div className="popup-input">
                    <span>+91</span>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handlemobileChange}
                    />
                    <button className="sms-icon-button" onClick={handleSmsIconClick}>
                      <AiOutlineMessage />
                    </button>
                  </div>
                )}

                {otpStep && (
                  <div className="otp-section">
                    <h3 className="otpverification">Verification Code</h3>
                    <div className="otp-input-container">
                      <input
                        type="text"
                        maxLength="4"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          setErrors((prevErrors) => ({ ...prevErrors, otp: "" }));
                        }}
                        className={`otp-input ${errors.otp ? "error-border" : ""}`}
                      />
                      <button onClick={handleOtpSubmit}>Submit</button>
                    </div>
                    {errors.otp && <span className="error-text">{errors.otp}</span>}
                  </div>
                )}
              </div>
            </div>
          )}

          {showPopupp && (
            <div style={popupStyles.overlay}>
              <div style={popupStyles.popup}>
                <button style={popupStyles.close} onClick={handlePopupClosee}>
                  &times;
                </button>
                <div style={popupStyles.content}>
                  <div style={popupStyles.icon}>✔</div>
                  <h3>Mobile number verified successfully!</h3>
                  <p>
                    You have successfully verified your mobile number using OTP sent on{" "}
                    <strong>91********{formData.phoneNumber.slice(-2)}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>

      
      <div className="profilepage-row">
        <div className="profilepage-field">
          <label>Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="profilepage-select"
          >
            <option value="India">India</option>
          </select>
        </div>
        <div className={`profilepage-field state-field ${errors.state ? "error" : ""}`}>
          <label>State*</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`profilepage-select ${errors.state ? "error" : ""}`}
          >
            <option value="">Select</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
          {errors.state && <span className="error-text">This field is required</span>}
        </div>

      </div>
      <div className="profilepage-row">
        <div className={`profilepage-field city-field ${errors.city ? "error" : ""}`}>
          <label>City*</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`profilepage-select ${errors.city ? "error" : ""}`}
          >
            <option value="">Select</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
          {errors.city && <span className="error-text">This field is required</span>}
        </div>

        <div className={`profilepage-field pincode-field ${errors.pincode ? "error" : ""}`}>
          <label>Pincode*</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`profilepage-input ${errors.pincode ? "error" : ""}`}
            placeholder="E.g. 110254"
          />
          {errors.pincode && <span className="error-text">This field is required</span>}
        </div>

      </div>
      <div className="profilepage-row">
        <div className="profilepage-field">
          <label>Occupation</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="profilepageocc-select"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Government Employee">Government Employee</option>
            <option value="Homemaker">Homemaker</option>
            <option value="Retired">Retired</option>
            <option value="Self-employed">Proffesional</option>
            <option value="Other">Other</option>

          </select>
        </div>
        <div className="profilepage-field">
          <label>Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            onFocus={(e) => e.target.style.marginBottom = "20px"}
            onBlur={(e) => e.target.style.marginBottom = "0px"} // Reset margin on blur
            className="profilepage-industry-select"
          >
            <option value="">Select</option>

            <option value="Banking and Financial Services">Banking and Financial Services</option>

            <option value="Information Technology">Information Technology</option>
            <option value="Media and Entertainment">Media and Entertainment</option>
            <option value="Pharma and Healthcare">Pharma and Healthcare</option>

            <option value="Real Estate">Real Estate</option>

            <option value="Travel and Tourism">Travel and Tourism</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      <div className="profilepage-row">
        <div className="profilepage-field-income">
          <label>Annual Income</label>
          <select
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="profilepageincome-select"
          >
            <option value="">Select</option>
            <option value="0-5L">Less than 5 Lacs</option>
            <option value="5L-10L">5 Lacs to 10 Lacs</option>
            <option value="10L-15L">10 Lacs to 15 Lacs</option>
            <option value="15L-20L">15 Lacs to 20 Lacs</option>
            <option value="20L+">More than 20 Lacs</option>
          </select>

        </div>
      </div>

      <div className="profilepage">
      <div className="profilepage-actions">
        <button className="profilepage-save-btn" onClick={profilePageSaveUpdate}>
          Save & Update
        </button>
        <button className="profilepage-cancel-btn" onClick={profilePageCancel}>
          Cancel
        </button>
      </div>

      {/* Popup */}
      {isPopupVisible && <SuccessModal onClose={closePopup} />}
    </div>
      <Navbar/>
    </div>
  



  );
};

export default ProfilePage;
