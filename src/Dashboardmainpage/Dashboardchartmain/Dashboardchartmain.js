import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import './Dashboardchartmain.css'

import Navbar from '../../Navbar/Navbar';
import Watchlistdashboardmain from '../Watchlistdashboardmain/Watchlistdashboardmain';






const Dashboardchartmain = () => {
  const [timeRange, setTimeRange] = useState('1D');
  const [financialData, setFinancialData] = useState({
    price: "₹127.89",
    percentage: "+0.85%",
    lastUpdated: "05 Dec, 2024",
  });

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
        price: `₹${newPrice}`,
        percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`,
        lastUpdated: newLastUpdated,
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Chart data for different time ranges
  const chartDataByRange = {
    '1D': [19000, 19500, 20000, 21000, 22000, 23750, 24000],
    '5D': [  19650,19400, 19500,  21000, 22000, 23750,20000],
    '1M': [ 20000, 22000, 23750,19100, 19100, 19300, 19500, 21000,],
    '6M': [21000,19400, 22000, 19050, 19150, 19300, 19500, 20000, , 23750],
    '1Y': [ 22500, 19025,  23750,19100, 19300, 19500, 20000, 21000, 22000,],
    '3Y': [23750,19400, 19010, 19050, 19100, 19300,23000,19400,23000],
    '5Y': [24000,22500, 19025,  23750,19100, 19300, 19500, 20000, 21000, 22000,],
    'Max': [22500, 19025,  23750,19100, 19300, 19500, 20000, 21000, 22000,],
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 19000, // Start the y-axis from 19,000
        ticks: {
          stepSize: 1000, // Set the interval for ticks
          callback: (value) => `${value}`, // Display all tick values
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
    <div className='allhead'>
   
      <h1 className='headernifty50'>Welcome back, William</h1>
       <p className='headerdashboardmain'>Track your finance and achieve your financial goals.</p>
      <div className="dataquatallnifty">
      
        <div className="portfoliomutual-containerrnifty">
          <div className="portfoliomutual-card">
            {/* Time Range Selector */}
            <div className="time-rangemutual-selectorrnifty">
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
            <div className="chartmutual-containerr">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="datadisstock">
          <Watchlistdashboardmain/>
        
          <Navbar/>
        
        </div>
       
      </div>
    </div>
  );
};

export default Dashboardchartmain;