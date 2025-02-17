import React from "react";

const QuarterlyCashflow = () => {
  const data = [
    {
      label: "Cash from Operating Activity",
      Mar2017: "77,406",
      Mar2018: "-96,508",
      Mar2019: "29,556",
      Mar2020: "23,929",
      Mar2021: "89,918",
      Mar2022: "57,694",
      Mar2023: "-86,013",
      Mar2024: "21,632",
    },
    {
      label: "Cash from Investing Activity",
      Mar2017: "-2,832",
      Mar2018: "11,066",
      Mar2019: "-857",
      Mar2020: "-3,324",
      Mar2021: "-3,736",
      Mar2022: "-3,618",
      Mar2023: "-4,041",
      Mar2024: "-4,251",
    },
    {
      label: "Cash from Financing Activity",
      Mar2017: "-4,196",
      Mar2018: "5,547",
      Mar2019: "448",
      Mar2020: "5,430",
      Mar2021: "7,142",
      Mar2022: "-3,844",
      Mar2023: "6,386",
      Mar2024: "-9,896",
    },
    {
      label: "Others",
      Mar2017: "78",
      Mar2018: "2,564",
      Mar2019: "857",
      Mar2020: "2,768",
      Mar2021: "66",
      Mar2022: "966",
      Mar2023: "3,075",
      Mar2024: "775",
    },
    {
      label: "Net Cash Flow",
      Mar2017: "70,456",
      Mar2018: "-77,331",
      Mar2019: "30,004",
      Mar2020: "28,802",
      Mar2021: "93,390",
      Mar2022: "51,198",
      Mar2023: "-80,593",
      Mar2024: "8,260",
    },
  ];

  return (
    <div>
      <h2 className="earningheaderrpeer" >
        Cash Flow
      </h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores /{" "}
        <a style={{ color: "#24b676" }}>View Standalone</a>
      </p>
      <div className="earnings-report">
        <table className="earnings-tableeincome">
          <thead>
            <tr>
              <th></th>
              <th>Mar 2017</th>
              <th>Mar 2018</th>
              <th>Mar 2019</th>
              <th>Mar 2020</th>
              <th>Mar 2021</th>
              <th>Mar 2022</th>
              <th>Mar 2023</th>
              <th>Mar 2024</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.label}</td>
                <td>{row.Mar2017}</td>
                <td>{row.Mar2018}</td>
                <td>{row.Mar2019}</td>
                <td>{row.Mar2020}</td>
                <td>{row.Mar2021}</td>
                <td>{row.Mar2022}</td>
                <td>{row.Mar2023}</td>
                <td>{row.Mar2024}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterlyCashflow;