import React, { useState } from "react";
import "./StockTracker.css";
import imgadani from '../../assest/adanient.png';
import img2 from '../../assest/hdfcbank.png';
import img3 from '../../assest/varun.png';
import img4 from '../../assest/tcs.png';
import img5 from '../../assest/itc.png';
import BestPerformers from "../BestPerformers/BestPerformers";
import SegmentAnalysis from "../SegmentAnalysis/SegmentAnalysis";
const stocksData = {
    "1D": [
      { "name": "Adani Green","img": imgadani,"price": "₹1003.5", "change": "+2.07%", "positive": true },
      { "name": "HDFC Bank", "img": img2,"price": "₹1728", "change": "+0.41%", "positive": true },
      { "name": "Varun Beverages","img": img3, "price": "₹588.15", "change": "+0.27%", "positive": true },
      { "name": "TCS", "img": img4,"price": "₹4098.25", "change": "-0.21%", "positive": false },
      { "name": "ITC", "img": img5,"price": "₹452.6", "change": "-0.56%", "positive": false }
    ],
    "5D": [
      { "name": "Adani Green", "img": imgadani,"price": "₹1010", "change": "+3.5%", "positive": true },
      { "name": "HDFC Bank",  "img": img2,"price": "₹1715", "change": "-0.75%", "positive": false },
      { "name": "Varun Beverages","img": img3,  "price": "₹590", "change": "+0.5%", "positive": true },
      { "name": "TCS","img": img4, "price": "₹4050", "change": "-1.2%", "positive": false },
      { "name": "ITC",  "img": img5,"price": "₹455", "change": "+0.3%", "positive": true }
    ],
    "1M": [
      { "name": "Adani Green",  "img": imgadani,"price": "₹1050", "change": "+5.0%", "positive": true },
      { "name": "HDFC Bank",  "img": img2,"price": "₹1750", "change": "+1.2%", "positive": true },
      { "name": "Varun Beverages", "img": img3, "price": "₹600", "change": "+1.7%", "positive": true },
      { "name": "TCS",  "img": img4,"price": "₹4100", "change": "+0.4%", "positive": true },
      { "name": "ITC", "img": img5, "price": "₹460", "change": "+1.7%", "positive": true }
    ],
    "3M": [
      { "name": "Adani Green", "img": imgadani, "price": "₹1050", "change": "-5.0%", "positive": false },
      { "name": "HDFC Bank",  "img": img2, "price": "₹1750", "change": "+1.2%", "positive": true },
      { "name": "Varun Beverages",  "img": img3, "price": "₹600", "change": "+1.7%", "positive": true },
      { "name": "TCS",  "img": img4,"price": "₹4100", "change": "+0.4%", "positive": true },
      { "name": "ITC", "img": img5,"price": "₹460", "change": "+1.7%", "positive": true }
    ],
    "6M": [
      { "name": "Adani Green","img": imgadani, "price": "₹1050", "change": "+5.0%", "positive": true },
      { "name": "HDFC Bank", "img": img2, "price": "₹1750", "change": "+1.2%", "positive": true },
      { "name": "Varun Beverages", "img": img3, "price": "₹600", "change": "-1.7%", "positive": false },
      { "name": "TCS", "img": img4,"price": "₹4100", "change": "+0.4%", "positive": true },
      { "name": "ITC", "img": img5,"price": "₹460", "change": "-1.7%", "positive": false }
    ],
    "1Y": [
      { "name": "Adani Green", "img": imgadani,"price": "₹1050", "change": "+5.0%", "positive": true },
      { "name": "HDFC Bank",  "img": img2,"price": "₹1750", "change": "-1.2%", "positive": false },
      { "name": "Varun Beverages", "img": img3, "price": "₹600", "change": "+1.7%", "positive": true },
      { "name": "TCS",  "img": img4,"price": "₹4100", "change": "+0.4%", "positive": true },
      { "name": "ITC", "img": img5, "price": "₹460", "change": "+1.7%", "positive": true }
    ]
  };
  

const timeFilters = ["1D", "5D", "1M", "3M", "6M", "1Y"];

const StockCard = ({ stock }) => (
    <div className={`stock-cardtrackerport ${stock.positive ? "trackerpositive" : "trackernegative"}`}>
      <span className="stock-changetrackerport">{stock.change}</span>
  
      <div className="imagenametracker" style={{ marginLeft: (stock.name === "TCS" || stock.name === "ITC") ? "20px" : "0px" }}>
        <img src={stock.img} alt={stock.name} className="stock-imagetrackerport" />
        <span className="stock-nametrackerport">{stock.name}</span>
      </div>
  
      <span className="stock-pricetrackerport">{stock.price}</span>
    </div>
  );
  
 
const StockTracker = () => {
  const [selectedFilter, setSelectedFilter] = useState("1D");

  return (
    <div className="alltrackerportfolioanalysis">
    <div className="trackerportfolioanalysis">
          <div className="time-filter-containertrackerport">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            className={`time-filtertrackerport ${filter === selectedFilter ? "active" : ""}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    
      <div className="stock-containertrackerport">
        
        {(stocksData[selectedFilter] || stocksData["1D"]).map((stock, index) => (
          <StockCard key={index} stock={stock} />
        ))}
      </div>
 
    </div>
    <BestPerformers/>
    <SegmentAnalysis/>
    </div>
  );
};

export default StockTracker;
