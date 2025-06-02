import React from 'react';
import './RiskConcernPage.css';
import Balancesheetriskconcernpage from '../balancesheetriskconcernpage/balancesheetriskconcernpage';
import CashFlowRiskConcernPage from '../CashFlowRiskConcernPage/CashFlowRiskConcernPage';

const RiskConcernPage = () => {
  return (

    <div className="riskconcernpage-container">
      <section className="riskconcernpage-risks">
        <h2>• Risks and concerns</h2>

        <h3>Macroeconomic and Market Risks</h3>
        <p>
          The prolonged inflationary pressures and dynamic macroeconomic scenario may adversely impact global steel demand. Additionally, shifting customer preferences driven by the adoption of advanced steel grades and sustainable products can reshape market dynamics, consequently, manufacturers need to innovate and adapt to remain competitive in the industry.
        </p>

        <h3>Supply Chain and Commodity Risks</h3>
        <p>
          Geopolitical developments, changes in market dynamics, and volatility in raw material prices may pose risks to the availability of raw materials, which may lead to higher costs/cash outflows and working capital. The supply chain network is adversely impacted by evolving geopolitics-related disruptions. Also, emerging ESG norms may have an adverse impact on supply chain performance. Dependence on common logistics infrastructure resources like ports and railways poses capacity and availability constraints.
        </p>

        <h3>Regulatory Risks</h3>
        <p>
          The regulatory landscape in the metals & mining industry is becoming stringent owing to factors such as geopolitical conditions, changing trade patterns, and enhanced focus on environmental social Governance (ESG) aspects. Non-adherence to such a stringent regulatory ecosystem may impact business operations and reputation.
        </p>
      </section>

      <section className="riskconcernpage-outlook">
        <h2>Outlook and Valuation</h2>
        <h4>Income Statement</h4>
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
              {[
                ['Interest Earned', '2,53,322', '2,69,852', '2,78,115', '2,89,973', '3,50,845', '4,39,189'],
                ['Other Income', '77,365', '98,159', '1,07,222', '1,17,000', '1,22,534', '1,55,386'],
                ['Total Income', '3,30,687', '3,68,011', '3,85,338', '4,06,973', '4,73,378', '5,94,575'],
                ['Total Expenditure', '3,27,618', '3,49,834', '3,61,058', '3,70,617', '4,16,820', '5,26,437'],
                ['Operating Profit', '1,14,800', '1,31,782', '1,50,430', '1,74,363', '1,89,814', '2,35,894'],
                ['Provisions & Contingencies', '56,951', '56,928', '54,618', '40,059', '37,024', '30,807'],
                ['Profit Before Tax', '5,929', '30,052', '32,809', '49,736', '75,398', '91,230'],
                ['Tax', '2,860', '11,875', '8,529', '13,379', '18,840', '23,092'],
                ['Net Profit', '3,069', '18,177', '24,280', '36,356', '56,558', '68,138'],
                ['Gross NPA', '1,19,270', '1,49,091', '1,26,389', '1,12,023', '90,927', '84,276'],
                ['Gross NPA (%)', '5.34', '6.00', '5.00', '3.97', '2.78', '2.24'],
                ['Net NPA', '64,584', '51,871', '36,809', '27,965', '21,466', '21,051'],
                ['Net NPA (%)', '0.58', '2.23', '1.50', '1.02', '0.67', '0.57'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="riskconcernpage-source">Source: Company Report/FinanceShastra Research</p>
      </section>
  
   
     <Balancesheetriskconcernpage/>
      <CashFlowRiskConcernPage/>
    </div>
  );
};

export default RiskConcernPage;
