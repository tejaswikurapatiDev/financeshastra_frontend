import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { RiExpandUpDownLine } from "react-icons/ri"; // Import the icon
import Navbar from "../../Navbar/Navbar";

const fundDatadirect = [
  {
    name: "Motilal Oswal Midcap Fund Direct Growth",
    rating: "5 ★",
    riskometer: "Very High",
    nav: "₹125.95",
    aum: "₹18,604.02",
    sip: "₹500",
    expRatio: "0.57%",
    returns: {
      "1Y": "62.96%",
      "3Y": "36.87%",
      "5Y": "34.56%",
    },
  },
  {
    name: "ICICI Prudential Technology Fund - Growth",
    rating: "5 ★",
    riskometer: "Very High",
    nav: "₹230.18",
    aum: "₹13,495",
    sip: "₹100",
    expRatio: "0.12%",
    returns: {
      "1Y": "37.39%",
      "3Y": "8.89%",
      "5Y": "28.78%",
    },
  },
  {
    name: "Mirae Asset ELSS Tax Saver Fund Direct Growth",
    rating: "5 ★",
    riskometer: "Very High",
    nav: "₹58.23",
    aum: "₹24,895.71",
    sip: "₹500",
    expRatio: "1.06%",
    returns: {
      "1Y": "34.83%",
      "3Y": "14.11%",
      "5Y": "20.3%",
    },
  },
  {
    name: "Bandhan ELSS Tax Saver Fund Direct Plan Growth",
    rating: "5 ★",
    riskometer: "Very High",
    nav: "₹173.65",
    aum: "₹7,353.93",
    sip: "₹500",
    expRatio: "0.64%",
    returns: {
      "1Y": "16.83%",
      "3Y": "28.88%",
      "5Y": "18.62%",
    },
  },
  {
    name: "HSBC Tax Saver Equity Fund Direct Growth",
    rating: "5 ★",
    riskometer: "Moderate",
    nav: "₹107.75",
    aum: "₹236.52",
    sip: "₹500",
    expRatio: "0.67%",
    returns: {
      "1Y": "24.83%",
      "3Y": "14.63%",
      "5Y": "14.55%",
    },
  },
  {
    name: "ICICI Prudential Infrastructure Direct Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹208.36",
    aum: "₹6,423.88",
    sip: "₹100",
    expRatio: "1.21%",
    returns: {
      "1Y": "41.01%",
      "3Y": "35.65%",
      "5Y": "31.85%",
    },
  },
  {
    name: "Canara Robeco Bluechip Equity Fund Direct Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹71.21",
    aum: "₹14,580.92",
    sip: "₹1000",
    expRatio: "1.00%",
    returns: {
      "1Y": "33.01%",
      "3Y": "12.75%",
      "5Y": "17.96%",
    },
  },
  {
    name: "HDFC Mid Cap Opportunities Direct Plan Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹210.54",
    aum: "₹77,682.90",
    sip: "₹100",
    expRatio: "0.76%",
    returns: {
      "1Y": "35.58%",
      "3Y": "28.20%",
      "5Y": "30.77%",
    },
  },
  {
    name: "Edelweiss Mid Cap Direct Plan Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹117.56",
    aum: "₹7,755.06",
    sip: "₹100",
    expRatio: "0.40%",
    returns: {
      "1Y": "47.74%",
      "3Y": "28.31%",
      "5Y": "32.48%",
    },
  },
  {
    name: "Kotak Multicap Fund Direct Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹20.43",
    aum: "₹15,420.68",
    sip: "₹100",
    expRatio: "0.39%",
    returns: {
      "1Y": "39.00%",
      "3Y": "28.29%",
      "5Y": "NA",
    },
  },
  {
    name: "Mahindra Manulife Mid Cap Fund Direct Growth",
    rating: "4 ★",
    riskometer: "Moderate",
    nav: "₹38.44",
    aum: "₹3,442.41",
    sip: "₹500",
    expRatio: "0.48%",
    returns: {
      "1Y": "41.06%",
      "3Y": "27.92%",
      "5Y": "30.73%",
    },
  },
  {
    name: "Nippon India Growth Fund Direct Growth",
    rating: "4 ★",
    riskometer: "Very High",
    nav: "₹846.15",
    aum: "₹35,208.97",
    sip: "₹100",
    expRatio: "0.79%",
    returns: {
      "1Y": "36.83%",
      "3Y": "27.91%",
      "5Y": "30.67%",
    },
  },
  {
    name: "Axis Small Cap Fund Direct Growth",
    rating: "4 ★",
    riskometer: "Moderate",
    nav: "₹124.52",
    aum: "₹6,097.89",
    sip: "₹100",
    expRatio: "0.32%",
    returns: {
      "1Y": "9.18%",
      "3Y": "8.62%",
      "5Y": "7.37%",
    },
  },
  {
    name: "Tata Infrastructure Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Low to Moderate",
    nav: "₹204.19",
    aum: "₹2,481.22",
    sip: "₹1000",
    expRatio: "0.32%",
    returns: {
      "1Y": "50.57%",
      "3Y": "27.93%",
      "5Y": "27.48%",
    },
  },
  {
    name: "Bank of India Small Cap Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹56.08",
    aum: "₹1,537.17",
    sip: "₹1000",
    expRatio: "1.39%",
    returns: {
      "1Y": "36.55%",
      "3Y": "25.08%",
      "5Y": "16.68%",
    },
  },
  {
    name: "Nippon India Power & Infra Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹391.71",
    aum: "₹7,683.43",
    sip: "₹100",
    expRatio: "0.98%",
    returns: {
      "1Y": "42.56%",
      "3Y": "33.83%",
      "5Y": "30.68%",
    },
  },
  {
    name: "Aditya Birla Sun Life India GenNext Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹243.34",
    aum: "₹5,813.86",
    sip: "₹100",
    expRatio: "1.10%",
    returns: {
      "1Y": "33.28%",
      "3Y": "15.26%",
      "5Y": "18.8%",
    },
  },
  {
    name: "SBI Infrastructure Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹55.36",
    aum: "₹5,070.57",
    sip: "₹500",
    expRatio: "0.91%",
    returns: {
      "1Y": "31.67%",
      "3Y": "28.29%",
      "5Y": "27.35%",
    },
  },
  {
    name: "ITI Small Cap Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹14.05",
    aum: "₹1,052.44",
    sip: "₹500",
    expRatio: "0.42%",
    returns: {
      "1Y": "44.76%",
      "3Y": "27.79%",
      "5Y": "NA",
    },
  },
  {
    name: "DSP Healthcare Fund Direct Growth",
    rating: "3 ★",
    riskometer: "Very High",
    nav: "₹45.58",
    aum: "₹3,094.08",
    sip: "₹500",
    expRatio: "0.96%",
    returns: {
      "1Y": "47.39%",
      "3Y": "24.55%",
      "5Y": "33.02%",
    },
  },
  // Add more fund data objects here if necessary
];

