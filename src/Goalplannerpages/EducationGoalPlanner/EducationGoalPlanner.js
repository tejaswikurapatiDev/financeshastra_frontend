import React, { useState } from "react";
import bookimg from "../../assest/book.png";
import eduimg from "../../assest/edu.png"; 
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './EducationGoalPlanner.css'


const EducationGoalPlanner = () => {
  const navigate = useNavigate(); 
  const [goalCost, setGoalCost] = useState(10000);
  const [tenure, setTenure] = useState(2);
  const [inflationRate, setInflationRate] = useState(2);
  const [returnRate, setReturnRate] = useState(8);
  const [calculated, setCalculated] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  // Calculate the total amount considering inflation
  const calculateTotalAmount = (goalCost, inflationRate, tenure) => {
    return Math.round(goalCost * Math.pow(1 + inflationRate / 100, tenure));
};

const calculateMonthlyAmount = (goalCost, inflationRate, returnRate, tenure) => {
    const futureGoalCost = goalCost * Math.pow(1 + inflationRate / 100, tenure);

    const monthlyRate = (returnRate / 100) / 12;
    const months = tenure * 12;

    const monthlyInvestment = (futureGoalCost * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(monthlyInvestment);
};

  
  // Handle the calculation when user clicks on 'Calculate Now'
  const handleCalculate = () => {
    // Pass the state values into the calculation functions
    const calculatedTotalAmount = calculateTotalAmount(goalCost, inflationRate, tenure);
    const calculatedMonthlyAmount = calculateMonthlyAmount(goalCost, inflationRate, returnRate, tenure);
    
    // Update state with the calculated values
    setMonthlyAmount(calculatedMonthlyAmount);
    setTotalAmount(calculatedTotalAmount);
    setCalculated(true);
  };

  return (
    <div>
      <div className="icon-backcar" onClick={() => navigate("/goalPlanner")}>
        <IoChevronBackSharp />
      </div>

      <h2 className="goalplanner-subtitle">Set Investment Goals using the Goal Planner</h2>
      <p className="goalplanner-description">
        Successful investors categorize short-term and long-term goals and invest accordingly.
        <br />
        Plan your financial goals with our goal planner.
      </p>
      <h1 className="goalplanner-titleallcar">Education</h1>

      <div className="goalplanner-container">
        <div className="goalplanner-left">
          <h1 className="goalplanner-title">Education</h1>
          <div className="goalplanner-image-container">
            <img src={eduimg} alt="House Illustration" className="goalplanner-image" />
          </div>
          <div className="goalplanner-results">
            {calculated && (
              <div className="cargoalplaneerall">
                <div className="goalplanner-result">
                  <p>Amount to reach your target</p>
                  <h3>Rs {monthlyAmount} / month</h3>
                </div>
                <div className="goalplanner-result">
                  <p>Amount to meet your goal</p>
                  <h3>Rs {totalAmount}</h3>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="goalplanner-right">
          <div className="goalplanner-slider-group">
              <div className="goalplanner-image-containerrr">
                   
                      <img src={bookimg} alt="Car Illustration" className="goalplanner-imagebook" />
                    </div>
            <div className="costtopcargoal">
            <div>
              <label>Cost to achieve the goal</label>
              </div>
              <div className="cargoalparacost">
              <p>Rs {goalCost}</p>
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="100"
              value={goalCost}
              onChange={(e) => setGoalCost(+e.target.value)}
              className="goalplanner-slider"
            />
          </div>

          <div className="goalplanner-slider-group">
            <div className="costtopcargoal">
            <div>
              <label>Tenure to achieve the goal</label>
              </div>
              <div className="cargoalparacost">
              <p>{tenure} yrs</p>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(+e.target.value)}
              className="goalplanner-slider"
            />
          </div>

          <div className="goalplanner-slider-group">
            <div className="costtopcargoal">
            <div>
              <label>Expected rate of inflation</label>
              </div>
              <div className="cargoalparacost">
              <p>{inflationRate} %</p>
            </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={inflationRate}
              onChange={(e) => setInflationRate(+e.target.value)}
              className="goalplanner-slider"
            />
          </div>

          <div className="goalplanner-slider-group">
            <div className="costtopcargoal">
            <div>
              <label>Expected rate of return</label>
              </div>
              <div className="cargoalparacost">
              <p>{returnRate} %</p>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={returnRate}
              onChange={(e) => setReturnRate(+e.target.value)}
              className="goalplanner-slider"
            />
          </div>

          <div className="goalplanner-actions">
            <button className="goalplanner-buttoncalculate" onClick={handleCalculate}>
              Calculate Now
            </button>
            <button className="goalplanner-buttoninvest" onClick={() => navigate("/goalplannerforallcalculator")}>
              Invest Now
            </button>
          </div>
        </div>
      </div>

      <Navbar />
      <div className="foooterpagesattt">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default EducationGoalPlanner;
