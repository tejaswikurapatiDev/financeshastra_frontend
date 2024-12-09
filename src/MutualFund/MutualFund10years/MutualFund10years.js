import React from 'react';
import MutualFinancialTable from '../Mutual10yrtable/Mutual10yrtable';




const financialData = {
 
    growthParameters: [
        { title: 'NAV (₹)', data: ["17.64", "20.80", "22.15", "29.37", "25.98", "28.83", "31.90", "50.33", "56.36", "80.75", "127.89"] },
        { title: 'Sales YoY Gr(cr)', data: ["265.48", "890.14", "1,162.50", "1,520.14", "1,322.19", "1,811.99", "1,783.92", "2,633.90", "3,626.84", "7,410.69", "2,289.62"] },
        { title: 'Benchmark# Returns(%)', data: ["0", "0", "0", "0", "0", "-0.28", "24.38", "46.81", "2.97", "43.68", "26.87"] },
        { title: 'Fund Returns(%)', data: ["75.17", "17.91", "6.49", "32.60", "-11.54", "10.97", "-10.65", "57.77", "11.98", "43.28", "58.38"]},
        { title: 'Implied Investor Returns(%)', data: ["103.95", "20.54", "2.52", "32.49", "-11.38", "12.95", "4.53", "58.58", "14.55", "50.79", "76.44"] },
        { title: 'Expense Ratio(%)', data: ["1.03", "1.43", "1.43", "1.28", "0.86", "1.12", "0.74", "0.95", "0.87", "0.65", "0.57"] },
      ],
      
      CAGR: [
        { title: 'Benchmark# Returns(%)', data: ['-', '27.03', '23.35', '32'] },
        { title: 'Fund Returns(%)', data: ['20.62', '32.55', '35.97', '62.16'] },
        { title: 'Implied Investor Returns(%)', data: ['24.39', '35.53', '39.34', '-53.83'] },
      ],
  keyFinancialParameters: [
    { title: 'Motilal Oswal Midcap Fund Direct Growth', data: ['5 ★', '₹18,604.02', '₹500', '0.57%'] },
    { title: 'HDFC Mid Cap Opportunities Direct Plan Growth', data: ['4 ★', '₹13,495', '₹100', '0.12%'] },
    { title: 'Nippon India Growth Fund Direct Growth', data: ['4 ★', '₹24,895.71', '₹500', '1.06%'] },
    { title: 'Quant Mid Cap Fund Direct Growth', data: ['5 ★', '₹7,353.93', '₹500', '0.64%'] },
    { title: 'Kotak Emerging Equity Fund Direct Growth', data: ['5 ★', '₹258.52', '₹500', '0.61%'] },
   
  ]
};

const Mutualxray = () => (
 
  <div className="xrayall">
   
     
    <h1 className='financeheader'>Performance Summary-10-Year X-Ray</h1>
    <p className='financepara'>Data Standardized for Exceptional Items and Accounting Adjustments</p>
    
    {/* Render each financial table with custom headers */}
    
    <MutualFinancialTable title="" data={financialData.growthParameters} className="keyfinancetable"/>
    <div style={{ width: '70%', margin: '0', paddingLeft: '10px' }}>
    <MutualFinancialTable
  title="CAGR" 
  data={financialData.CAGR} 
  headers={['9 Years', '5 Years', '3 Years', '1 Year']} 

  className="cagr-table" 
  style={{ width: '10%', margin: '0 auto' }} 
/>
</div>
    <MutualFinancialTable title="" data={financialData.keyFinancialParameters} 
  headers={['Rating', 'AUM(cr)', 'SIP Amount', 'EXP.Ratio']}  className="keyfinancetable"  />
  </div>
  
);

export default Mutualxray;