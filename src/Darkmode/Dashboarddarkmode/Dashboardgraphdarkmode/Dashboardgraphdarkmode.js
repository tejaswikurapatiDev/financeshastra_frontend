import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import itiimg from '../../../assest/iti.png';
import './Dashboardgraphdarkmode.css'
import { useNavigate } from 'react-router-dom';


import Cookies from "js-cookie";
import DashboardMainPagetabledarkmode from '../DashboardMainPagetabledarkmode/DashboardMainPagetabledarkmode';
import Watchlistdashboardmaindarkmode from '../Watchlistdashboardmaindarkmode/Watchlistdashboardmaindarkmode';
import Navbardarkmode from '../../Navbardarkmode/Navbardarkmode';
import FooterForAllPagedarkmode from '../../FooterForAllPagedarkmode/FooterForAllPagedarkmode';
import Sidebardarkmode from '../../Sidebardarkmode/Sidebardarkmode';
import { color } from '@mui/system';




const Dashboardchartmaindarkmode = () => {
  const [timeRange, setTimeRange] = useState('1D');
  const [financialData, setFinancialData] = useState({
    price: "₹127.89",
    percentage: "+0.85%",
    lastUpdated: "05 Dec, 2024",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myInvestment, setMyInvestment] = useState(0);
  const [latestValue, setLatestValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  const navigate = useNavigate()

  const fetchData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("jwtToken");
        if (!token) {
          alert("Session expired, Please login again.");
          setLoading(false);
          navigate("/login")
          return;
        }
  
        const response = await fetch(`/myportfolio/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        console.log("API Data:", data);
  
        if (data.length > 0) {
          console.log(typeof(data[0].investment_cost))
          setMyInvestment(data[0].investment_cost || 0);
          setLatestValue(data[0].latest_value || 0);
          const change = ((data[0].latest_value - data[0].investment_cost)/data[0].investment_cost)*100
          console.log(change)
          setPercentChange(change)
        } else {
          setError("No portfolio data found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch data when the component mounts
    useEffect(() => {
      fetchData();
    }, []);

  // Simulate financial data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
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
        price: `₹${newPrice}`, // Properly formatted with backticks for dynamic values
        percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`, // Adds "+" for positive percentages
        lastUpdated: newLastUpdated, // Updates with the latest timestamp
      });
      }, 5000); // Update every 5 seconds
      
      return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []); // Dependency array ensures this effect runs once on mount
      

  // Chart data for different time ranges
  const chartDataByRange = {
    '1D': [ 3000, 6000,2000, 12000, 4000, 10000],
    '5D':  [ 3000, 6000, 9000,0, 12000, 15000],
    '1M': [ 3500, 6000, 3,9000, 12000, 15000],
    '6M': [6000,0, 3000,  9000, 12000, 15000],
    '1Y': [6000, 3000, 0, 9000,  15000,12000],
    '3Y':  [6000, 9000,0, 3000, 12000, 15000],
    '5Y': [9000,0, 3000, 6000, 15000,12000,],
    'Max': [15000,703, 3000, 6000, 9000, 12000],
  };

  const chartData = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: chartDataByRange[timeRange] || [],
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        pointBackgroundColor: '#22c55e',
        tension: 0.4,
      },
    ],
  };
  //const percentageChange = "+21.32%";
  const isPositiveChange = percentChange >= 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x:{
        ticks: {
          color:"white"
        }
      },
      y: {
        min: 0, // Start the y-axis from 19,000
        ticks: {
          stepSize: 3000, // Set the interval for ticks
          callback: (value) => `${value}`,
         color:"white"
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='allheadddarkmode'>
      <div className='hompagetopdata'>
   <div>
      <h1 className='headernifty50000darkmode'>Welcome back, William</h1>
       <p className='headerdashboardmaindarkmode'>Track your finance and achieve your financial goals.</p>
       </div>
       <div className="homepagenewdata-carddarkmode">
       <div className='homepageamountdata'>
            <div className="homepagenewdata-titledarkmode">Total Investment<br/>
          
            <div className='homepagenewdata-amountdarkmode' >{(myInvestment - 0).toLocaleString()}</div>
            </div>
            <div
                className={`homepagenewdata-changedarkmode ${
                    isPositiveChange
                        ? "homepagenewdata-positive"
                        : "homepagenewdata-negative"
                }`}
            >
                {isPositiveChange ? "▲" : "▼"} {percentChange}
            </div>
            </div>
        </div>
        </div>

      <div className="dataquatallnifty">
      
        <div className="portfoliomutual-containerrniftydashboarddarkmode">
         
          <div className="portfoliomutual-card">
            <div className='itidata'>
            <div className='alldatagraphtop'>
          <div>
                        <h3 className="portfoliomutual-titleportdarkmode">Portfolio Value</h3>
                        <p className="portfoliomutual-valuedarkmode">₹4,05,924.60</p>
                        <p className="portfoliomutual-profitdarkmode">
                            Your profit is <span>₹8,42,685.42</span>
                        </p>
                    </div>
                    <div>
                        <h3 className="portfoliomutual-titleportdarkmode">Avg. Monthly Grow</h3>
                        <p className="portfoliomutual-valuedarkmode">~4.32%</p>
                        <p className="portfoliomutual-profittdarkmode">
                        ~₹20,365.75
                        </p>
                    </div>
                    </div>
                    <div className='bestprofitdata'>
                        <h3 className="portfoliomutual-titleportdarkmode">Best Profit Stock</h3>
                        <h3 className="portfoliomutual-valueedarkmode">
    <img src={itiimg} alt="ITI Ltd." className="portfolio-logo" /> ITI Ltd.
</h3>
</div>
                    </div>
            {/* Time Range Selector */}
            <div className="time-rangemutual-selectorrniftydashboard">
              {['1D', '5D', '1M', '6M', '1Y', '3Y', '5Y', 'Max'].map((range) => (
                <button
                  key={range}
                  className={`time-rangemutual-button ${range === timeRange ? 'active' : ''}`}

                  onClick={() => setTimeRange(range)} // Update selected range
                >
                  {range}
                </button>
              ))}
            </div>
           
            {/* Line Chart */}
            <div className="chartmutual-containerrdashboard">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="datadisstockdashhh">
  <Sidebardarkmode/>
  <div className="main-content">
    <Navbardarkmode />
    <Watchlistdashboardmaindarkmode />
  </div>
</div>

      </div>
      <DashboardMainPagetabledarkmode/>
      <div className="foooterpagesatt">
    <FooterForAllPagedarkmode/>
  </div>
    </div>
  );
};

export default Dashboardchartmaindarkmode;