import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PortfolioAnalytics.css';

const PortfolioAnalytics = () => {
    // State for selected time range and chart data
    const [timeRange, setTimeRange] = useState('1D');

    // Sample data for different time ranges
    const chartDataByRange = {
        '1D': [8000, 8500, 9000, 9500, 8700, 9200],
        '5D': [8900, 8700, 8600, 8800, 9000, 9100],
        '1M': [8500, 8700, 8900, 9100, 9200, 9400],
        '6M': [8000, 8200, 8500, 8700, 8800, 8900],
        '1Y': [7500, 7800, 8000, 8500, 8700, 9200],
        '5Y': [7000, 7500, 8000, 8500, 9000, 9500],
        Max: [5000, 5500, 6000, 7000, 8000, 9200],
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
                    callback: (value) => `$${value}`, // Use a single $ for string interpolation.
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hides the legend.
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
                <div className="chart-container">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default PortfolioAnalytics;