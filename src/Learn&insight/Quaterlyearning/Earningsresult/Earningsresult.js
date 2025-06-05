import React, { useState, useEffect } from "react";
import "./Earningsresult.css";
import imgg from "../../../assest/adaniiiimg.png";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import Quaterlycomment from "../Quaterlycomment/Quaterlycomment";
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";
import { useLocation } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { load } from 'cheerio';

const Earningsresult = () => {
  const location = useLocation();
  const { articleData } = location.state || {};
  const { quaterlyarticles } = articleData;
  const [articledata, setarticledata] = useState(quaterlyarticles[0] || {});
  const [finalHtml, setFinalHtml] = useState("");

  useEffect(() => {
    const rawHtml = articledata?.MainContent || "";

    // Step 1: Sanitize the HTML
    const sanitized = sanitizeHtml(rawHtml, {
      allowedTags: [
        "h2", "p", "ol", "li", "strong", "table", "tr", "td", "th"
      ],
      allowedAttributes: {
        "*": [],
        h2: ["style"],
        h3: ["style"],
        p: ["style"],
        ol: ["style"],
        li: ["style"],
        strong: ["style"],
        table: ["style", "class"],
        tr: ["style"],
        td: ["style"],
        th: ["style"],
      },
    });

    // Step 2: Use cheerio to add a custom class to all tables
    const $ = load(sanitized);
    $("table").addClass("financial-tableearesult");
    $("h2").addClass("adnairsultreportsection")

    // Step 3: Store updated HTML
    setFinalHtml($.html());
  }, [articledata]);

  return (
    <div>
      <div className="adnaieaeninqrsult">
        <h1 className="adnairsultreport-header">{articledata.title}</h1>

        <div className="investblog-metaresult">
          <span className="meta-item">
            <MdDateRange className="blogdate" />
            Published Date: {articledata.created_date}
            <GoDotFill className="dotted" />
          </span>
          <span className="meta-item">
            <CgProfile className="blogprofile" />
            Nagnath Shinde
            <GoDotFill className="dotted" />
          </span>
        </div>

        <img
          src={articledata.image_url}
          alt="Adani Enterprises Report"
          className="report-image"
        />

        {/* Render processed HTML with custom table class */}
        <div
          className="main-content"
          dangerouslySetInnerHTML={{ __html: finalHtml }}
        />

        <Quaterlycomment />
        <Navbar />
      </div>
      <FooterForAllPage />
    </div>
  );
};

export default Earningsresult;
