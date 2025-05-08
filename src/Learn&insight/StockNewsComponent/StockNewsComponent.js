import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StockNewsComponent.css";
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import Meta from "../../Meta";
import { useLocation } from "react-router-dom";

const StockNewsComponent = () => {
  const location = useLocation();
  const [newsArticles, setNewsArticles] = useState([]);

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
      <div className="stockNewsContainer">
        <h2 className="stockNewsTitle">Stock News</h2>
        <div className="stockNewsList">
          {newsArticles.map((article) => (
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
          ))}
        </div>
        <Navbar />
      </div>
      <FooterForAllPage />
    </div>
  );
};

export default StockNewsComponent;
