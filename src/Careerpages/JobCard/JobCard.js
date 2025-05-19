import React, { useState } from 'react';
import './JobCard.css';
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import JoinUs from '../JoinUs/JoinUs';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';
import Navbar from '../../Navbar/Navbar';
 import img1 from '../../assest/search.svg'
const JobCard = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleDetails = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar/>
    <div className="job-card">
      
      <div className="headerjobcard">
        <div>
          <div className='allimgg'>
            <div><img src={img1} className='imgjob'/></div><div><h2>Research Analyst</h2>
          <div className="locationjobcard">Location: Remote (India)</div></div></div>
          <div className="typejobcard">Type: Full-Time | Entry to Mid-Level</div>
        </div>
<div>
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@financeshastra.com&su=Application%20for%20Research%20Analyst" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="apply-linkjobcard"
        >
          Apply Now →
        </a>
        </div>
      </div>

    
          <section className="sectionjobcardd">
            <h3>Who We're Looking For:</h3>
            <p>
              A curious and data-driven individual who can turn financial data into clear, actionable insights.
              Someone who loves diving into balance sheets, tracking trends, and connecting dots in the Indian equity markets.
            </p>
          </section>

          <section className="sectionjobcard">
            <h3>Responsibilities:</h3>
            <ul>
              <li>Conduct fundamental and technical research on listed Indian companies</li>
              <li>Write insightful research reports and market commentary</li>
              <li>Track quarterly results, sector trends, and investment themes</li>
              <li>Collaborate with the content and product teams to turn data into value</li>
              <li>Stay up-to-date with SEBI regulations and market updates</li>
            </ul>
          </section>
  {expanded && (
        <>
          <section className="sectionjobcard">
            <h3>Requirements:</h3>
            <ul>
              <li>Bachelor's in Finance, Commerce, Economics or related field</li>
              <li>Strong understanding of financial statements, ratios, and valuation techniques</li>
              <li>Excellent research and writing skills</li>
              <li>Familiarity with tools like Screener, MoneyControl, Trendlyne, or TIKR</li>
              <li>Bonus: Experience with Excel, Power BI, or financial modeling</li>
            </ul>
          </section>

          <section className="sectionjobcard">
            <h3>Perks:</h3>
            <ul>
              <li>Flexible hours</li>
              <li>Opportunity to grow into a Senior Analyst or Product Strategist role</li>
              <li>Performance-based bonuses</li>
              <li>Be part of a fast-growing fintech startup shaping the future of investing in India</li>
            </ul>
          </section>
        </>
      )}
      <div className='alljobiconn'>
<div>
      <p 
  onClick={() => {
    toggleDetails();         
    window.scrollTo(0, 0);   
  }}   className="iconlessjob"style={{ cursor: 'pointer' }}>
        {expanded ? 'Show less' : 'Show more'}
      </p>
      </div>
      <div>
      <p 
  onClick={() => {
    toggleDetails();         
    window.scrollTo(0, 0);   
  }} 
  className="iconless" 
  style={{ cursor: 'pointer' }}
>
  {expanded ? <FaAngleUp /> : <FaAngleDown />}
</p>

       </div>
       </div>
    </div>
    <JoinUs/>
    <FooterForAllPage/>
    </div>
  );
};

export default JobCard;
