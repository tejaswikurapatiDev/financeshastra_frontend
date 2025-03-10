// Sidebar.js
import React from 'react';
import './Sidebardarkmode.css';
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { LiaSearchengin } from "react-icons/lia";
import { BsBookmark } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";
const Sidebardarkmode = () => {
    return (
        <div className="sidebardarkmode">
            <div className="sidebar-menu">
                <a href="home" className="sidebar-itemdarkmode active">
                <RiDashboardLine className="sideicon"/>Dashboard</a>
                <a href="porfolioanalysisallpagecall" className="sidebar-itemdarkmode">
                <GrAnalytics className="sideicon"/>Portfolio Analysis</a>
                <a href="stockwatchlist" className="sidebar-itemdarkmode">
                <BsBookmark className="sideicon"/>Watchlist</a>
                <a href="#research" className="sidebar-itemdarkmode">
                <LiaSearchengin className="sideicon"/>Research</a>
                <a href="#security" className="sidebar-itemdarkmode">
                <  AiOutlineSecurityScan className="sideicon" />Security</a>
                <a href="settingDashPanel" className="sidebar-itemdarkmode">
                <IoSettingsOutline className="sideicon" />Setting</a>
            </div>
        </div>
    );
};

export default Sidebardarkmode;