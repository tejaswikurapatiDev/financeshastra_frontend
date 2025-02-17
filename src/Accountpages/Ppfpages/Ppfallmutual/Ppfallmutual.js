
import React from 'react';
import Ppfcalculatorpage from '../Ppfcalculator/Ppfcalculator';
import { useNavigate } from "react-router-dom";


function Ppfallmutual() {
     const navigate = useNavigate();
  return (
    <div className="sipcalculatorallmutual-wrapper">
      {/* Navigation Bar */}
      <h2 className="sipcalculatorallmutualh2">PPF Calculator</h2>
      <div className="sipcalculatorallmutual-navbar">
      <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/sipCalculatorAccountPages")}>SIP Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/lumpsumallpage")}>Lumpsum Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/fdallpages")}>FD Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/rdallpages")}>RD Calculator</span>
        <span className="sipcalculatorallmutual-navitem active"onClick={() => navigate("/ppfallpages")}>PPF Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/cagrallpages")}>CAGR Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/revCagrallpages")}>Reverse CAGR Calculator</span>
      </div>

      {/* Content Container */}
      <div className="sipcalculatorallmutual-container">
      
          <Ppfcalculatorpage/>
     
      
      </div>
    </div>
  );
}

export default Ppfallmutual;