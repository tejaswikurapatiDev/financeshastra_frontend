import React from "react";

const Quarterlyratio = () => {
    const data = {
        header: ["Mar 2017", "Mar 2018", "Mar 2019", "Mar 2020", "Mar 2021", "Mar 2022", "Mar 2023", "Mar 2024"],
        sections: [
          {
            title: "Operational & Financial Ratios",
            rows: [
              { label: "Basic EPS (₹)", values: [11.21, 19.13, 20.21, 22.15, 25.11, 39.64, 62.35, 75.17] },
              { label: "Diluted EPS (₹)", values: [11.21, 19.13, 20.21, 22.15, 25.11, "3,04,696", 62.35, 775.17] },
              { label: "Book Value/Share (₹)", values: [228.31, 230.69, 235.35, 254.69, 282.35, 316.22, 371.08, 434.06] },
              { label: "Dividend/Share (₹)", values: [3.00, 0.00, 0.00, 0.00, 4.00, 7.10, 11.30, 13.70] },
              { label: "Face Value", values: [1, 1, 1, 1, 1, 1, 1, 1] },
            ],
          },
          {
            title: "Margin Ratios",
            rows: [
              { label: "Net Interest Margin (%)", values: [2.54, 2.34, 2.07, 2.59, 2.51, 2.49, 2.70, 2.66] },
              { label: "Operating Profit Margin (%)", values: [-19.83, -17.63, -22.43, -29.63, -29.82, -27.81, -18.80, -19.86] },
              { label: "Net Profit Margin (%)", values: [7.12, 7.83, 6.63, 6.73, 8.73, 12.53, 16.12, 15.51] },
            ],
          },
          {
            title: "Return Ratios",
            rows: [
              { label: "Return on Networth / Equity (%)", values: [-0.28, -2.24, 1.53, 8.69, 8.89, 12.53, 16.80, 17.31] },
              { label: "ROCE (%)", values: [2.17, -0.32, 3.48, 1.94, 1.77, 1.57, 1.74, 1.63] },
              { label: "Return On Assets (%)", values: [0.00, -0.16, 0.21, 0.47, 0.46, 0.65, 0.93, 0.99] },
            ],
          },
          {
            title: "Other Ratios",
            rows: [
              { label: "CASA (%)", values: [42.58, 38.47, 44.17, 44.17, 45.40, 44.51, 42.66, 39.92] },
              { label: "Capital Adequacy Ratios (%)", values: [11.84, 12.21, 13.08, 13.13, 13.74, 13.85, 14.68, 14.28] },
            ],
          },
        ],
      };

  return (
    <div>
      <h2 className="earningheaderrpeer" style={{ marginRight: "520px" }}>
      Ratios
      </h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores /{" "}
        <a style={{ color: "#24b676" }}>View Standalone</a>
      </p>
      <div className="earnings-report">
        <table className="earnings-tableeincome">
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px", borderBottom: "2px solid #ddd" }}></th>
            {data.header.map((year, index) => (
              <th key={index} style={{ textAlign: "center", padding: "10px", borderBottom: "2px solid #ddd" }}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.sections.map((section, secIndex) => (
            <React.Fragment key={secIndex}>
              {/* Section Title */}
              <tr>
              <td
  colSpan={data.header.length + 1}
  style={{
    fontWeight: "bold",
    backgroundColor: "#f8f8f8",
    borderTop: secIndex > 0 ? "2px solid #ddd" : "none",
    padding: "10px 20px 10px 80px", // Adds 60px padding on the left for spacing
    textAlign: "left", // Aligns text to the left
  }}
>
  {section.title}
</td>


              </tr>
              {/* Section Rows */}
              {section.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{row.label}</td>
                  {row.values.map((value, valIndex) => (
                    <td key={valIndex} style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quarterlyratio;