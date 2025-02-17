import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./GoalPlanner.css"; 
import hosimg from '../../assest/housee.png';
import bookimg from '../../assest/book.png';
import holidayimg from '../../assest/trip.png';
import wedimg from '../../assest/couple.png';
import vehicleimage from '../../assest/car.png';
import otherimg from '../../assest/plant.png';
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const goals = [
  { title: "Buying House", img: hosimg ,link:"/houseGoalPlanner"},
  { title: "Education", img: bookimg ,link:"/educationGoalPlanner"},
  { title: "Holidays", img: holidayimg,link:"/holidayGoalPlanner" },
  { title: "Wedding", img: wedimg,link:"/weddingGoalPlanner" },
  { title: "Buying Vehicle", img: vehicleimage, link: "/cargoalPlanner" }, 
  { title: "Other Goals", img: otherimg,link:"/otherGoalPlanner" }
];

const GoalPlanner = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  return (
    <div>
    <div className="goalplanerforallllll">
      <h2>Set Investment Goals using the Goal Planner</h2>
      <p>
        Successful investors categorize their short-term and long-term goals and invest <br/>accordingly to achieve them. Plan for your financial goals with the help of our goal planner.
      </p>
      <div className="goal-grid">
        {goals.map((goal, index) => (
          <div 
            key={index} 
            className="goal-cardplann" 
            onClick={() => goal.link && navigate(goal.link)}  // Navigate if link exists
            style={{ cursor: goal.link ? "pointer" : "default" }} // Show pointer cursor if clickable
          >
            <h3>{goal.title}</h3>
            <img src={goal.img} alt={goal.title} className="goal-iconplann" />
          </div>
        ))}
      </div>
     
    </div>
    <Navbar/>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default GoalPlanner;
