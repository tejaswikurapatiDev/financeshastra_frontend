
import React from 'react';

import RevcagrValueCalculator from '../ReversecagrCalculator/ReversecagrCalculator';
import { useNavigate } from "react-router-dom";



function RevCagrallmutual() {
  const navigate = useNavigate();
  return (
    <div className="sipcalculatorallmutual-wrapper">
      {/* Navigation Bar */}
      <h2 className="sipcalculatorallmutualh2">Reverse CAGR Calculator</h2>
      <div className="sipcalculatorallmutual-navbar">
      <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/sipCalculatorAccountPages")}>SIP Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/lumpsumallpage")}>Lumpsum Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/fdallpages")}>FD Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/rdallpages")}>RD Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/ppfallpages")}>PPF Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/cagrallpages")}>CAGR Calculator</span>
        <span className="sipcalculatorallmutual-navitem active"onClick={() => navigate("/revCagrallpages")}>Reverse CAGR Calculator</span>
      </div>

      {/* Content Container */}
      <div >
      
          <RevcagrValueCalculator/>
     
      
      </div>
    </div>
  );
}

export default RevCagrallmutual;