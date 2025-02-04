import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import williamImage from "../../assest/men3.jpg";
import Navbar from "../../Navbar/Navbar";
import './Userupdatedpage.css'
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const UserDetailsupdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial state (can be overwritten by updated data passed through location.state)
  const [profileImage, setProfileImage] = useState(williamImage);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "William",
    lastName: "Rober",
    email: "williamRober23@gmail.com",
    gender: "Male",
    dob: "22-04-1997",
    ageGroup: "25 - 35",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    pin: "411012",
    address: "House no. 6, Mantri Lavendula, Mulshi Rd, Beside Barbacoa, Pranjali Patil Nagar, Bavdhan",
    phoneNumber: "9875864983",
  });

  const [professionalDetails, setProfessionalDetails] = useState({
    occupation: "Business",
    industry: "Banking and Financial Services",
    incomeRange: "15 lacs to 20 lacs",
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    householdSavings: "₹1,00,000",
    termInsurance: "₹4,00,000",
    healthInsurance: "₹15,00,000",
    currentInvestments: "₹24,00,500",
    interestedToInvest: "-",
  });

  // Update state when new data is passed from EditProfile
  useEffect(() => {
    if (location.state && location.state.updatedData) {
      const { updatedData } = location.state;

      if (updatedData.personal) {
        setPersonalDetails((prev) => ({ ...prev, ...updatedData.personal }));
      }
      if (updatedData.professional) {
        setProfessionalDetails((prev) => ({ ...prev, ...updatedData.professional }));
      }
      if (updatedData.investment) {
        setInvestmentDetails((prev) => ({ ...prev, ...updatedData.investment }));
      }
    }
  }, [location.state]);

  const handleNavigation = (section) => {
    // Pass the updated data to the EditProfile page for further editing
    navigate("/editProfile", { 
      state: { 
        section, 
        updatedData: { 
          personal: personalDetails,
          professional: professionalDetails,
          investment: investmentDetails
        } 
      } 
    });
  };

  return (
    <div>
    <div className="userDetailss">
      <h1 className="profilepage-title">My profile</h1>
      <div className="profilepage-tabsorderusers">
        <span className="profilepage-tabb"
        style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }}>My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb">Billing & Subscription</span>
        <span className="profilepage-tabb">Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb"onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb">My referrals</span>
      </div>


      <div className="profileContainer">
        <div className="userwilliamimg">
          <img src={profileImage} alt="William Rober" className="profileImage" />
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
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setProfileImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="profileInfo">
          <h1 className="profileName"> {personalDetails.firstName} {personalDetails.lastName}</h1>
          <p className="profileOccupation">Businessman</p>
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
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofile" onClick={() => handleNavigation("Personal")}>
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
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofileee" onClick={() => handleNavigation("Professional")}>
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
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofilee" onClick={() => handleNavigation("Investment")}>
          <BiSolidEdit />
        </div>
      </div>

      <Navbar />
    </div>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default UserDetailsupdate;