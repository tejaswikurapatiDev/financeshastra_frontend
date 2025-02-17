
import './Portfolioanysisstockresearcgblur.css'
import React, { useState, useEffect } from 'react';
import lockimg from '../../assest/lock.png'
import { useNavigate } from "react-router-dom"; 
import { CiSearch } from 'react-icons/ci';
import { PiCaretUpDownFill } from 'react-icons/pi';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import tcs from '../../assest/tcs.png';
import reliance from "../../assest/reliance.png";
import hdfc from "../../assest/hdfcbank.png";
import bharti from "../../assest/bhartiartl.png";
import icici from "../../assest/icicibank.png";
import infosys from "../../assest/infy.png";
import sbi from "../../assest/sbin.png";
import life from "../../assest/lici.png";
import itc from "../../assest/itc.png";
import hindustan from "../../assest/hindunilvr.png";
import larsen from "../../assest/Lt.png";
import hcl from "../../assest/hcltech.png";
import bajaj from "../../assest/bajajhfl.png";
import sun from "../../assest/sunteck.png";
import mahindra from "../../assest/mahabank.png";
import kotak from "../../assest/kotakbank.png";
import axis from "../../assest/axisbank.png";
import maruti from "../../assest/maruti.png";
import ultratech from "../../assest/ultracemco.png";
import ntpc from "../../assest/ntpc.png";
import Sidebar from '../../Sidebar/Sidebar';




