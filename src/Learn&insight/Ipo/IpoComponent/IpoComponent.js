import React, { useEffect, useState } from "react";
import "./IpoComponent.css";
import { useNavigate } from "react-router-dom";
import ipo1 from '../../../assest/ipo1.jpeg';
import ipo2 from '../../../assest/ipo2.jpeg';
import ipo3 from '../../../assest/ipo3.jpeg';
import ipo4 from '../../../assest/ipo4.jpeg';
import ipo5 from '../../../assest/ipo5.jpeg';
import ipo6 from '../../../assest/ipo6.jpeg';
import ipo7 from '../../../assest/ipo7.jpeg';
import ipo8 from '../../../assest/ipo8.jpeg';
import ipo9 from '../../../assest/ipo9.jpeg';
import Navbar from "../../../Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import Meta from "../../../Meta";
import { useLocation } from "react-router-dom";

const loaderStyle = {
  display: "block",
  textAlign: "center",
};

const IpoComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);

  const images = [ipo1, ipo2, ipo3, ipo4, ipo5, ipo6, ipo7, ipo8, ipo9];

  useEffect(() => {
    const fetchIpoList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/ipodetails/companies`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        const mappedArticles = data.data.map((item, index) => ({
          id: item.company_id,
          title: `${item.name} IPO analysis`,
          date: new Date(item.published_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          author: "Chandresh Tripathi",
          image: images[index % images.length],
        }));
        setNewsArticles(mappedArticles);
      } catch (error) {
        console.error("Failed to fetch IPO list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpoList();
  }, []);

  const handleArticleClick = (id) => {
    navigate(`/markets/ipo-details/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loader-cont">
        <ClipLoader
          cssOverride={loaderStyle}
          size={35}
          data-testid="loader"
          loading={isLoading}
          speedMultiplier={1}
          color="green"
        />
      </div>
    );
  }

  return (
    <div>
      <Meta path={location.pathname} />
      <div className="stockNewsContainer">
        <h2 className="stockNewsTitle">IPO Details</h2>
        <div className="stockNewsList">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="stockNewsItem"
              onClick={() => handleArticleClick(article.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={article.image} alt={article.title} className="newsThumbnail" />
              <div className="newsContent">
                <h3 className="newsTitle">{article.title}</h3>
                <div className="datetimeipo">
                  <p className="ipopara">
                    <MdDateRange className="dateipo" />
                    Published Date: {article.date}
                    <GoDotFill className="dotipo" />
                  </p>
                  <p className="ipopara">
                    <CgProfile className="profileipo" />
                    Author: {article.author}
                    <GoDotFill className="dotipo" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Navbar />
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default IpoComponent;
