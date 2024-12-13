import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PortfolioAnalytics.css';

const PortfolioAnalytics = () => {
    // State for selected time range and chart data
    const [timeRange, setTimeRange] = useState('1D');

    // Sample data for different time ranges
    const chartDataByRange = {
        '1D': [2000, 4000, 6000, 8000, 10000, 12000],
        '5D': [3000, 4000,6000, 8000, 10000, 12000],
        '1M': [ 4000, 6000, 8000, 10000, 12000,2000],
        '6M': [8000,2000, 4000, 6000,  10000, 12000 ],
        '1Y': [9500,8000,2000, 4000, 6000,   12000 ],
        '5Y': [10000,8000, 6000, 3900, 4000,  12000],
        Max: [11000,8000, 6000, 6000, 5000,  12000],
    };

    const chartData = {
        labels: ['10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm'], // Example labels
        datasets: [
            {
                label: 'Portfolio Value',
                data: chartDataByRange[timeRange],
                fill: true,
                backgroundColor: 'rgba(135,206,250,0.2)',
                borderColor: '#22c55e', // Green line color
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
                beginAtZero: true,
                ticks: {
                    callback: (value) => `$${value}`, // Corrected string template for currency formatting
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
    };
    

    return (
        <div className="portfolio-container">
            <h2 className="portfolio-welcome">Welcome back, William</h2>
            <p className="portfolio-subtitle">Track your finance and achieve your financial goals.</p>

            <div className="portfolio-card">
                <h3 className="portfolio-title">Portfolio Analytics</h3>

                {/* Time Range Selector */}
             
                <div className="time-range-selector">
                    {['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'].map((range) => (
                        <button
                            key={range}
                            className={`time-range-button ${range === timeRange ? 'active' : ''}`}

                            onClick={() => setTimeRange(range)} // Update selected range
                        >
                            {range}
                        </button>
                    ))}
                
                </div>
                {/* Line Chart */}
                <div className="chartportfolio-container">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
        
    );
};

export default PortfolioAnalytics;