const AnalysisResearchReportblur = () => {
    const stockResearchData = [
        { date: "22-01-2025", symbol: "Reliance Industries Ltd", price: "₹1,272.15", change: "-0.09%", marketCap: "₹17.23T", target: "₹489.00", action: "Book Profits", rating: "Buy", profitBooked: "+18.73%", image: reliance, pdfLink: "View"  },
        { date: "09-01-2025", symbol: "Tata Consultancy Services Ltd", price: "₹4,442.80", change: "-0.69%", marketCap: "₹16.19T", target: "₹1,150.00", action: "Book Profits", rating: "Buy", profitBooked: "+10.98%", image: tcs , pdfLink: "View"  },
        { date: "09-01-2025", symbol: "HDFC Bank Ltd", price: "₹1,862.75", change: "-0.48%", marketCap: "₹14.31T", target: "₹380.00", action: "Target Achieved", rating: "Buy", profitBooked: "+21.22%", image: hdfc, pdfLink: "View"  },
        { date: "09-01-2025", symbol: "Bharti Airtel Ltd", price: "₹1,664.40", change: "-1.03%", marketCap: "₹9.57T", target: "₹7,750.00", action: "Book Profits", rating: "Buy", profitBooked: "+17.50%", image: bharti, pdfLink: "View"  },
        { date: "09-01-2025", symbol: "ICICI Bank Ltd", price: "₹1,345.35", change: "+0.03%", marketCap: "₹9.49T", target: "₹830.00", action: "Target Achieved", rating: "Sell", profitBooked: "+20.53%", image: icici, pdfLink: "View"  },
        { date: "01-01-2025", symbol: "Infosys Ltd", price: "₹1,990.50", change: "-0.46%", marketCap: "₹8.3T", target: "₹1,460.00", action: "Target Achieved", rating: "Buy", profitBooked: "+13.96%", image: infosys, pdfLink: "View"  },
        { date: "28-12-2024", symbol: "State Bank of India", price: "₹861.95", change: "+0.05%", marketCap: "₹7.69T", target: "₹2,158.00", action: "Target Achieved", rating: "Sell", profitBooked: "+15.92%", image: sbi , pdfLink: "View" },
        { date: "26-12-2024", symbol: "Life Insurance Corp of India", price: "₹926.05", change: "-0.63%", marketCap: "₹5.9T", target: "₹980.00", action: "Book Profits", rating: "Buy", profitBooked: "+15.05%", image: life, pdfLink: "View"  },
        { date: "26-12-2024", symbol: "ITC Ltd", price: "₹468.85", change: "-0.24%", marketCap: "₹5.88T", target: "₹3,500.00", action: "Book Profits", rating: "Buy", profitBooked: "+67.38%", image: itc, pdfLink: "View"  },
        { date: "26-12-2024", symbol: "Hindustan Unilever Ltd", price: "₹2,371.05", change: "-0.80%", marketCap: "₹5.61T", target: "₹1,580.00", action: "Book Profits", rating: "Buy", profitBooked: "+39.42%", image: hindustan, pdfLink: "View"  },
        { date: "20-12-2024", symbol: "Larsen & Toubro Ltd", price: "₹3,868.55", change: "-0.47%", marketCap: "₹5.35T", target: "₹1,460.00", action: "Book Profits", rating: "Sell", profitBooked: "+50.78%", image: larsen, pdfLink: "View"  },
        { date: "16-12-2024", symbol: "HCL Technologies Ltd", price: "₹1,962.75", change: "-0.31%", marketCap: "₹5.34T", target: "₹2,910.00", action: "Target Achieved", rating: "Sell", profitBooked: "+67.38%", image: hcl, pdfLink: "View"  },
        { date: "08-12-2024", symbol: "Bajaj Finance Ltd", price: "₹7,218.00", change: "+0.49%", marketCap: "₹4.45T", target: "₹4,670.00", action: "Target Achieved", rating: "Sell", profitBooked: "+72.69%", image: bajaj, pdfLink: "View"  },
        { date: "15-11-2024", symbol: "Sun Pharmaceutical Ind Ltd", price: "₹1,794.90", change: "-1.02%", marketCap: "₹4.35T", target: "₹2,350.00", action: "Book Profits", rating: "Buy", profitBooked: "+18.33%", image: sun, pdfLink: "View"  },
        { date: "15-11-2024", symbol: "Mahindra & Mahindra Ltd", price: "₹3,057.85", change: "-0.76%", marketCap: "₹3.83T", target: "₹620.00", action: "Target Achieved", rating: "Buy", profitBooked: "+12.80%", image: mahindra, pdfLink: "View"  },
        { date: "08-11-2024", symbol: "Kotak Mahindra Bank Ltd", price: "₹1,797.65", change: "-0.44%", marketCap: "₹3.59T", target: "₹1,470.00", action: "Book Profits", rating: "Buy", profitBooked: "+9.68%", image: kotak, pdfLink: "View"  },
        { date: "04-11-2024", symbol: "Axis Bank Ltd", price: "₹2,645.00", change: "+0.32%", marketCap: "₹3.48T", target: "₹1,890.00", action: "Target Achieved", rating: "Buy", profitBooked: "+14.52%", image: axis, pdfLink: "View"  },
        { date: "02-11-2024", symbol: "Maruti Suzuki India Ltd", price: "₹11,378.75", change: "+0.65%", marketCap: "₹3.47T", target: "₹9,450.00", action: "Book Profits", rating: "Buy", profitBooked: "+22.30%", image: maruti, pdfLink: "View"  },
        { date: "30-10-2024", symbol: "UltraTech Cement Ltd", price: "₹8,276.00", change: "-0.92%", marketCap: "₹3.45T", target: "₹6,890.00", action: "Target Achieved", rating: "Buy", profitBooked: "+19.75%", image: ultratech, pdfLink: "View"  },
        { date: "28-10-2024", symbol: "NTPC Ltd", price: "₹240.50", change: "+0.89%", marketCap: "₹3.42T", target: "₹185.00", action: "Book Profits", rating: "Buy", profitBooked: "+12.60%", image: ntpc, pdfLink: "View"  }
      ];
      const [filteredstock, setFilteredstock] = useState(stockResearchData);
      const [currentPage, setCurrentPage] = useState(1);
      const [sorttDirection, setSorttDirection] = useState(true);
      const [sortOption, setSortOption] = useState('Recent'); // Dropdown option state
    
      const itemsPerPage = 7; // Number of rows per page
    
      // Calculate the current page's data
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentStocksresearch = filteredstock.slice(indexOfFirstItem, indexOfLastItem);
    
      const totalPages = Math.ceil(filteredstock.length / itemsPerPage);
    
      // Handle page change
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      const navigate = useNavigate(); // Initialize navigation
      // Handle sorting
      const handleSortresearch = (key) => {
        const sortedstock = [...filteredstock].sort((a, b) => {
          let valA = a[key];
          let valB = b[key];
    
          // Handle string cleaning and conversion to numbers if needed
          if (typeof valA === 'string') {
            if (key === 'price' || key === 'marketCap') {
              valA = parseFloat(valA.replace(/[\u20B9, T]/g, '')); // Handle currency symbols
            } else if (key === 'date') {
              valA = new Date(valA); // Convert to Date object for proper sorting
            } else if (key !== 'symbol' && key !== 'action' && key !== 'rating') {
              valA = parseFloat(valA.replace(/[\u20B9,%]/g, '')); // Clean and convert to number
            }
          }
    
          if (typeof valB === 'string') {
            if (key === 'price' || key === 'marketCap') {
              valB = parseFloat(valB.replace(/[\u20B9, T]/g, ''));
            } else if (key === 'date') {
              valB = new Date(valB);
            } else if (key !== 'symbol' && key !== 'action' && key !== 'rating') {
              valB = parseFloat(valB.replace(/[\u20B9,%]/g, ''));
            }
          }
    
          // Handle alphabetical comparison for 'action' column
          if (key === 'action') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
          }
    
          // Handle alphabetical comparison for 'rating' column
          if (key === 'rating') {
            valA = valA.toString();
            valB = valB.toString();
    
            // Custom sorting for rating values
            const customOrder = { Buy: 1, Hold: 2, Sell: 3 };
            valA = customOrder[valA] || valA;
            valB = customOrder[valB] || valB;
          }
    
          if (key === 'symbol') {
            return sorttDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
    
          return sorttDirection ? valA - valB : valB - valA;
        });
    
        // Update the state with the sorted stock
        setFilteredstock(sortedstock);
    
        // Toggle sorting direction for the next click
        setSorttDirection((prev) => !prev);
      };
    
      // Update filtered stock based on dropdown selection
      useEffect(() => {
        if (sortOption === 'Recent') {
          const sortedData = [...stockResearchData];
          setFilteredstock(sortedData); // Update based on your criteria
        }
        if (sortOption === 'Newest - Oldest') {
          const sortedData = [...stockResearchData].sort((a, b) => new Date(b.date) - new Date(a.date));
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Oldest - Newest') {
          const sortedData = [...stockResearchData].sort((a, b) => new Date(a.date) - new Date(b.date));
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Buy') {
          const sortedData = [...stockResearchData].filter(stock => stock.rating === 'Buy');
          setFilteredstock(sortedData);
        }
        if (sortOption === 'Sell') {
          const sortedData = [...stockResearchData].filter(stock => stock.rating === 'Sell');
          setFilteredstock(sortedData);
        }
      }, [sortOption]);
    
  return (
    <div>
       <h1 className='reportcontaineranalysisheaderr'>Stock research report</h1>
    <div className="report-container">
      
      {/* Blurred Content */}
      <div className="blurred-content">
      <div className="stockresearchanalysispagecontainerblur">
              <div className="stockresearchanalysispage-container">
                <h2 className="stockresearchanalysispage-title">Stock Research Reports</h2>
                <p className="stockresearchanalysispage-subtitle">
                  Discover the latest stock research analysis with buy, hold, and sell ratings, along with expert trading recommendations from analysts at Trade Brains Portal for smarter investment decisions.
                </p>
                <input type="text" className="stockresearchanalysispage-search" placeholder="Search by stock name" />
                <CiSearch className="stockresarch-search-icon" />
              </div>
              <div className="stockresearchanalysispage-dropdown">
              <div className="stockresearchanalysispageselect-wrapper">
                  <HiOutlineAdjustmentsVertical className="HiOutlineicon" />
                  <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="Recent">Recent</option>
                    <option value="Newest - Oldest">Newest - Oldest</option>
                    <option value="Oldest - Newest">Oldest - Newest</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                  </select>
                </div>
              </div>
              <table className="stockresearchanalysispage-tableanalysisblur">
                <thead>
                  <tr>
                    <th>
                      Date
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('date')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>Symbol</th>
                    <th>
                      Price
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('price')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                      Change%
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('change')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                      Market Cap
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('marketCap')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                      Target
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('target')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                    Upside/Downside
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('action')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                      Rating
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('rating')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>
                      Profit Booked
                      <button className="screenerbtnlist" onClick={() => handleSortresearch('profitBooked')}>
                        <PiCaretUpDownFill />
                      </button>
                    </th>
                    <th>PDF/Link</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStocksresearch.map((stock, index) => (
                    <tr key={index}>
                      <td>{stock.date}</td>
                      <td  className='symiconalll'>
                        <img src={stock.image} alt={stock.symbol} className="bank-logo" /> {stock.symbol}
                      </td>
                      <td>{stock.price}</td>
                      <td style={{ color: stock.change.includes('-') ? 'red' : '#24b676' }}>{stock.change}</td>
                      <td>{stock.marketCap}</td>
                      <td>{stock.target}</td>
                      <td>{stock.action}</td>
                      <td style={{ color: stock.rating === 'Buy' ? '#24b676' : 'red' }}>{stock.rating}</td>
                      <td style={{ color: stock.profitBooked.includes('-') ? 'red' : '#24b676' }}>{stock.profitBooked}</td>
                      <td>
                  <a href={stock.pdfLink} target="_blank" rel="noopener noreferrer" className="pdfstockresearch-link">
                    View
                  </a>
                </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        
              {/* Pagination Section */}
              <div className="pagination-containeranalyst">
                <div className="pagination-info">
                  {`Showing ${indexOfFirstItem + 1} to ${
                    indexOfLastItem > filteredstock.length ? filteredstock.length : indexOfLastItem
                  } of ${filteredstock.length} records`}
                </div>
                <div className="pagination-slider">
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
                      className={`pagination-button ${currentPage === i + 1 ? 'active-page' : ''}`}
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
              </div>
         
      </div>

      {/* Lock Icon & Subscribe Button */}
      <div className="overlaylocksub">
        <img src={lockimg} alt="Lock" className="lock-iconanalysi" />
        
        <button className="subscribe-btnblurone" onClick={() => navigate("/pricehalf")}>Subscribe Now</button>
      </div>
    </div>
    </div>
  );
};

export default AnalysisResearchReportblur;
