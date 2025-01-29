import React, { useState } from "react";
import './Lumpsumcalculatorpage.css'
import { Doughnut } from "react-chartjs-2";

const LumpSumCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000); // Lump Sum Investment Amount
  const [investmentPeriod, setInvestmentPeriod] = useState(10); // Investment Period in years
  const [expectedReturnRate, setExpectedReturnRate] = useState(12); // Expected Return Rate (p.a)

  // Calculate estimated returns using compound interest formula
  const estimatedReturns = Math.round(
    investmentAmount *
      ((1 + expectedReturnRate / 100) ** investmentPeriod - 1)
  );

  // Calculate total amount
  const totalAmount = investmentAmount + estimatedReturns;

  // Doughnut Chart Data
  const data = {
    labels: ["Invested", "Est. Returns"],
    datasets: [
      {
        data: [investmentAmount, estimatedReturns],
        backgroundColor: ["#003f8f", "#24b676"],
        hoverBackgroundColor: ["#003f8f", "#24b676"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
     <div className="sippcaloculatorrs-container">
         <div className="alllsipcontainerlumsum">
         {/* Monthly SIP Amount */}
         <div className="lumsumm">
         <div className="sippcaloculatorrs-input">
           <div className="alllsipmonthlylum">
             <div className="labelsippp">
             <label>Investment Amount</label>
             </div>
             <div>
               <input
                 type="text"
                 value={`Rs ${investmentAmount.toLocaleString()}`}
                 readOnly
                 className="sippcaloculatorrs-textbox"
               />
             </div>
           </div>
           <div className="sippcaloculatorrs-slider-container">
             <input
                type="range"
                min="1000"
                max="10000000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
               className="sippcaloculatorrs-slider"
             />
           </div>
         </div>
   
         {/* SIP Period */}
         <div className="sippcaloculatorrs-input">
           <div className="alllsiplum">
             <div className="labelsippp">
             <label>Investment Period (years)</label>
             </div>
             <div>
               <input
                 type="text"
                 value={`${investmentPeriod} yrs`}
                 readOnly
                 className="sippcaloculatorrs-textbox"
               />
             </div>
           </div>
           <div className="sippcaloculatorrs-slider-container">
             <input
                type="range"
                min="1"
                max="30"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
               className="sippcaloculatorrs-slider"
             />
           </div>
         </div>
   
         {/* Expected Return Rate */}
         <div className="sippcaloculatorrs-input">
           <div className="alllsipratelum">
             <div className="labelsippp">
             <label>Expected Return Rate (p.a)</label>
             </div>
             <div>
               <input
                 type="text"
                 value={`${expectedReturnRate} %`}
                 readOnly
                 className="sippcaloculatorrs-textbox"
               />
             </div>
           </div>
           <div className="sippcaloculatorrs-slider-container">
             <input
               type="range"
               min="1"
               max="20"
               value={expectedReturnRate}
               onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
               className="sippcaloculatorrs-slider"
             />
           </div>
         </div>
         </div>
         {/* Doughnut Chart */}
         <div className="accountallmutualfundlist-container">
         <div className="accountallmutualfundlist-chart">
           <Doughnut data={data} options={options} />
         </div>
   
         <div className="accountallmutualfundlist-legend">
           <div className="accountallmutualfundlist-legend-item">
             <span className="accountallmutualfundlist-dot invested"></span> 
             Invested
           </div>
           <div className="accountallmutualfundlist-legend-item">
             <span className="accountallmutualfundlist-dot returns"></span> 
             Est. Returns
           </div>
         </div>
         {/* Investment Details */}
         <div className="accountallmutualfundlist-details">
         <div className="accountallmutualfundlist-row">
         <p>Total Investment</p>
         <h2>Rs {investmentAmount.toLocaleString()}</h2>
           </div>
           <div className="accountallmutualfundlist-row">
           <p>Estimated Returns</p>
           <h3>Rs {estimatedReturns.toLocaleString()}</h3>
           </div>
           <div className="accountallmutualfundlist-row">
           <p>Total Amount</p>
           <h3>Rs {totalAmount.toLocaleString()}</h3>
           </div>
         </div>
   
         {/* Button */}
         <button className="accountallmutualfundlist-button">
           Best Mutual Funds List
         </button>
       </div>
       </div>
       </div>
     
     );
   };
   
   export default LumpSumCalculator;
   