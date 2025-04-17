import React, { useState, useEffect } from 'react';
import './Mutualfundall.css';
import Mutualxray from './MutualFund10years/MutualFund10years';
import Mutualgraphtop from './Mutualgraphtop/Mutualgraphtop';
import MutualFundsSipCalculator from './MutualFundsSipCalculator/MutualFundsSipCalculator';
import MutualkeyIndicators from './MutualkeyIndicators/MutualkeyIndicators';
import MutualFundsSchemeAllocation from './MutualFundsSchemeAllocation/MutualFundsSchemeAllocation';
import MtuFundDetails from './MtuFundDetails/MtuFundDetails';
import FundContactInfo from './FundContactInfo/FundContactInfo';
import RiskOMeter from './RiskoMutualDashboard/RiskoMutualDashboard';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';
import { API_BASE_URL } from '../config';
import { useParams } from "react-router-dom";

function Mutualfund() {

  const { fundId } = useParams();

  const [financialData, setFinancialData] = useState({
    price: "₹127.89",
    percentage: "+0.85%",
    lastUpdated: "05 Dec, 2024",
  });
  const [fundDetails, setFundDetails] = useState(null);
  const [perfSummary, setPerfSummary] = useState(null)
  const [cagrSummary, setCagrSummary] = useState(null)
  const [peerCompare, setPeerCompare] = useState(null)


  const getMutualFundDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mutualFunds/getMutualFundDetails/${fundId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch mutual fund details");
      }

      const result = await response.json();
      console.log('Performance Summary',result.data)
      if (result.success && result.data) {
        setFundDetails(result.data.key_indicator[0]);
        setPerfSummary(result.data.performance_summary);
        setCagrSummary(result.data.cagr_summary)
        setPeerCompare(result.data.peer_comparison)

      }
    } catch (error) {
      console.error("Error fetching mutual fund details:", error);
    }
  };


  useEffect(() => {
    getMutualFundDetails();
  }, [fundId])


  // Example: Function to simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new data
      const newPrice = (Math.random() * 100 + 100).toFixed(2);
      const newPercentage = ((Math.random() * 2 - 1) * 1.5).toFixed(2); // Random between -1.5% and +1.5%
      const now = new Date();
      const newLastUpdated = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setFinancialData({
        price: `₹${newPrice}`, // Correct interpolation using backticks
        percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`, // Correct interpolation using backticks
        lastUpdated: newLastUpdated,
      });

    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <div className="mutualcandletop">
        {/* Left Section */}
        <div className="mutualcandletop__left">
          <h2 className="mutualcandletop__title"> </h2>
          <div className="mutualcandletop__tags">
            <button className="mutualcandletop__tag">Mid Cap</button>
            {fundDetails && (
              <button className="mutualcandletop__tag">{fundDetails.riskometer}</button>
            )}
          </div>
        </div>

        <div className="mutualcandletop__right">
          {fundDetails && (
            <h2 className="mutualcandletop__price">{fundDetails.nav}</h2>
          )}
          {fundDetails && (
            <p
              className={`mutualcandletop__percentage ${parseFloat(fundDetails.change_percent) >= 0
                ? "mutualcandletop__percentage--positive"
                : "mutualcandletop__percentage--negative"
                }`}
            >
              {fundDetails.change_percent}
            </p>
          )}
          <p className="mutualcandletop__last-updated">
            Last updated: {financialData.lastUpdated}
          </p>
        </div>
      </div>

      {/* Flex container for the two components */}
      <div className="mutualfunddflex-container">
        <Mutualgraphtop fundDetails={fundDetails} />
        <MutualFundsSipCalculator />
      </div>

      <MutualkeyIndicators fundDetails={fundDetails} />
      <Mutualxray perfSummary={perfSummary} cagrSummary={cagrSummary} peerCompare={peerCompare} />
      <MutualFundsSchemeAllocation />
      <MtuFundDetails />
      <RiskOMeter />
      <FundContactInfo />
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>

  );
}

export default Mutualfund;