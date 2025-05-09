
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hdfc from "../../assest/hdfcbank.png";
import varun from "../../assest/varunimg.png";


const PortfolioAnalysissplitPage = () => {
    const navigate = useNavigate();
    
  const [isHistoric, setIsHistoric] = useState(false);

  const PortfolioAnalysissplitPagedata = [
    {
       logo: varun,// Replace with the correct path
        company: "Varun Beverages Ltd.",
        exDate: "12-09-2024",
        recordDate: "07-06-2022",
        splitRatio: "1:2.5",
      },
      {
       logo: varun,// Replace with the correct path
        company: "Varun Beverages Ltd.",
        exDate: "06-15-2023",
        recordDate: "12-06-2021",
        splitRatio: "1:2",
      },
      {
       logo: hdfc, // Replace with the correct path
        company: "HDFC Bank",
        exDate: "09-19-2019",
        recordDate: "27-07-2019",
        splitRatio: "1:2",
      },
  ];

  return (
    <div className="portfolianalysiscorporatepage-table-wrapper">
    <div className="portfolianalysiscorporatepage-table">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Ex-Date</th>
            <th>Record Date</th>
            <th>Split Ratio</th>
          </tr>
        </thead>
        <tbody>
          {PortfolioAnalysissplitPagedata.map((item, index) => (
            <tr key={index}>
              <td className="portfolianalysiscorporatepage-company">
                <img src={item.logo} alt="Logo" />
                <span>{item.company}</span>
              </td>
              <td>{item.exDate}</td>
              <td>{item.recordDate}</td>
              <td>{item.splitRatio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
  );
};

export default PortfolioAnalysissplitPage;
