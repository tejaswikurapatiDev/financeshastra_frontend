import React from 'react'
import SipCalculatorAllMutual from './SipCalculatorAllMutual/sipcalculatorallmutual'
import ProjectedSIPReturns from './ProjectedSIPReturns/ProjectedSIPReturns'
import Navbar from '../Navbar/Navbar';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';

function Accountsipallpage() {
  return (
    <div>
        <SipCalculatorAllMutual/>
        <ProjectedSIPReturns/>
        <Navbar/>
        <FooterForAllPage/>
    </div>
  )
}

export default Accountsipallpage;