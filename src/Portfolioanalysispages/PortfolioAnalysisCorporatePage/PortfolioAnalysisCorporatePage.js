import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioAnalysisCorporatePage.css";
import itc from "../../assest/itc.png";
import tcs from '../../assest/tcs.png';
import hdfc from "../../assest/hdfcbank.png";
import varun from "../../assest/varunimg.png";
import adani from "../../assest/adaniimg.png";
import PortfolioAnalysisdividentPage from "../PortfolioAnalysisdividentPage/PortfolioAnalysisdividentPage";
import PortfolioAnalysisbonusPage from "../PortfolioAnalysisbonusPage/PortfolioAnalysisbonusPage";
import PortfolioAnalysissplitPage from "../PortfolioAnalysissplitPage/PortfolioAnalysissplitPage";
import PortfolioAnalysisrightissusePage from "../PortfolioAnalysisrightissusePage/PortfolioAnalysisrightissusePage";
import PortfolioAnalysisAGMPage from "../PortfolioAnalysisAGMPage/PortfolioAnalysisAGMPage";

const PortfolioAnalysisCorporatePage = () => {
  const [activeTab, setActiveTab] = useState("Board - Meetings");
  const [isUpcoming, setIsUpcoming] = useState(true);
   const [popupContent, setPopupContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const PortfolioAnalysisCorporatePagedata = [
    {
      company: "ITC Ltd.",
      date: "11-01-2025",
      agenda: "Allotment of equity shares by ITC Hotels Limited...",
      agendaa: "Varun Beverages Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 10/02/2025 inter alia to consider and approve Audited Financial Results of the Company both on Standalone and Consolidated basis for the Quarter and Financial Year ended December 31 2024 and to consider the proposal of recommendation of final dividend for the Financial Year ended December 31 2024 subject to the approval of Equity Shareholders at the ensuing Annual General Meeting of the Company. In continuation to our letter dated December 26 2024 regarding the closure of Trading Window from January 1 2025 till 48 hours after public announcement of the Audited Financial Results for the Quarter and Financial Year ended December 31 2024 we wish to inform you that the Trading Window will be closed till February 12 2025.",
      logo: itc,
    },
    {
      company: "Varun Beverages Ltd.",
      date: "10-02-2025",
      agenda: "Varun Beverages Ltd has informed BSE that the meeting of the Board of ...",
       agendaa: "Varun Beverages Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 10/02/2025 inter alia to consider and approve Audited Financial Results of the Company both on Standalone and Consolidated basis for the Quarter and Financial Year ended December 31 2024 and to consider the proposal of recommendation of final dividend for the Financial Year ended December 31 2024 subject to the approval of Equity Shareholders at the ensuing Annual General Meeting of the Company. In continuation to our letter dated December 26 2024 regarding the closure of Trading Window from January 1 2025 till 48 hours after public announcement of the Audited Financial Results for the Quarter and Financial Year ended December 31 2024 we wish to inform you that the Trading Window will be closed till February 12 2025.",
      logo: varun,
    },
    {
      company: "Tata Consultancy Services Ltd.",
      date: "09-01-2025",
      agenda: "TATA CONSULTANCY SERVICES LTD. has informed BSE that the meeting ...",
       agendaa: "Varun Beverages Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 10/02/2025 inter alia to consider and approve Audited Financial Results of the Company both on Standalone and Consolidated basis for the Quarter and Financial Year ended December 31 2024 and to consider the proposal of recommendation of final dividend for the Financial Year ended December 31 2024 subject to the approval of Equity Shareholders at the ensuing Annual General Meeting of the Company. In continuation to our letter dated December 26 2024 regarding the closure of Trading Window from January 1 2025 till 48 hours after public announcement of the Audited Financial Results for the Quarter and Financial Year ended December 31 2024 we wish to inform you that the Trading Window will be closed till February 12 2025.",
      logo: tcs,
    },
    {
      company: "HDFC Bank Ltd.",
      date: "01-22-2025",
      agenda: "Quarterly Results HDFC Bank Ltd has informed BSE that the meeting of ...",
       agendaa: "Varun Beverages Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 10/02/2025 inter alia to consider and approve Audited Financial Results of the Company both on Standalone and Consolidated basis for the Quarter and Financial Year ended December 31 2024 and to consider the proposal of recommendation of final dividend for the Financial Year ended December 31 2024 subject to the approval of Equity Shareholders at the ensuing Annual General Meeting of the Company. In continuation to our letter dated December 26 2024 regarding the closure of Trading Window from January 1 2025 till 48 hours after public announcement of the Audited Financial Results for the Quarter and Financial Year ended December 31 2024 we wish to inform you that the Trading Window will be closed till February 12 2025.",
      logo: hdfc,
    },
    {
      company: "Adani Green Energy Ltd.",
      date: "01-23-2025",
      agenda: "Adani Green Energy Ltd has informed BSE that the meeting of the ...",
       agendaa: "Varun Beverages Ltdhas informed BSE that the meeting of the Board of Directors of the Company is scheduled on 10/02/2025 inter alia to consider and approve Audited Financial Results of the Company both on Standalone and Consolidated basis for the Quarter and Financial Year ended December 31 2024 and to consider the proposal of recommendation of final dividend for the Financial Year ended December 31 2024 subject to the approval of Equity Shareholders at the ensuing Annual General Meeting of the Company. In continuation to our letter dated December 26 2024 regarding the closure of Trading Window from January 1 2025 till 48 hours after public announcement of the Audited Financial Results for the Quarter and Financial Year ended December 31 2024 we wish to inform you that the Trading Window will be closed till February 12 2025.",
      logo: adani,
    },
  ];

  const PortfolioAnalysisCorporatePagetabs = [
    { label: "Board - Meetings", navigationPath: "/portfolio-analysis-tool" },
    { label: "Dividends", navigationPath: "/portfolioanalysisdividendcall" },
    { label: "Bonus", navigationPath: "/portfoliobonuscall" },
    { label: "Splits", navigationPath: "/portfoliosplitcall" },
    { label: "Rights - Issue", navigationPath: "/portfolioanalysisrightscall" },
    { label: "AGM / EGM", navigationPath: "/portfolioAGMcall" },

  ];
 const handleReadMore = (agendaa) => {
    setPopupContent(agendaa);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent("");
  };
  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (

    <div className="portfolianalysiscorporatepage-container">
      <div className="portfolianalysiscorporatepage-header">
        <h2>Corporate Action</h2>
        <div className="portfolianalysiscorporatepage-toggle">
          <label className="portfolianalysiscorporatepageswitch">
            <input
              type="checkbox"
              checked={isUpcoming}
              onChange={() => setIsUpcoming(!isUpcoming)}
            />
            <span className="portfolianalysiscorporatepageslider"></span>
          </label>
          <span>Upcoming</span>

        </div>

      </div>
      <div className="portfolianalysiscorporatepage-tabs">
        {PortfolioAnalysisCorporatePagetabs.map((tab) => (
          <div
            key={tab.label}
            className={`portfolianalysiscorporatepage-tab ${activeTab === tab.label ? "active" : ""
              }`}
            onClick={() => {
              setActiveTab(tab.label);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>{activeTab === "Board - Meetings" &&
        <div className="portfolianalysiscorporatepage-table-wrapper">
          <div className="portfolianalysiscorporatepage-table">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Ex - Date</th>
                  <th>Agenda</th>
                </tr>
              </thead>
              <tbody>
  {PortfolioAnalysisCorporatePagedata.map((item, index) => (
    <React.Fragment key={index}>
      <tr>
        <td className="portfolianalysiscorporatepage-company">
          <img src={item.logo} alt="Logo" />
          <span>{item.company}</span>
        </td>
        <td>{item.date}</td>
        <td>
          {item.agenda.length > 50 ? (
            <>
              {item.agenda.substring(0, 50)}...
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setExpandedIndex(index);
                setPopupContent(item.agendaa);
                setShowPopup(true);
              }}>
                {" "}Read more
              </a>
            </>
          ) : (
            item.agenda
          )}
        </td>
      </tr>

      {expandedIndex === index && showPopup && (
        <tr>
          <td colSpan="3">
            <div className="popup-overlaycoper">
              <div className="popup-boxcop">
                <span className="close-buttoncop" onClick={() => setShowPopup(false)}>
                  &times;
                </span>
                <p>{popupContent}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>

            </table>
          </div>
        </div>}{
        activeTab === "Dividends" && <PortfolioAnalysisdividentPage />
      }{
        activeTab === "Bonus" && <PortfolioAnalysisbonusPage />
      }{
        activeTab === "Splits" && <PortfolioAnalysissplitPage />
      }{
        activeTab === "Rights - Issue" && <PortfolioAnalysisrightissusePage />
      }{
        activeTab === "AGM / EGM" && <PortfolioAnalysisAGMPage />
      }

   

    </div>

  );

};

export default PortfolioAnalysisCorporatePage;
