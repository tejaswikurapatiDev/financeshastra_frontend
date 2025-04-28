import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import williamImage from "../../assest/men3.jpg";
import Navbar from "../../Navbar/Navbar";
import "./Userupdatedpage.css";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";
import AccountBar from "../AccountBar";

const override = {
  display: "block",
  textAlign: "center",
};

const initialPersonalDetails = {
  firstName: "-",
  lastName: "-",
  email: "",
  gender: "-",
  dob: "-",
  country: "India",
  state: "-",
  city: "-",
  address: "-",
  phoneNumber: "-",
  pincode: "",
};

const initialProfessionalDetails = {
  occupation: "-",
  industry: "-",
  incomeRange: "-",
};

const initialInvestmentDetails = {
  householdSavings: "-",
  termInsurance: "-",
  healthInsurance: "-",
  currentInvestments: "-",
  stocks: "-",
  mutualfunds: "-",
};

const fieldValidations = {
  householdSavings: {
    validate: (value) => !isNaN(value) && value >= 0,
    message: "Please enter a valid positive number"
  },
  termInsurance: {
    validate: (value) => !isNaN(value) && value >= 0,
    message: "Please enter a valid positive number"
  },
  healthInsurance: {
    validate: (value) => !isNaN(value) && value >= 0,
    message: "Please enter a valid positive number"
  },
  currentInvestments: {
    validate: (value) => !isNaN(value) && value >= 0,
    message: "Please enter a valid positive number"
  },
  stocks: {
    validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
    message: "Please enter a percentage between 0-100"
  },
  mutualfunds: {
    validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
    message: "Please enter a percentage between 0-100"
  }
};

const UserDetailsupdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useContext(UserProfileContext);

  const [profileImage, setProfileImage] = useState(williamImage);
  const [fieldErrors, setFieldErrors] = useState({});
  const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
  const [professionalDetails, setProfessionalDetails] = useState(initialProfessionalDetails);
  const [investmentDetails, setInvestmentDetails] = useState(initialInvestmentDetails);
  const [showPopupforLogin, setShowPopupforLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(initialInvestmentDetails);

  const decodingtoken = useCallback((token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return {};
    }
  }, []);

  const formatDate = useCallback((dob) => {
    try {
      const date = new Date(dob);
      return isNaN(date) ? "Invalid Date" : date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  }, []);

  const fetchUserData = useCallback(async (cookietoken) => {
    setIsLoading(true);
    try {
      const url = `${API_BASE_URL}/userdetails`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookietoken}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.userdetails?.[0]) {
        throw new Error("No user data found");
      }

      const userData = data.userdetails[0];
      const investmentData = data.investdetails?.[0] || initialInvestmentDetails;
      const { email } = decodingtoken(cookietoken);

      const transformedData = {
        personal: {
          ...initialPersonalDetails,
          firstName: userData.first_name || "-",
          lastName: userData.last_name || "-",
          email: email || "-",
          gender: userData.gender || "-",
          dob: formatDate(userData.dob),
          state: userData.state || "-",
          city: userData.city || "-",
          address: userData.address || "-",
          phoneNumber: userData.phone_number || "-",
          pincode: userData.pincode || "-",
          username: userData.username || "-",
        },
        professional: {
          ...initialProfessionalDetails,
          occupation: userData.occupation || "-",
          industry: userData.industry || "-",
          incomeRange: userData.income || "-",
        },
        investment: {
          ...initialInvestmentDetails,
          householdSavings: investmentData.household_savings || "-",
          termInsurance: investmentData.term_insurance || "-",
          healthInsurance: investmentData.health_insurance || "-",
          currentInvestments: investmentData.current_investments || "-",
          stocks: investmentData.stocks || "-",
          mutualfunds: investmentData.mutualfunds || "-",
        },
      };

      setPersonalDetails(transformedData.personal);
      setProfessionalDetails(transformedData.professional);
      setInvestmentDetails(transformedData.investment);
      setModalData(transformedData.investment);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [decodingtoken, formatDate]);

  useEffect(() => {
    const cookietoken = Cookies.get("jwtToken");
    if (!cookietoken) {
      setShowPopupforLogin(true);
      return;
    }
    fetchUserData(cookietoken);
  }, [fetchUserData, location.state]);

  const handleNavigation = (section) => {
    navigate("/editProfile", {
      state: {
        section,
        updatedData: {
          personal: personalDetails,
          professional: professionalDetails,
          investment: investmentDetails,
        },
      },
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const validateField = (name, value) => {
    const validation = fieldValidations[name];
    if (!validation) return true; // No validation defined for this field
    
    const isValid = validation.validate(value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: isValid ? null : validation.message
    }));
    return isValid;
  };

  const handleFinancialChange = (e) => {
    const { name, value } = e.target;
    
    // Basic validation for negative numbers and special characters
    if (value.includes("-") || value.includes("+") || isNaN(value)) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: "Please enter a valid positive number"
      }));
      return;
    }

    const numValue = value === "" ? "" : parseFloat(value);
    setModalData(prev => ({ ...prev, [name]: numValue }));
    validateField(name, numValue);
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    
    if (value.includes("-") || value.includes("+") || isNaN(value)) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: "Please enter a valid number"
      }));
      return;
    }

    const percentage = value === "" ? "" : Math.min(parseFloat(value) || 0, 100);
    
    setModalData(prev => {
      const updated = { ...prev, [name]: percentage };
      if (name === "stocks") updated.mutualfunds = 100 - percentage;
      if (name === "mutualfunds") updated.stocks = 100 - percentage;
      return updated;
    });

    validateField(name, percentage);
  };

  const handleSave = async () => {
    // Validate all fields before saving
    const validations = Object.keys(modalData).map(field => 
      validateField(field, modalData[field])
    );
    
    if (validations.some(valid => !valid)) {
      return; // Don't save if any field is invalid
    }

    setIsLoading(true);
    try {
      const cookietoken = Cookies.get("jwtToken");
      if (!cookietoken) throw new Error("Not authenticated");

      const response = await fetch(`${API_BASE_URL}/userdetails/adduserinvestment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookietoken}`,
        },
        body: JSON.stringify(modalData),
      });

      if (!response.ok) throw new Error("Update failed");

      setInvestmentDetails(modalData);
      setShowModal(false);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "Failed to update. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderDetailSection = (title, details, section) => (
    <>
      <h2 className="sectionTitle">{title}</h2>
      <div className="allpersonal">
        <div className="personalDetailAll">
          {Object.entries(details).map(([key, value]) => (
            <p key={key} className="detailRow">
              <strong className="labelprofiledetail">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
              </strong>
              <span className="value">{value === "undefined" ? "-" : value}</span>
            </p>
          ))}
        </div>
        <div 
          className={`editiconprofile${section === "Professional" ? "ee" : ""}`}
          onClick={() => handleNavigation(section)}
        >
          <BiSolidEdit />
        </div>
      </div>
    </>
  );

  const renderInvestmentModal = () => (
    <div className="modal-overlay">
      <div className="modal-contentuserupdate">
        <div className="modal-body">
          {["householdSavings", "termInsurance", "healthInsurance", "currentInvestments"].map(field => (
            <div key={field} className="modal-field-group">
              <label>{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}*</label>
              <input
                type="number"
                name={field}
                value={modalData[field]}
                onChange={handleFinancialChange}
                className={fieldErrors[field] ? "input-error" : ""}
              />
              {fieldErrors[field] && (
                <div className="error-message">{fieldErrors[field]}</div>
              )}
            </div>
          ))}

          <label>Interested to invest in*</label>
          <div className="investment-optionsalluser">
            {["stocks", "mutualfunds"].map(type => (
              <div key={type} className="investment-itemalluser">
                <span>{type === "stocks" ? "Stocks" : "Mutual Fund"}</span>
                <input
                  type="number"
                  name={type}
                  value={modalData[type]}
                  onChange={handleInvestmentChange}
                  placeholder="%"
                  className={fieldErrors[type] ? "input-error" : ""}
                />
                {fieldErrors[type] && (
                  <div className="error-message">{fieldErrors[type]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className="save-btnuserrr" 
            onClick={handleSave}
            disabled={Object.values(fieldErrors).some(Boolean)}
          >
            Save & Update
          </button>
          <button 
            className="cancel-btnuserrrr" 
            onClick={() => {
              setShowModal(false);
              setFieldErrors({});
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loader-cont">
        <ClipLoader
          cssOverride={override}
          size={35}
          data-testid="loader"
          loading={isLoading}
          speedMultiplier={1}
          color="green"
        />
      </div>
    );
  }

  if (showPopupforLogin) {
    return (
      <div className="payment-popup">
        <div className="payment-popup-content">
          <h2>You Are not Logged in!</h2>
          <p className="amount-paid">Please Login</p>
          <button onClick={() => navigate("/login")} className="loginbtnpopupnot">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="outer-cont">
        <div className="userDetailss">
          <h1 className="profilepage-title">My profile</h1>
          <AccountBar />

          <div className="profileContainer">
            <div className="userwilliamimg">
              <img src={profileImage} alt="Profile" className="profileImage" />
              <MdOutlineEdit
                className="editIcon"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={uploadImage}
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileName">
                {personalDetails.firstName} {personalDetails.lastName}
              </h1>
              <p className="profileOccupation">
                {professionalDetails.occupation === "undefined" 
                  ? "-" 
                  : professionalDetails.occupation}
              </p>
            </div>
          </div>

          {renderDetailSection("Personal Details", personalDetails, "Personal")}
          {renderDetailSection("Professional Details", professionalDetails, "Professional")}
          
          <h2 className="sectionTitle">Investment Details</h2>
          <div className="allpersonal">
            <div className="personalDetailAll">
              {Object.entries(investmentDetails).map(([key, value]) => (
                <p key={key} className="detailRow">
                  <strong className="labelprofiledetail">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                  </strong>
                  <span className="value">{value}</span>
                </p>
              ))}
            </div>
            <div className="editiconprofilee" onClick={() => setShowModal(true)}>
              <BiSolidEdit />
            </div>
          </div>

          {showModal && renderInvestmentModal()}
          <Navbar />
        </div>
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default UserDetailsupdate;