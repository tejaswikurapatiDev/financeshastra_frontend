import React from "react";
import "./Watchlistdashboardmain.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Import icons
import reliance from "../../assest/reliance.png";
import hdfc from "../../assest/hdfcbank.png";
import airtel from "../../assest/bhartiartl.png";
import infosys from "../../assest/infosyss.png";
import lic from "../../assest/lici.png";

const Watchlistdashboardmain = () => {
  const watchlistdashboardmainData = [
    { id: 1, name: "Reliance Industries Ltd", price: "₹1,272.15", change: "1.32%", changeType: "up", icon: reliance },
    { id: 2, name: "HDFC Bank Ltd.", price: "₹1,862.75", change: "-0.48%", changeType: "down", icon: hdfc },
    { id: 3, name: "Bharti Airtel Ltd.", price: "₹1,664.40", change: "1.03%", changeType: "up", icon: airtel },
    { id: 4, name: "Infosys Ltd", price: "₹1,990.50", change: "-0.46%", changeType: "down", icon: infosys },
    { id: 5, name: "Life Insura Corp of India", price: "₹926.05", change: "0.63%", changeType: "up", icon: lic },
  ];

  return (
    <div className="Watchlistdashboardmain-container">
      <div className="Watchlistdashboardmain-header">
        <h2 className="Watchlistdashboardmain-title">Watchlist</h2>
        <button className="Watchlistdashboardmain-add-button">Add New</button>
      </div>
      <ul className="Watchlistdashboardmain-items">
        {watchlistdashboardmainData.map((item) => (
          <li key={item.id} className="Watchlistdashboardmain-item">
            <img src={item.icon} alt={item.name} className="Watchlistdashboardmain-icon" />
            <div className="Watchlistdashboardmain-info">
              <p className="Watchlistdashboardmain-name">{item.name}</p>
            </div>
            <div className="Watchlistdashboardmain-price-change">
              <p className="Watchlistdashboardmain-price">{item.price}</p>
              <p
                className={`Watchlistdashboardmain-change ${
                  item.changeType === "up" ? "Watchlistdashboardmain-change-up" : "Watchlistdashboardmain-change-down"
                }`}
              >
               {item.changeType === "up" ? <FaArrowUp /> : <FaArrowDown />} {item.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlistdashboardmain;