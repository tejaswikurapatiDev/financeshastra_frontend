
import React from 'react'
import Navbar from '../../../Navbar/Navbar';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';
import RevCagrallmutual from '../Revcagrallmutual/Revcagrallmutual';
import RevCagrSIPReturns from '../Revcagrsipreturns/Revcagrsipreturns';

function RevCagrallpages() {
  return (
    <div>
        <RevCagrallmutual/>
        <RevCagrSIPReturns/>
       <Navbar/>
        <FooterForAllPage/>
    </div>
  )
}

export default RevCagrallpages;