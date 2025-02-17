import React, { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";
import './Quaterlypeer.css'
const Quarterlypeer = () => {
  const [data, setData] = useState([
    { company: "SBI", price: 812.05, change: -1.11, mcap: "₹724,723.77", ttmPE: 10.13, pb: 1.87, roe: 17.31, oneYear: 27.53, car: 14.28, interestEarned: "439,188.51", nim: 2.66 },
    { company: "Bank of Baroda", price: 327.4, change: -0.53, mcap: "₹126,672.52", ttmPE: 6.33, pb: 1.06, roe: 15.67, oneYear: 9.55, car: 16.31, interestEarned: "118,379.22", nim: 2.92 },
    { company: "PNB", price: 566.4, change: 0.26, mcap: "₹116,814.28", ttmPE: 8.07, pb: 1.14, roe: 8.92, oneYear: 13.88, car: 16.0, interestEarned: "109,064.58", nim: 2.53 },
    { company: "IOB", price: 1.8, change: 0.1, mcap: "₹797,706.57", ttmPE: 32.92, pb: 3.93, roe: 10.73, oneYear: 20.35, car: 17.28, interestEarned: "424,065.67", nim: 2.79 },
    { company: "Canara Bank", price: 162.9, change: -0.52, mcap: "₹791,205.40", ttmPE: 5.7, pb: 0.99, roe: 18.4, oneYear: 18.0, car: 16.28, interestEarned: "110,518.75", nim: 2.5 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

 
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <PiCaretUpDownFill style={{ transform: "rotate(180deg)" }} />
      ) : (
        <PiCaretUpDownFill />
      );
    }
    return <PiCaretUpDownFill />;
  };

  return (
    <div>
      <h2 className="earningheaderrpeer">
        Peer Analysis
      </h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores /{" "}
        <a style={{ color: "#24b676" }}>View Standalone</a>
      </p>
      <div className="earnings-report">
        <table className="earnings-insight-learn-tablepeer">
          <thead>
            <tr >
              <th>Company Name</th>
              <th onClick={() => sortData("price")} style={{ cursor: "pointer" }}>
              Price (₹) {renderSortIcon("price")}
                        </th>
           
              <th onClick={() => sortData("change")} style={{ cursor: "pointer" }}>
                Change (%)  {renderSortIcon("change")}
              </th>
              <th
                onClick={() => sortData("mcap")}
                style={{
                  cursor: "pointer",
                  
                }}
              >
                M Cap (Cr.) {renderSortIcon("mcap")}
              </th>
              <th onClick={() => sortData("ttmPE")} style={{ cursor: "pointer" }}>
                TTM PE  {renderSortIcon("ttmPE")}
              </th>
              <th onClick={() => sortData("pb")} style={{ cursor: "pointer" }}>
                P/B {renderSortIcon("pb")}
              </th>
              <th onClick={() => sortData("roe")} style={{ cursor: "pointer" }}>
                ROE (%){renderSortIcon("roe")}
              </th>
              <th onClick={() => sortData("oneYear")}style={{ cursor: "pointer" }}>
                1Y Per (%) {renderSortIcon("oneYear")}
              </th>
              <th onClick={() => sortData("car")} style={{ cursor: "pointer" }}>
                CAR (%) {renderSortIcon("car")}
              </th>
              <th
                onClick={() => sortData("interestEarned")}
                style={{ cursor: "pointer"}}
              >
                Int. Earned (₹) {renderSortIcon("interestEarned")}
              </th>
              <th onClick={() => sortData("nim")} style={{ cursor: "pointer" }}>
                NIM (%){renderSortIcon("nim")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td>{row.company}</td>
                <td>{row.price}</td>
                <td style={{ color: row.change < 0 ? "red" : "green" }}>
                  {row.change}
                </td>
                <td>{row.mcap}</td>
                <td>{row.ttmPE}</td>
                <td>{row.pb}</td>
                <td>{row.roe}</td>
                <td>{row.oneYear}</td>
                <td>{row.car}</td>
                <td>{row.interestEarned}</td>
                <td>{row.nim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quarterlypeer;