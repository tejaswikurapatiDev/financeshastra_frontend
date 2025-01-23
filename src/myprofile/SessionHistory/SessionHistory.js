import React from "react";
import "./SessionHistory.css"; // Add styles if needed
import systemimg from '../../assest/comp.svg';
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SessionHistory = () => {
    const navigate = useNavigate();
  const sessions = [
    {
      id: 1,
      device: "PC, Windows 10",
      location: "Ahmedabad, India",
      ip: "106.212.181.28",
      browser: "Chrome 131.0.0",
      status: "Just logged in",
      isActive: true,
    },
    {
      id: 2,
      device: "Mobile, App",
      location: "Ahmedabad, India",
      ip: "7.1.1",
      browser: "M2010K7BI",
      status: "17 Days ago",
      isActive: true,
    },
  ];

  return (
    <div className="session-history">
       <h1 className="profilepage-titlesession">My Account</h1>
      <div className="profilepage-tabsorderuserss">
        <span className="profilepage-tabb"
        onClick={() => navigate("/userDetailsupdate")}>My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb"onClick={() => navigate("/billingSubscriptionPages")}>Billing & Subscription</span>
        <span className="profilepage-tabb"onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
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
        <span className="profilepage-tabb"style={{
  borderBottom: "2px solid #24b676",
  fontWeight: "bold",
  color: "#24b676",
}}
>Active Devices</span>
        <span className="profilepage-tabb"onClick={() => navigate("/myReferalPage")}>My referrals</span>
      </div>

      <h2 >Session History</h2>
      <p>
        Sessions track your account activity, including login times and devices.
        This helps you identify and prevent unauthorized access.
      </p>
      <div className="sessions-list">
        {sessions.map((session) => (
          <div key={session.id} className="session-card">
           <div className="session-details">
  <img src={systemimg} alt="Device Icon" className="device-icon" />
  <div className="session-text">
    <h3>{session.device}</h3>
    <p>
      {session.location} · {session.ip} · {session.browser} · {session.status}
    </p>
  </div>
</div>


            <div className="session-actions">
            <p
  className="active-statuss"
  style={{ color: session.isActive ? "#24b676" : "#dc3545" }}
>
  {session.isActive ? "Active Now" : "Inactive"}
</p>

              <button className="end-session-button">End all sessions</button>
            </div>
          </div>
        ))}
      </div>
      <Navbar/>
    </div>
  );
};

export default SessionHistory;