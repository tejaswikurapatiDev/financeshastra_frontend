import React from 'react'
import Portfolioanalyticchart from '../Portfolioanalyticchart/Portfolioanalyticchart'
import StockTracker from '../StockTracker/StockTracker'

import PortfolioAnalysisnew from '../PortfolioAnalysisnew/PortfolioAnalysisnew'
import Sidebar from '../../Sidebar/Sidebar'
import Navbar from '../../Navbar/Navbar'
import AnalysisResearchReportblur from '../Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur'
import PortfolioAnalysisCorporatePage from '../PortfolioAnalysisCorporatePage/PortfolioAnalysisCorporatePage'
import FundamentalPortfolioAnalysis from '../FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from '../PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'

function Porfolioanalysisallpagecall() {
  return (
    <div>
        <Portfolioanalyticchart/>
        <StockTracker/>
        <PortfolioAnalysisCorporatePage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
        <Sidebar/>
        <Navbar/>
        <FooterForAllPage/>
    </div>
  )
}

export default Porfolioanalysisallpagecall