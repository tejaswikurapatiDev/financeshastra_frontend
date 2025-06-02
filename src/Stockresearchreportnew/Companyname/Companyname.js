import React from 'react';
import './Companyname.css'; // Import your external CSS
import { FaArrowDown } from "react-icons/fa6";

const StockCard = () => {
  return (
    <div className="companyresearchnew">
      <div className="stock-headercompanyres">
        <div className="stock-titlecompanyres">
          <h2>Tata Steel Ltd</h2>
          <p className="stock-sectorcompanyres">Sector: <span className="steelcompanyres">Steel</span></p>
        </div>
       
      </div>
<div className="stock-actioncompanyres">
  <div>
          <p className="stock-datecompanyre">26/05/2025</p></div>
          <div>
          <button className="buy-buttoncompanyrese">Buy</button></div>
        </div>
   
<div className='detail-itemcompanyress'>
     <div className="stock-detailscompanyres">
  <div className="detail-itemcompanyres">Price@Reco: ₹130.14</div>
  <div className="detail-itemcompanyres with-border">Target Price: ₹168</div>
  <div className="detail-itemcompanyres with-border">Target Period: 16 - 24 Months</div>
  <div className="detail-itemcompanyres with-border">Potential Returns: 29%</div>
</div>
<div>
       <button className="download-btncompanyres">
          <span className="download-iconcompanyres"><FaArrowDown /></span> Download PDF
        </button>
        </div>
      
         
        </div>
    </div>
  );
};

export default StockCard;
