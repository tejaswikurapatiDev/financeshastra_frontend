import React from "react";
import "./Ipotable.css"; // Optional: Add styling as needed

const  Ipotable = () => {
   
      
      
  const financialHistory = [
    { year: "Revenue", annualgrowth: -3.6, FY24: "2,958", FY23: "3,329", FY22: "3,185" },
    { year: "EBIT",  annualgrowth: -39.4,FY24: 182, FY23: 216, FY22: 495 },
    { year: "PAT",  annualgrowth: -38.6,FY24: 134, FY23: 153, FY22: 355},
    { year: "Net worth",  annualgrowth: "_",FY24: "1,274",FY23: "1,140", FY22: 987},
    { year: "Total debit",  annualgrowth: "_", FY24:380, FY23: 281, FY22: 378},
  ];

  const keyRatios = [
    { label: "ROE (%)", fy24: 11.1, fy23: 3.329, fy22: 3.185, average: 23.1 },
    { label: "ROCE (%)", fy24: 11.8, fy23: 216, fy22: 495, average: 21.0 },
    { label: "EBIT margin (%)", fy24: 6.2, fy23: 153, fy22: 355, average: 0.3 },
    { label: "Debt-to-equity", fy24: 0.3, fy23: 0.2, fy22: 0.4, average: 0.3 },
  ];

  const subscriptionStatus = [
    { category: "Qualified Institutional Buyers", times: "0.01x" },
    { category: "Retail Individual Investor", times: "13.89x" },
    { category: "Non-Institutional Investor", times: "8.31x" },
    { category: "Others", times: "17.68x" },
    { category: "Total", times: "8.75x" },
  ];

  return (
    <div className="ipo-container">
   

      <section className="financialIPO-history">
        <h2>Financial History</h2>
        <table className="ipotable">
          <thead>
            <tr>
              <th>Key financials (₹ cr)</th>
              <th>2Y annual
              growth (%)</th>
              <th>FY24</th>
              <th>FY23</th>
              <th>FY22</th>
              
            </tr>
          </thead>
          <tbody>
            {financialHistory.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{row. annualgrowth}</td>
                <td>{row.FY24}</td>
                <td>{row.FY23}</td>
                <td>{row.FY22}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="ebitpara">EBIT is earnings before interest and taxes PAT is profit after tax</p>

      <section className="key-ratios">
        <h2>Key Ratios</h2>
        <table className="ipotable">
          <thead>
            <tr>
              <th>Ratio</th>
              <th>3Y Average</th>
              <th>FY24</th>
              <th>FY23</th>
              <th>FY22</th>
            </tr>
          </thead>
          <tbody>
            {keyRatios.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.average}</td>
                <td>{row.fy24}</td>
                <td>{row.fy23}</td>
                <td>{row.fy22}</td>
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
            {subscriptionStatus.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.times}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section><br/>
    
      <h2 className="investgg-heading">Corporation and Enterprise</h2>
      <ul className="ipopms-list">
        <li>
          <strong className="ipopmspara">Has Sanathan Textiles posted earnings before tax of Rs 50 crore or higher in the last 12 months?<br/></strong>
          Yes. The company recorded earnings before tax of Rs 181 crore in FY24
        </li><br/>
        <li>
          <strong className="ipogpmspara">Will the company be able to grow its operations?</strong><br/>Yes. The expanding China-plus-one trend and the development of textile infrastructure in India should assist Sanathan Textiles in scaling up its business.
        </li><br/>
        <li>
          <strong className="ipopmspara">Does the company have established brands with customer retention?</strong><br/> 
          Yes. Through brands like 'Sanathan' and 'BornDyed', the company has created a strong presence in the yarn sector. Moreover, Sanathan Textiles has
cultivated enduring relationships with top consumer brands and has partnered with its leading 10 customers for more than 10 years on average.
        </li><br/>
        <li>
          <strong className="ipopmspara">Does the company have a reliable competitive edge?</strong> <br/>No. The yarn market is fragmented, consisting of many small and large participants, which makes it difficult for Sanathan Textiles to consolidate a
          dominant market position.
        </li>
       
      </ul>


      <h2 className="investgg-heading">Administration</h2>
      <ul className="ipopms-list">
        <li>
          <strong className="ipopmspara">Do any of the company’s founders still own at least a 5% stake? Or do the promoters hold more than 25% of the company?<br/></strong>
          Yes. Following the IPO, the promoters will maintain a 79.7% ownership in the company
        </li><br/>
        <li>
          <strong className="ipogpmspara">Do the top three executives have more than 15 years of combined leadership experience at Sanathan Textiles?</strong><br/>
          Yes. Paresh Dattani, the company’s Chairman and Managing Director, and Ajay Dattani, the Joint Managing Director, have been with Sanathan
          Textiles since its founding in 2005.
        </li><br/>
        <li>
          <strong className="ipopmspara">Is the company’s accounting policy consistent?</strong><br/> 
          Yes. There is no evidence to indicate otherwise
        </li><br/>
        <li>
          <strong className="ipopmspara">Does Sanathan Textiles have any promoter share pledging?</strong><br/>
          No. The promoters have not pledged their shares.
        </li>
       
      </ul>
      <h2 className="investgg-heading">Financial Performance</h2>
      <ul className="ipopms-list">
        <li>
          <strong className="ipopmspara">Has the company reported a current and three-year average return on equity of over 15% and return on capital employed exceeding 18%?<br/></strong>
          No. Its three-year average ROE stands at 23.1% and ROCE at 21%. In FY24, the company recorded an ROE and ROCE of nearly 11% each.
        </li><br/>
        <li>
          <strong className="ipogpmspara">Did the company have a positive operating cash flow over the past three years?</strong><br/>
          Yes. It reported positive cash flow from operations in the last three years.
        </li><br/>
        <li>
          <strong className="ipopmspara">Does the company have a net debt-to-equity ratio of less than one?</strong><br/> 
          Yes. As of Q1 FY25, the company’s net debt-to-equity ratio was 0.4 times
        </li><br/>
        <li>
          <strong className="ipopmspara">Is the company independent of heavy working capital for its daily operations?</strong> <br/>
          No. While Sanathan Textiles' working capital days are relatively short, it still depends on short-term funding for its day-to-day operations.
        </li><br/>
        <li>
          <strong className="ipopmspara">Is the company capable of running its business without external funding in the next three years?</strong><br/> 
          Yes. The company has positive operating cash flow and a low debt level. Additionally, the funds raised from the fresh issue are expected to
          cover Sanathan Textiles' funding requirements for the next three years.
        </li><br/>
        <li>
          <strong className="ipopmspara">Is the company free from significant contingent liabilities?</strong><br/> 
          Yes. As of June 2024, the company’s contingent liabilities were only 5% of its net worth.
        </li>
       
      </ul>

      <h2 className="investgg-heading">Valuations</h2>
      <ul className="ipopms-list">
        <li>
          <strong className="ipopmspara">Is the operating earnings yield on the stock’s enterprise value above 8%?<br/></strong>
          No. The stock has an operating earnings yield of 6% on its enterprise value.
        </li><br/>
        <li>
          <strong className="ipogpmspara">Is the stock's P/E ratio below the median level of its competitors?</strong><br/>
          Yes. The stock has a P/E ratio of 20.2 times, compared to the peer median of 26.5 times.
        </li><br/>
        <li>
          <strong className="ipopmspara">Is the stock's P/B ratio below the average level of its competitors?</strong><br/> 
          Yes. The stock’s P/B ratio is 1.6 times, which is lower than the average of 4.8 times for its peers.
        </li>
       
      </ul>
     
      

    </div>
  );
};

export default Ipotable;