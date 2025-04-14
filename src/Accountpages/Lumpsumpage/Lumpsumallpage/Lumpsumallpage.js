
import React from 'react'

import Lumpsumsipreturn from '../Lumpsumsipreturn/Lumpsumsipreturn';
import Navbar from '../../../Navbar/Navbar';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';
import Lumpsumallmutual from '../Lumpsumallmutual/Lumpsumallmutual';

function Lumpsumallpage() {
  return (
    <div>
        <Lumpsumallmutual/>
        <Lumpsumsipreturn/>
       <Navbar/>
        <FooterForAllPage/>
    </div>
  )
}

export default Lumpsumallpage;