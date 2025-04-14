
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hdfc from "../../assest/hdfcbank.png";
import adani from "../../assest/adaniimg.png";
import itc from "../../assest/itc.png";


const PortfolioAnalysisAGMPage = () => {
    const navigate = useNavigate();
    
  const [activeTab, setActiveTab] = useState("AGM / EGM");
  const [isUpcoming, setIsUpcoming] = useState(true);

  const PortfolioAnalysisamgPagedata = [
    {
     logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "25-09-2024",
      agenda: "EGM 25/09/2024",
    },
    {
      logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "25-09-2024",
      agenda:
        "EGM 25/09/2024 We submit herewith the Voting Results of the Extra...",
    },
    {
      logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda: "Outcome of the Board Meeting held on June 20, 2024",
    },
    {
      logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda:
        "Outcome of the Board Meeting held on June 20, 2024 Intimation under SEBI...",
    },
    {
     logo: hdfc,
      company: "HDFC Bank Ltd.",
      exDate: "08-09-2024",
      agenda:
        "Outcome of the Board Meeting held on June 20, 2024 Intimation under SEBI...",
    },
    {
      logo: adani,
      company: "Adani Green energy Ltd.",
      exDate: "03-09-2024",
      agenda:
        "EGM 09/03/2024 Notice of EGM dated 09.03.2024 (As Per BSE Announcement...",
    },
    {
     logo: itc,
      company: "ITC Ltd.",
      exDate: "26-07-2024",
      agenda:
        "Recommended Final Dividend off 7.50 per Ordinary Share off 1/- each for...",
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
            <th>Ex-Date</th>
            <th>Agenda</th>
          </tr>
        </thead>
        <tbody>
          {PortfolioAnalysisamgPagedata.map((item, index) => (
            <tr key={index}>
              <td className="portfolianalysiscorporatepage-company">
                <img src={item.logo} alt="Logo" className="logo" />
                <span>{item.company}</span>
              </td>
              <td>{item.exDate}</td>
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

export default PortfolioAnalysisAGMPage;
