import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./GoalPlannerdarkmode.css"; 
import hosimg from '../../../assest/housee.png';
import bookimg from '../../../assest/book.png';
import holidayimg from '../../../assest/trip.png';
import wedimg from '../../../assest/couple.png';
import vehicleimage from '../../../assest/car.png';
import otherimg from '../../../assest/plant.png';
import FooterForAllPagedarkmode from "../../FooterForAllPagedarkmode/FooterForAllPagedarkmode";
import Navbardarkmode from "../../Navbardarkmode/Navbardarkmode";

const goals = [
  { title: "Buying House", img: hosimg ,link:"/houseGoalPlanner"},
  { title: "Education", img: bookimg ,link:"/educationGoalPlanner"},
  { title: "Holidays", img: holidayimg,link:"/holidayGoalPlanner" },
  { title: "Wedding", img: wedimg,link:"/weddingGoalPlanner" },
  { title: "Buying Vehicle", img: vehicleimage, link: "/cargoalPlanner" }, 
  { title: "Other Goals", img: otherimg,link:"/otherGoalPlanner" }
];

const GoalPlannerdarkmode = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  return (
    <div>
    <div className="goalplanerforalllllldarkmode">
      <h2>Set Investment Goals using the Goal Planner</h2>
      <p>
        Successful investors categorize their short-term and long-term goals and invest <br/>accordingly to achieve them. Plan for your financial goals with the help of our goal planner.
      </p>
      <div className="goal-griddarkmode">
        {goals.map((goal, index) => (
          <div 
            key={index} 
            className="goal-cardplanndarkmode" 
            onClick={() => goal.link && navigate(goal.link)}  // Navigate if link exists
            style={{ cursor: goal.link ? "pointer" : "default" }} // Show pointer cursor if clickable
          >
            <h3>{goal.title}</h3>
            <img src={goal.img} alt={goal.title} className="goal-iconplann" />
          </div>
        ))}
      </div>
     
    </div>
    <Navbardarkmode/>
    <div className="foooterpagesattt">
    <FooterForAllPagedarkmode/>
  </div>
    </div>
  );
};

export default GoalPlannerdarkmode;
