import React from 'react';
import './ReffeerralProfilePageSSS.css';
import { useNavigate } from 'react-router-dom';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';
import Navbar from '../../Navbar/Navbar';

const ReffeerralProfilePageSSS = () => {
  const reffeerralprofilepagesssData = [
    { title: 'Referral Count', value: 12 },
    { title: 'Registered Count', value: 8 },
    { title: 'Subscribed Count', value: 23 },
    { title: 'Total Earnings (₹)', value: '6,85,674' },
  ];
  const navigate = useNavigate();
  return (
    <div className="profilepageee-container">
    <h1 className="profilepage-title" style={{ fontFamily: 'Calibri' }}>
    My Referrals</h1>

    <div className="profilepage-tabs">
        <span className="profilepage-tab">My Account</span>
        <span className="profilepage-tab">Order</span>
        <span className="profilepage-tab"onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tab">Risk Profile Report</span>
        <span className="profilepage-tab">Manage Alert</span>
        <span className="profilepage-tab">Password & Security</span>
        <span className="profilepage-tab">Active Devices</span>
        <span className="profilepage-tab active"onClick={() => navigate("/myReferalPage")}
    >My referrals</span>
      </div>
    <div className="myreferalpagesss">
      {/* Header Section */}
      <div className="myreferalpagesss-header">
      <div className="myreferalpagesss-header-row">
  <h1>Assist your friends in their investment journey and reach financial independence faster.</h1>
  <a href="#" className="myreferalpagesss-benefits-link">View benefits</a>
</div>

        <div className="myreferalpagesss-buttons">
          <button className="myreferalpagesss-button "onClick={() => navigate("/myReferalPage")}>Overview</button>
          <button className="myreferalpagesss-button "onClick={() => navigate("/referMoreProfilePages")}>Refer More</button>
          <button className="myreferalpagesss-button "onClick={() => navigate("/earningCalculatorProfilePage")}>Earning Calculator</button>
          <button className="myreferalpagesss-button active"onClick={() => navigate("/reffeerralProfilePageSSS")}>My Referrals</button>
        </div>
      </div>
    <div className="reffeerralprofilepagesss-container">
      {reffeerralprofilepagesssData.map((item, index) => (
        <div key={index} className="reffeerralprofilepagesss-card">
          <h3 className="reffeerralprofilepagesss-title">{item.title}</h3>
          <p className="reffeerralprofilepagesss-value">{item.value}</p>
        </div>
      ))}
    </div>
    </div>
    <Navbar/>
   
   <FooterForAllPage/>
    </div>
  );
};

export default ReffeerralProfilePageSSS;
