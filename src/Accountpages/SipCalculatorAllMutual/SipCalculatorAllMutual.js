import React from 'react';
import SipCalculatorAccountPages from '../SipCalculatorAccountPages/SipCalculatorAccountPages';
import { useNavigate } from "react-router-dom";
import './SipCalculatorAllMutual.css';

function SipCalculatorAllMutual() {
  const navigate = useNavigate();
  return (
    <div className="sipcalculatorallmutual-wrapper">
      {/* Navigation Bar */}
      <h2 className="sipcalculatorallmutualh2">SIP Calculator</h2>
      <div className="sipcalculatorallmutual-navbar">
        <span className="sipcalculatorallmutual-navitem active"onClick={() => navigate("/sipCalculatorAccountPages")}>SIP Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/lumpsumallpage")}>Lumpsum Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/fdallpages")}>FD Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/rdallpages")}>RD Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/ppfallpages")}>PPF Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/cagrallpages")}>CAGR Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/revCagrallpages")}>Reverse CAGR Calculator</span>
      </div>

      {/* Content Container */}
      <div className="sipcalculatorallmutual-container">
       
          <SipCalculatorAccountPages />
       
      
      </div>
    </div>
  );
}

export default SipCalculatorAllMutual;