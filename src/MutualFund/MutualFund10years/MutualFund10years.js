import React from 'react';
import Navbar from '../../Navbar/Navbar';

const financialData = {
  growthParameters: [
    { title: 'NAV (₹)', data: ["17.64", "20.80", "22.15", "29.37", "25.98", "28.83", "31.90", "50.33", "56.36", "80.75", "127.89"] },
    { title: 'Sales YoY Gr(cr)', data: ["265.48", "890.14", "1,162.50", "1,520.14", "1,322.19", "1,811.99", "1,783.92", "2,633.90", "3,626.84", "7,410.69", "2,289.62"] },
    { title: 'Benchmark# Returns(%)', data: ["0", "0", "0", "0", "0", "-0.28", "24.38", "46.81", "2.97", "43.68", "26.87"] },
    { title: 'Fund Returns(%)', data: ["75.17", "17.91", "6.49", "32.60", "-11.54", "10.97", "-10.65", "57.77", "11.98", "43.28", "58.38"] },
    { title: 'Implied Investor Returns(%)', data: ["103.95", "20.54", "2.52", "32.49", "-11.38", "12.95", "4.53", "58.58", "14.55", "50.79", "76.44"] },
    { title: 'Expense Ratio(%)', data: ["1.03", "1.43", "1.43", "1.28", "0.86", "1.12", "0.74", "0.95", "0.87", "0.65", "0.57"] },
  ],
  CAGR: [
    { title: 'Benchmark# Returns(%)', data: ['-', '27.03', '23.35', '32'] },
    { title: 'Fund Returns(%)', data: ['20.62', '32.55', '35.97', '62.16'] },
    { title: 'Implied Investor Returns(%)', data: ['24.39', '35.53', '39.34', '-53.83'] },
  ],
  keyFinancialParameters: [
    { title: "ICICI Pru Technology Fund - Direct Growth", data: ["5 ★", "₹13,495", "39.90%", "11.65%", "32.23%"] },
    { title: "ICICI Pru Infrastructure Fund - Direct Growth", data: ["4 ★", "₹6,779", "40.95%", "36.59%", "32.77%"] },
    { title: "LIC MF Infrastructure Fund - Direct Growth", data: ["4 ★", "₹852", "61.19%", "35.46%", "30.06%"] },
    { title: "Franklin Build India Fund - Direct Growth", data: ["5 ★", "₹2,825", "40.67%", "32.83%", "30.02%"] },
    { title: "Franklin India Opportunities Fund - Direct Growth", data: ["5 ★", "₹5,623", "48.07%", "30.52%", "30.07%"] },
  ]
};

const Mutualxray = ({ perfSummary, cagrSummary, peerCompare }) => {
  console.log(peerCompare)

  if (!Array.isArray(perfSummary)) {
    console.error("Invalid perfSummary:", perfSummary);
    return <div>Error: perfSummary is not an array</div>;
  }

  if (!Array.isArray(cagrSummary)) {
    console.error("Invalid cagrSummary:", cagrSummary);
    return <div>Error: cagrSummary is not an array</div>;
  }

  if (!Array.isArray(peerCompare)) {
    console.error("Invalid PeerCompare:", peerCompare);
    return <div>Error: peerCompare is not an array</div>;
  }


  //for perfSummary
  const years = perfSummary.map(data => data.year);
  const nav = perfSummary.map(data => data.nav);
  const salesYoYGrowth = perfSummary.map(data => data.sales_yoy_growth_cr);
  const benchmarkReturns = perfSummary.map(data => data.benchmark_returns);
  const fundReturns = perfSummary.map(data => data.fund_returns);
  const investorReturns = perfSummary.map(data => data.investor_returns);
  const expenseRatio = perfSummary.map(data => data.expense_ratio);

  const PerformanceMetrics = [
    { title: 'NAV (₹)', data: nav },
    { title: 'Sales YoY Gr(cr)', data: salesYoYGrowth },
    { title: 'Benchmark# Returns(%)', data: benchmarkReturns },
    { title: 'Fund Returns(%)', data: fundReturns },
    { title: 'Implied Investor Returns(%)', data: investorReturns },
    { title: 'Expense Ratio(%)', data: expenseRatio },
  ];

  //for CAGR summary
  const cagrYears = cagrSummary.map(data => data.period_years);
  const benchmark_returns = cagrSummary.map(data => data.benchmark_returns);
  const fund_returns = cagrSummary.map(data => data.fund_returns);
  const investor_returns = cagrSummary.map(data => data.investor_returns);

  const cagrMetrics = [
    { title: 'Benchmark# Returns(%)', data: benchmark_returns },
    { title: 'Fund Returns(%)', data: fund_returns },
    { title: 'Implied Investor Returns(%)', data: investor_returns },
  ];

  //for peer comparison
  const rating = peerCompare.map(data => data.rating);
  const aum_cr = peerCompare.map(data => data.aum_cr);
  const return_1y = peerCompare.map(data => data.return_1y);
  const return_3y = peerCompare.map(data => data.return_3y);
  const return_5y = peerCompare.map(data => data.return_5y);


  return (
    <div className="xrayall">
      {/* 10-Year Performance Table */}
      <div className="financial-table">
        <h2 className="table-title">Performance Summary - 10-Year X-Ray</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              {years.map((year, index) => (
                <th key={index}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PerformanceMetrics.map((metric, i) => (
              <tr key={i}>
                <td className="metric-title">{metric.title}</td>
                {metric.data.map((val, j) => {
                  const isPercentage = typeof val === 'string' && val.includes('%');
                  const isNegative = typeof val === 'string' && val.startsWith('-');
                  const textColor = isNegative ? 'red' : isPercentage ? 'green' : 'black';
                  return <td key={j} style={{ color: textColor }}>{val}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CAGR Table */}
      <div className="financial-table">
        <h2 className="table-title">CAGR</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              {cagrYears.map((year, index) => (
                <th key={index}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cagrMetrics.map((metric, i) => (
              <tr key={i}>
                <td>{metric.title}</td>
                {metric.data.map((val, j) => (
                  <td key={j} style={{ color: val.startsWith('-') ? 'red' : 'green' }}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Peer Comparison Table */}
      <div className="financial-table">
        <h2 className="table-title">Peer Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Fund Name</th>
              <th>Rating</th>
              <th>AUM (cr)</th>
              <th>1Y</th>
              <th>3Y</th>
              <th>5Y</th>
            </tr>
          </thead>
          <tbody>
            {peerCompare.map((fund, i) => (
              <tr key={i}>
                <td>{fund.peer_name}</td>
                <td>{fund.rating}</td>
                <td>₹{parseFloat(fund.aum_cr).toLocaleString('en-IN')}</td>
                <td style={{ color: 'green' }}>{fund.return_1y}%</td>
                <td style={{ color: 'green' }}>{fund.return_3y}%</td>
                <td style={{ color: 'green' }}>{fund.return_5y}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Navbar />
    </div>
  );
};

export default Mutualxray;
