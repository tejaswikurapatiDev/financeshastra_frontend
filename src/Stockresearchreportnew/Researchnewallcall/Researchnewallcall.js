import React from 'react'
import StockCard from '../Companyname/Companyname'
import ResearchDashboard from '../ResearchDashboard/ResearchDashboard'
import Overviewresearch from '../Overviewresearch/Overviewresearch'
import Navbar from '../../Navbar/Navbar'
import Disclosure from '../Disclosure/Disclosure'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'

function Researchnewallcall() {
  return (
    <div>
        <Navbar/>
        <StockCard/>
        <ResearchDashboard/>
        <Overviewresearch/>
        <Disclosure/>
        <FooterForAllPage/>
    </div>
  )
}

export default Researchnewallcall