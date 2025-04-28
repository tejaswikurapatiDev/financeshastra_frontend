import React from "react";
import "./Ipotable.css";

const Ipotable = (props) => {
  const {
    financialData,
    keyratios,
    subscriptionstatus,
    ipoDetailsData,
    corpEnterprise = [],
    administration = [],
    financialPerformance = [],
    valuations = []
  } = props;

  const getGrowth = (latest, past) => {
    if (!latest || !past) return "_";
    const growth = ((parseFloat(latest) - parseFloat(past)) / parseFloat(past)) * 100;
    return `${growth.toFixed(1)}`;
  };

  const sortedData = Array.isArray(financialData)
    ? [...financialData].sort((a, b) => {
      const fiscalYearA = a?.fiscalYear || "";
      const fiscalYearB = b?.fiscalYear || "";
      return fiscalYearB.localeCompare(fiscalYearA);
    })
    : [];

  const getValue = (field) => sortedData.map((row) => parseFloat(row[field]).toLocaleString("en-IN"));

  const metrics = [
    { label: "ROE (%)", key: "roe" },
    { label: "ROCE (%)", key: "roce" },
    { label: "EBIT margin (%)", key: "ebitMargin" },
    { label: "Debt-to-equity", key: "debtToEquity" },
  ];

  const years = ["FY24", "FY23", "FY22"];

  const calculateAverage = (key) => {
    const values = keyratios.map((item) => parseFloat(item[key] || 0));
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    return avg.toFixed(2);
  };

  return (
    <div className="ipo-container">
      <section className="financialIPO-history">
        <h2>Financial History</h2>
        <div className="overflow-auto p-4">
          <table className="ipotable">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Key financials (₹ cr)</th>
                <th className="border px-3 py-2">2Y annual growth (%)</th>
                {sortedData.map((row) => (
                  <th key={row.fiscalYear} className="border px-3 py-2">
                    {row.fiscalYear}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Revenue</td>
                <td className="border px-3 py-2">
                  {sortedData[0] && sortedData[2]
                    ? getGrowth(sortedData[0].revenue, sortedData[2].revenue)
                    : "_"}
                </td>
                {getValue("revenue").map((val, i) => (
                  <td key={i} className="border px-3 py-2">{val}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-3 py-2">EBIT</td>
                <td className="border px-3 py-2">
                  {sortedData[0] && sortedData[2] && sortedData[0].ebit !== undefined && sortedData[2].ebit !== undefined
                    ? getGrowth(sortedData[0].ebit, sortedData[2].ebit)
                    : "_"}
                </td>
                {getValue("ebit").map((val, i) => (
                  <td key={i} className="border px-3 py-2">{val}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-3 py-2">PAT</td>
                <td className="border px-3 py-2">
                  {sortedData[0]?.pat && sortedData[2]?.pat
                    ? getGrowth(sortedData[0].pat, sortedData[2].pat)
                    : "_"}
                </td>
                {getValue("pat").map((val, i) => (
                  <td key={i} className="border px-3 py-2">{val}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-3 py-2">Net worth</td>
                <td className="border px-3 py-2">_</td>
                {getValue("netWorth").map((val, i) => (
                  <td key={i} className="border px-3 py-2">{val}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-3 py-2">Total debt</td>
                <td className="border px-3 py-2">_</td>
                {getValue("totalDebt").map((val, i) => (
                  <td key={i} className="border px-3 py-2">{val}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <p className="ebitpara">EBIT is earnings before interest and taxes PAT is profit after tax</p>

      <section className="key-ratios">
        <h2>Key Ratios</h2>
        <table className="ipotable">
          <thead>
            <tr>
              <th>Ratio</th>
              <th>3Y Average</th>
              {years.map((year) => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(({ label, key }) => (
              <tr key={key}>
                <td>{label}</td>
                <td>{calculateAverage(key)}</td>
                {years.map((year) => {
                  const yearData = keyratios.find((item) => item.fiscalYear === year);
                  return (
                    <td key={year + key}>
                      {yearData ? yearData[key] : "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="ebitpara">ROE is return on equity ROCE is return on capital employed</p>

      <section className="subscription-status">
        <h2>Subscription Status</h2>
        <table className="ipotable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Subscription Times</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionstatus.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.subscriptionTimes}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section><br />

      {corpEnterprise?.length > 0 && (
        <>
          <h2 className="investgg-heading">Corporation and Enterprise</h2>
          <ul className="ipopms-list">
            {corpEnterprise.map((item, index) => (
              <li key={index}>
                <strong className="ipopmspara">{item.question}</strong><br />
                {item.answer}
              </li>
            ))}
          </ul>
        </>
      )}

      {administration?.length > 0 && (
        <>
          <h2 className="investgg-heading">Administration</h2>
          <ul className="ipopms-list">
            {administration.map((item, index) => (
              <li key={index}>
                <strong className="ipopmspara">{item.question}</strong><br />
                {item.answer}
              </li>
            ))}
          </ul>
        </>
      )}

      {financialPerformance?.length > 0 && (
        <>
          <h2 className="investgg-heading">Financial Performance</h2>
          <ul className="ipopms-list">
            {financialPerformance.map((item, index) => (
              <li key={index}>
                <strong className="ipopmspara">{item.question}</strong><br />
                {item.answer}
              </li>
            ))}
          </ul>
        </>
      )}

      {valuations?.length > 0 && (
        <>
          <h2 className="investgg-heading">Valuations</h2>
          <ul className="ipopms-list">
            {valuations.map((item, index) => (
              <li key={index}>
                <strong className="ipopmspara">{item.question}</strong><br />
                {item.answer}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Ipotable;