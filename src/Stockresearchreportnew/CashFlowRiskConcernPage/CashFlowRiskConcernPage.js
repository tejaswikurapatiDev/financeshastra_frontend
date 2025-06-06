import React, { useEffect, useState } from 'react';
import './CashFlowRiskConcernPage.css';
import useResearchStocksData from '../ResearchStocksData';
import { API_BASE_URL } from '../../config';

const CashFlowRiskConcernPage = () => {
  const { stock_research_stocks_data, isLoading } = useResearchStocksData(API_BASE_URL);
const [years, setYears] = useState([]);
  const [cash_flow_stock, setcash_flow] = useState([])

  useEffect(() => {
  if (!isLoading && stock_research_stocks_data?.cash_flow) {
    const stocs_cash_flow = stock_research_stocks_data.cash_flow;

    const transformedData = [
        {
          label: "Cash from Operating Activity",
          values: stocs_cash_flow.map((item) => item.cash_from_operating_activity),
        },
        { label: "Profit from operations", values: stocs_cash_flow.map((item) => item.profit_from_operations) },
        {
          label: "Receivables",
          values: stocs_cash_flow.map((item) => item.receivables),
        },
        {
          label: "Inventory",
          values: stocs_cash_flow.map((item) => item.inventory),
        },
        {
          label: "Payables",
          values: stocs_cash_flow.map((item) => item.payables),
        },
        {
          label: "Other WC items",
          values: stocs_cash_flow.map((item) => item.other_wc_items),
        },
        { label: "Working capital changes", values: stocs_cash_flow.map((item) => item.working_capital_changes) },
        {
          label: "Direct taxes",
          values: stocs_cash_flow.map((item) => item.direct_taxes),
        },
        {
          label: "Other operating items",
          values: stocs_cash_flow.map((item) => item.other_operating_items),
        },
        {
          label: "Cash from Investing Activity",
          values: stocs_cash_flow.map((item) => item.cash_from_investing_activity),
        },

        {
          label: "Fixed assests purchased",
          values: stocs_cash_flow.map((item) => item.fixed_assets_purchased),
        },
        {
          label: "Fixed assets sold",
          values: stocs_cash_flow.map((item) => item.fixed_assets_sold),
        },
        {
          label: "Capital WIP",
          values: stocs_cash_flow.map((item) => item.capital_wip)
        },
        {
          label: "Investments purchased",
          values: stocs_cash_flow.map((item) => item.investments_purchased),
        },
        {
          label: "Investments sold",
          values: stocs_cash_flow.map((item) => item.investments_sold),
        },
        {
          label: "Interest received",
          values: stocs_cash_flow.map((item) => item.interest_received)
        },
        {
          label: "Other Investmenting items",
          values: stocs_cash_flow.map((item) => item.other_investing_items),
        },
        {
          label: "Cash from Financing Activity",
          values: stocs_cash_flow.map((item) => item.cash_from_financing_activity),
        },
        {
          label: "Proceeds from shares",
          values: stocs_cash_flow.map((item) => item.proceeds_from_shares)
        },
        {  label: "Proceeds from borrowings",
          values: stocs_cash_flow.map((item) => item.proceeds_from_borrowings),
        },
        {
          label: "Repayment of borrowings",
          values: stocs_cash_flow.map((item) => item.repayment_of_borrowings)
        },
        {
          label: "Interest paid fin",
          values: stocs_cash_flow.map((item) => item.interest_paid_fin),
        },
        {
          label: "Share application money",
          values: stocs_cash_flow.map((item) => item.share_application_money),
        },
        {
          label: "Other financing items",
          values: stocs_cash_flow.map((item) => item.other_financing_items)
        },
        {
          label: "Net Cash Flow",
          values: stocs_cash_flow.map((item) => item.net_cash_flow)
        },
      ];

      const fiscalYears = stocs_cash_flow.map((item) => item.fiscal_year);

    setYears(fiscalYears);

    setcash_flow(transformedData);
  }

}, [isLoading, stock_research_stocks_data]);

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
                {years.map((year, index) => (
                    <th key={index}>{year}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
             {cash_flow_stock.map((row, index) => (
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
      </div>

      <section className="cashflowriskconcernpage-summary">
        <h3>• Summary</h3>
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
