
import { useNavigate } from 'react-router-dom';
import React, { useRef,useState } from 'react';
import "./CareerHiringPage.css";
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-scroll';

import img1 from "../../assest/missioncareerhirimg.svg";
import img2 from "../../assest/growthcarrimg.png";
import img3 from "../../assest/wfhcareerhirimg.png";
import img4 from "../../assest/acticareerhirimg.png";
import img5 from '../../assest/search.svg'
import Navbar from "../../Navbar/Navbar";
import JoinUs from "../JoinUs/JoinUs";
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';
  const jobs = [
    {
      id: 1,
      title: 'Research Analyst',
      team: 'Product',
      profession: 'Research Analyst',
      location: 'Remote',
      type: 'Full-Time | Entry to Mid-Level',
      image: img5,
      specification:'other',
      applyLink: 'https://mail.google.com/mail/?view=cm&fs=1&to=careers@financeshastra.com&su=Application%20for%20Research%20Analyst'
    },
    // Add more job objects here
  ];


export default function CareerHiringPage() {
  
  const navigate = useNavigate();
const [filters, setFilters] = useState({
    profession: '',
    team: '',
    location: ''
  })
    const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const filteredJobs = jobs.filter(job => {
    return (
      (!filters.profession || job.profession === filters.profession) &&
      (!filters.team || job.team === filters.team) &&
      (!filters.location || job.location === filters.location) &&
      (!filters.specification || job.specification === filters.specification)
    );
  });

 const handleNavigate = () => {
    window.scrollTo(0, 0);        // Scrolls to the top
    navigate('/jobCard');         // Navigates to /jobCard
  };
   const jobCardRef = useRef(null); // 1️⃣ Create a ref

  // Scroll to Job Card
  const scrollToJobCard = () => {
    if (jobCardRef.current) {
      jobCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
    <div className="careerhiringpage-container">
      {/* Header Section */}
      <div className="careerhiringpage-header">
       <Link to="jobCardSection" smooth={true} duration={500} offset={-100}>
  <button className="careerhiringpage-jobbutton">
    Current Job Opening
  </button>
</Link>


      </div>

      {/* Introduction Section */}
      <div className="careerhiringpage-intro">
        <h2>Join the FinanceShastra Movement</h2>
        <p>
          At FinanceShastra, we’re not just building tools—we’re transforming how India understands money.
          If you’re driven by curiosity, fueled by purpose, and ready to challenge the norm,
          you’ll feel right at home here.
        </p>
      </div>

      {/* Why Work With Us */}
      <div className="careerhiringpage-why">
        <h3>Why Work With Us?</h3>
        <div className="careerhiringpage-whycards">
          <div className="careerhiringpage-carddd">
            <img src={img1} alt="Mission Driven" />
            <h4>Mission-Driven</h4>
            <p>We aim to financially empower 350 million Indians with real insights, not just data.</p>
          </div>
          <div className="careerhiringpage-card">
            <img src={img2} alt="Culture of Growth" />
            <h4>Culture of Growth</h4>
            <p>We encourage ownership, experimentation, and continuous learning.</p>
          </div>
          <div className="careerhiringpage-card">
            <img src={img3} alt="Hybrid Freedom" />
            <h4>Hybrid Freedom</h4>
            <p>Work remotely, collaborate deeply. Impact has no boundaries here.</p>
          </div>
          <div className="careerhiringpage-card">
            <img src={img4} alt="Tools That Matter" />
            <h4>Tools That Matter</h4>
            <p>From stock research to financial planning, our platforms are used by real people making real financial decisions.</p>
          </div>
        </div>
      </div>

      {/* Explore Positions */}
      <div className="careerhiringpage-explore">
        <h3>Explore all open positions</h3>
        <div className="careerhiringpage-filters">
  <select name="profession" value={filters.profession} onChange={handleFilterChange}>
    <option value="">Select what you do</option>
    <option>UI/UX Designer</option>
    <option>Back-end Developer</option>
    <option>Frontend Developer</option>
    <option>Project Manager</option>
    <option>Product Manager</option>
    <option>Research Analyst</option>
    <option>Others</option>
  </select>

  <select name="team" value={filters.team} onChange={handleFilterChange}>
    <option value="">e.g. Design</option>
    <option>Design</option>
    <option>Product</option>
    <option>Frontend</option>
    <option>Backend</option>
    <option>Finance</option>
    <option>Sales</option>
    <option>Marketing</option>
    <option>Others</option>
  </select>

  <select name="location" value={filters.location} onChange={handleFilterChange}>
    <option value="">e.g. In - office</option>
    <option>In - office</option>
    <option>Hybrid</option>
    <option>Remote</option>
  </select>
</div>

      </div>

      {/* Job Card */}
 

      <div className="job-hircard" id="jobCardSection">
  {filteredJobs.length > 0 ? filteredJobs.map(job => (
    <div key={job.id} className="headerjobcard">
      <div>
        <div className="allimgg">
          <div><img src={job.image} className="imgjob" /></div>
          <div>
            <h2>{job.title}</h2>
            <div className="locationjobcard">Location: {job.location} (India)</div>
          </div>
        </div>
        <div className="typejobcardhir">Type: {job.type}</div><div style={{display:"none"}}>{job.team}</div>
      </div>
      <div>
        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-linkjobcareer">
          Apply Now →
        </a>
      </div>
      <section className="sectionjobcarddhir">
        <h3>Who We're Looking For:</h3>
        <p>
          A curious and data-driven individual who can turn financial data into clear, actionable insights.
          Someone who loves diving into balance <br />sheets, tracking trends, and connecting dots in the Indian equity markets.
        </p>
        <div className="show-more-containerhir">
          <span className="show-more-texthir" onClick={handleNavigate}>
            Show More <FaAngleDown className="show-more-iconhiring" />
          </span>
        </div>
      </section>
    </div>
  )) : (
    <p>No matching jobs found.</p>
  )}
</div>


      {/* Navbar at the bottom */}
      
      <JoinUs/>
      </div>
      <Navbar />
      <div className="foooterpagesaupdate">
            <FooterForAllPage/>
          </div>
    </div>
    
  );
}