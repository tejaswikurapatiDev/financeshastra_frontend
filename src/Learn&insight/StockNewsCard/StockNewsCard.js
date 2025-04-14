import React, { useState, useEffect } from 'react';
import './StockNewsCard.css';
import newsImage from '../../assest/img1.JPG'; // Adjust the path based on your folder structure
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import Navbar from '../../Navbar/Navbar';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';



const StockNewsCard = () => {
    const [stockPrice, setStockPrice] = useState(1782.55);
    const [change, setChange] = useState({ value: 7.25, percentage: 0.41 });
  const newsData = {
    headline: "Gland Pharma shares in focus on USFDA approval for Phytonadione injectable emulsion",
    subtext: "Gland Pharma share price | The company expects to launch this product through its marketing partners in the near future.",
    imageUrl: newsImage, // Use the imported image here
    companyName: "Gland Pharma",
    stockPrice: "₹ 1,782.55",
    change: "+7.25 (0.41%)",
    volume: "706,438",
    low:   "1,762.10" ,
    high: "1,846.00",
    description: "Gland Pharma share price will remain in focus after receiving approval from the USFDA for Phytonadione Injectable Emulsion USP, 10 mg/mL single-dose ampules.",
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (stockPrice + (Math.random() * 10 - 5)).toFixed(2); // Random increase or decrease
      const priceChange = (newPrice - stockPrice).toFixed(2);
      const percentageChange = ((priceChange / stockPrice) * 100).toFixed(2);

      setStockPrice(parseFloat(newPrice));
      setChange({
        value: parseFloat(priceChange),
        percentage: parseFloat(percentageChange),
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, [stockPrice]);

  const currentDate = new Date().toLocaleString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });
  
  
  return (
    <div>
    <div className="stocknewsss">
        <h2 className='stocknewsssheadone'>Stock News</h2>
     
      <h2 className="stocknewsss-headline">{newsData.headline}</h2>
      <p className="stocknewsss-subtext">{newsData.subtext}</p>
      <img src={newsData.imageUrl} alt="Stock News" className="stocknewsss-image" />
      <div className="stocknewsss-stock-section">
        <div>
          <h3 className="stocknewsss-company-name">{newsData.companyName}</h3>
         
        </div>
        <div className="stocknewsss-trading-info">
        <div className='newsscolumn'>
        <p className='nsepara'>NSELIVE</p>
        <p className="stocknewsss-date">{currentDate}</p> {/* Current Date */}
          <p><strong>Volume: </strong>{newsData.volume}</p>
        
          </div>
          <div>
          <div className='newsscolumnn'>
          <p className="stocknewsss-stock-price">
  ₹ {stockPrice.toLocaleString()} 
  {change.value >= 0 ? (
    <FaCaretUp className="iconnewss" />
  ) : (
    <FaCaretDown className="iconnewss down" />
  )}
</p>
          <p className={`stocknewsss-change ${change.value >= 0 ? 'positive' : 'negative'}`}>
            {change.value >= 0 ? `+${change.value} (+${change.percentage}%)` : `${change.value} (${change.percentage}%)`}
          </p>
          </div><label>
  <p><strong>Today L/H:</strong> <span>{newsData.low}</span> / <span>{newsData.high}</span></p>
</label>
          </div>
        </div>
      </div>
      <p className="stocknewsss-description">
      Gland Pharma’s share price will remain in focus on December 12 after the company received approval 
      from the United States Food and Drug Administration (USFDA)<br/> for Phytonadione Injectable Emulsion USP, 10 mg/mL 
      single-dose ampoules.<br/><br/> The product is bioequivalent and therapeutically equivalent to the reference listed drug (RLD),
       Vitamin K1 Injectable Emulsion USP, 10 mg/mL, of Hospira, Inc.<br/><br/> This product is indicated for coagulation disorders caused by 
       vitamin K deficiency or interference with vitamin K activity. <br/><br/>The company expects to launch this product through 
       its marketing partners in the near future.
      </p>
      <Navbar/>
    </div>
    <FooterForAllPage/>
    </div>
  );
};

export default StockNewsCard;