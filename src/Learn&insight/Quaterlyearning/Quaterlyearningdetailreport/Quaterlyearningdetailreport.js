import React from 'react';
import ShareholdingChart from '../Quaterlycirclechart/Quaterlycirclechart';
import './Quaterlyearningdetailreport.css';

const QuarterlyEarningdetailreport = ({ quarterlyReport, shareHolding }) => {
  return (
    <div>
      <h2 className="earningheaderrpeer">Quarterly Earnings Report</h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores / <a style={{ color: '#24b676' }}>View Standalone</a>
      </p>

      <div className="earnings-report">
        {/* Earnings Table */}
        <table className="earnings-tablee">
          <thead>
            <tr>
              <th></th>
              {quarterlyReport.map((q) => (
                <th key={q.year}>{q.year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenue (Cr.)</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>₹{parseFloat(q.revenue).toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Net Profit (Cr.)</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>{q.net_profit}</td>
              ))}
            </tr>
            <tr>
              <td>EPS</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>{q.eps}</td>
              ))}
            </tr>
            <tr>
              <td>BVPS</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>{q.bvps_percentage}%</td>
              ))}
            </tr>
            <tr>
              <td>ROE</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>{q.roe}</td>
              ))}
            </tr>
            <tr>
              <td>NIM</td>
              {quarterlyReport.map((q, i) => (
                <td key={i}>{q.nim}</td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Shareholding Section */}
        <div className="shareholding-sectionn">
          <div className="shareholding-historyy">
            <h3>Shareholding History</h3>
            <table>
              <thead>
                <tr>
                  <th>Holders</th>
                  {shareHolding.map((entry, i) => (
                    <th key={i}>{entry.quarter_year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Promoters</td>
                  {shareHolding.map((entry, i) => (
                    <td key={i}>{entry.promoters}%</td>
                  ))}
                </tr>
                <tr>
                  <td>Foreign Institutions</td>
                  {shareHolding.map((entry, i) => (
                    <td key={i}>{entry.foreign_institutions}%</td>
                  ))}
                </tr>
                <tr>
                  <td>DII</td>
                  {shareHolding.map((entry, i) => (
                    <td key={i}>{entry.dii}%</td>
                  ))}
                </tr>
                <tr>
                  <td>Public</td>
                  {shareHolding.map((entry, i) => (
                    <td key={i}>{entry.public}%</td>
                  ))}
                </tr>
                <tr>
                  <td>Others</td>
                  {shareHolding.map((entry, i) => (
                    <td key={i}>{entry.others}%</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="shareholding-chart">
            <ShareholdingChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyEarningdetailreport;
