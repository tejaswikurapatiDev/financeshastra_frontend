import React, { useRef } from 'react';
import './FollowedStock.css';

const FollowedStock = () => {
  const stocks = [
    { name: 'Nestle India Ltd', symbol: 'NESTLE INDIA', price: '2,267', change: '+0.68%', positive: true, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/800px-Nestl%C3%A9.svg.png' },
    { name: 'Bajaj Finserv Limited', symbol: 'BAJAJFINSV', price: '1,775.50', change: '+1.83%', positive: true, logo: 'https://pngimagesfree.com/wp-content/uploads/Bajaj-Finserv-Logo-PNG.png' },
    { name: 'Larsen & Toubro Limited', symbol: 'LT', price: '3,384.40', change: '+1.23%', positive: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/L%26T.png' },
    { name: 'Tata Consultancy', symbol: 'TCS', price: '4,103.50', change: '-0.27%', positive: false, logo: 'https://lezebre.lu/images/thumbnails/435/537/detailed/17/30038-tata-logo.png' },
    { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK', price: '1,767.15', change: '+0.68%', positive: true, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Kotak_Mahindra_Group_logo.svg/2560px-Kotak_Mahindra_Group_logo.svg.png' },
    { name: 'Wipro Limited', symbol: 'WIPRO', price: '559.80', change: '-0.44%', positive: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
    { name: 'Infosys Limited', symbol: 'INFY', price: '1,495.50', change: '+0.15%', positive: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
    { name: 'Reliance Industries', symbol: 'RELIANCE', price: '2,523.10', change: '-0.38%', positive: false, logo: 'https://seeklogo.com/images/R/Reliance_Industries_Ltd_-logo-EAD63F9A9B-seeklogo.com.png'},
    { name: 'HDFC Bank', symbol: 'HDFCBANK', price: '1,590.00', change: '+1.02%', positive: true, logo: 'https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1720244492' },
    { name: 'ITC Limited', symbol: 'ITC', price: '444.65', change: '+0.50%', positive: true, logo: 'https://companieslogo.com/img/orig/ITC.NS-3f25b36d.png?t=1720244492' },
    { name: 'State Bank of India', symbol: 'SBIN', price: '570.25', change: '-0.29%', positive: false, logo: 'https://tse3.mm.bing.net/th?id=OIP.lsutDFxGFS9fSY3digI_UwHaF5&pid=Api&P=0&h=180' },
    { name: 'Adani Green Energy', symbol: 'ADANIGREEN', price: '947.80', change: '+3.45%', positive: true, logo: 'https://tse2.mm.bing.net/th?id=OIP.50QTFM4ZMSz55a4s5fk3IgHaD4&pid=Api&P=0&h=180' },
    { name: 'Hindustan Unilever', symbol: 'HINDUNILVR', price: '2,613.00', change: '+0.72%', positive: true, logo: 'https://logowik.com/content/uploads/images/hindustan-unilever-limited1422.jpg' },
    { name: 'Bharti Airtel', symbol: 'BHARTIARTL', price: '849.00', change: '+0.99%', positive: true, logo: 'https://tse1.mm.bing.net/th?id=OIP._VeHaItBgxVT8TMSztbKXQHaD4&pid=Api&P=0&h=180' },
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
      <p>Monitor popular stocks for strategic investments.</p>
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