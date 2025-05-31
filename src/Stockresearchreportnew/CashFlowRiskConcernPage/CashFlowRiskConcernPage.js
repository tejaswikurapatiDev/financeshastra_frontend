import React from 'react';
import './CashFlowRiskConcernPage.css';

const cashFlowData = [
  ['Cash from Operating Activity', '24', '-199', '94', '-437', '-294', '974'],
  ['Profit from operations', '369', '240', '136', '130', '-154', '-282'],
  ['Receivables', '-106', '-647', '-893', '-907', '33', '455'],
  ['Inventory', '7', '-28', '-20', '0', '-56', '23'],
  ['Payables', '-245', '236', '872', '339', '-116', '777'],
  ['Other WC items', '0', '1', '0', '0', '0', '0'],
  ['Working capital changes', '-345', '-438', '-42', '-568', '-139', '1,256'],
  ['Direct taxes', '0', '0', '0', '0', '0', '0'],
  ['Other operating items', '0', '0', '0', '0', '0', '0'],
  ['Cash from Investing Activity', '-126', '-73', '-304', '178', '46', '-556'],
  ['Fixed assets purchased', '-128', '-64', '-31', '-60', '0', '0'],
  ['Fixed assets sold', '0', '2', '28', '3', '16', '0'],
  ['Capital WIP', '0', '0', '0', '0', '-61', '-38'],
  ['Investments purchased', '-2', '0', '0', '0', '-0', '-0'],
  ['Investments sold', '0', '2', '2', '1', '0', '0'],
  ['Interest received', '4', '16', '12', '5', '5', '3'],
  ['Other investing items', '0', '-28', '-314', '229', '85', '-522'],
  ['Cash from Financing Activity', '-19', '285', '198', '247', '241', '-322'],
  ['Proceeds from shares', '0', '0', '0', '0', '0', '0'],
  ['Proceeds from borrowings', '32', '0', '250', '148', '264', '0'],
  ['Repayment of borrowings', '0', '-43', '0', '0', '0', '-81'],
  ['Interest paid fin', '-106', '-141', '-160', '-192', '-210', '-241'],
  ['Share application money', '55', '105', '72', '107', '0', '0'],
  ['Other financing items', '0', '364', '3', '220', '80', '-0'],
  ['Net Cash Flow', '-121', '13', '-12', '-12', '-6', '96']
];

const CashFlowRiskConcernPage = () => {
  return (
  <div className="riskconcernpage-containerrr">
        <div className="riskconcernpage-outlook">
        <h4>Cash Flow</h4>
        <p>Figures in ₹ Crores</p>
        <div className="riskconcernpage-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Mar 2019</th>
                <th>Mar 2020</th>
                <th>Mar 2021</th>
                <th>Mar 2022</th>
                <th>Mar 2023</th>
                <th>Mar 2024</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? 'cashflowriskconcernpage-align-left' : ''}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="riskconcernpage-source">Source: Company Report/FinanceShastra Research</p>
      </div>

      <section className="cashflowriskconcernpage-summary">
        <h3>Summary</h3>
        <p>
          We anticipate that Tata Steel will experience significant growth, driven by its strong expansion plans targeting 40 MTPA production by 2030 and substantial investments in its Indian operations. The company’s focus on improving EBITDA margins, reducing debt, and maintaining a leading position in the auto-grade steel market further enhances its growth potential. Also, management’s efforts to stabilize costs and improve European production efficiency are expected to support profitability. In addition, the steel demand is supported by government initiatives, urbanization, and large infrastructure investments.
        </p>
        <p>
          Based on these developments, we recommend a buy rating on the stock, with a target price of ₹168, based on a 35x PE ratio for FY26 earnings estimates. A good accumulation zone for the stock remains between ₹120–125.
        </p>
      </section>
    </div>
  );
};

export default CashFlowRiskConcernPage;
