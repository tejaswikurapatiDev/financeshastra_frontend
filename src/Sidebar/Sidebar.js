import React from 'react';
import { useLocation } from 'react-router-dom'; // React Router se location hook
import './Sidebar.css';
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { LiaSearchengin } from "react-icons/lia";
import { BsBookmark } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";

const Sidebar = () => {
    const location = useLocation(); // Current URL ka path fetch karega

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <a 
                    href="/home" 
                    className={`sidebar-item ${location.pathname === "/home" ? "active" : ""}`} 
                >
                    <RiDashboardLine className="sideicon"/> Dashboard
                </a>

                <a 
                    href="/portfolio-analysis-tool" 
                  
                    className={`sidebar-item ${["/portfolio-analysis-tool", "/portfolioanalysisdividendcall","/portfoliobonuscall","/portfoliosplitcall","/portfolioanalysisrightscall"
                        ,"/portfolioAGMcall","/portfolio-trade-records"
                    ].includes(location.pathname) ? "active" : ""}`}
                >
                    <GrAnalytics className="sideicon"/> Portfolio Analysis
                </a>

                <a 
    href="/stock-watchlist" 
    className={`sidebar-item ${["/stock-watchlist", "/mutual-fund-watchlist","/gold-watchlist","/stockwatchlistsector","/stockwatchlistmcap"
        ,"/mutualwatchlistsector","/mutualwatchlisttype"
    ].includes(location.pathname) ? "active" : ""}`} 
>
    <BsBookmark className="sideicon"/> Watchlist
</a>


                <a 
                    href="/stock-research-reports" 
                    className={`sidebar-item ${location.pathname === "/stock-research-reports" ? "active" : ""}`} 
                >
                    <LiaSearchengin className="sideicon"/> Research
                </a>

                <a 
                    href="/security" 
                    className={`sidebar-item ${location.pathname === "/security" ? "active" : ""}`} 
                >
                    <AiOutlineSecurityScan className="sideicon" /> Security
                </a>

                <a 
                    href="/user-settings-dashboard" 
                    className={`sidebar-item ${location.pathname === "/user-settings-dashboard" ? "active" : ""}`} 
                >
                    <IoSettingsOutline className="sideicon" /> Setting
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
