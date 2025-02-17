import React from 'react';
import './Main.css'; // Main styles for layout
import PortfolioAnalytics from '../PortfolioAnalytics/PortfolioAnalytics';
import Dashboard from '../Dashboard/Dashboard';
import TopGainersLosers from '../TopGainersLosers/TopGainersLosers';
import TotalInvestment from '../TotalInvestment/TotalInvestment';

const TopHoldings = () => {
  const holdingsData = [
    { symbol: 'WIPRO', change: '+2.90%',  shares: 90, avgCost: 310.00, marketValue: '78,985.68', totalGain: '+08.63%', extraGain: '+190.36%', notes: '-'},
    { symbol: 'BRITANNIA', change: '+1.23%', shares: 75, avgCost: 75.69, marketValue: '63,548.36', totalGain: '-04.59%', extraGain: '+25.10%', notes: '-'},
    { symbol: 'PSUBANK', change: '+2.79%', shares: 100, avgCost: 115.36, marketValue: '1,284.33', totalGain: '-01.25%', extraGain: '-5.44%', notes: '-' },
    { symbol: 'ITI SMALL CAP FUND', change: '-3.77%', shares: 125, avgCost: 425.26, marketValue: '72,598.48', totalGain: '-02.12%', extraGain: '-10.30%', notes: '-' },
    { symbol: 'M&M', change: '+2.47%',  shares: 100, avgCost: 784.80, marketValue: '46,695.84', totalGain: '+06.75%', extraGain: '+20.15%',notes: '-'},
    { symbol: 'NTPC', change: '+1.30%', shares: 105, avgCost: 472.06, marketValue: '81,842.28', totalGain: '+10.02%', extraGain: '+15.43%',notes: '-' }
  ];

  return (
    <div className="main-dashboard">
      {/* Left panel with Portfolio Analytics and Top Holdings */}
      <div className="left-panel">
        <PortfolioAnalytics />
    <div className="top-holdings-container">
      <h2 className="topholdtitle">Top Holdings</h2>
      <table
    className="holdings-table"
   
  >
        <thead className='holdinghead'>
          <tr className='holdinghead'>
            <th>Symbol</th>
            <th>Change</th>
            <th>Shares</th>
            <th >Avg cost/Share</th>
            <th >Market Value</th>
            <th >Total Gain</th>

          
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {holdingsData.map((holding, index) => (
            <tr key={index}>
              <td>
                <span style={{ color: 'blue',fontWeight:'bold',fontFamily:'calibri' }}>{holding.symbol}</span>
                <div style={{ fontSize: '0.9rem', color: '#333' }}>
                  {holding.symbolValue} {/* Display 24.00 or your custom value here */}
                </div>
              </td>
              <td className={holding.change.startsWith('+') ? 'positive' : 'negative'}>
                <span className={holding.change.startsWith('+') ? 'positive-symbol' : 'negative-symbol'}>
                  {holding.change}
                </span>
                
              </td>
              <td>{holding.shares}</td>
              <td>{holding.avgCost}</td>
              <td>{holding.marketValue}</td>
              <td className={holding.totalGain.startsWith('+') ? 'positive' : 'negative'}>
                <span className={holding.totalGain.startsWith('+') ? 'positive-symbol' : 'negative-symbol'}>
                  {holding.totalGain}
                </span>
                
              </td>
              
              <td>{holding.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
     {/* Right panel with Dashboard */}
     <div className="right-panel">
      <TotalInvestment/>
        <Dashboard />
        <TopGainersLosers/>
        
      </div>
     
    </div>
  );
};
  

export default TopHoldings;
