import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioAnalysisCorporatePage.css";
import itc from "../../assest/itc.png";
import tcs from '../../assest/tcs.png';
import hdfc from "../../assest/hdfcbank.png";
import varun from "../../assest/varunimg.png";
import adani from "../../assest/adaniimg.png";

const PortfolioAnalysisCorporatePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Board - Meetings");
  const [isUpcoming, setIsUpcoming] = useState(true);

  const PortfolioAnalysisCorporatePagedata = [
    {
      company: "ITC Ltd.",
      date: "11-01-2025",
      agenda: "Allotment of equity shares by ITC Hotels Limited",
      logo: itc,
    },
    {
      company: "Varun Beverages Ltd.",
      date: "10-02-2025",
      agenda: "Varun Beverages Ltd has informed BSE that the meeting of the Board of ...",
      logo: varun,
    },
    {
      company: "Tata Consultancy Services Ltd.",
      date: "09-01-2025",
      agenda: "TATA CONSULTANCY SERVICES LTD. has informed BSE that the meeting ...",
      logo: tcs,
    },
    {
      company: "HDFC Bank Ltd.",
      date: "01-22-2025",
      agenda: "Quarterly Results HDFC Bank Ltd has informed BSE that the meeting of ...",
      logo: hdfc,
    },
    {
      company: "Adani Green Energy Ltd.",
      date: "01-23-2025",
      agenda: "Adani Green Energy Ltd has informed BSE that the meeting of the ...",
      logo: adani,
    },
  ];

  const PortfolioAnalysisCorporatePagetabs = [
    { label: "Board - Meetings", navigationPath: "/porfolioanalysisallpagecall"},
    { label: "Dividends", navigationPath: "/portfolioanalysisdividendcall"},
    { label: "Bonus", navigationPath: "/portfoliobonuscall" },
    { label: "Splits", navigationPath: "/portfoliosplitcall" },
    { label: "Rights - Issue", navigationPath: "/portfolioanalysisrightscall" },
    { label: "AGM / EGM", navigationPath: "/portfolioAGMcall" },
  
  ];

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
          className={`portfolianalysiscorporatepage-tab ${
            activeTab === tab.label ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab(tab.label);
            navigate(tab.navigationPath);
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
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
              <tr key={index}>
                <td className="portfolianalysiscorporatepage-company">
                  <img src={item.logo} alt="Logo" />
                  <span>{item.company}</span>
                </td>
                <td>{item.date}</td>
                <td>
                  {item.agenda} <a href="#">Read more</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  
  );
};

export default PortfolioAnalysisCorporatePage;
