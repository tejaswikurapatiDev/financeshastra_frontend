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
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'

function Portfolioanalysisdividendcall({children}) {
  return (
    <div className='allpagecallanalysis'>
        <Portfolioanalyticchart/>
        <StockTracker/>
        < PortfolioAnalysisdividentPage/>
        <FundamentalPortfolioAnalysis/>
        <PerformancePortfolioAnalysis/>
        <AnalysisResearchReportblur/>
        <PortfolioAnalysisnew/>
       
        <Navbar/>
        <div className="layout">
      <Sidebar />
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

export default Portfolioanalysisdividendcall;