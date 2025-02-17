
import React from 'react'
import Navbar from '../../../Navbar/Navbar';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';
import Cagrallmutual from '../Cagrallmutual/Cagrallmutual';
import CagrSIPReturns from '../Cagrsipreturn/Cagrsipreturn';

function Cagrallpages() {
  return (
    <div>
        <Cagrallmutual/>
        <CagrSIPReturns/>
       <Navbar/>
        <FooterForAllPage/>
    </div>
  )
}

export default Cagrallpages;