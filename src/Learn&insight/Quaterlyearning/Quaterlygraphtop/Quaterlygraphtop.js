import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Quaterlygraphtop.css'
import DataDisplayEarnings from '../DataDisplayEarnings/DataDisplayEarnings';
import  { QuaterlyCandleStickChart } from '../Quaterlycandlestick/Quaterlycandlestick'
import QuaterlyKeyIndicators from '../Quaterlykeyindicator/Quaterlykeyindicator';

const Quaterlygraphtop = () => {
  const [timeRange, setTimeRange] = useState('1M');
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
    '1M': [804, 812, 808, 814, 820, 816],
    '6M': [808, 812, 804, 814, 820, 816],
    '1Y': [812, 804, 814, 816,808, 820],
    '3Y': [815, 808, 812, 814, 816, 820],
    '5Y': [819, 808, 812, 814, 816, 820],
    'All': [820, 808, 812, 814, 816, 820],
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
        min: 800, // Start the y-axis from 800
        ticks: {
          stepSize: 4, // Set the interval for ticks
          callback: (value) => {
            if (value % 4 === 0) { // Show ticks like 800, 810, 820, etc.
              return `${value}`;
            }
            return ''; // Empty return for values that don't match the condition
          },
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
    <div>
  
   <h1 className='overviewqutarely'>Overview</h1>
    <div className='dataquatall'>
        <div className='datadisply'>
        <DataDisplayEarnings/>
        </div>
    <div className="portfoliomutual-containerr">
      <div className="portfoliomutual-card">
        {/* Time Range Selector */}
        <div className="time-rangemutual-selectorr">
          {['1M', '6M', '1Y', '3Y', '5Y', 'All'].map((range) => (
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
    </div>
   <QuaterlyKeyIndicators/>
  <QuaterlyCandleStickChart/>
   
    </div>
  );
};

export default Quaterlygraphtop;