import React from "react";
import "./StockNewsComponent.css";
import { useNavigate } from "react-router-dom";
import img1 from '../../../src/assest/img1.JPG';
import img2 from '../../../src/assest/img2.JPG';
import img3 from '../../../src/assest/img3.JPG';
import img4 from '../../../src/assest/img4.JPG';
import img5 from '../../../src/assest/img5.JPG';
import img6 from '../../../src/assest/img6.JPG';
import img7 from '../../../src/assest/img7.JPG';
import img9 from '../../../src/assest/img8.JPG';
import img8 from '../../../src/assest/img9.JPG';
import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const StockNewsComponent = () => {
  const navigate = useNavigate();

  const newsArticles = [
    {
      id: 1,
      title: "Gland Pharma shares in focus on USFDA approval for Phytonadione injectable emulsion",
      description: "Gland Pharma Share Price | The company expects to launch this product through its marketing partners in the near future.",
      image: img1,
      highlight: true,
    },
    {
      id: 9,
      title: "Adani Group: How The World’s 3rd Richest Man Is Pulling The Largest Con In Corporate History",
      description: "Indian conglomerate Adani Group has engaged in a brazen stock manipulation and accounting fraud scheme.",
      image: img8,
    },
   
    {
      id: 3,
      title: "First Tick: Here are the top global cues for today’s trade",
      description: "The GIFT Nifty is indicating a flat start for the day.",
      image: img3,
    },
    {
      id: 4,
      title: "Stock Market LIVE Updates: GIFT Nifty suggests a flat opening; US, Asian markets gain",
      description: "Sensex Today | Stock Market LIVE Updates:",
      image: img4,
    },
    {
      id: 5,
      title: "Trade Spotlight: How should you trade HDFC AMC, Tata Communications, Lemon Tree Hotels, KRBL, PCBL, IRCTC, and others on Thursday?",
      description: "The consolidation is likely to continue until the benchmark indices decisively break the tight range of the past four days.",
      image: img5,
    },
    {
      id: 6,
      title: "Stock Radar: Nuvama Wealth, Acme Solar, Reliance Power, Varroc Engineering, Strides Pharma, Waaree Energies, Shriram Finance in focus on Thursday",
      description: "Stocks like Gland Pharma, Greaves Cotton, and others will be in focus on December 12.",
      image: img6,
    },
    {
      id: 7,
      title: "Bulk deals: UTI, Aditya Birla, Nippon buys stakes in Awfis Space Solutions",
      description: "Promoter group company PEAK XV Partners Investments V sold shares in Awfis Space Solutions at Rs 709.9.",
      image: img7,
    },
    {
      id: 8,
      title: "Technical View: Nifty closes above 24,600 in rangebound session; crucial support lies at 24,500",
      description: "On the sectoral front, buying was seen in the auto, FMCG, IT sectors.",
      image: img9,
    },
    {
      id: 2,
      title: "Acme Solar Holdings shares in focus post 250 MW project win from NHPC",
      description: "Acme Solar Holdings Share Price | With this project, company's total capacity now stands at 8,750 MW.",
      image: img2,
    },
  
  ];

  const handleArticleClick = (id) => {
    if (id === 1) {
      navigate("/stockNewsCard/1");
    }
  };

  const handleArticlesClick = (id) => {
    if (id === 9) {
      navigate("/stocknewsAdanigroup/9");
    }
  };

  return (
    <div>
    <div className="stockNewsContainer">
      <h2 className="stockNewsTitle">Stock News</h2>
      <div className="stockNewsList">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className={`stockNewsItem ${article.highlight ? "highlightedNews" : ""}`}
            onClick={() => {
              if (article.id === 1) {
                handleArticleClick(article.id);
              } else if (article.id === 9) {
                handleArticlesClick(article.id);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={article.image} alt={article.title} className="newsThumbnail" />
            <div className="newsContent">
              <h3 className="newsTitle">{article.title}</h3>
              <p className="newsDescription">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
    <FooterForAllPage/>
    </div>
  );
};

export default StockNewsComponent;