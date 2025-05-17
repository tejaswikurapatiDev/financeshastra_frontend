import React from "react";
import "./CareerHiringPage.css";
import img1 from '../../assest/missioncareerhirimg.svg';
import img2 from '../../assest/growthcarrimg.png';
import img3 from '../../assest/wfhcareerhirimg.png';
import img4 from '../../assest/acticareerhirimg.png';
import Navbar from "../../Navbar/Navbar";

export default function CareerHiringPage() {
  return (
    <div>
  <div className="careerhiringpage-container">
   
      {/* Header Section */}
      <div className="careerhiringpage-header">
       
        <button className="careerhiringpage-jobbutton">Current Job Opening</button>
      </div>

      {/* Introduction Section */}
      <div className="careerhiringpage-intro">
        <h2>Join the FinanceShastra Movement</h2>
        <p>
          At FinanceShastra, we’re not just building tools—we’re transforming how India understands money. If you’re driven by curiosity, fueled by purpose, and ready to challenge the norm, you’ll feel right at home here.
        </p>
      </div>

      {/* Why Work With Us */}
      <div className="careerhiringpage-why">
        <h3>Why Work With Us?</h3>
        <div className="careerhiringpage-whycards">
          <div className="careerhiringpage-carddd">
            <img src={img1} alt="Mission-Driven" />
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
        <h3>Explore all open position</h3>
       <div className="careerhiringpage-filters">
  {/* Profession Dropdown */}
  <select>
    <option disabled selected>Select what you do</option>
    <option>UI/UX Designer</option>
    <option>Back-end Developer</option>
    <option>Frontend Developer</option>
    <option>Project Manager</option>
    <option>Product Manager</option>
    <option>Research Analyst</option>
    <option>Others</option>
  </select>

  {/* Team Dropdown */}
  <select>
    <option disabled selected>e.g. Design</option>
    <option>Design</option>
    <option>Product</option>
    <option>Frontend</option>
    <option>Backend</option>
    <option>Finance</option>
    <option>Sales</option>
    <option>Marketing</option>
    <option>Others</option>
  </select>

  {/* Location Dropdown */}
  <select>
    <option disabled selected>e.g. In - office</option>
    <option>In - office</option>
    <option>Hybrid</option>
    <option>Remote</option>
  </select>
</div>

      </div>
     
    </div>
    <Navbar/>
    </div>
  );
}
