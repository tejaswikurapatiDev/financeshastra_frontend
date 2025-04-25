
import React, {useEffect, useState} from 'react';
import goldmarketData from '../Goldmarketdata';
import './Goldmarket.css';
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage';
import { API_BASE_URL } from '../config';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center",
};

const Goldmarket = () => {
  const [goldetfData, setgoldEtfsdata]= useState([])
  const [isLoading, setIsLoading]= useState(true)
  useEffect(()=>{
    const fetchgoldEtfsData= async ()=>{
      const response= await fetch(`${API_BASE_URL}/mutualFunds/goldetfs`)
      const data= await response.json()
      console.log(data.data)
      setgoldEtfsdata(data.data)
      setIsLoading(false)
    }
    fetchgoldEtfsData()
  }, [])
  return (
    <>{isLoading ? <div className='loader-cont'><ClipLoader
          cssOverride={override}
          size={35}
          data-testid="loader"
          loading={isLoading}
          speedMultiplier={1}
          color="green"
        /></div> :
    <div className="etcontainerrr">
      <h1 className="goldetf-title">Gold Exchange Traded Funds</h1>
      <p className="etfgold-description">
      Gold Exchange Traded Funds (Gold ETFs) are a type of investment fund that tracks the price of gold. 1 
       They are a popular way to invest in gold without the need to physically buy and store gold.
        ETFs trade on the cash market of the National Stock Exchange, like any other company stock, and can be 
        bought and sold continuously at market prices.<br/><br/>

        Gold ETFs are traded on stock exchanges, making them highly liquid. Gold ETFs are passive investment instruments that are based on gold prices and invest in gold bullion. Because of its direct gold pricing, there is a complete transparency on the holdings of an ETF. Further due to its unique structure and creation mechanism,
         the ETFs have much lower expenses as compared to physical gold investments
<h2 className='etfh2'>LIST OF GOLD ETFS</h2>
      </p>
      <table className="etf-tableegold">
        <thead>
          <tr>
            <th>Issuer</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Underlying</th>
            <th>Launch Date</th>
          </tr>
        </thead>
        <tbody>
          {goldetfData.map((etf, index) => (
            <tr key={index}>
              <td>{etf.issuer}</td>
              <td className='goldmarketname'>{etf.name}</td>
              <td className='goldsymbolmarket'>{etf.symbol}</td>
              <td>{etf.underlying}</td>
              <td>{etf.launchDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
}
    </>
  );
};

export default Goldmarket;