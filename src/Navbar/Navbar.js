import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSearch, FaChevronDown,FaUser } from "react-icons/fa"; // Import icons
import { FaCircleQuestion } from "react-icons/fa6";
import "./Navbar.css"; // Import custom styles
import logo from "../assest/Logo design (1).png"; // Ensure this path matches your project structure

const Navbar = () => {
    // State for dropdown menu visibility
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo">
                <img src={logo} alt="FinanceShastra Logo" className="logo-image" />
            </div>

            {/* Navigation Links */}
            <ul className="navbar-links">
                <li><a href="#markets">Markets</a></li>
                <li><a href="#insights">Stocks</a></li>
                <li className="menu-item">
                    <a href="#tools" className="menu-link">
                        Tools <FaChevronDown className="chevron-icon" />
                    </a>
                </li>
                <li><a href="#portfolio">Portfolio</a></li>
            </ul>

            {/* Search Bar */}
            <div className="navbar-search">
                <input type="text" placeholder="Search" />
                <FaSearch className="search-icon" />
            </div>

            {/* Icons Section */}
            <div className="navbar-icons">
                <FaBell className="icon bell-icon" />
                <div className="profile-section">
                    <div className="user-dropdown" onClick={toggleDropdown}>
                        <FaUserCircle className="icon user-icon" />
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <li>
                                    
                                </li>
                                <li>
                                    <FaUser className="dropdown-icon" /> {/* My Profile Icon */}
                                    <a href="#profile">My Profile</a>
                                </li>
                                <li>
                                    <FaCircleQuestion className="dropdown-icon" /> {/* Help Center Icon */}
                                    <a href="#help">Help Center</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <span>William</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
