import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';  // For scroll navigation
import './Nifty50topheader.css'

import { Divider } from '@mui/material';

function Nifty50topheader() {
  const [change, setChange] = useState(0); // For storing dynamic change value in rupees
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPrice, setCurrentPrice] = useState(300); // Example initial stock price, replace with actual price

  // Function to simulate fetching data (replace with real API call)
  const fetchData = () => {
    const randomChange = (Math.random() * 20 - 10).toFixed(2); // Random value between -10 and +10 INR
    setChange(randomChange);

    const currentTime = new Date();
    setLastUpdated(currentTime.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }));

    // Update the current price after the change is applied, ensuring that the values are numbers
    setCurrentPrice(prevPrice => {
      const newPrice = parseFloat(prevPrice) + parseFloat(randomChange); // Ensure both values are numbers
      return newPrice.toFixed(1); // Now .toFixed works on a number
    });
  };

  // Fetch data initially and set an interval to update it
  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="graphcontainerer">
      <div className="graphheader">
        <div className="title-container">
          <h1 className="telephonenifty">Nifty 50</h1>
        </div>
        <div className="graph-price-update">
        <span className={`graphprice ${change >= 0 ? 'positive' : 'negative'}`}>

            ₹{parseFloat(currentPrice).toLocaleString()} {/* Format the price with ₹ symbol */}
          </span>
          <span className="graphupdate">Last updated: {lastUpdated}</span>
        </div>
      </div>

     
      {/* Navigation Links */}
      <nav className="graphnavbarr">
        <Divider />
        <ScrollLink to="overview" smooth={true} duration={500}>
          Overview
        </ScrollLink>
        <ScrollLink to="stockxray" smooth={true} duration={500}>
        Sectors
        </ScrollLink>
        <ScrollLink to="stockearning" smooth={true} duration={500}>
        Companies
        </ScrollLink>
       
        {/* Optional: For routing to other pages */}
        <Divider />
        
      </nav>

      <Divider sx={{ margin: '10px 0' }} />
    </div>
  );
}

export default Nifty50topheader;