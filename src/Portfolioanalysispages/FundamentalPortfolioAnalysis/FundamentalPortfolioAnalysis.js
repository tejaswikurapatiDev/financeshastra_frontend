import React, { useState } from "react";
import './FundamentalPortfolioAnalysis.css';
import { PiCaretUpDownFill } from "react-icons/pi"; // Ensure correct import
import varun from "../../assest/varunlogo.png";
import tcs from '../../assest/tcs.png';
import itc from "../../assest/itc.png";
import hdfc from "../../assest/hdfcbank.png";
import adani from "../../assest/adaniimg.png";

const FundamentalPortfolioAnalysis = () => {
    const stockResearchtableData = [
        {
           logo: adani,
            name: "Adani Green",
            price: "₹ 1010.95",
            change: "+2.83%",
            marketCap: "₹1,55,678",
            pe: "100.49",
            roe: "12.9",
            roce: "9.09",
            divYield: "0%",
           
        },
        {
           logo: varun,
            name: "Varun Beverages",
            price: "₹585.75",
            change: "-0.14%",
            marketCap: "₹1,98,410",
            pe: "78.03",
            roe: "28.25",
            roce: "23.41",
            divYield: "0.18%",
          
        },
        {
            logo: itc,
            name: "ITC",
            price: "₹448.00",
            change: "-1.58%",
            marketCap: "₹5,69,908",
            pe: "27.74",
            roe: "27.29",
            roce: "35.95",
            divYield: "3.21%",
           
        },
        {
             logo: hdfc,
            name: "HDFC Bank",
            price: "₹1,741.95",
            change: "+1.22%",
            marketCap: "₹13,17,555",
            pe: "18.94",
            roe: "14.37",
            roce: "1.62",
            divYield: "1.35%",
           
        },
        {
            logo: tcs,
            name: "TCS",
            price: "₹4,084.15",
            change: "-0.56%",
            marketCap: "₹14,88,372",
            pe: "30.52",
            roe: "46.74",
            roce: "57.6",
            divYield: "1.88%",
           
        },
    ];

    const [filteredstock, setFilteredstock] = useState(stockResearchtableData);
    const [sorttDirection, setSorttDirection] = useState(true);

    const handleSortresearch = (key) => {
        const sortedstock = [...filteredstock].sort((a, b) => {
            let valA = a[key];
            let valB = b[key];

            if (typeof valA === "string") {
                valA = parseFloat(valA.replace(/[\u20B9,%]/g, ""));
            }

            if (typeof valB === "string") {
                valB = parseFloat(valB.replace(/[\u20B9,%]/g, ""));
            }

            return sorttDirection ? valA - valB : valB - valA;
        });

        setFilteredstock(sortedstock);
        setSorttDirection((prev) => !prev);
    };

    return (
        <div className="stockresearchanalysispagecontainer">
            <h2 className="stockresearchatable-title">Fundamentals</h2>
            <table className="stockresearchanalysispage-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>
                            Price{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("price")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            Change %{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("change")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            Market cap{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("marketCap")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            PE (TTM){" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("pe")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            ROE{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("roe")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            ROCE{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("roce")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                        <th>
                            Div Yield{" "}
                            <button className="screenerbtnlist" onClick={() => handleSortresearch("divYield")}>
                                <PiCaretUpDownFill />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredstock.map((stock, index) => (
                        <tr key={index}>
                            <td>
                            <img src={stock.logo} alt={stock.name} className="Portfoliodetails-logo" />
                                {stock.name}
                            </td>
                            <td>{stock.price}</td>
                            <td style={{ color: stock.change.includes('-') ? 'red' : '#24b676' }}>{stock.change}</td>
                            <td>{stock.marketCap}</td>
                            <td>{stock.pe}</td>
                            <td>{stock.roe}</td>
                            <td>{stock.roce}</td>
                            <td>{stock.divYield}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FundamentalPortfolioAnalysis;
