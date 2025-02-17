import React, { useRef } from 'react';
import './FollowedStock.css';
import image1 from '../assest/nes.png';
import image2 from '../assest/bajajhfl.png';
import image3 from '../assest//Lt.png';
import image4 from '../assest/tcs.png';
import image5 from '../assest/kotakbank.png';
import image6 from '../assest/wipro.png';
import image7 from '../assest/infy.png';
import image8 from '../assest/reliance.png';
import image9 from '../assest/hdfcbank.png';
import image10 from '../assest/itc.png';
import image11 from '../assest/sbin.png';
import image12 from '../assest/adanient.png';
import image13 from '../assest/hindunilvr.png';
import image14 from '../assest/bhartiartl.png';
const FollowedStock = () => {
  const stocks = [
    { name: 'Nestle India Ltd', symbol: 'NESTLE INDIA', price: '2,267', change: '+0.68%', positive: true, logo:image1 },
    { name: 'Bajaj Finserv Limited', symbol: 'BAJAJFINSV', price: '1,775.50', change: '+1.83%', positive: true, logo: image2 },
    { name: 'Larsen & Toubro Limited', symbol: 'LT', price: '3,384.40', change: '+1.23%', positive: true, logo: image3 },
    { name: 'Tata Consultancy', symbol: 'TCS', price: '4,103.50', change: '-0.27%', positive: false, logo: image4 },
    { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK', price: '1,767.15', change: '+0.68%', positive: true, logo: image5},
    { name: 'Wipro Limited', symbol: 'WIPRO', price: '559.80', change: '-0.44%', positive: false, logo: image6 },
    { name: 'Infosys Limited', symbol: 'INFY', price: '1,495.50', change: '+0.15%', positive: true, logo: image7 },
    { name: 'Reliance Industries', symbol: 'RELIANCE', price: '2,523.10', change: '-0.38%', positive: false, logo: image8},
    { name: 'HDFC Bank', symbol: 'HDFCBANK', price: '1,590.00', change: '+1.02%', positive: true, logo: image9 },
    { name: 'ITC Limited', symbol: 'ITC', price: '444.65', change: '+0.50%', positive: true, logo: image10 },
    { name: 'State Bank of India', symbol: 'SBIN', price: '570.25', change: '-0.29%', positive: false, logo: image11 },
    { name: 'Adani Green Energy', symbol: 'ADANIGREEN', price: '947.80', change: '+3.45%', positive: true, logo: image12 },
    { name: 'Hindustan Unilever', symbol: 'HINDUNILVR', price: '2,613.00', change: '+0.72%', positive: true, logo: image13 },
    { name: 'Bharti Airtel', symbol: 'BHARTIARTL', price: '849.00', change: '+0.99%', positive: true, logo: image14 },
];


  const stockListRef = useRef(null);

  const scrollRight = () => {
    if (stockListRef.current) {
      stockListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (stockListRef.current) {
      stockListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="followed-stock-container">
      <h2 className='followedhead'>Followed Stock</h2>
      <p className='followedp'>Monitor popular stocks for strategic investments.</p>
      <div className="stock-list-container">
        <button onClick={scrollLeft} className="scroll-left-btn">←</button>
        <div className="stock-list" ref={stockListRef}>
          {stocks.map((stock, index) => (
            <div className="stock-card" key={index}>
              <div className="stock-info">
              <img src={stock.logo} alt={`${stock.name} logo`} className="stock-logo" />

                <div className="stock-name">{stock.name}</div>
                <div className="stock-symbol">{stock.symbol}</div>
                <div className="stock-price">{stock.price}</div>
                <div className={`stock-change ${stock.positive ? 'stock-positive' : 'stock-negative'}`}>

                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="scroll-right-btn">→</button>
      </div>
    </div>
  );
};

export default FollowedStock;