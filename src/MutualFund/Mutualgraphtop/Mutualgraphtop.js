import React, { useState,useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Mutualgraphtop.css';


const Mutualgraphtop = () => {
    // State for selected time range and chart data
    const [timeRange, setTimeRange] = useState('1M');
    const [financialData, setFinancialData] = useState({
        price: "₹127.89",
        percentage: "+0.85%",
        lastUpdated: "05 Dec, 2024",
      });
    
      // Example: Function to simulate data updates
      useEffect(() => {
        const interval = setInterval(() => {
          // Simulate new data
          const newPrice = (Math.random() * 100 + 100).toFixed(2); // Random price between 100 and 200
          const newPercentage = ((Math.random() * 2 - 1) * 1.5).toFixed(2); // Random percentage between -1.5% and +1.5%
          const now = new Date();
          const newLastUpdated = now.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
      
          // Update state with new financial data
          setFinancialData({
            price: `₹${newPrice}`, // Corrected interpolation for price
            percentage: `${newPercentage > 0 ? "+" : ""}${newPercentage}%`, // Corrected interpolation for percentage
            lastUpdated: newLastUpdated, // Use formatted date string
          });
        }, 5000); // Update every 5 seconds
      
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []); // Empty dependency array ensures effect runs once on mount
      

    // Sample data for different time ranges
    const chartDataByRange = {
        '1M': [50,100, 150, 200, 250, 240], // Example data
        '6M': [80, 120, 180, 220, 230, 243],
        '1Y': [ 100, 200, 220, 243,100,120],
        '3Y': [130, 60, 120, 180, 210, 243],
        '5Y': [200, 100, 220, 243,100,120],
        'All': [230, 60, 120, 180, 210, 243],
    };

    const chartData = {
        labels: ['08:00', '09:00', '10:00', '12:00', '14:00', '16:00'], // Example labels
        datasets: [
            {
                label: 'Portfolio Value',
                data: chartDataByRange[timeRange],
                fill: true,
                backgroundColor: 'rgba(34, 197, 94, 0.2)', // Light blue background
                borderColor: '#22c55e', // Green line
                pointBackgroundColor: '#22c55e',
                tension: 0.4, // Smooth curve
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value, // Remove dollar symbol
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide legend
            },
        },
    };


   
    return (
      
            <div className="portfoliomutual-container">
                <div className="portfoliomutual-card">
                    <h3 className="portfoliomutual-title">ICICI Prudential Technology Fund Growth</h3>

                    {/* Time Range Selector */}
                    <div className="time-rangemutual-selector">
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
                    <div className="chartmutual-container">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
           
      
    );
};

export default Mutualgraphtop;