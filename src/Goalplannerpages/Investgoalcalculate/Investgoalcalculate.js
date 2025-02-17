import React, { useState } from "react";
import "./Investgoalcalculate.css";

const tenureOptions = [
  { years: 1, returnRate: 5, monthlyInvestment: 8000 },
  { years: 3, returnRate: 8, monthlyInvestment: 3985 },
  { years: 5, returnRate: 10, monthlyInvestment: 2500 },
  { years: 7, returnRate: 12, monthlyInvestment: 1800 },
];

const Investgoalcalculate = () => {
  const [selectedTenure, setSelectedTenure] = useState(3); // Default 3Y
  const tenureData = tenureOptions.find((t) => t.years === selectedTenure);

  return (
    <div className="investgoalcalculateforall">
      <h3>Cost to achieve the goal</h3>
      <h2>Rs 1,00,000</h2>

      <div className="investment-typecalculategoal">
        <div className="stockgoalcalculate">Stocks <br /><span>60%</span></div>
        <div className="mutualgoalcalculate">Mutual Funds <br /><span>40%</span></div>
      </div>

      <p>Tenure to achieve the goal</p>
      <div className="tenure-options">
        {tenureOptions.map((option) => (
          <button
            key={option.years}
            className={selectedTenure === option.years ? "selected" : ""}
            onClick={() => setSelectedTenure(option.years)}
          >
            {option.years}Y
          </button>
        ))}
      </div>

      <div className="goal-summarycalculateinvest">
        <div>
          <p>Expected rate of return</p>
          <h2>{tenureData.returnRate}%</h2>
        </div>
        <div>
          <p>Amount to reach your target</p>
          <h2>Rs {tenureData.monthlyInvestment.toLocaleString()} / month</h2>
        </div>
      </div>
    </div>
  );
};

export default Investgoalcalculate;
