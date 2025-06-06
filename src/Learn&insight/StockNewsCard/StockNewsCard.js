import React, { useState, useEffect } from 'react';
import './StockNewsCard.css';
import { useSearchParams } from 'react-router-dom';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import Navbar from '../../Navbar/Navbar';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';
import { API_BASE_URL } from "../../config";
import ClipLoader from 'react-spinners/ClipLoader';
import { MdDateRange } from 'react-icons/md';
import sanitizeHtml from "sanitize-html";
const override = {
  display: "block",
  textAlign: "center"
}

const StockNewsCard = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [article, setArticle] = useState(null);
  const [stockPrice, setStockPrice] = useState(1782.55);
  const [change, setChange] = useState({ value: 7.25, percentage: 0.41 });

  useEffect(() => {
    console.log("StocksnewCard Useeffect")
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("stocksnewcard RESPONSE: ", response)
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await response.json();
        console.log(data)
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (stockPrice + (Math.random() * 10 - 5)).toFixed(2);
      const priceChange = (newPrice - stockPrice).toFixed(2);
      const percentageChange = ((priceChange / stockPrice) * 100).toFixed(2);

      setStockPrice(parseFloat(newPrice));
      setChange({
        value: parseFloat(priceChange),
        percentage: parseFloat(percentageChange),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stockPrice]);

  const rawDate = article?.created_at;
  const currentDate = rawDate ? new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) : "Date is not available";

  if (!article) return <div className="stocknewsss"><div className="loader-cont">
    <ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      speedMultiplier={1}
      color="green"
    />
  </div></div>;

   const sanitizedContent = sanitizeHtml(article?.content || "", {
        allowedTags: ["h2", "p", "ol", "li", "strong", "table", "tr", "td", "th"],
        allowedAttributes: {
          "*": [], // Keep this to ensure no other attributes are allowed by default
          h2: ["style"],
          p: ["style"],
          ol: ["style"],
          li: ["style"],
          strong: ["style"],
          table: ["style"],
          tr: ["style"],
          td: ["style"],
          th: ["style"],
        },
      });

  return (
    <div>
      <div className="stocknewsss">
        <h2 className='stocknewsssheadone'>Stock News</h2>
        <h2 className="stocknewsss-headline">{article.title}</h2>
        <p className="stocknewsss-subtext"> <MdDateRange className="dateipocard" /> Published on {new Date(article.created_at).toLocaleDateString()}</p>
        <img src={article.image_url} alt="Stock News" className="stocknewsss-image" />

        <div className="stocknewsss-stock-section">
          <div>
            <h3 className="stocknewsss-company-name">{article.company_name || "Unknown Company"}</h3>
          </div>
          <div className="stocknewsss-trading-info">
            <div className='newsscolumn'>
              <p className='nsepara'>NSELIVE</p>
              <p className="stocknewsss-date">{currentDate}</p>
              <p><strong>Volume:</strong> {article.volume || "706,438"}</p>
            </div>

            <div>
              <div className='newsscolumnn'>
                <p className="stocknewsss-stock-price">
                  ₹ {article.current_price !== null ? article.current_price.toLocaleString() : "N/A"}
                  {change.value >= 0 ? <FaCaretUp className="iconnewss" /> : <FaCaretDown className="iconnewss down" />}
                </p>
                <p className={`stocknewsss-change ${change.value >= 0 ? 'positive' : 'negative'}`}>
                  {change.value >= 0 ? `+${change.value} (+${change.percentage}%)` : `${change.value} (${change.percentage}%)`}
                </p>
              </div>
              <label>
                <p><strong>Today L/H:</strong> <span>{article.todays_low || "1,762.10"}</span> / <span>{article.todays_high || "1,846.00"}</span></p>
              </label>
            </div>
          </div>
        </div>

        {/*<p className="stocknewsss-description">
          {article.content || `No detailed description available for this article.`}
        </p>*/}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

        <Navbar />
      </div>
      <FooterForAllPage />
    </div>
  );
};

export default StockNewsCard;