const TopRatedFundsdirect = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="funds-table-container">
        {/* Header Section */}
        <div className="funds-header">
          <h2 className="funds-table-title">Top Rated Funds</h2>
          <div className="button-container">
            <button
              className="fund-button regular"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => navigate("/mutualfund")}
            >
              Regular
            </button>
            <button
              className="fund-button direct"
              style={{ backgroundColor: "#24b676", color: "white" }}
              onClick={() => navigate("/mutualfunddirect")}
            >
              Direct
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="funds-table-description">
          Looking for the best mutual funds to build your wealth? At Value
          Research, we’ve simplified the process for you. Our detailed guide to
          top-performing mutual funds across <br />
          different categories helps you identify options that suit your
          financial objectives.
        </p>

        {/* Table */}
        <table className="funds-table">
          <thead>
            <tr className="funds-table-header">
              <th>Funds</th>
              <th>
                Rating <RiExpandUpDownLine />
              </th>
              <th>
                Riskometer <RiExpandUpDownLine />
              </th>
              <th>
                NAV (₹) <RiExpandUpDownLine />
              </th>
              <th>
                AUM (Cr) <RiExpandUpDownLine />
              </th>
              <th>
                SIP Amount <RiExpandUpDownLine />
              </th>
              <th>
                Exp. Ratio % <RiExpandUpDownLine />
              </th>
              <th>
                1Y (%) <RiExpandUpDownLine />
              </th>
              <th>
                3Y (%) <RiExpandUpDownLine />
              </th>
              <th>
                5Y (%) <RiExpandUpDownLine />
              </th>
            </tr>
          </thead>
          <tbody>
            {fundDatadirect.map((fund, index) => (
              <tr className="funds-table-row" key={index}>
                <td>
        {/* Wrap fund name with a Link to navigate to 'mutualfundgrowth' */}
        <Link to="/mutualfundgrowth" className="fund-name-link">
          {fund.name}
        </Link>
      </td>
                <td>
                  {fund.rating.split(" ")[0]}{" "}
                  <span className="star">{fund.rating.split(" ")[1]}</span>
                </td>
                <td>{fund.riskometer}</td>
                <td>{fund.nav}</td>
                <td>{fund.aum}</td>
                <td>{fund.sip}</td>
                <td>{fund.expRatio}</td>
                <td>{fund.returns["1Y"]}</td>
                <td>{fund.returns["3Y"]}</td>
                <td>{fund.returns["5Y"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopRatedFundsdirect;
