import React, { useState, useEffect, useRef, useCallback } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";
import { LuShare2 } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import ReactDatePicker from 'react-datepicker';
import { useLocation } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import "./EarningsInsightLearn.css";
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";
import Meta from "../../../Meta";
import { API_BASE_URL } from "../../../config";
import { Link, useNavigate } from "react-router-dom";

const EarningsInsightLearn = () => {
    const location = useLocation();
    const [earningsData, setEarningData] = useState([]);
    const [selectedEarningsTab, setSelectedEarningsTab] = useState("Today");
    const [sortOrder, setSortOrder] = useState({});
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortedData, setSortedData] = useState([]);
    const [selectedMcapOption, setSelectedMcapOption] = useState("Market Cap");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    

    const fetchQuarterlyEarnings = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/quaterlyEarnings/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data)

            const transformedData = data.map(item => ({
                company_id: item.company_id,
                company: item.company_name,
                Type: item.result_type.includes("Q") ? "Declared Results" : "Upcoming Results",
                ltp: `₹${item.ltp_rs}`,
                mcap: item.market_cap,
                revenue: `₹${item.revenue_cr}`,
                change: `${item.change_percent}%`,
                tentativeTime: dayjs(item.tentative_date).format('YYYY-MM-DD'),
                grossProfit: `${item.gross_profit_Cr}%`,
                netProfit: `${item.net_profit_Cr}%`,
                tag: item.tag, // Add this line
                seeFinancial: {
                    url: "#",
                    icon: <LuShare2 />
                }
            }));

            setEarningData(transformedData);
            setSortedData(transformedData);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchQuarterlyEarnings();
    }, [fetchQuarterlyEarnings]);

    const handleEarningsTabChange = useCallback((tab) => {
        setSelectedEarningsTab(tab);
    }, []);

    const handleFilterChange = useCallback((selectedFilter) => {
        setSelectedFilter(selectedFilter);

        if (selectedFilter === "Upcoming Results") {
            setSortedData(earningsData.filter(row => row.Type === "Upcoming Results"));
        } else if (selectedFilter === "Declared Results") {
            setSortedData(earningsData.filter(row => row.Type === "Declared Results"));
        } else {
            setSortedData([...earningsData]);
        }
    }, [earningsData]);

    const handleMcapOptionChange = useCallback((option) => {
        setSelectedMcapOption(option);
        const newSortOrder = sortOrder[option] === "asc" ? "desc" : "asc";

        const sorted = [...sortedData].sort((a, b) => {
            if (option === "Market Cap") {
                const valueA = parseFloat(a.mcap.replace('₹', '').replace(',', '').replace(' Cr', ''));
                const valueB = parseFloat(b.mcap.replace('₹', '').replace(',', '').replace(' Cr', ''));
                return newSortOrder === "desc" ? valueA - valueB : valueB - valueA;
            } else if (option === "Name") {
                return newSortOrder === "asc"
                    ? a.company.localeCompare(b.company)
                    : b.company.localeCompare(a.company);
            } else if (option === "Change%") {
                const valueA = parseFloat(a.change.replace('%', ''));
                const valueB = parseFloat(b.change.replace('%', ''));
                return newSortOrder === "desc" ? valueA - valueB : valueB - valueA;
            } else if (option === "Last Price") {
                const valueA = parseFloat(a.ltp.replace('₹', '').replace(',', ''));
                const valueB = parseFloat(b.ltp.replace('₹', '').replace(',', ''));
                return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            return 0;
        });

        setSortedData(sorted);
        setSortOrder(prev => ({ ...prev, [option]: newSortOrder }));
    }, [sortOrder, sortedData]);

    const handleSort = useCallback((column) => {
        const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";
        const sorted = [...sortedData].sort((a, b) => {
            if (column === "ltp" || column === "revenue" || column === "mcap") {
                const valueA = parseFloat(a[column].replace('₹', '').replace(',', ''));
                const valueB = parseFloat(b[column].replace('₹', '').replace(',', ''));
                return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            return newSortOrder === "asc"
                ? a[column] < b[column] ? -1 : 1
                : a[column] > b[column] ? -1 : 1;
        });

        setSortOrder(prev => ({ ...prev, [column]: newSortOrder }));
        setSortedData(sorted);
    }, [sortOrder, sortedData]);

    const renderSortIcon = useCallback(() => <PiCaretUpDownFill />, []);

    const handleDateChange = useCallback((dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const filteredData = earningsData.filter((row) => {
                const rowDate = new Date(row.tentativeTime).toISOString().split('T')[0];
                return rowDate >= start.toISOString().split('T')[0] &&
                    rowDate <= end.toISOString().split('T')[0];
            });
            setSortedData(filteredData);
        }
    }, [earningsData]);

    const CustomDropdown = React.memo(({ label, options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef(null);

        const handleOptionClick = useCallback((option) => {
            onChange(option);
            setIsOpen(false);
        }, [onChange]);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="customDropdown" ref={dropdownRef}>
                <label className="dropdownLabel">{label}</label>
                <div className="dropdownSelect" onClick={() => setIsOpen(!isOpen)}>
                    {value}
                    <span className="dropdownArrow">&#9662;</span>
                </div>
                {isOpen && (
                    <div className="dropdownOptions">
                        {options.map((option) => (
                            <div
                                key={option}
                                className="dropdownOption"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    });

    const earningsTabs = ["Yesterday", "Today", "Tomorrow", "This Week", "Next Week"];
    const filterOptions = ["All", "Upcoming Results", "Declared Results", "Sector Analysis"];
    const mcapOptions = ["Market Cap", "Name", "Change%", "Last Price"];

    return (
        <div>
            <div className="earnings-insight-learn-wrapper">
                <Meta path={location.pathname} />

                <header className="earnings-insight-learn-header">
                    <h1>Quarterly Earning Results</h1>
                    <p>
                        Looking for the best growth funds to accelerate your wealth creation? At Value Research, we've made the process easier for you. Our in-depth guide to top-performing growth funds
                        <br />
                        across different categories helps you find options that align with your long-term financial goals and maximize your potential for growth.
                    </p>
                </header>

                <div className="earnings-insight-learn-controls">
                    <div className="earnings-insight-learn-header-row">
                        <div className="earningquterlyrowall">
                            <div className="earnings-insight-learn-tabs">
                                {earningsTabs.map(tab => (
                                    <button
                                        key={tab}
                                        className={`earnings-insight-learn-tab-button ${selectedEarningsTab === tab ? "active" : ""}`}
                                        onClick={() => handleEarningsTabChange(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="earnings-insight-learn-date-picker">
                                <div className="dateinsight">
                                    <label htmlFor="dateRange" className="date-picker-label">Select Date : </label>
                                    <div className="calendar-icon" onClick={() => setCalendarOpen(!calendarOpen)}>
                                        <FaRegCalendarAlt />
                                    </div>
                                </div>
                                {calendarOpen && (
                                    <div className="calendar-container">
                                        <ReactDatePicker
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            inline
                                            dateFormat="yyyy-MM-dd"
                                            className="custom-date-picker"
                                            calendarClassName="customdattcalendar"
                                            onClickOutside={() => setCalendarOpen(false)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="allheaedrearnun">
                            <div className="earnings-insight-learn-dropdown">
                                <CustomDropdown
                                    value={selectedMcapOption}
                                    onChange={handleMcapOptionChange}
                                    options={mcapOptions}
                                />
                            </div>
                            <div className="earnings-insight-learn-dropdown">
                                <CustomDropdown
                                    value={selectedFilter}
                                    onChange={handleFilterChange}
                                    options={filterOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <table className="earnings-insight-learn-table">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Company</th>
                            <th onClick={() => handleSort("Type")} style={{ cursor: "pointer" }}>
                                Result Type {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("ltp")} style={{ cursor: "pointer" }}>
                                LTP ₹ {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("mcap")} style={{ cursor: "pointer" }}>
                                M.CAP (Cr.) {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("revenue")} style={{ cursor: "pointer" }}>
                                Revenue (Cr.) {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("change")} style={{ cursor: "pointer" }}>
                                Change % {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("tentativeTime")} style={{ cursor: "pointer" }}>
                                Tentative Time {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("grossProfit")} style={{ cursor: "pointer" }}>
                                Gross Profit (Cr.) {renderSortIcon()}
                            </th>
                            <th onClick={() => handleSort("netProfit")} style={{ cursor: "pointer" }}>
                                Net Profit (Cr.) {renderSortIcon()}
                            </th>
                            <th>See Financials</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, index) => (
                            <tr key={`${row.company_id}-${index}`}>
                                <td>{row.company_id}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/quarterly-overview",
                                            search: `?company_id=${row.company_id}&company_name=${encodeURIComponent(row.company)}/${row.tag}`
                                        }}
                                    >
                                        {row.company}
                                    </Link>
                                </td>
                                <td>{row.Type}</td>
                                <td>{row.ltp}</td>
                                <td>{row.mcap}</td>
                                <td>{row.revenue}</td>
                                <td>{row.change}</td>
                                <td>{row.tentativeTime}</td>
                                <td>{row.grossProfit}</td>
                                <td>{row.netProfit}</td>
                                <td>
                                    <a href={row.seeFinancial.url}>{row.seeFinancial.icon}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Navbar />
            </div>

            <div className="foooterpagesaupdate">
                <FooterForAllPage />
            </div>
        </div>
    );
};

export default EarningsInsightLearn;