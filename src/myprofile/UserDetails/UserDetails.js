import React, { useState } from "react";
import "./UserDetails.css";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import williamImage from "../../assest/men3.jpg";
import { MdOutlineEdit } from "react-icons/md";
import Navbar from "../../Navbar/Navbar";

const UserDetails = () => {
  const [profileImage, setProfileImage] = useState(williamImage);
  const navigate = useNavigate();

  const personalDetails = {
    name: "William Rober",
    username: "williamRober23",
    email: "williamRober23@gmail.com",
    gender: "Male",
    dob: "22-04-1997",
    ageGroup: "25 - 35",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    pin: "411012",
    address: "House no. 6, Mantri Lavendula, Mulshi Rd, Beside Barbacoa, Pranjali Patil Nagar, Bavdhan",
    mobile: "+91 9875864983",
  };

  const professionalDetails = {
    occupation: "Business",
    industry: "Banking and Financial Services",
    incomeRange: "15 lacs to 20 lacs",
  };

  const investmentDetails = {
    householdSavings: "₹1,00,000",
    termInsurance: "₹4,00,000",
    healthInsurance: "₹15,00,000",
    currentInvestments: "₹24,00,500",
    interestedToInvest: "-",
  };

  const handleNavigation = (section) => {
    navigate("/editProfile", { state: { section } });
  };

  return (
    <div className="userDetails">
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
        <span className="profilepage-tabb" onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb" onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
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
          <h1 className="profileName">William Rober</h1>
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
        <div
          className="editiconprofile"
          onClick={() => handleNavigation("Personal Details")}
        >
          <BiSolidEdit />
        </div>
      </div>

      {/* Professional Details Section */}
      <h2 className="sectionTitle">Professional Details</h2>
      <div className="allpersonal">
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
        <div
          className="editiconprofileee"
          onClick={() => handleNavigation("Professional Details")}
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
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div
          className="editiconprofilee"
          onClick={() => handleNavigation("Investment Details")}
        >
          <BiSolidEdit />
        </div>
      </div>
      <Navbar/>
    </div>
  );
};

export default UserDetails;