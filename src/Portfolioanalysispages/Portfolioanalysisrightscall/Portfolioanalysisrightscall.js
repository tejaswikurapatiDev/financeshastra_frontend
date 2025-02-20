import React from 'react'
import Portfolioanalyticchart from '../Portfolioanalyticchart/Portfolioanalyticchart'
import StockTracker from '../StockTracker/StockTracker'
import PortfolioAnalysisnew from '../PortfolioAnalysisnew/PortfolioAnalysisnew'
import Sidebar from '../../Sidebar/Sidebar'
import Navbar from '../../Navbar/Navbar'
import AnalysisResearchReportblur from '../Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur'
import FundamentalPortfolioAnalysis from '../FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from '../PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'
import PortfolioAnalysisrightissusePage from '../PortfolioAnalysisrightissusePage/PortfolioAnalysisrightissusePage'
import './Portfolioanalysisrightscall.css'

function Portfolioanalysisrightscall() {
  return (
    <div className='allpagecallanalysis'>
     
        <Portfolioanalyticchart/>
        <StockTracker/>
        < PortfolioAnalysisrightissusePage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
        <Sidebar/>
        <Navbar/>
    </div>
  )
}

export default Portfolioanalysisrightscall;