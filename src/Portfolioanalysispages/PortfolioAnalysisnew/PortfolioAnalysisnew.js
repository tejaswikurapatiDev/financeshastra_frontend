import React, { useState, useEffect } from "react";
import "./PortfolioAnalysisnew.css";
import rodimg from "../../assest/rod.png";
import medimg from "../../assest/medicine.png";
import tataimg from "../../assest/tataa.png";
import towerimg from "../../assest/tower.png";
import labimg from "../../assest/lab.png";
import PortfolioanalysisfAQS from "../Portfolioanalysisfaq/Portfolioanalysisfaq";
import { useNavigate } from "react-router-dom";
import Meta from "../../Meta";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { Link } from "react-router-dom";

const newsData = [
  {
    title: "Steel stock jumps 5% after receiving ₹24 Cr order under Jal Jeevan Mission for iron pipes",
    time: "Feb 5, 2025 | 2 hours ago",
    image: rodimg,
  },
  {
    title: "Pharma stock hits 20% upper circuit after reporting 458% QoQ increase in net profits",
    time: "Feb 5, 2025 | 3 hours ago",
    image: medimg,
  },
  {
    title: "Tata Group stock jumps 4% despite reporting muted Q3 results",
    time: "Feb 5, 2025 | 3 hours ago",
    image: tataimg,
  },
  {
    title: "Navratna stock hits 20% upper circuit after Govt likely to auction telecom Co’s assets",
    time: "Feb 5, 2025 | 4 hours ago",
    image: towerimg,
  },
  {
    title: "Chemical stock to buy now for an upside of up to 50%; Do you own it?",
    time: "Feb 5, 2025 | 5 hours ago",
    image: labimg,
  },
  {
    title: "Tata Group stock jumps 4% despite reporting muted Q3 results",
    time: "Feb 5, 2025 | 3 hours ago",
    image: tataimg,
  },
  {
    title: "Navratna stock hits 20% upper circuit after Govt likely to auction telecom Co’s assets",
    time: "Feb 5, 2025 | 4 hours ago",
    image: towerimg,
  },
  {
    title: "Chemical stock to buy now for an upside of up to 50%; Do you own it?",
    time: "Feb 5, 2025 | 5 hours ago",
    image: labimg,
  },
];

const NewsCard = ({ title, created_at, image_url, id }) => {
  const dateObj = new Date(created_at.replace(" ", "T"));
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <Link
      to={`/stock-market-news/details?id=${id}`}
      key={id}
      className="stockNewsItemLink"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="news-cardportfoloiaa">
        <img src={image_url} alt="News" className="news-imageportfoloiaa" />
        <div className="news-contentportfoloiaa">
          <h3>{title}</h3>
          <p>{dateObj.toLocaleDateString("en-US", options)}</p>
        </div>
      </div></Link>
  )
};

const PortfolioAnalysisnew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleNews, setVisibleNews] = useState(5);
  const showMore = () => setVisibleNews(newsData.length);
  const [newsArticles, setNewsArticles] = useState([])
  const getNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch News");
      }

      const result = await response.json();
      console.log("Result: ", result)
      setNewsArticles(result);
    } catch (error) {
      console.error("Error fetching News:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Meta path={location.pathname} />
      <h1 className="news-headerportfoilioanalytick">News</h1>

      {newsArticles.slice(0, visibleNews).map((news, index) => (
        <NewsCard key={index} {...news} />
      ))}

      {/*{newsArticles.map((article) => (
                  <Link
                    to={`/stock-market-news/details?id=${article.id}`}
                    key={article.id}
                    className="stockNewsItemLink"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className={`stockNewsItem ${article.id === 15 ? "highlightedNews" : ""
                        }`}
                    >
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="newsThumbnail"
                      />
                      <div className="newsContent">
                        <h3 className="newsTitle">{article.title}</h3>
                        <p className="newsDescription">
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}*/}

      {visibleNews < newsArticles.length && (
        <div className="know-moreportfoilioanalytick" onClick={() => navigate("/stock-market-news")}>

          Know more
        </div>
      )}

      <div className="containerportanalytioccc">
        <h1 className="portanalytiocccsubheading">What is Portfolio Analysis?</h1>
        <p className="portanalytiocccparagraph">
          The Portfolio Analysis tool enables investors to track their portfolio's performance over time.
          It provides a comprehensive view of the stocks owned by the investor, displaying details such as the
          name of each stock, the number of shares held, the proportion each stock represents in the portfolio,
          and the associated profit or loss percentage. In addition, the tool offers various metrics and
          insights to assist investors in making well-informed decisions about their investment strategy.
        </p>

        <h2 className="portanalytiocccsubheading">Benefits of Portfolio Analysis:</h2>
        <ul className="portanalytioccclist">
          <li className="portanalytioccclist-item"><strong >Risk Evaluation:</strong>  Portfolio analysis allows you to assess your investment risks, helping you make decisions that match your risk tolerance.</li>
          <li className="portanalytioccclist-item"><strong>Evaluating Performance:</strong> The tool gives you the ability to analyze how your investments have been performing over time.</li>
          <li className="portanalytioccclist-item"><strong>Informed Decision-Making:</strong> With portfolio analysis, you gain crucial data and insights that support smarter investment choices.</li>
          <li className="portanalytioccclist-item"><strong>Aligning with Financial Goals:</strong>Regular portfolio reviews ensure your investments stay in line with your financial objectives. This allows you to make adjustments, such as rebalancing or altering asset allocations, to stay on course toward long-term success.</li>
        </ul>

        <h2 className="portanalytiocccsubheading">Features of Portfolio Analysis Tool:</h2>
        <ul className="portanalytioccclist">
          <li className="portanalytioccclist-item"><strong>Holdings:</strong>The holdings section provides an in-depth look at your stock holdings, displaying real-time market prices, the quantity owned, the average price of each stock, the percentage each stock contributes to the overall portfolio, the total value of your holdings, and profit/loss percentages for a detailed analysis.</li>
          <li className="portanalytioccclist-item"><strong>Top Performers:</strong> The tool highlights the best and worst performing stocks within your portfolio, helping you assess the strengths and weaknesses of your investments.</li>
          <li className="portanalytioccclist-item"><strong>Sector and Industry Analysis:</strong> By using the sector and industry analysis features, you can understand the diversification of your portfolio and examine the performance of different sectors and industries.</li>
          <li className="portanalytioccclist-item"><strong>Fundamentals:</strong>Portfolio analysis lets you evaluate the financial health of your stocks through various metrics like PE ratio, ROE, ROCE, and current ratio.</li>
          <li className="portanalytioccclist-item"><strong>Performance Tracker:</strong>  The performance tracker monitors the quarterly performance of your investments, focusing on important metrics such as net sales, profit, and profit margin.</li>
          <li className="portanalytioccclist-item"><strong>Research Reports:</strong> The research reports offer insights into brokerage recommendations, helping you decide whether to buy, sell, or hold the stocks within your portfolio.</li>
        </ul>
      </div>
      <PortfolioanalysisfAQS />
    </div>
  );
};

export default PortfolioAnalysisnew;
