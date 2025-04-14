import React from "react";
import "./PopupUnlockLandingPage.css";
import { FaCheck } from "react-icons/fa6";
import landingpopup from '../../assest/landingpopupimg.png';
import { useNavigate } from 'react-router-dom';

const PopupUnlockLandingPage = ({ onClose }) => {
const navigate = useNavigate();    
  return (
    <div className="popupunlocklandingpage-overlay">
      <div className="popupunlocklandingpage">
        <button className="popupunlocklandingpage-close" onClick={onClose}>
          ×
        </button>
        <h2 className="popupunlocklandingpage-title">
          Unlock Your Financial Potential with <span>FinanceShastra!</span>
        </h2>
        <img
          src={landingpopup}
          alt="Finance Illustration"
          className="popupunlocklandingpage-image"
        />
        <p className="popupunlocklandingpage-subtitle">
          "Join our community of smart investors and gain access to:"
        </p>
        <ul className="popupunlocklandingpage-list">
          <li>
            <span className="popupunlocklandingpage-checkbox"> <FaCheck size={12} /></span> Expert stock research and recommendations
          </li>
          <li>
            <span className="popupunlocklandingpage-checkbox"><FaCheck size={12} /></span> Advanced personal finance tools
          </li>
          <li>
            <span className="popupunlocklandingpage-checkbox"><FaCheck size={12} /></span> Real-time market insights
          </li>
          <li>
            <span className="popupunlocklandingpage-checkbox"><FaCheck size={12} /></span> Educational resources to level up your financial IQ
          </li>
        </ul>
        <p className="popupunlocklandingpage-subtitle">
          Start your journey to <span>financial freedom today!</span>
        </p>
        <div className="popupunlocklandingpage-buttons">
          <button className="popupunlocklandingpageregister"onClick={() => navigate('/register')}>Register Now</button>
          <button className="popupunlocklandingpagelogin"onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default PopupUnlockLandingPage;
