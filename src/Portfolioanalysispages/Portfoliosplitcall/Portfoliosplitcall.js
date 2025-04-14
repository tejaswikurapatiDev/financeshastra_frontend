import React from 'react'
import Portfolioanalyticchart from '../Portfolioanalyticchart/Portfolioanalyticchart'
import StockTracker from '../StockTracker/StockTracker'
import PortfolioAnalysisnew from '../PortfolioAnalysisnew/PortfolioAnalysisnew'
import Sidebar from '../../Sidebar/Sidebar'
import Navbar from '../../Navbar/Navbar'
import AnalysisResearchReportblur from '../Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur'

import FundamentalPortfolioAnalysis from '../FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from '../PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'
import PortfolioAnalysissplitPage from '../PortfolioAnalysissplitPage/PortfolioAnalysissplitPage'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'

function Portfoliosplitcall({children}){
  return (
    <div className='allpagecallanalysis'>
        <Portfolioanalyticchart/>
        <StockTracker/>
        < PortfolioAnalysissplitPage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
       
        <Navbar/>
        <div className="layout">
      <Sidebar/>
      <div className="main-contentover">
        <div className="contentover">{children}</div>
        <div className="oversidefooter">
          <FooterForAllPage />
          </div>
      </div>
    </div>
    </div>
  )
}

export default Portfoliosplitcall;