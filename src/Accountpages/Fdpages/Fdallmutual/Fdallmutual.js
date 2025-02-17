

import React from 'react';
import Fdcalculatorpage from '../Fdcalculatorpage/Fdcalculatorpage';
import { useNavigate } from "react-router-dom";


function Fdallmutual() {
   const navigate = useNavigate();
  return (
    <div className="sipcalculatorallmutual-wrapper">
      {/* Navigation Bar */}
      <h2 className="sipcalculatorallmutualh2">FD Calculator</h2>
      <div className="sipcalculatorallmutual-navbar">
      <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/sipCalculatorAccountPages")}>SIP Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/lumpsumallpage")}>Lumpsum Calculator</span>
        <span className="sipcalculatorallmutual-navitem active" onClick={() => navigate("/fdallpages")}>FD Calculator</span>
        <span className="sipcalculatorallmutual-navitem" onClick={() => navigate("/rdallpages")}>RD Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/ppfallpages")}>PPF Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/cagrallpages")}>CAGR Calculator</span>
        <span className="sipcalculatorallmutual-navitem"onClick={() => navigate("/revCagrallpages")}>Reverse CAGR Calculator</span>
      </div>

      {/* Content Container */}
      <div className="sipcalculatorallmutual-container">
          <Fdcalculatorpage/>
      
       
      </div>
    </div>
  );
}

export default Fdallmutual;