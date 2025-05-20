import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import DealOfTheYearSection from "../DealOfTheYearSection/DealOfTheYearSection";
import Navbar from '../../Navbar/Navbar';
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center"
}

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscription = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/plan`);
      if (!response.ok) throw new Error("Failed to fetch plan details");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="loader-cont">
    <ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      loading={loading}
      speedMultiplier={1}
      color="green"
    />
  </div>;
  if (error) return <div>Error: {error}</div>;

  const PlanFeatureItem = ({ feature, description }) => (
    <li className="plan-featuresli">
      <span className="plan-featuresspan">{feature}</span>
      <span className="plan-featuresp">{description}</span>
    </li>
  );

  const PlanSection = ({ title, items }) => (
    <>
      <h4 className="plan-featuresh4">
        <FontAwesomeIcon icon={faCircleCheck} /> {title}
      </h4>
      <ul className="plan-featuresul">
        {items.map((item, index) => (
          <PlanFeatureItem key={index} {...item} />
        ))}
      </ul>
    </>
  );

  const parsePlanData = (apiPlan) => {
    const isPremium = apiPlan.plan === "Premium";

    // Parse features
    const features = apiPlan.features.split('.').filter(Boolean).map(item => {
      const [feature, description] = item.split(':').map(part => part.trim());
      return { feature, description: description ? `: ${description}` : '' };
    });

    // Parse additional benefits
    const benefits = apiPlan.additional_benefits.split('\n').filter(Boolean).map(item => {
      const [feature, description] = item.split(':').map(part => part.trim());
      return { feature, description: description ? `: ${description}` : '' };
    });

    return {
      title: apiPlan.plan,
      price: isPremium ? "7,999" : "3,999", // Keeping your original pricing display
      originalPrice: isPremium ? "19,999" : "8,999", // Keeping your original pricing display
      duration: "12 Month",
      savings: isPremium ? "12,000" : "5,000", // Keeping your original savings display
      percentage: isPremium ? "66" : "55", // Keeping your original percentage display
      description: isPremium
        ? "Invest smarter, invest confidently with the Premium Plan!"
        : "Empower your investment journey with the Elite Plan!",
        buttonClasss: isPremium ? "pay-now-btnfootertop" : "pay-now-btntop",
      features,
      benefits,
      buttonClass: isPremium ? "pay-now-btnfooter" : "pay-now-btn",
      path: `/subscribe-${apiPlan.plan}`
    };
  };

  const renderPlanCard = (plan, isPopular = false) => (
    <div className={`plan-card ${isPopular ? 'permium-plan' : 'elite-plan'}`}>
      <div className="plan-header">
        <div className="plan-header-content">
          <h2 className={`plan-header-title${isPopular ? '' : 'elite'}`}>{plan.title}</h2>
          <p className="plan-description">{plan.description}</p>

          <div className="ribbon-price">
            <span className="price-value">₹{plan.price}</span>
            <span className="price-valuemonth"> / {plan.duration}</span>
            <span className={`ribbon-price-detail${isPopular ? '' : 'elite'}`}> ₹{plan.originalPrice}</span>
            <div className={isPopular ? "textblack" : "text-black"}>
              You save
              <span className="text-highlight"> ₹{plan.savings}</span>
              <span className="text-highlight"> ({plan.percentage}%)</span>
              <span className={isPopular ? "text-blacks" : "text-blackyear"}> a year</span>
            </div>
          </div>
  <button
             className={plan.buttonClasss}
            onClick={() => handleNavigation(plan.path)}
          >
            Subscribe
          </button>
          <div className="plan-features">
            <PlanSection title="Features:" items={plan.features} />
          </div>

          <div className="plan-additional-benefits">
            <PlanSection title="Additional Benefits:" items={plan.benefits} />
          </div>

          <button
            className={plan.buttonClass}
            onClick={() => handleNavigation(plan.path)}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const elitePlan = parsePlanData(plans.find(plan => plan.plan === "Elite"));
  const premiumPlan = parsePlanData(plans.find(plan => plan.plan === "Premium"));

  return (
    <div>
      <DealOfTheYearSection />
      <Navbar />
      <div className="subscription-container">
        <h1 className='subscriptionh2'>Choose a plan that aligns with trading goals !</h1>
        <div className="pricing-containertoggle">
          <div className="plans-wrapper">
            {elitePlan && renderPlanCard(elitePlan)}

            {premiumPlan && (
              <div className="most-popular-container">
                <h2 className="most-popular-text">Most Popular!</h2>
                {renderPlanCard(premiumPlan, true)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default SubscriptionPlans;