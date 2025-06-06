import React, { useEffect, useState } from 'react';
import useResearchStocksData from '../ResearchStocksData';
import { API_BASE_URL } from '../../config';


const Balancesheetriskconcernpage = () => {
  const { stock_research_stocks_data, isLoading } = useResearchStocksData(API_BASE_URL);
  const [years, setYears] = useState([]);
  const [balacesheet, setbalancesheet] = useState([])


  useEffect(() => {
    if (!isLoading && stock_research_stocks_data?.income_statement) {
      console.log(stock_research_stocks_data)
      const stocksBalanceSheet = stock_research_stocks_data.balancesheet;

      const transformedData = [
        {
          label: "Equity Capital",
          values: stocksBalanceSheet.map((item) => item.equity_capital),
        },
        { label: "Reserves", values: stocksBalanceSheet.map((item) => item.reserves) },
        {
          label: "Borrowings",
          values: stocksBalanceSheet.map((item) => item.borrowings),
        },
        { label: "Long term Borrowings", values: stocksBalanceSheet.map((item) => item.long_term_borrowings) },
        { label: "Short term Borrowings", values: stocksBalanceSheet.map((item) => item.short_term_borrowings) },
        { label: "Lease Liabilities", values: stocksBalanceSheet.map((item) => item.lease_liabilities) },
        { label: "Other Borrowings", values: stocksBalanceSheet.map((item) => item.other_borrowings) },


        {
          label: "Other Liabilities",
          values: stocksBalanceSheet.map((item) => item.other_liabilities),
        },
        { label: "Trade Payables", values: stocksBalanceSheet.map((item) => item.trade_payables) },
        { label: "Advance from Customers", values: stocksBalanceSheet.map((item) => item.advance_from_customers) },
        { label: "Other Liability Items", values: stocksBalanceSheet.map((item) => item.other_liability_items) },

        {
          label: "Total Liabilities",
          values: stocksBalanceSheet.map((item) => item.total_liabilities),
        },
        {
          label: "Fixed Assets",
          values: stocksBalanceSheet.map((item) => item.fixed_assets),
        },
        { label: "Land", values: stocksBalanceSheet.map((item) => item.land) },
        { label: "Building", values: stocksBalanceSheet.map((item) => item.building) },
        { label: "Plant Machinery", values: stocksBalanceSheet.map((item) => item.plant_machinery) },
        { label: "Equipments", values: stocksBalanceSheet.map((item) => item.equipments) },
        { label: "Furniture n fittings", values: stocksBalanceSheet.map((item) => item.furniture_n_fittings) },
        { label: "Vehicles", values: stocksBalanceSheet.map((item) => item.vehicles) },
        { label: "Other fixed assets", values: stocksBalanceSheet.map((item) => item.other_fixed_assets) },
        { label: "Gross Block", values: stocksBalanceSheet.map((item) => item.gross_block) },
        { label: "Accumulated Depreciation", values: stocksBalanceSheet.map((item) => item.accumulated_depreciation) },
        { label: "CWIP", values: stocksBalanceSheet.map((item) => item.cwip) },
        {
          label: "Investments",
          values: stocksBalanceSheet.map((item) => item.investments),
        },
        {
          label: "Other Assets",
          values: stocksBalanceSheet.map((item) => item.other_assets),
        },
        { label: "Inventories", values: stocksBalanceSheet.map((item) => item.inventories) },
        { label: "Trade receivables", values: stocksBalanceSheet.map((item) => item.trade_receivables) },
        { label: "Cash Equivalents", values: stocksBalanceSheet.map((item) => item.cash_equivalents) },
        { label: "Loans n Advances", values: stocksBalanceSheet.map((item) => item.loans_n_advances) },
        { label: "Other asset items", values: stocksBalanceSheet.map((item) => item.other_asset_items) },
        {
          label: "Total Assets",
          values: stocksBalanceSheet.map((item) => item.total_assets),
        },
      ];

      const fiscalYears = stocksBalanceSheet.map((item) => item.fiscal_year);
  
      setYears(fiscalYears);
  
      setbalancesheet(transformedData);


      
      console.log("teranceformeddata: ", transformedData)
    }

  }, [isLoading, stock_research_stocks_data]);

  

  return (
    <div className="riskconcernpage-containerrr">
      <div className="riskconcernpage-outlook">
        <h4>Balance Sheet</h4>
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
              
              {balacesheet.map((row, index) => (
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
    </div>
  );
};

export default Balancesheetriskconcernpage;
