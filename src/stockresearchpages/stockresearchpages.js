import React from 'react'
import StockResearchAnalysisPage from './StockResearchAnalysisPage/StockResearchAnalysisPage'
import StockResearchtablePage from './StockResearchtablePage/StockResearchtablePage'
import Navbar from '../Navbar/Navbar';
import StockResearchReportPage from './StockResearchReportPage/StockResearchReportPage';
import StockResearchFaqPage from './StockResearchFaqPage/StockResearchFaqPage';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';

function Stockresearchpages() {
  return (
    <div>
      <StockResearchAnalysisPage/>
      <StockResearchtablePage/>
      <StockResearchReportPage/>
      <StockResearchFaqPage/>
      <Navbar/>
      <FooterForAllPage/>
    </div>
  )
}

export default Stockresearchpages;
