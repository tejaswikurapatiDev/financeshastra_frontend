import React from "react";
import "./LandingAboutPage.css";
import landingaboutimg from '../../assest/landingaboutimg.png';

const LandingAboutPage = () => {
  return (
    <div className="landingaboutpage-container">
      <div className="landingaboutpage-content">
        {/* Left Section: Image */}
        <div className="landingaboutpage-image">
          <img
            src={landingaboutimg} /* Replace with actual image URL */
            alt="Team Collaboration"
          />
        </div>

        {/* Right Section: Text */}
        <div className="landingaboutpage-text">
          <h2 className="landingaboutpage-title">About the company</h2>
          <p className="landingaboutpage-description">
            At FinanceShastra, we believe in the power of informed financial
            decisions. Our platform is dedicated to helping individuals and
            businesses alike navigate the complexities of personal finance,
            investment strategies, and financial literacy. With over a decade
            of experience in share-market research, data analytics, and
            financial strategy, our team is committed to providing cutting-edge
            insights and tools to simplify your financial journey.
          </p>
          <p className="landingaboutpage-mission">
            Our mission is to transform how 350 million Indians approach their
            finances. Whether you're new to managing money or an experienced
            investor, FinanceShastra offers educational resources, intuitive
            tools, and personalized advice to help you achieve your financial
            goals with confidence.
          </p>
          <button className="landingaboutpage-button">Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default LandingAboutPage;
