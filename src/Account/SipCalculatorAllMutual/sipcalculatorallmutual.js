import React from 'react';
import SipCalculatorAccountPages from '../SipCalculatorAccountPages/SipCalculatorAccountPages';
import AccountAllMutualFundList from '../AccountAllMutualFundList/AccountAllMutualFundList';
import './SipCalculatorAllMutual.css';

function SipCalculatorAllMutual() {
  return (
    <div className="sipcalculatorallmutual-container">
      <div className="sipcalculatorallmutual-left">
        <SipCalculatorAccountPages />
      </div>
      <div className="sipcalculatorallmutual-right">
        <AccountAllMutualFundList />
      </div>
    </div>
  );
}

export default SipCalculatorAllMutual;
