import React from "react";
import "./profileelitepremium.css"; // Import the CSS file
import imgg1 from '../../assest/banner.jpeg';
import Navbar from "../../Navbar/Navbar";
const PlanSelection = () => {
  const plans = [
    { name: "Elite Plan", isCurrent: true },
    { name: "Premium Plan", isCurrent: false },
  ];

  return (
    <div className="profile-container">
     <div class="profile-banner">
  <img src={imgg1} alt="Trading Goals" class="banner-image" />
  <div class="overlay">
    <h2 class="profile-title">Choose a plan that aligns with <br/> your trading goals!</h2>
    <p class="profile-subtitle">
      Get started and unlock all features, including advanced Supercharts.
    </p>
    <button class="profile-button">Explore Now</button>
  </div>
</div>


      <div className="profile-plans">
        <h3 className="profile-current-plan">Current Plan</h3>
        {plans.map((plan, index) => (
          <div key={index} className={`profile-plan ${plan.name.toLowerCase().replace(" ", "-")}`}>
            <span className="profile-plan-name">{plan.name}</span>
            <button className="profile-upgrade-button">Upgrade Now</button>
          </div>
        ))}
      </div>
      <Navbar/>
    </div>
  );
};

export default PlanSelection;