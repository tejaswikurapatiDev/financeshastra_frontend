import React, { useEffect } from 'react'
import StockResearchAnalysisPage from './StockResearchAnalysisPage/StockResearchAnalysisPage'
import StockResearchtablePage from './StockResearchtablePage/StockResearchtablePage'
import Navbar from '../Navbar/Navbar';
import StockResearchReportPage from './StockResearchReportPage/StockResearchReportPage';
import StockResearchFaqPage from './StockResearchFaqPage/StockResearchFaqPage';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';
import Sidebar from '../Sidebar/Sidebar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Meta from "../Meta";
import { useLocation } from "react-router-dom";

function Stockresearchpages({ children }) {
  const location = useLocation();
  const {stock}= location
  console.log("stock from prev page: ", location)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [])

  return (
    <div>
      <Meta path={location.pathname} />
      <StockResearchAnalysisPage />
      <StockResearchtablePage />
      <StockResearchReportPage />
      <StockResearchFaqPage />

      <Navbar />
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

export default Stockresearchpages;
