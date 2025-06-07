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


const Earningsresult = () => {
  const location = useLocation();
  const { articleData } = location.state || {};
  const { quaterlyarticles } = articleData;
  const [articledata, setarticledata] = useState(quaterlyarticles[0] || {});
  const [finalHtml, setFinalHtml] = useState("");

const rawHtml = articledata?.MainContent || "";

// Convert first <td> row in each table to <th>
const preProcessedHtml = rawHtml.replace(
  /<table[^>]*>(.*?)<tr>(.*?)<\/tr>/is,
  (match, tableStart, firstRow) => {
    const thRow = firstRow.replace(/<td/gi, "<th").replace(/<\/td>/gi, "</th>");
    return match.replace(firstRow, thRow);
  }
);

  const sanitizedContent = sanitizeHtml(preProcessedHtml, {
    
  allowedTags: ["h2", "p", "ol", "li", "strong", "table", "tr", "td", "th"],
  allowedAttributes: {
    h2: ["style"],
    p: ["style"],
    ol: ["style"],
    li: ["style", "class"],
    strong: ["style"],
    table: ["style", "class"],
    tr: ["style", "class"],
    td: ["style", "class"],
    th: ["style", "class"],
  },
  transformTags: {
    table: (tagName, attribs) => ({
      tagName: "table",
      attribs: { ...attribs, class: "customm-table" },
    }),
    tr: (tagName, attribs) => ({
      tagName: "tr",
      attribs: { ...attribs, class: "customm-tr" },
    }),
    td: (tagName, attribs) => ({
      tagName: "td",
      attribs: { ...attribs, class: "customm-td" },
    }),
    th: (tagName, attribs) => ({
      tagName: "th",
      attribs: { ...attribs, class: "customm-th" },
    }),
    li: (tagName, attribs) => ({
      tagName: "li",
      attribs: { ...attribs, class: "custommli" },
    }),
    h2: (tagName, attribs) => ({
      tagName: "h2",
      attribs: { ...attribs, class: "custommh2" },
    }),
    ol: (tagName, attribs) => ({
      tagName: "ol",
      attribs: { ...attribs, class: "custommol" },
    }),
  },
});


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
          className="main-contentt"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        {/* {articledata.MainContent} */}
        {/*<h2 className="adnairsultreportsection">Business and Industry Overview:</h2>
          <p>
            Adani Enterprises is part of the Adani Group. It started in 1988. The founder is Gautam Adani. The company is in Ahmedabad, India. Adani Enterprises starts new businesses. When the business grows, it becomes a separate company. Examples are Adani Ports, Adani Green Energy, and Adani Power. Now the company works in many areas. It runs airports, builds roads, makes clean energy, builds data centers, and works with digital apps. It also works in coal mining and defense. The company wants to focus more on green energy. It is working on green hydrogen, solar panels, and wind power. This helps reduce pollution. Adani is building a mobile app called Adani One. People can use it to book flights, shop, and get airport info. The company is also making many roads and highways. In 2025, Adani Enterprises sold part of its shares in Adani Wilmar. It made a big one-time profit from this. But its coal business made less money because coal prices went down. The company wants to grow in clean energy and digital services. It is helping build India’s future infrastructure.
          </p>
        </section>

        <section>
          <h2 className="adnairsultreportsection">Latest Stock News:</h2>
          <p>
            On May 1, 2025, Adani Enterprises shared its Q4 results (January to March 2025). The company made a net profit of ₹3,845 crore. This happened because the company sold part of its shares in Adani Wilmar. The one-time gain was ₹3,946 crore. The company’s total revenue was ₹26,966 crore. Revenue went down by 7.6% from last year.  The coal trading business made less profit.  Profit from coal fell by 47% to ₹833 crore. But the green energy business did well.  It made a profit of ₹994 crore.  This is 92% more than last year.  Green energy gave 13.5% of the company’s total revenue. After this news, the stock stayed stable. Investors liked the company’s focus on clean energy and new plans.
          </p>*/}

        {/* <section>
          <h2 className="adnairsultreportsection">Segmental Information</h2>
          <ol>
            <li><strong>Airports:  </strong>Adani runs 7 airports in India.  These are in Mumbai, Ahmedabad, Lucknow, Jaipur, Guwahati, Thiruvananthapuram, and Mangaluru. </li>
            <li><strong>Roads: </strong>The company builds roads and highways. It works in many Indian states. </li>
            <li><strong>New Energy: </strong>Adani makes green hydrogen, solar panels, and wind power. It works under Adani New Industries Ltd. </li>
            <li><strong>Data Centers: </strong>Adani builds data centers to store internet data.  It works with a U.S. company called EdgeConneX. Together they run AdaniConneX. </li>
            <li><strong>Mining: </strong>The company runs coal mines in India, Indonesia, and Australia.  In Australia, it works through Bravus Mining & Resources. </li>
          </ol>
        </section>

        <section>
          <h2 className="adnairsultreportsection">Subsidiary information: </h2>
          <ol>
            <li><strong>Adani Wilmar –</strong> Makes food items like oil, rice, flour, and sugar. Owns the brand Fortune. </li>
            <li><strong>AdaniConneX –</strong> Builds big data centers for storing internet and cloud data. </li>
            <li><strong>Bravus Mining & Resources – </strong>Runs coal mines in Australia. </li>
            <li><strong>Adani Digital Labs –</strong> Makes digital tools and apps, like Adani One. </li>
            <li><strong>Adani New Industries Ltd (ANIL) – </strong>Makes green hydrogen, solar panels, and batteries. </li>
            <li><strong>Adani Road Transport Ltd –</strong> Builds and runs highways and expressways </li>
          </ol>
        </section>

        <section>
          <h2 className="adnairsultreportsection">Q4 Highlights: </h2>
          <ol>
            <li><strong>Revenue:</strong> ₹26,966 crore </li>
            <li><strong>Net Profit:</strong> ₹3,845 crore </li>
            <li><strong>One-time profit:</strong> ₹3,946 crore from Adani Wilmar </li>
            <li><strong>Coal business profit:</strong> ₹833 crore (fell by 47%) </li>
            <li><strong>Green energy profit:</strong> ₹994 crore (grew by 92%) </li>
          </ol>
        </section>
        <div className="financial-containerearesult">
          <h2 className="financial-headingearesult">Financial history</h2>
          <div className="table-wrapperearesult">
            <table className="financial-tableearesult">
              <thead>
                <tr>
                  <th>Amount in (₹ cr)</th>
                  <th>Q4 FY24</th>
                  <th>Q4 FY25</th>
                  <th>FY24</th>
                  <th>FY25</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.Q4FY24}</td>
                    <td>{row.Q4FY25}</td>
                    <td>{row.FY24}</td>
                    <td>{row.FY25}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tagsearesult">
            {tags.map((tag) => (
              <span key={tag} className="tagearesult">
                {tag}
              </span>
            ))}
          </div>
        </div> */}
        <Quaterlycomment />
        <Navbar />
      </div>
      <FooterForAllPage />
    </div>
  );
};

export default Earningsresult;
