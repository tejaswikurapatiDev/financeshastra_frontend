import React from 'react';
import './Quaterlyearningincome.css'
const QuarterlyEarningdetailincome = () => {
    const tableData = {
        headers: [
          "Particulars",
          "Mar 2017",
          "Mar 2018",
          "Mar 2019",
          "Mar 2020",
          "Mar 2021",
          "Mar 2022",
          "Mar 2023",
          "Mar 2024",
        ],
        rows: [
            {
                "particulars": "Interest Earned",
                "Mar 2017": 230447,
                "Mar 2018": 228970,
                "Mar 2019": 253322,
                "Mar 2020": 269852,
                "Mar 2021": 278115,
                "Mar 2022": 289973,
                "Mar 2023": 350845,
                "Mar 2024": 439189
              },
              {
                "particulars": "Other Income",
                "Mar 2017": 68193,
                "Mar 2018": 77557,
                "Mar 2019": 77365,
                "Mar 2020": 98159,
                "Mar 2021": 107222,
                "Mar 2022": 117000,
                "Mar 2023": 122534,
                "Mar 2024": 155386
              },
              {
                "particulars": "Total Income",
                "Mar 2017": 298640,
                "Mar 2018": 306528,
                "Mar 2019": 330687,
                "Mar 2020": 368011,
                "Mar 2021": 385338,
                "Mar 2022": 406973,
                "Mar 2023": 473378,
                "Mar 2024": 594575
              },
              {
                "particulars": "Total Expenditure",
                "Mar 2017": 299031,
                "Mar 2018": 310715,
                "Mar 2019": 327618,
                "Mar 2020": 349834,
                "Mar 2021": 361058,
                "Mar 2022": 370617,
                "Mar 2023": 416820,
                "Mar 2024": 526437
              },
              {
                "particulars": "Operating Profit",
                "Mar 2017": 87290,
                "Mar 2018": 96155,
                "Mar 2019": 114800,
                "Mar 2020": 131782,
                "Mar 2021": 150430,
                "Mar 2022": 174363,
                "Mar 2023": 189814,
                "Mar 2024": 235894
              },
              {
                "particulars": "Provisions & Contingencies",
                "Mar 2017": 62626,
                "Mar 2018": 67958,
                "Mar 2019": 56951,
                "Mar 2020": 56928,
                "Mar 2021": 54618,
                "Mar 2022": 40059,
                "Mar 2023": 37024,
                "Mar 2024": 30807
              },
              {
                "particulars": "Profit Before Tax",
                "Mar 2017": 945,
                "Mar 2018": -12234,
                "Mar 2019": 5929,
                "Mar 2020": 30052,
                "Mar 2021": 32809,
                "Mar 2022": 49736,
                "Mar 2023": 75398,
                "Mar 2024": 91230
              },
              {
                "particulars": "Tax",
                "Mar 2017": 1336,
                "Mar 2018": -8046,
                "Mar 2019": 2860,
                "Mar 2020": 11875,
                "Mar 2021": 8529,
                "Mar 2022": 13379,
                "Mar 2023": 18840,
                "Mar 2024": 23092
              },
              {
                "particulars": "Net Profit",
                "Mar 2017": -391,
                "Mar 2018": -4187,
                "Mar 2019": 3069,
                "Mar 2020": 18177,
                "Mar 2021": 24280,
                "Mar 2022": 36356,
                "Mar 2023": 56558,
                "Mar 2024": 68138
              },
              {
                "particulars": " Non-Performing Assets",
                
              },
              {
                "particulars": "Gross NPA",
                "Mar 2017": 127281,
                "Mar 2018": 83794,
                "Mar 2019": 119270,
                "Mar 2020": 149091,
                "Mar 2021": 126389,
                "Mar 2022": 112023,
                "Mar 2023": 90927,
                "Mar 2024": 84276
              },
              {
                "particulars": "Gross NPA (%)",
                "Mar 2017": 3.84,
                "Mar 2018": 4.00,
                "Mar 2019": 5.34,
                "Mar 2020": 6.00,
                "Mar 2021": 5.00,
                "Mar 2022": 3.97,
                "Mar 2023": 2.78,
                "Mar 2024": 2.24
              },
              {
                "particulars": "Net NPA",
                "Mar 2017": 45121,
                "Mar 2018": 23982,
                "Mar 2019": 64584,
                "Mar 2020": 51871,
                "Mar 2021": 36809,
                "Mar 2022": 27965,
                "Mar 2023": 21466,
                "Mar 2024": 21051
              },
              {
                "particulars": "Net NPA (%)",
                "Mar 2017": 0.68,
                "Mar 2018": 1.02,
                "Mar 2019": 0.58,
                "Mar 2020": 2.23,
                "Mar 2021": 1.50,
                "Mar 2022": 1.02,
                "Mar 2023": 0.67,
                "Mar 2024": 0.57
              }
        ]
      };
    
    return (
        <div>
            <h2 className="earningheaderrpeer" >
                Income Statement
            </h2>
            <p className="earningparaapeer">
                Consolidated Figures in ₹ Crores / <a style={{ color: '#24b676' }}>View Standalone</a>
            </p>
            <div className="earnings-report">
                <table className="earnings-tableeincome">
                    <thead>
                        <tr>
                            {tableData.headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.particulars}</td>
                                {tableData.headers.slice(1).map((header, i) => (
                                    <td key={i}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuarterlyEarningdetailincome;