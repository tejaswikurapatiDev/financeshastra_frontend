import React from "react";
import "./IpoRecommendationsubscribe.css"; // Updated CSS file name

const IpoRecommendationsubscribe = () => {
  return (
    <div className="iporecommendation-container">
      <h2 className="iporecommendation-title">Recommendations</h2>
      <div className="iporecommendation-box">
        
        <div className="iporecommendation-contentsubs">
        Sanathan Textile Ltd. is a prominent player in India’s textile industry, recognized for its robust operational capabilities and
an expansive product portfolio catering to both domestic and international markets. While the company exhibits strong
financial fundamentals and a steady growth trajectory, its relatively high Price-to-Earnings (PE) ratio may point to
overvaluation, potentially tempering near-term stock performance. Investor sentiment around the IPO has been
moderate, suggesting limited chances of significant listing-day gains. However, long-term investors could find value in
this stock, considering the growth potential of the textile sector and Sanathan Textile's established presence in the market.
        </div>
        <button className="avoidiposubss">Avoid</button>
        <button className="applyiposubss">Apply</button>
      </div>
    </div>
  );
};

export default IpoRecommendationsubscribe;