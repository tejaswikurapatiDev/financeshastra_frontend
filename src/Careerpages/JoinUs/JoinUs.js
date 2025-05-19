import React from 'react';
import './JoinUs.css';
import img from "../../assest/backgroundimgg.png"
import { useNavigate } from 'react-router-dom';


const JoinUs = () => {
    const navigate = useNavigate();

  return (
    <div className="join-us-section">
      <h2 className="join-heading">Ready to Join Us?</h2>
      <p className="join-description">
        If this sounds like you, send your resume and a short note on your favourite stock pick (and why) to:<br />
        
         <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@financeshastra.com&su=Application%20for%20Research%20Analyst" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="email-linkjobcard"
        > careers@financeshastra.com</a>
      </p>

      <p className="join-description">
        Or apply via our <a href="https://www.linkedin.com/company/financeshastra/" className="linkedin-link">LinkedIn Jobs Page.</a>
      </p>

      <p className="join-description">
        Let’s research, innovate, and grow together.
      </p>

      <div className="join-buttonsjob">
        <button className="subscribe-btnjob" onClick={() => {
    navigate("/subscription"); 
    window.scrollTo(0, 0); // Scroll to top after navigation
  }} >Subscribe</button>
        <button className="contact-btnjob" onClick={() => {
    navigate("/contactus"); 
    window.scrollTo(0, 0); // Scroll to top after navigation
  }}>Contact Us</button>
      </div>
    </div>
  );
};

export default JoinUs;
