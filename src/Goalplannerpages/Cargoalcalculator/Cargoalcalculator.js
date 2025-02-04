import React, { useState } from "react";
import "./Cargoalcalculator.css";
import carimg from "../../assest/gcar.png";
import carrimg from "../../assest/carhalf.png";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const CargoalPlanner = () => {
  const navigate = useNavigate(); 
  const [goalCost, setGoalCost] = useState(10000);
  const [tenure, setTenure] = useState(2);
  const [inflationRate, setInflationRate] = useState(2);
  const [returnRate, setReturnRate] = useState(8);
  const [calculated, setCalculated] = useState(false); // Track if the calculation is done
  const [monthlyAmount, setMonthlyAmount] = useState(null); // To store monthly amount
  const [totalAmount, setTotalAmount] = useState(null); // To store total amount to meet the goal

  const calculateMonthlyAmount = () => {
    const effectiveRate = (returnRate - inflationRate) / 100;
    const months = tenure * 12;
    return ((goalCost * effectiveRate) / (Math.pow(1 + effectiveRate, months) - 1)).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return (goalCost * (1 + (inflationRate / 100) * tenure)).toFixed(2);
  };

  const handleCalculate = () => {
    const calculatedMonthlyAmount = calculateMonthlyAmount();
    const calculatedTotalAmount = calculateTotalAmount();
    
    setMonthlyAmount(calculatedMonthlyAmount); // Update monthly amount
    setTotalAmount(calculatedTotalAmount); // Update total amount
    setCalculated(true); // Mark calculation as done
  };

  return (
    <div>
      <div className="icon-backcar" onClick={() => navigate("/goalPlanner")}>
      <IoChevronBackSharp />
    </div>

       <h2 className="goalplanner-subtitle">Set Investment Goals using the Goal Planner</h2>
        <p className="goalplanner-description">
          Successful investors categorize short-term and long-term goals and invest accordingly.<br/> Plan your financial goals with our goal planner.
        </p>
        <h1 className="goalplanner-titleallcar">Buying Vehicle</h1>

    <div className="goalplanner-container">
      <div className="goalplanner-left">
        <h1 className="goalplanner-title">Buying Vehicle</h1>
        <div className="goalplanner-image-container">
          <img src={carimg} alt="Car Illustration" className="goalplanner-image" />
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
       
          <img src={carrimg} alt="Car Illustration" className="goalplanner-imagecar" />
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
            max="10"
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
          <button className="goalplanner-buttoncalculate" onClick={handleCalculate}>Calculate Now</button>
          <button className="goalplanner-buttoninvest" onClick={() => navigate("/goalplannerforallcalculator")}>
      Invest Now
    </button>
        </div>
      </div>
      <Navbar/>
    </div>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default CargoalPlanner;
