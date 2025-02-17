import React from "react";
import './Quaterlynews.css'


const newsData = [
    { title: "SBI adds to record samurai loan boom with ¥30 billion debt plan", date: "23 Dec 2024" },
    { title: "Buy State Bank of India; target of Rs 1050: Sharekhan", date: "20 Dec 2024" },
    { title: "Very optimistic about future growth in country’s income at GDP: SBI", date: "20 Dec 2024" },
    { title: "State Bank of India gains on reporting 23% rise in Q2 consolidated net profit", date: "18 Dec 2024" },
    { title: "SBI raises Rs 50,000 crore via domestic bonds during FY25", date: "18 Dec 2024" },
    { title: "SBI raises Rs 10,000 crore through bond issuance", date: "14 Dec 2024" },
    { title: "State Bank of India reports 23% rise in Q2 consolidated net profit", date: "13 Dec 2024" },
    { title: "SBI - Quarterly Results", date: "08 Nov 2024" },
    { title: "SBI, APIX launch Innovation Hub at Singapore Fintech Festival", date: "07 Nov 2024" },
  ];
const QuaterlynewsList = () => {
  return (
    <div className="news-listt">
        
      <h2>State Bank of India News</h2>
      
      <ul>
        {newsData.map((item, index) => (
          <li key={index} className="news-item">
           
            <span className="news-title">{item.title}</span>
            <span className="news-date">{item.date}</span>
          </li>
        ))}
      </ul>
      </div>

    
  );
};

export default QuaterlynewsList;