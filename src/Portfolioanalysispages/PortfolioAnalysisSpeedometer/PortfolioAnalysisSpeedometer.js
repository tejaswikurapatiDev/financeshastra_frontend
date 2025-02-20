import React, { useState ,useEffect} from "react";
import "./PortfolioAnalysisSpeedometer.css";
import { RxCross1 } from "react-icons/rx";
const PortfolioAnalysisSpeedometer = () => {
  const [rating, setRating] = useState("Buy"); // Default label
  const [needleAngle, setNeedleAngle] = useState(45); // Default needle position
  const [showTable, setShowTable] = useState(false); // Toggle for Table View

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  // Define positions & labels for each section
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const ratings =

 [
    { label: "Strong Sell", angle: 170, x: -13, y: 80 },
    { label: "Sell", angle: 125, x: 28, y: 30 },
    { label: "Neutral", angle: 90, x: 93, y: 1 },
    { label: "Buy", angle: 45, x: 170, y: 24 },
    { label: "Strong Buy", angle: 10, x: 212, y: 80 },
  ];

  // Handle Click - Move Needle & Update Text


  return (
    <div className="speedometer-container">
      <div className="speedoparaheadall">
        <div>
          <h2 className="speedometer-title">Analyst Rating</h2>
          <p className="speedometer-subtitle">An aggregate view of professional's rating.</p>
        </div>
        <div className="allspeedometerr">
          <p className="table-view-button" onClick={() => setShowTable(true)}>Table View</p>
        </div>
      </div>

      <div className="speedometer-gauge">
        <svg viewBox="0 -10 200 120" width="100%" height="100%">
          <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="110%" y2="0%">
  <stop offset="10%" style={{ stopColor: "#F82307" }} />  {/* Deep Red - Strong Sell */}
  <stop offset="14%" style={{ stopColor: "#f48f8f" }} />  {/* Lighter Red - Sell */}
  <stop offset="50%" style={{ stopColor: "rgb(138, 136, 136)" }} />  {/* Gray - Neutral */}
  <stop offset="70%" style={{ stopColor: "#A0E6A0" }} />  {/* Light Green - Buy */}
  <stop offset="100%" style={{ stopColor: "#069459" }} /> {/* Deep Green - Strong Buy */}
</linearGradient>


          </defs>

          {/* Arc Path */}
          <path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="url(#gradient)" strokeWidth="8" />

          {/* Movable Needle */}
          <line
            x1="100" y1="100"
            x2={100 + 40 * Math.cos((needleAngle * Math.PI) / 180)}
            y2={100 - 40 * Math.sin((needleAngle * Math.PI) / 180)}
            stroke="black" strokeWidth="3"
          />
          <circle cx="100" cy="100" r="5" fill="black" />

          {/* Labels (Clickable) */}
          {ratings.map((r, index) => (
  <text
    key={index}
    x={r.x}
    y={r.y}
    fontSize={isMobile ? "9" : "10"} // Reduce text size for mobile
    textAnchor="middle"  // Center the text properly
    fill={r.label === rating ? "#000" : "#666"}
    style={{ cursor: "pointer", fontWeight: r.label === rating ? "bold" : "normal" }}
  >
    {r.label}
  </text>
))}


        </svg>

        {/* Dynamic Text Showing Current Rating */}
        <p className="speedometer-label">{rating}</p>
      </div>

      {/* Table Modal Popup */}
      {showTable && (
        <div className="table-modalspeedometerr">
          <div className="table-contentspeedometerr">
            <div className="tablespeedometerallheader">
            <div>
            <h3>Dividends Payers List</h3> </div><div>
              <RxCross1 className="speedometertteclose-button" onClick={() => setShowTable(false)} /></div>
              </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Div Yield (TTM)</th>
                  <th>DPS (TTM)</th>
                  <th>Est Div (TTM)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Adani Green</td><td>0</td><td>0</td><td>0</td></tr>
                <tr><td>Varun Beverages</td><td>0.18</td><td>2.25</td><td>281.25</td></tr>
                <tr><td>ITC</td><td>3.21</td><td>13.75</td><td>2,750</td></tr>
                <tr><td>HDFC Bank</td><td>1.35</td><td>19.5</td><td>585</td></tr>
                <tr><td>TCS</td><td>1.88</td><td>73</td><td>1,460</td></tr>
              </tbody>
            </table>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalysisSpeedometer;
