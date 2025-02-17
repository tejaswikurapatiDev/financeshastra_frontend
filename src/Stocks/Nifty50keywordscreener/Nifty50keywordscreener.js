import React from 'react';
import './Nifty50keywordscreener.css'
const Nifty50KeyIndicators = () => {
    const data = {
        open: '₹23,775.80',
        previousClose: '₹23,727.65',
        dayHigh: '₹23,854.50',
        dayLow: '₹23,653.60',
        yearHigh: '₹26,277.35',
        yearLow: '₹21,137.20',
      };
    
      return (
        <div className="niftykeyindicator">
          <h3 className="niftykeyindicator-heading">Key Indicators</h3>
          <table className="niftykeyindicator-table">
            <tbody>
              <tr>
                <td className="niftykeyindicator-cell">Open</td>
                <td className="niftykeyindicator-cell">{data.open}</td>
              </tr>
              <tr>
                <td className="niftykeyindicator-cell">Previous Close</td>
                <td className="niftykeyindicator-cell">{data.previousClose}</td>
              </tr>
              <tr>
                <td className="niftykeyindicator-cell">Day High</td>
                <td className="niftykeyindicator-cell">{data.dayHigh}</td>
              </tr>
              <tr>
                <td className="niftykeyindicator-cell">Day Low</td>
                <td className="niftykeyindicator-cell">{data.dayLow}</td>
              </tr>
              <tr>
                <td className="niftykeyindicator-cell">52W High</td>
                <td className="niftykeyindicator-cell">{data.yearHigh}</td>
              </tr>
              <tr>
                <td className="niftykeyindicator-cell">52W Low</td>
                <td className="niftykeyindicator-cell">{data.yearLow}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
    

export default Nifty50KeyIndicators;