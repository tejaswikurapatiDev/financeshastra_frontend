// AnalystInsights.js
import React from 'react';
import './AnalystInsights.css';
import { useNavigate } from 'react-router-dom';
import useSubscriptionDetails from '../../MutualFund/Hooks/useSubscriptionDetials';

const AnalystInsights = () => {
  const {activeplan, isLoading}= useSubscriptionDetails();
  const navigate = useNavigate();
  let activeplanhere
  if (activeplan === 2){
    activeplanhere= "Premium"
  }else{
    activeplanhere= "Elite"
  }
  console.log(activeplanhere)

  return (

    <div><h2 className="analystinsightheader">Analyst Insights</h2>
    <div className="analyst-insights">
        
       
      <div className={activeplanhere ==="Elite" ? "content-blur-box": "content-box"}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
         Sed cursus ante dapibus diam. Sed nisi.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Sed cursus ante dapibus diam. Sed nisi.</p>
        {activeplanhere === "Elite" && <div className="premium-feature" onClick={() => navigate('/subscription')}>
      This feature is exclusive to premium users. Click here for more details.
    </div>}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
      </div>
      
    </div>
    </div>
  );
};

export default AnalystInsights;