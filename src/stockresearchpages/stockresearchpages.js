import React from 'react'
import StockResearchAnalysisPage from './StockResearchAnalysisPage/StockResearchAnalysisPage'
import StockResearchtablePage from './StockResearchtablePage/StockResearchtablePage'
import Navbar from '../Navbar/Navbar';
import StockResearchReportPage from './StockResearchReportPage/StockResearchReportPage';
import StockResearchFaqPage from './StockResearchFaqPage/StockResearchFaqPage';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';
import Sidebar from '../Sidebar/Sidebar';

function Stockresearchpages() {
  return (
    <div>
      <StockResearchAnalysisPage/>
      <StockResearchtablePage/>
      <StockResearchReportPage/>
      <StockResearchFaqPage/>
      <Sidebar/>
      <Navbar/>
      <FooterForAllPage/>
    </div>
  )
}

export default Stockresearchpages;
