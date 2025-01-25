import React from 'react';
import SipCalculatorAccountPages from '../SipCalculatorAccountPages/SipCalculatorAccountPages';
import AccountAllMutualFundList from '../AccountAllMutualFundList/AccountAllMutualFundList';
import './SipCalculatorAllMutual.css';

function SipCalculatorAllMutual() {
  return (
    <div className="sipcalculatorallmutual-wrapper">
      {/* Navigation Bar */}
      <h2 className="sipcalculatorallmutualh2">SIP Calculator</h2>
      <div className="sipcalculatorallmutual-navbar">
        <span className="sipcalculatorallmutual-navitem active">SIP Calculator</span>
        <span className="sipcalculatorallmutual-navitem">Lumpsum Calculator</span>
        <span className="sipcalculatorallmutual-navitem">FD Calculator</span>
        <span className="sipcalculatorallmutual-navitem">RD Calculator</span>
        <span className="sipcalculatorallmutual-navitem">PPF Calculator</span>
        <span className="sipcalculatorallmutual-navitem">CAGR Calculator</span>
        <span className="sipcalculatorallmutual-navitem">Reverse CAGR Calculator</span>
      </div>

      {/* Content Container */}
      <div className="sipcalculatorallmutual-container">
        <div className="sipcalculatorallmutual-left">
          <SipCalculatorAccountPages />
        </div>
        <div className="sipcalculatorallmutual-right">
          <AccountAllMutualFundList />
        </div>
      </div>
    </div>
  );
}

export default SipCalculatorAllMutual;
