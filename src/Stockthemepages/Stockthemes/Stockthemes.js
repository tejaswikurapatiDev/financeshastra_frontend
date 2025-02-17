import React from "react";
import "./Stockthemes.css";

const stockThemes = [
  {
    sector: "Bank",
    sentiment: "Bearish",
    marketCap: "4,794,099 (0.71%)",
    advDecl: "34 | 6",
    sectorPE: "18.07",
    earningsYOY: "68,251 (13.4%)",
    industries: 2,
    stocks: 12,
    details: [
      { label: "Market Cap", value: "4,794,099 (0.71%)" },
      { label: "Adv/Decl", value: "34 | 6" },
      { label: "Sector PE", value: "18.07" },
      { label: "YOY Earnings", value: "68,251 (13.4%)" },
      { label: "Industries", value: "2" },
      { label: "Stocks", value: "12" },
    ],
  },
  {
    sector: "IT Services",
    sentiment: "Bearish",
    marketCap: "4,688,173 (2.68%)",
    advDecl: "198 | 47",
    sectorPE: "40.50",
    earningsYOY: "32,632 (11.23%)",
    industries: 7,
    stocks: 18,
  },
  {
    sector: "Finance",
    sentiment: "Bearish",
    marketCap: "3,307,093 (2.64%)",
    advDecl: "338 | 166",
    sectorPE: "87.70",
    earningsYOY: "17,932 (24.18%)",
    industries: 8,
    stocks: 20,
  },
  {
    sector: "Healthcare",
    sentiment: "Bearish",
    marketCap: "2,728,442 (2.08%)",
    advDecl: "194 | 70",
    sectorPE: "66.31",
    earningsYOY: "4,720 (22.85%)",
    industries: 5,
    stocks: 15,
  },
  {
    sector: "Energy (Oil & Gas)",
    sentiment: "Bearish",
    marketCap: "2,507,683 (0.38%)",
    advDecl: "18 | 4",
    sectorPE: "20.22",
    earningsYOY: "31,846 (-4.4%)",
    industries: 2,
    stocks: 17,
  },
];

const StocksThemes = () => {
  return (
    <div className="stockthemesalll">
      <h1 className="stockthemesalll-header">Stocks Themes</h1>
      <p className="stockthemesalll-description">
        Evaluate sector results, classifications, financial outcomes, growth trends,
        and other factors to make well-informed choices.
      </p>
      <div className="stockthemesalll-search">
        <input
          type="text"
          placeholder="Search by sector name"
          className="stockthemesalll-input"
        />
        <span className="stockthemesalll-icon">🔍</span>
      </div>
      <div className="stockthemesalll-grid">
        {stockThemes.map((theme, index) => (
          <div key={index} className="stockthemesalll-card">
            <div className="stockthemesalll-card-header">
              <h2 className="stockthemesalll-card-title">{theme.sector}</h2>
              <p className="stockthemesalll-card-sentiment">{theme.sentiment}</p>
            </div>
            {theme.details ? (
              <div className="stockthemesalll-card-rows">
                {theme.details.map((detail, idx) => (
                  <div key={idx} className="stockthemesalll-card-row">
                    <p className="stockthemesalll-card-label">{detail.label}:</p>
                    <p className="stockthemesalll-card-value">{detail.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="stockthemesalll-card-content">
                <div className="stockthemesalll-card-item">
                  <p>Market Cap:</p>
                  <p className="stockthemesalll-card-value">{theme.marketCap}</p>
                </div>
                <div className="stockthemesalll-card-item">
                  <p>Adv/Decl:</p>
                  <p className="stockthemesalll-card-value">{theme.advDecl}</p>
                </div>
                <div className="stockthemesalll-card-item">
                  <p>Sector PE:</p>
                  <p className="stockthemesalll-card-value">{theme.sectorPE}</p>
                </div>
                <div className="stockthemesalll-card-item">
                  <p>YOY Earnings:</p>
                  <p className="stockthemesalll-card-value">{theme.earningsYOY}</p>
                </div>
                <div className="stockthemesalll-card-item">
                  <p>Industries:</p>
                  <p className="stockthemesalll-card-value">{theme.industries}</p>
                </div>
                <div className="stockthemesalll-card-item">
                  <p>Stocks:</p>
                  <p className="stockthemesalll-card-value">{theme.stocks}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksThemes;