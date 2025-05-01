import React, { useState } from "react";
import "./Billingavailableplan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const Billingavailableplan = () => {
  const [activepage, setactivepage] = useState("half");

    const navigate = useNavigate();
    return (
        <div>
             <div >




            <div className="">

               
                

                <div className="billingSubscriptionContainer">
                    <h2 className="billingSubscriptionTitle">Available Plan</h2>
                    <div className="billingSubscriptionCard">
                        <h2 className="billing-detailspages-amount">
                            <span style={{ color: "black" }}>Rs 7,999</span> <br />


                        </h2>

              <p className="billing-detailspages-plan">
                <strong style={{ color: "#888" }}>Plan </strong>
                <span style={{ color: "black" }}>Premium</span>
                <span style={{ color: "#24b676" }}> (Annually)</span>
              </p>
              <div class="plan-features">
                <h4 className="plan-featuresh4">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Features:
                </h4>
                <ul className="plan-featuresul">
                  <li className="plan-featuresli">
                    <span className="plan-featuresspan">
                      {" "}
                      50 Stock Recommendations
                    </span>
                    <span className="plan-featuresp">
                      {" "}
                      : Expert recommendations on 150 stocks to optimize your
                      portfolio.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span>Stocks Screener </span>
                    <span className="plan-featuresp">
                      {" "}
                      : Automate your investments with StockSIP for consistent
                      wealth creation.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span> Premium Screener </span>
                    <span className="plan-featuresp">
                      {" "}
                      : Access advanced tools to filter and analyze stocks
                      tailored to your strategy.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span> Q&A Feature</span>
                    <span className="plan-featuresp">
                      {" "}
                      : Get personalized investment advice from our experts.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span> Discover Top-rated Stocks</span>
                    <span className="plan-featuresp">
                      {" "}
                      : Identify the best-performing stocks based on
                      comprehensive research.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span> Premium Actionable Insights</span>
                    <span className="plan-featuresp">
                      {" "}
                      : Stay ahead with exclusive updates and analysis on market
                      trends.
                    </span>
                  </li>
                </ul>
              </div>
              <div class="plan-additional-benefits">
                <h4 className="plan-featuresh4">
                  {" "}
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Additional Benefits:
                </h4>
                <ul className="plan-featuresul">
                  <li className="plan-featuresli">
                    <span className="plan-featuresspan"> Stock Research</span>
                    <span className="plan-featuresp">
                      {" "}
                      : Receive Buy/Sell/Hold recommendations on all listed
                      stocks, backed by deep, data-driven research.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span className="plan-featuresspan">Stock of the Week</span>
                    <span className="plan-featuresp">
                      {" "}
                      :A high-potential stock handpicked by our Research Team.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span className="plan-featuresspan">Research Reports </span>
                    <span className="plan-featuresp">
                      {" "}
                      : Access the real-time research reports on any stock.
                    </span>
                  </li>
                  <li className="plan-featuresli">
                    <span className="plan-featuresspan">Momentum Stocks </span>
                    <span className="plan-featuresp">
                      {" "}
                      : Identify and capitalize on the best momentum stocks for
                      any market phase.
                    </span>
                  </li>
                </ul>
              </div>
              <button
                className="billingSubscriptionButton"
               
                onClick={() => {
                  navigate("/subscribe-Premium"); 
                  window.scrollTo(0, 0); // Scroll to top after navigation
                }}
              >
                Billing Details
              </button>
            </div>

         
         

            <div className="billingSubscriptionPlans">
                <div className="billingSubscriptionPlan">
                  <h4 className="billingSubscriptionPlanTitle">Elite</h4>
                  <p>Empower your investment journey with the Elite Plan!</p>
                  <button
                    className="billingSubscriptionPlanButton"
                   
                      onClick={() => {
                        navigate("/subscribe-Elite"); 
                      window.scrollTo(0, 0); // Scroll to top after navigation
                    }}
                  >
                    Explore
                  </button>
                </div>
                <div className="activecont billingSubscriptionPlan">
                  <h4 className="billingSubscriptionPlanTitle">Premium</h4>
                  <p>Invest smarter, invest confidently with the Premium Plan!</p>
                  <button
                    className="billingSubscriptionPlanButton"
                    onClick={() =>{ navigate("/subscribe-Premium")
                      window.scrollTo(0, 0); // Scroll to top after navigation
  }}
                  >
                    Explore
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billingavailableplan;
