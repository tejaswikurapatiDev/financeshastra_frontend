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
import PortfolioAnalysisdividentPage from '../PortfolioAnalysisdividentPage/PortfolioAnalysisdividentPage'

function Portfolioanalysisdividendcall() {
  return (
    <div className='allpagecallanalysis'>
        <Portfolioanalyticchart/>
        <StockTracker/>
        < PortfolioAnalysisdividentPage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
        <Sidebar/>
        <Navbar/>
    </div>
  )
}

export default Portfolioanalysisdividendcall;