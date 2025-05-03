import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import FooterForAllPage from "../FooterForAllPage/FooterForAllPage";
import useRelatedStocks from "./Hooks/useRelatedStocks";
import "./StocksOrSchemeDetails.css"; // Import your CSS file

const StocksOrSchemeDetails = () => {
  const { state } = useLocation();
  const item = state?.item;
  const relatedStocks = useRelatedStocks(item);

  if (!item)
    return <p className="no-data-msg">No data available. Please go back and select again.</p>;

  return (
    <>
      <Navbar />
      <div className="details-container">
        {item.name ? (
          <div className="stock-details">
            <h1>{item.name}</h1>
            <p><strong>Symbol:</strong> {item.symbol}</p>
            <p><strong>Sector:</strong> {item.sector}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
            <p><strong>Change %:</strong> {item.change_percentage}</p>
            <p><strong>Market Cap:</strong> {item.market_cap_str}</p>
            <p><strong>PE Ratio:</strong> {item.pe}</p>
            <p><strong>EPS (TTM):</strong> {item.eps_ttm}</p>
            <p><strong>EPS Growth:</strong> {item.eps_growth || "N/A"}</p>
            <p><strong>Dividend Yield:</strong> {item.div_yield}</p>
            <p><strong>Volume:</strong> {item.volume}</p>
            <p><strong>Relative Volume:</strong> {item.rel_volume}</p>
            <p><strong>Analyst Rating:</strong> {item.analyst_rating}</p>
          </div>
        ) : (
          <div className="scheme-details">
            <h1>{item.Scheme_Name}</h1>
            <p><strong>Scheme Code:</strong> {item.Scheme_Code}</p>
            <p><strong>Scheme Type:</strong> {item.Scheme_Type}</p>
            <p><strong>Sub Category:</strong> {item.Sub_Category}</p>
            <p><strong>AUM (Cr):</strong> {item.AuM_Cr}</p>
            <p><strong>NAV:</strong> ₹{item.NAV} (as on {item.NAV_Date})</p>

            <div className="performance">
              <h2>Performance</h2>
              <p><strong>1D Change:</strong> {item.Column_1D_Change}</p>
              <p><strong>1W:</strong> {item.Column_1W}</p>
              <p><strong>1M:</strong> {item.Column_1M}</p>
              <p><strong>3M:</strong> {item.Column_3M}</p>
              <p><strong>6M:</strong> {item.Column_6M}</p>
              <p><strong>1Y:</strong> {item.Column_1Y}</p>
              <p><strong>2Y:</strong> {item.Column_2Y}</p>
              <p><strong>3Y:</strong> {item.Column_3Y}</p>
              <p><strong>5Y:</strong> {item.Column_5Y}</p>
              <p><strong>10Y:</strong> {item.Column_10Y}</p>
              <p><strong>YTD:</strong> {item.YTD}</p>
            </div>

            <div className="week-stats">
              <h2>52 Week Stats</h2>
              <p><strong>52W High:</strong> ₹{item.Column_52W_High} (as on {item.Column_52WH_as_on})</p>
              <p><strong>52W Low:</strong> ₹{item.Column_52W_Low} (as on {item.Column_52WL_as_on})</p>
            </div>
          </div>
        )}

        {relatedStocks.length > 0 && (
          <div className="related-stocks">
            <h2>Related Stocks in {item.sector}</h2>
            <ul>
              {relatedStocks.slice(0, 5).map((stock) => (
                <li key={stock.symbol} className="stock-card">
                  <p className="stock-name">{stock.name}</p>
                  <p>Price: ₹{stock.price}</p>
                  <p>Symbol: {stock.symbol}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <FooterForAllPage />
    </>
  );
};

export default StocksOrSchemeDetails;
