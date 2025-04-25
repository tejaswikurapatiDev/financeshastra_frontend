import { useContext, useEffect } from 'react'
import React from 'react'
import Portfolioanalyticchart from '../Portfolioanalyticchart/Portfolioanalyticchart'
import StockTracker from '../StockTracker/StockTracker'
import { useNavigate } from 'react-router-dom'
import PortfolioAnalysisnew from '../PortfolioAnalysisnew/PortfolioAnalysisnew'
import Sidebar from '../../Sidebar/Sidebar'
import Navbar from '../../Navbar/Navbar'
import AnalysisResearchReportblur from '../Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur'
import PortfolioAnalysisCorporatePage from '../PortfolioAnalysisCorporatePage/PortfolioAnalysisCorporatePage'
import FundamentalPortfolioAnalysis from '../FundamentalPortfolioAnalysis/FundamentalPortfolioAnalysis'
import PerformancePortfolioAnalysis from '../PerformancePortfolioAnalysis/PerformancePortfolioAnalysis'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'
import Cookies from 'js-cookie';


function Porfolioanalysisallpagecall({children}) {
const navigate= useNavigate()
  useEffect(()=>{
    const token = Cookies.get("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [])
  
  return (
    <div>
        <Portfolioanalyticchart/>
        <StockTracker/>
        <PortfolioAnalysisCorporatePage/>
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

export default Porfolioanalysisallpagecall