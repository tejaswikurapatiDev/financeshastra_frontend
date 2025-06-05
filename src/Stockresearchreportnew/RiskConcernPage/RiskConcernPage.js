import React, { useState, useEffect } from 'react';
import './RiskConcernPage.css';
import Balancesheetriskconcernpage from '../balancesheetriskconcernpage/balancesheetriskconcernpage';
import CashFlowRiskConcernPage from '../CashFlowRiskConcernPage/CashFlowRiskConcernPage';
import ResearchStocksData from '../ResearchStocksData';

const RiskConcernPage = () => {
  const { stock_research_stocks_data, isLoading } = ResearchStocksData()
  const [incomestatement, setIncomestatement] = useState([])
  

  useEffect(() => {
    if (isLoading === false) {
      //const stocsincome= stock_research_stocks_data.income_statement

      const transformedData = [
        {
          label: "Interest Earned",
          values: stock_research_stocks_data.income_statement.map((item) => item.interest_earned),
        },
        { label: "Other Income", values: stock_research_stocks_data.income_statement.map((item) => item.other_income) },
        {
          label: "Total Income",
          values: stock_research_stocks_data.income_statement.map((item) => item.total_income),
        },
        {
          label: "Total Expenditure",
          values: stock_research_stocks_data.income_statement.map((item) => item.total_expenditure),
        },
        {
          label: "Operating Profit",
          values: stock_research_stocks_data.income_statement.map((item) => item.operating_profit),
        },
        {
          label: "Provisions & Contingencies",
          values: stock_research_stocks_data.income_statement.map((item) => item.provisions_contigencies),
        },
        { label: "Profit Before Tax", values: stock_research_stocks_data.income_statement.map((item) => item.profit_before_tax) },
        {
          label: "Tax",
          values: stock_research_stocks_data.income_statement.map((item) => item.tax),
        },
        {
          label: "Net Profit",
          values: stock_research_stocks_data.income_statement.map((item) => item.net_profit),
        },
        {
          label: "Gross NPA",
          values: stock_research_stocks_data.income_statement.map((item) => item.gross_npa),
        },

        {
          label: "Gross NPA (%)",
          values: stock_research_stocks_data.income_statement.map((item) => item.gross_npa_percentage),
        },
        {
          label: "Net NPA",
          values: stock_research_stocks_data.income_statement.map((item) => item.net_npa),
        },
        {
          label: "Net NPA (%)",
          values: stock_research_stocks_data.income_statement.map((item) => item.net_npa_percentage)
        },
      ];
      

      setIncomestatement(transformedData)


    }
  }, [])


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
                <th>2020</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
               </tr>
            </thead>
            <tbody>
              {incomestatement.map((row, index) => (
                <React.Fragment key={index}>
                  {/* Main row */}
                  <tr className={"highlight-row"}>
                    <td >
                      {row.label}

                    </td>
                    {row.values.map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>

                  {/* Render subcategories if expanded */}

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="riskconcernpage-source">Source: Company Report/FinanceShastra Research</p>
      </section>


      <Balancesheetriskconcernpage />
      <CashFlowRiskConcernPage />
    </div>
  );
};

export default RiskConcernPage;
