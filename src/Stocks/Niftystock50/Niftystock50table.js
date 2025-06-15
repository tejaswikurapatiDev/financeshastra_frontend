import React, { useState, useEffect } from "react";
//import { Nifty50tabledata } from "../Niftystock50tabledata";
import { PiCaretUpDownFill } from "react-icons/pi"; // Import the icon
import { IoLockClosedOutline } from "react-icons/io5";
import './nifty50stock.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Navbar/Navbar";
import Nifty50topheader from "../Nifty50topheader/Nifty50topheader";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import useSubscriptionStatus from "../../Navbar/Hooks/useSubscriptionStatus";
import "./Niftystock50table.css"
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  textAlign: "center",
};


const Nifty50screenerStockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredstocks, setfilteredStocks]= useState([])
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
  const navigate = useNavigate();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All"); // Track the active tab
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
  const [isSubed, setisSubed] = useState(false);
  const [isloading, setisloading] = useState(true);
  const fixEncoding = (text) => {
    return text.replace("Ã‚Â", "");
  }

  const converttostng=(num)=>{
    return Number(num).toLocaleString('en-IN')
  }

  useEffect(() => {
    const fetchfun = async () => {
      const url = `${API_BASE_URL}/stocks/nifty50`;

      const response = await fetch(url);
      if (response.ok === true) {
        const data = await response.json();
        const formattedData = data.map((each) => ({
          id: each.id,
          symbol: each.CompanyName,
          ltp: converttostng(each.LastTradedPrice),
          change: (each.ChangePercentage * 100).toFixed(2),
          volume: converttostng(each.Volume),
          marketCap: fixEncoding(each.MarketCap),
          pe: each.CurrentPE,
          high52: converttostng(each.High52W),
          low52: converttostng(each.Low52W),
          pbRatio: each.PBRatio,
          dividend: (each.DividendYield * 100).toFixed(2),
          roe: each.ROE,
          roce: each.ROCE,
          eps: each.EPS,
          analystRating: each.Analyst_Rating,
          icon: each.icons,
        }));

        setStocks(formattedData);
        setfilteredStocks(formattedData)
      }
      if (isSubscribed && isLoading) {
        setisSubed(true);
      }
      setisloading(false);
    };
    fetchfun();
  }, []);

  const itemsPerPage = 10; // Show 7 rows per page

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = stocks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(stocks.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
  setActiveTab(tab);
  let updatedStocks = [...filteredstocks]; // Always start from the original data

  if (tab === "All") {
    setStocks(updatedStocks); // Show all stocks
    return;
  }

  if (tab === "Gainers") {
    updatedStocks = updatedStocks.filter(stock => parseFloat(stock.change) > 0);
  } else if (tab === "Losers") {
    updatedStocks = updatedStocks.filter(stock => parseFloat(stock.change) < 0);
  } else {
    if (tab === "LTP") {
      updatedStocks.sort((a, b) => {
        const ltpA = parseFloat(a.ltp.replace(/[₹,]/g, ""));
        const ltpB = parseFloat(b.ltp.replace(/[₹,]/g, ""));
        return ltpB - ltpA;
      });
    } else if (tab === "Change %") {
      updatedStocks.sort((a, b) => {
        const changeA = parseFloat(a.change);
        const changeB = parseFloat(b.change);
        return changeB - changeA;
      });
    } else if (tab === "Market Cap") {
      updatedStocks.sort((a, b) => {
        const marketCapA = parseFloat(a.marketCap.replace(/[₹, T]/g, ""));
        const marketCapB = parseFloat(b.marketCap.replace(/[₹, T]/g, ""));
        return marketCapB - marketCapA;
      });
    } else if (tab === "52W High") {
      updatedStocks.sort((a, b) => {
        const highA = parseFloat(a.high52.replace(/[₹,]/g, ""));
        const highB = parseFloat(b.high52.replace(/[₹,]/g, ""));
        return highB - highA;
      });
    } else if (tab === "52W Low") {
      updatedStocks.sort((a, b) => {
        const lowA = parseFloat(a.low52.replace(/[₹,]/g, ""));
        const lowB = parseFloat(b.low52.replace(/[₹,]/g, ""));
        return lowB - lowA;
      });
    } else if (tab === "P/E") {
      updatedStocks.sort((a, b) => {
        return parseFloat(b.pe) - parseFloat(a.pe);
      });
    }
  }

  setStocks(updatedStocks);
};

  const handleNavigate = () => {
    navigate('/subscription'); // Navigate to the desired route
  };
  // Handle sorting logic for columns
  const handleSort = (key) => {
    const sortedStocks = [...stocks].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Clean strings that are numeric and convert to number for comparison
      if (typeof valA === "string") {
        if (key === "price" || key === "marketCap") {
          valA = parseFloat(valA.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valA = parseFloat(valA.replace(/[₹,%]/g, ""));
        }
      }

      if (typeof valB === "string") {
        if (key === "price" || key === "marketCap") {
          valB = parseFloat(valB.replace(/[₹, T]/g, "")); // Remove ₹, T and convert to number
        } else if (key !== "sector") {
          valB = parseFloat(valB.replace(/[₹,%]/g, ""));
        }
      }

      // For sector column, compare alphabetically
      if (key === "sector") {
        return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      // For other columns, compare numerically
      return sortDirection ? valA - valB : valB - valA;
    });

    setStocks(sortedStocks);
    setSortDirection(!sortDirection); // Toggle sort direction
  };
  // Change page

  return (
    <div>
      <Nifty50topheader />
      <div className="screener-container">
        <h2 className="screener-headerniftytab50">Nifty 50 Companies Listing</h2>

        {/* Tabs Section */}
        <div className="tabsnifty50-container" >
          {["All", "Gainers", "Losers", "LTP", "Change %", "Market Cap", "52W High", "52W Low", "P/E"].map((tab) => (
            <button
              key={tab}
              className={`tabnifty50-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>

          ))}
        </div>

        {/* Table Section */}
        {isloading ? (
          <div className="loader-cont">
            <ClipLoader
              cssOverride={override}
              size={35}
              data-testid="loader"
              loading={isloading}
              speedMultiplier={1}
              color="green"
            />
          </div>) : (
         <div className="screener-table-wrapper">
  <table className="screener-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>
          LTP
          <button className="screenerbtnlist" onClick={() => handleSort("ltp")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          Change %
          <button className="screenerbtnlist" onClick={() => handleSort("change")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          Volume
          <button className="screenerbtnlist" onClick={() => handleSort("volume")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          Market Cap (Cr.)
          <button className="screenerbtnlist" onClick={() => handleSort("marketCap")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          P / E
          <button className="screenerbtnlist" onClick={() => handleSort("pe")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          52W High
          <button className="screenerbtnlist" onClick={() => handleSort("high52")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          52W Low
          <button className="screenerbtnlist" onClick={() => handleSort("low52")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          PB Ratio
          <button className="screenerbtnlist" onClick={() => handleSort("pbRatio")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          Dividend
          <button className="screenerbtnlist" onClick={() => handleSort("dividend")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          ROE
          <button className="screenerbtnlist" onClick={() => handleSort("roe")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          ROCE
          <button className="screenerbtnlist" onClick={() => handleSort("roce")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          EPS
          <button className="screenerbtnlist" onClick={() => handleSort("eps")}>
            <PiCaretUpDownFill />
          </button>
        </th>
        <th>
          Analyst Rating
          <button className="screenerbtnlist" onClick={() => handleSort("analystrating")}>
            <PiCaretUpDownFill />
          </button>
        </th>
      </tr>
    </thead>

              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index} className="screener-row">
                    <td className={`symbol-cell ${activeTab === "Symbol" ? "active-column" : ""}`}>
                      <img src={stock.icon} alt={`${stock.symbol} logo`} className="company-icon" />
                      {stock.symbol}
                    </td>
                    <td className={`${activeTab === "LTP" ? "active-column" : ""}`}>₹{stock.ltp}</td>
                    <td
                      className={`${activeTab === "Change %" ? "active-column" : ""}`}
                      style={{
                        color: parseFloat(stock.change) > 0 ? "#24b676" : parseFloat(stock.change) < 0 ? "red" : "inherit",
                      }}
                    >
                      {parseFloat(stock.change) > 0
                        ? `+${stock.change}`
                        : stock.change}%
                    </td>
                    <td>{stock.volume}</td>
                    <td className={`${activeTab === "Market Cap" ? "active-column" : ""}`}>₹{stock.marketCap}</td>
                    <td className={`${activeTab === "P/E" ? "active-column" : ""}`}>{stock.pe}</td>
                    <td className={`${activeTab === "52W High" ? "active-column" : ""}`}>₹{stock.high52}</td>
                    <td className={`${activeTab === "52W Low" ? "active-column" : ""}`}>₹{stock.low52}</td>
                    <td>{stock.pbRatio}</td>
                    <td>{stock.dividend}%</td>
                    <td style={{ color: "#24b676" }}>{parseFloat(stock.roe) > 0
                      ? `+${stock.roe}`
                      : stock.roe}%</td>
                    <td style={{ color: "#24b676" }}>{parseFloat(stock.roce) > 0
                      ? `+${stock.roce}`
                      : stock.roce}%</td>
                    <td>{stock.eps}</td>
                    <td style={{ textAlign: "left" }}>
                      {!isLoading && !isSubscribed ? (
                        <button
                          className="screener-unlock-btn"
                          onClick={handleNavigate}
                        >
                          <IoLockClosedOutline style={{ marginRight: "8px" }} />

                          <span className="button-text">Unlock</span>
                        </button>
                      ) : (
                        stock.analystRating
                      )}
                    </td>



                  </tr>
                ))}
              </tbody>


            </table>
          </div>)}
        {/* Pagination Section */}
        <div className="pagination-stockcontainer">
          <div className="pagination-infostock">
            {`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem > stocks.length ? stocks.length : indexOfLastItem
              } of ${stocks.length} records`}
          </div>
          <div className="pagination-sliderr">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-button ${currentPage === i + 1 ? "active-page" : ""
                  }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>


        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>

    </div>
  );
};

export default Nifty50screenerStockList;
