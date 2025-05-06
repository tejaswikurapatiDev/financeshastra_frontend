import React, { useState, useEffect, useContext } from "react";
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
import AccountBar from "../AccountBar";
import ClipLoader from "react-spinners/ClipLoader";
import Meta from "../../Meta";
const override = {
  display: "block",
  textAlign: "center",
};

const UserDetailsupdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = useContext(UserProfileContext);
  const { token } = useContext(UserProfileContext);

  const [profileImage, setProfileImage] = useState(williamImage);
  const [errors, setErrors] = useState({
    householdSavings: "",
    termInsurance: "",
    healthInsurance: "",
    currentInvestments: "",
    stocks: "",
    mutualfunds: "",
  });
  const [personalDetails, setPersonalDetails] = useState({
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
  });
  const [professionalDetails, setProfessionalDetails] = useState({
    occupation: "-",
    industry: "-",
    incomeRange: "-",
  });
  const [investmentDetails, setInvestmentDetails] = useState({
    householdSavings: "",
    termInsurance: "",
    healthInsurance: "",
    currentInvestments: "",
    stocks: "",
    mutualfunds: "",
  });
  const [showPopupforLogin, setShowPopupforLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [modalData, setModalData] = useState({
    householdSavings: "",
    termInsurance: "",
    healthInsurance: "",
    currentInvestments: "",
    stocks: "",
    mutualfunds: "",
  });

  const formatDate = (dob) => {
    const date = new Date(dob);
    if (isNaN(date)) return "Invalid Date";
    return date.toISOString().split("T")[0];
  };

  const decodingtoken = (token) => {
    return jwtDecode(token);
  };

  useEffect(() => {
    setisLoading(true);
    const cookietoken = Cookies.get("jwtToken");

    if (!Cookies.get("jwtToken")) {
      setShowPopupforLogin(true);
      setisLoading(false);
    } else if (cookietoken) {
      const { email } = decodingtoken(cookietoken);
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        email: email,
      }));

      const fetchfunc = async () => {
        const url = `${API_BASE_URL}/userdetails`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookietoken}`,
          },
        };

        const response = await fetch(url, options);


        if (response.ok) {
          try {
            const decode = decodingtoken(cookietoken);
            const { email } = decode;
            const data = await response.json();


            if (data) {
              const userData = data.userdetails[0];
              const investmentData = data.investdetails[0];
              const formattedDate = formatDate(userData.dob);


              console.log(
                "🚀 ~ Fetched User Investment details:",
                investmentData
              );

              const updatedData = {
                personal: {
                  firstName: userData.first_name || "-",
                  lastName: userData.last_name || "-",
                  email: email || "-",
                  gender: userData.gender || "-",
                  dob: formattedDate || "-",
                  country: "India",
                  state: userData.state || "-",
                  city: userData.city || "-",
                  address: userData.address || "-",
                  phoneNumber: userData.phone_number || "-",
                  pincode: userData.pincode || "-",
                  username: userData.username || "-",
                },
                professional: {
                  occupation: userData.occupation || "-",
                  industry: userData.industry || "-",
                  incomeRange: userData.income || "-",
                },
                investment: {
                  householdSavings: investmentData?.household_savings || "-",
                  termInsurance: investmentData?.term_insurance || "-",
                  healthInsurance: investmentData?.health_insurance || "-",
                  currentInvestments: investmentData?.current_investments || "-",
                  stocks: investmentData?.stocks || "-",
                  mutualfunds: investmentData?.mutualfunds || "-",
                },
              };
              console.log(
                "🚀 ~ setInvestmentDetails ~ updatedData.investment:",
                investmentData?.household_savings || "-"
              );

              setPersonalDetails((prev) => ({
                ...prev,
                ...updatedData.personal,
              }));
              setProfessionalDetails((prev) => ({
                ...prev,
                ...updatedData.professional,
              }));
              setInvestmentDetails((prev) => ({
                ...prev,
                ...updatedData.investment,
              }));
              setModalData((prev) => ({
                ...prev,
                ...updatedData.investment,
              }));
            } else {
              console.warn("No user data found.");
            }
          } catch (error) {
            console.error("Error processing user data:", error);
          } finally {
            setisLoading(false);
          }
        } else {
          console.error(
            "Failed to fetch user details. Status:",
            response.status
          );
          setisLoading(false);
        }
      };
      fetchfunc();
    }
  }, [location.state]);

  const onlogin = () => {
    navigate("/login");
  };

  const handleEditInvestment = () => {

    setModalData({ ...investmentDetails });
    setShowModal(true);
    setErrors({
      householdSavings: "",
      termInsurance: "",
      healthInsurance: "",
      currentInvestments: "",
      stocks: "",
      mutualfunds: "",
    }); // Clear errors when modal opens
  };

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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinancialChange = (e) => {
    const { name, value } = e.target;

    if (value.includes("+") || value.includes("-")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid positive number without '+' or '-'",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setModalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.includes("+") || value.includes("-")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid number without '+' or '-'",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    let percentage = parseFloat(value) || 0;
    if (percentage > 100) percentage = 100;

    let updatedData = { ...modalData, [name]: percentage };

    if (name === "stocks") {
      updatedData.mutualfunds = 100 - percentage;
      setErrors((prevErrors) => ({ ...prevErrors, ["mutualfunds"]: "" }));
    } else if (name === "mutualfunds") {
      updatedData.stocks = 100 - percentage;
      setErrors((prevErrors) => ({ ...prevErrors, ["stocks"]: "" }));
    }

    setModalData(updatedData);
  };

  const handleSave = async () => {
    try {
      setisLoading(true);

      const cookietoken = Cookies.get("jwtToken");
      if (!cookietoken) {
        alert("You are not logged in!");
        setisLoading(false);
        return;
      }

      // Check for any errors before saving
      if (Object.values(errors).some((error) => error !== "")) {
        alert("Please correct the errors in the form.");
        setisLoading(false);
        return;
      }

      const url = `${API_BASE_URL}/userdetails/adduserinvestment`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookietoken}`,
        },
        body: JSON.stringify(modalData),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();

        setInvestmentDetails({ ...modalData });
        setShowModal(false);
        alert("Investment details updated successfully!");
      } else {
        console.error("Failed to update investment details:", response.status);
        alert("Failed to update investment details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating investment details:", error);
      alert("An error occurred while updating investment details.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <Meta path={location.pathname} />
      <div className="outer-cont">
        {isLoading ? (
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
        ) : (
          <>
            <div className="userDetailss">
              <h1 className="profilepage-title">My profile</h1>

              <AccountBar />

              <div className="profileContainer">
                <div className="userwilliamimg">
                  <img
                    src={profileImage}
                    alt="William Rober"
                    className="profileImage"
                  />
                  <MdOutlineEdit
                    className="editIcon"
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </div>
                <div className="profileInfo">
                  <h1 className="profileName">
                    {" "}
                    {personalDetails.firstName} {personalDetails.lastName}
                  </h1>
                  <p className="profileOccupation">
                    {professionalDetails.occupation === "undefined"
                      ? "-"
                      : professionalDetails.occupation}
                  </p>
                </div>
              </div>

              {/* Personal Details Section */}
              <h2 className="sectionTitle">Personal Details</h2>
              <div className="allpersonal">
                <div className="personalDetailAll">
                  {Object.entries(personalDetails).map(([key, value]) => (
                    <p key={key} className="detailRow">
                      <strong className="labelprofiledetail">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </strong>
                      <span className="value">
                        {value === "undefined" ? "-" : value}
                      </span>
                    </p>
                  ))}
                </div>
                <div
                  className="editiconprofile"
                  onClick={() => handleNavigation("Personal", "Professional")}
                >
                  <BiSolidEdit />
                </div>
              </div>

              {/* Professional Details Section */}
              <h2 className="sectionTitle">Professional Details</h2>
              <div className="allpersonall">
                <div className="personalDetailAll">
                  {Object.entries(professionalDetails).map(([key, value]) => (
                    <p key={key} className="detailRow">
                      <strong className="labelprofiledetail">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </strong>
                      <span className="value">
                        {value === "undefined" ? "-" : value}
                      </span>
                    </p>
                  ))}
                </div>
                <div
                  className="editiconprofileee"
                  onClick={() => handleNavigation("Personal", "Professional")}
                >
                  <BiSolidEdit />
                </div>
              </div>

              {/* Investment Details Section */}
              <h2 className="sectionTitle">Investment Details</h2>
              <div className="allpersonal">
                <div className="personalDetailAll">
                  {Object.entries(investmentDetails).map(([key, value]) => (
                    <p key={key} className="detailRow">
                      <strong className="labelprofiledetail">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </strong>
                      <span className="value">{value}</span>
                    </p>
                  ))}
                </div>
                <div
                  className="editiconprofilee"
                  onClick={handleEditInvestment}
                >
                  <BiSolidEdit />
                </div>
              </div>

              {showModal && (
                <div className="modal-overlay">
                  <div className="modal-contentuserupdate">
                    <div className="modal-body">
                      <label>Household Savings per month*</label>
                      <input
                        type="number"
                        name="householdSavings"
                        value={modalData.householdSavings}
                        onChange={handleFinancialChange}
                      />
                      {errors.householdSavings && (
                        <p className="error-message">
                          {errors.householdSavings}
                        </p>
                      )}
                      <label>Term Insurance*</label>
                      <input
                        type="number"
                        name="termInsurance"
                        value={modalData.termInsurance}
                        onChange={handleFinancialChange}
                      />
                      {errors.termInsurance && (
                        <p className="error-message">{errors.termInsurance}</p>
                      )}

                      <label>Health Insurance*</label>
                      <input
                        type="number"
                        name="healthInsurance"
                        value={modalData.healthInsurance}
                        onChange={handleFinancialChange}
                      />
                      {errors.healthInsurance && (
                        <p className="error-message">
                          {errors.healthInsurance}
                        </p>
                      )}

                      <label>Major Current Investments*</label>
                      <input
                        type="number"
                        name="currentInvestments"
                        value={modalData.currentInvestments}
                        onChange={handleFinancialChange}
                      />
                      {errors.currentInvestments && (
                        <p className="error-message">
                          {errors.currentInvestments}
                        </p>
                      )}
                      <label>Interested to invest in*</label>
                      <div className="investment-optionsalluser">
                        <div className="investment-itemalluser">
                          <span>Stocks</span>
                          <input
                            type="number"
                            name="stocks"
                            value={modalData.stocks}
                            onChange={handleChange}
                            placeholder="%"
                          />
                          {errors.stocks && (
                            <p className="error-message">{errors.stocks}</p>
                          )}
                        </div>

                        <div className="investment-itemalluser">
                          <span>Mutual Fund</span>
                          <input
                            type="number"
                            name="mutualfunds"
                            value={modalData.mutualfunds}
                            onChange={handleChange}
                            placeholder="%"
                          />
                          {errors.mutualfunds && (
                            <p className="error-message">
                              {errors.mutualfunds}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="save-btnuserrr" onClick={handleSave}>
                        Save & Update
                      </button>
                      <button
                        className="cancel-btnuserrrr"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Navbar />
            </div>
          </>
        )}

        {showPopupforLogin && (
          <div className="payment-popup">
            <div className="payment-popup-content">
              <h2>You Are not Logged in!</h2>
              <p className="amount-paid">Please Login</p>
              <button onClick={onlogin} className="loginbtnpopupnot">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default UserDetailsupdate;
