import React from 'react'
import PortfolioHoldingPage from './PortfolioHoldingPage/PortfolioHoldingPage'
import PortfolioAnalysisCorporatePage from './PortfolioAnalysisCorporatePage/PortfolioAnalysisCorporatePage'
import FundamentalPortfolioAnalysis from './FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from './PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'

function Portfolioanalysispages() {
  return (
    <div>
      
      <PortfolioHoldingPage/>
      <PortfolioAnalysisCorporatePage/>
      <FundamentalPortfolioAnalysis/>
      <PerformancePortfolioAnalysis/>
    </div>
  )
}

export default Portfolioanalysispages
