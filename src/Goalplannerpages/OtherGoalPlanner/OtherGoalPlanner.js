import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtherGoalPlanner.css";
import Navbar from "../../Navbar/Navbar";
import wateringplantimg from "../../assest/wateringplant.png";
import { IoChevronBackSharp } from "react-icons/io5";

const OtherGoalPlanner = () => {
  const [goal, setGoal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions] = useState(["electronic gadget"]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setGoal(suggestion);
  };

  const handleSubmit = () => {
    if (goal.toLowerCase() === "electronic gadget") {
      navigate("/electronicGoalPlanner");
    } else {
      alert(`Goal planned: ${goal}`);
    }
  };

  return (
    <div className="othergoalplanner">
       <div className="icon-backcar" onClick={() => navigate("/goalPlanner")}>
              <IoChevronBackSharp />
            </div>
      <h2>Set Investment Goals using the Goal Planner</h2>
      <p className="othergoalpara">
        Successful investors categorize short-term as well as long-term goals and invest
        accordingly. Plan for your financial goals with the help of our goal planner.
      </p>

      <h1 className="goalplanner-titleallelectronic">Other Goals</h1>
      <div className="allgoalpannerother">
        <div className="goalplanner-containerothergaol">
          <div className="goalplanner-leftother">
            <h1 className="goalplanner-title">Other Goals</h1>
            <div className="goalplanner-image-container">
              <img src={wateringplantimg} alt="House Illustration" className="goalplanner-imageothergoal" />
            </div>
          </div>
        </div>

        <div className="othergoalplanner-container">
          <div className="othergoalplanner-card">
            <h3>Create Your Own Goal</h3>
            <p>
              Embark on a personalised goal journey. From short-term desires to long-term
              goals, let our goal planning & tracking tool empower you to plan for your
              unique personal goal!
            </p>

            <input
              type="text"
              placeholder="Enter your goal name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="othergoalplanner-input"
            />

            {/* Show the list only if searchTerm is not empty and there's a matching suggestion */}
            {searchTerm &&
              suggestions.some((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
              ) && (
                <ul className="suggestion-list">
                  {suggestions
                    .filter((item) =>
                      item.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion}
                      </li>
                    ))}
                </ul>
              )}

            <button type="submit" className="othergoalplanner-button" onClick={handleSubmit}>
              Plan this Goal
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default OtherGoalPlanner;
