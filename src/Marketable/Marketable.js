
import React, {useEffect, useState} from 'react';
import Marketdata from '../Marketdata';
import { API_BASE_URL } from '../config';
import './Marketable.css';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  textAlign: "center",
};

const Marketable = () => {
  const [etfsData, setetfsData]= useState([])
  const [isLoading, setisLoading] = useState(true)
  useEffect(()=>{
    const fetchEtfsData= async ()=>{
      const response= await fetch(`${API_BASE_URL}/mutualFunds/equityetfs`)
      if (response.ok=== true){
        const data = await response.json()
        console.log(data.data)
        setetfsData(data.data)
      }else{
        console.log(response.error)
      }
      setisLoading(false)
    }
    fetchEtfsData()
  }, [])
  return (
    <div>{isLoading ? <div className='loader-cont'><ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      loading={isLoading}
      speedMultiplier={1}
      color="green"
    /></div> :
    <div className="etcontainerrr">
      <h1 className="etf-title">Equity Exchange Traded Funds</h1>
      <p className="etf-description">
      Equity Exchange Traded Funds (ETFs) are a type of investment fund that tracks a specific index, commodity, bonds, or a basket of assets. They are similar to mutual funds in that they
pool money from investors to invest in a diversified portfolio of securities. However, unlike mutual funds, ETFs trade on stock exchanges, allowing investors to buy and sell shares
throughout the trading day, just like individual stocks.<br/><br/>

Equity ETFs are passive investment instruments that are based on indices and invest in securities in same proportion as the underlying index. Because of its index mirroring property,
there is a complete transparency on the holdings of an ETF. Further due to its unique structure and creation mechanism, the ETFs have much lower expense ratios as compared to
mutual funds.
<h2 className='etfh2'>LIST OF EQUITY ETFS</h2>
      </p>
      <table className="etf-tablee">
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
          {etfsData.map((etf, index) => (
            <tr key={index}>
              <td>{etf.issuer}</td>
              <td className='marketname'>{etf.name}</td>
              <td className='symbolmarket'>{etf.symbol}</td>
              <td>{etf.underlying}</td>
              <td>{etf.launchDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
   }
    </div>
  );
};

export default Marketable;