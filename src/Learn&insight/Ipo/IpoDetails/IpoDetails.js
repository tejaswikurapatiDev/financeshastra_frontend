import React, { useEffect, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { API_BASE_URL } from "../../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './IpoDetails.css';
import ipo1 from '../../../assest/ipo1.jpeg';
import { GoDotFill } from "react-icons/go";
import Navbar from '../../../Navbar/Navbar';
import Ipotable from '../Ipotable/Ipotable';
import UpcomingIPOs from '../UpcomingIPOs/UpcomingIPOs';
import IpoRecommendation from '../IpoRecommendation/IpoRecommendation';
import IpoComment from '../IpoComment/IpoComment';
import RecentIPOs from '../RecentIPOs/RecentIPOs';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';
import { useParams } from "react-router-dom";

const override = {
  display: "block",
  textAlign: "center",
};

const IpoDetails = () => {
  const { id } = useParams();

  const [isLoading, setisLoading] = useState(true);
  const [comapiesState, setCompaniesData] = useState([]);
  const [financialDataState, setFinancialData] = useState([]);
  const [governanceState, setGovernance] = useState([]);
  const [ipoDetailsDataState, setIPODetails] = useState([{
    allotmentDate: "",
    closingDate: "",
    faceValue: "",
    freshIssue: "",
    listingDate: "",
    lotSize: "",
    minInvest: "",
    offerForSale: "",
    offerToPublic: "",
    openingDate: "",
    priceBandMax: "",
    priceBandMin: "",
    purpose: "",
    refundDate: "",
    sharesOffered: ""
  }]);
  const [keyratioState, setkeyRatioData] = useState([]);
  const [summaryState, setSummary] = useState([]);
  const [metricsDataState, setmetrics] = useState([]);
  const [statusDataState, setStatusData] = useState([]);
  const [corpEnterpriseState, setCorpEnterprise] = useState([]);
  const [financialPerfState, setFinancialPerf] = useState([]);
  const [adminState, setAdmin] = useState([]);
  const [valuationsState, setValuations] = useState([]);

  useEffect(() => {
    const fetchIPO_detailscompanies = async () => {
      setisLoading(true);
      const url = `${API_BASE_URL}/ipodetails/companies/${id}`;
      const options = {
        method: "GET",
      };
      const response = await fetch(url, options);
      const data = await response.json();

      // Process companies data
      const companies = data?.data?.companies || [];
      const companiesData = companies.map((e) => ({
        activeYarnVarieties: e.active_yarn_varieties,
        customerCount: e.customer_count,
        description: e.description,
        establishedYear: e.established_year,
        industry: e.industry,
        name: e.name,
        totalYarnVarieties: e.total_yarn_varieties
      }));
      setCompaniesData(companiesData);

      // Process financial data
      const financials = data?.data?.financials || [];
      const financialData = financials.map((e) => ({
        financialId: e.financial_id,
        ebit: e.ebit,
        fiscalYear: e.fiscal_year,
        netWorth: e.net_worth,
        pat: e.pat,
        revenue: e.revenue,
        totalDebt: e.total_debt
      }));
      setFinancialData(financialData);

      // Process governance data
      const governance = data?.data?.governance || [];
      const governanceData = governance.map((e) => ({
        consistentAccountingPolicy: e.consistent_accounting_policy,
        foundersOwnership: e.founders_ownership,
        leadershipExperience: e.leadership_experience,
        promoterSharePledging: e.promoter_share_pledging,
        promoterStake: e.promoter_stake
      }));
      setGovernance(governanceData);

      // Process IPO details
      const ipoDetails = data?.data?.ipoDetails || [];
      const formatDate = (isoStr) => {
        if (!isoStr) return "NA";
        const date = new Date(isoStr);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };

      const ipoDetailsData = ipoDetails.map((e) => ({
        allotmentDate: formatDate(e.allotment_date),
        closingDate: formatDate(e.closing_date),
        faceValue: e.face_value,
        freshIssue: e.fresh_issue,
        listingDate: formatDate(e.listing_date),
        lotSize: e.lot_size,
        minInvest: e.min_investment,
        offerForSale: e.offer_for_sale,
        offerToPublic: e.offer_to_public,
        openingDate: formatDate(e.opening_date),
        priceBandMax: e.price_band_max,
        priceBandMin: e.price_band_min,
        purpose: e.purpose,
        refundDate: formatDate(e.refund_date),
        sharesOffered: e.shares_offered
      }));
      setIPODetails(ipoDetailsData);

      // Process key ratios
      const keyRatios = data?.data?.keyRatios || [];
      const keyRatiosData = keyRatios.map((e) => ({
        debtToEquity: e.debt_to_equity,
        ebitMargin: e.ebit_margin,
        fiscalYear: e.fiscal_year,
        roce: e.roce,
        roe: e.roe,
        ratioId: e.ratio_id
      }));
      setkeyRatioData(keyRatiosData);

      // Process metrics
      const metrics = data?.data?.metrics || [];
      const metricsData = metrics.map((e) => ({
        medianPeerPb: e.median_peer_pb,
        medianPeerPe: e.median_peer_pe,
        operatingEarningsYield: e.operating_earnings_yield,
        pbRatio: e.pb_ratio,
        peRatio: e.pe_ratio,
        valuationId: e.valuation_id
      }));
      setmetrics(metricsData);

      // Process subscription status
      const status = data?.data?.status || [];
      const statusData = status.map((e) => ({
        category: e.category,
        subscriptionTimes: e.subscription_times
      }));
      setStatusData(statusData);

      // Process summary
      const summary = data?.data?.summary || [];
      const summaryData = summary.map((e) => ({
        coreStrengths: e.core_strengths,
        limitations: e.limitations
      }));
      setSummary(summaryData);

      // Process corporation and enterprise
      const corpEnterprise = data?.data?.corp_Entprise || [];
      const corpEnterpriseData = corpEnterprise
        .filter(e => e["corporation&enterprise"]?.trim())
        .map((e) => {
          const parts = e["corporation&enterprise"].split("?");
          return {
            question: parts[0] ? `${parts[0]}?` : "",
            answer: parts[1]?.trim() || ""
          };
        })
        .filter(item => item.question && item.answer);
      setCorpEnterprise(corpEnterpriseData);

      // Financial Performance
      const financialPerf = data?.data?.financial_perf || [];
      const financialPerfData = financialPerf
        .filter(e => e.financial_performance?.trim())
        .map((e) => {
          const parts = e.financial_performance.split("?");
          return {
            question: parts[0] ? `${parts[0]}?` : "",
            answer: parts[1]?.trim() || ""
          };
        })
        .filter(item => item.question && item.answer);
      setFinancialPerf(financialPerfData);

      // Administration
      const admin = data?.data?.administration || [];
      const adminData = admin
        .filter(e => e.administration?.trim())
        .map((e) => {
          const parts = e.administration.split("?");
          return {
            question: parts[0] ? `${parts[0]}?` : "",
            answer: parts[1]?.trim() || ""
          };
        })
        .filter(item => item.question && item.answer);
      setAdmin(adminData);

      // Valuations
      const valuations = data?.data?.valuations || [];
      const valuationsData = valuations
        .filter(e => e.valuations?.trim())
        .map((e) => {
          const parts = e.valuations.split("?");
          return {
            question: parts[0] ? `${parts[0]}?` : "",
            answer: parts[1]?.trim() || ""
          };
        })
        .filter(item => item.question && item.answer);
      setValuations(valuationsData);

      setisLoading(false);
    };
    fetchIPO_detailscompanies();
  }, [id]);

  const getValueOrNA = (value) => {
    return value !== undefined && value !== null && value !== "" ? value : "NA";
  };

  const formatNumberOrNA = (value) => {
    if (value === undefined || value === null || value === "") return "NA";
    return parseFloat(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    });
  };

  const ipoDetails = {
    title: `${getValueOrNA(comapiesState[0]?.name)} IPO analysis`,
    subtitle: `All you need to know about the ${getValueOrNA(comapiesState[0]?.name)} IPO`,
    date: "17 Dec 2024",
    author: "Chandresh Tripathi",
    image: ipo1,
    content: {
      nutshell: "Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over three financial years from FY22 to FY24. During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 8.3% annually.",
      companyOverview: getValueOrNA(comapiesState[0]?.description),
      coreStrengths: getValueOrNA(summaryState[0]?.coreStrengths),
      limitations: getValueOrNA(summaryState[0]?.limitations),
    },
  };

  const tableRows = [
    { label: "Opening Date", value: getValueOrNA(ipoDetailsDataState[0]?.openingDate) },
    {
      label: "Price band (₹)",
      value: ipoDetailsDataState[0]?.priceBandMin && ipoDetailsDataState[0]?.priceBandMax
        ? `₹${getValueOrNA(ipoDetailsDataState[0]?.priceBandMin)} - ₹${getValueOrNA(ipoDetailsDataState[0]?.priceBandMax)}`
        : "NA",
    },
    { label: "Closing Date", value: getValueOrNA(ipoDetailsDataState[0]?.closingDate) },
    { label: "Face Value", value: ipoDetailsDataState[0]?.faceValue ? `₹${getValueOrNA(ipoDetailsDataState[0]?.faceValue)}` : "NA" },
    { label: "Allotment Date", value: getValueOrNA(ipoDetailsDataState[0]?.allotmentDate) },
    {
      label: "No. of Shares",
      value: ipoDetailsDataState[0]?.sharesOffered ? getValueOrNA(ipoDetailsDataState[0]?.sharesOffered.toLocaleString("en-IN")) : "NA",
    },
    { label: "Refunds Date", value: getValueOrNA(ipoDetailsDataState[0]?.refundDate) },
    {
      label: "Offer for Sale (₹ cr)",
      value: ipoDetailsDataState[0]?.offerForSale ? `₹${getValueOrNA(ipoDetailsDataState[0]?.offerForSale)}` : "NA",
    },
    { label: "Listing Date", value: getValueOrNA(ipoDetailsDataState[0]?.listingDate) },
    {
      label: "Fresh Issue (₹ cr)",
      value: ipoDetailsDataState[0]?.freshIssue ? `₹${getValueOrNA(ipoDetailsDataState[0]?.freshIssue)}` : "NA",
    },
    { label: "Lot Size", value: getValueOrNA(ipoDetailsDataState[0]?.lotSize) },
    {
      label: "Offered to Public",
      value: ipoDetailsDataState[0]?.offerToPublic ? getValueOrNA(ipoDetailsDataState[0]?.offerToPublic.toLocaleString("en-IN")) : "NA",
    },
    {
      label: "Minimum Investment",
      value: ipoDetailsDataState[0]?.minInvest ? `₹${formatNumberOrNA(ipoDetailsDataState[0]?.minInvest)}` : "NA",
    },
    { label: "Purpose of Issue", value: getValueOrNA(ipoDetailsDataState[0]?.purpose) },
  ];

  return (
    <>
      {isLoading ? (
        <div className='loader-cont'>
          <ClipLoader
            cssOverride={override}
            size={35}
            data-testid="loader"
            loading={isLoading}
            speedMultiplier={1}
            color="green"
          />
        </div>
      ) : (
        <div>
          <div className="ipoDetailsContainer">
            <Navbar />
            <h2 className="ipoNewsTitle">{ipoDetails.title}</h2>
            <p className="ipoNewsSubtitle">{ipoDetails.subtitle}</p>
            <div className="datetimecardipo">
              <p className="ipopara">
                <MdDateRange className="dateipocard" /> Published Date: {ipoDetails.date}<GoDotFill style={{ color: "green", fontSize: "12px" }} />
              </p>
              <p className="ipopara">
                <CgProfile className="profileipocard" /> Author: {ipoDetails.author}<GoDotFill style={{ color: "green", fontSize: "12px" }} />
              </p>
            </div>

            <div className='iconimageall'>
              <div className="shareIcons">
                <h3>Share</h3>
                <a href="https://www.facebook.com/FinanceShastra/" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="shareIcon" />
                </a>
                <a href="https://x.com/FinanceShastra" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="shareIcon" />
                </a>
                <a href="https://www.linkedin.com/company/financeshastra/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="shareIcon" />
                </a>
                <a href="https://wa.me/9067604020" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="shareIcon" />
                </a>
                <a href="mailto:info@financeshastra.com">
                  <FaEnvelope className="shareIcon" />
                </a>
              </div>
              <div>
                <img src={ipoDetails.image} alt={`${getValueOrNA(comapiesState[0]?.name)} IPO`} className="ipoImage" />
              </div>
              <div><RecentIPOs /></div>
            </div>

            <h2 className="investgg-heading">{ipoDetails.title}: Company Overview</h2>
            <p className="investgg-paragraph">
              {getValueOrNA(comapiesState[0]?.description)} {comapiesState[0]?.activeYarnVarieties ? `As of September 30, 2024, it offered over ${getValueOrNA(comapiesState[0]?.activeYarnVarieties)} active yarn varieties and had the capability to produce a diverse portfolio of more than ${getValueOrNA(comapiesState[0]?.totalYarnVarieties)} yarn products.` : ""} {comapiesState[0]?.customerCount ? `In FY24, it served over ${getValueOrNA(comapiesState[0]?.customerCount)} customers, including prominent names like Welspun, Premco Global, and Page.` : ""}
            </p>

            <h2 className="investgg-heading">{getValueOrNA(comapiesState[0]?.name)} IPO details</h2>
            <div className='ipodta'>
              <div className="ipoDetails">
                {tableRows.map((detail, index) => (
                  <div key={index} className="ipoDetailItem">
                    <span className="ipoDetailLabel">{detail.label}</span>
                    <span className="ipoDetailValue">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ipoContent">
              <h2 className="investgg-heading">{getValueOrNA(comapiesState[0]?.name)} IPO in brief</h2>
              <p><strong className='strongfontipo'>Quality:</strong> Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over the three financial years from FY22 to FY24.</p>
              <p><strong className='strongfontipo'>Growth:</strong> During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 38.6% annually</p>
              <p><strong className='strongfontipo'>Valuation: </strong>The stock is valued at {metricsDataState[0]?.peRatio ? `${getValueOrNA(metricsDataState[0]?.peRatio)} times` : "NA"} its earnings and {metricsDataState[0]?.pbRatio ? `${getValueOrNA(metricsDataState[0]?.pbRatio)} times` : "NA"} its book value at the upper price band of ₹321.</p>
              <p><strong className='strongfontipo'>Overview:</strong> {getValueOrNA(summaryState[1]?.coreStrengths)} {summaryState[1]?.limitations ? `However, ${getValueOrNA(summaryState[1]?.limitations)}` : ""}</p>

              <h3>{getValueOrNA(comapiesState[0]?.name)}: Company Overview</h3>
              <p>{getValueOrNA(comapiesState[0]?.description)} {comapiesState[0]?.activeYarnVarieties ? `As of September 30, 2024, it offered over ${getValueOrNA(comapiesState[0]?.activeYarnVarieties)} active yarn varieties and had the capability to produce a diverse portfolio of more than ${getValueOrNA(comapiesState[0]?.totalYarnVarieties)} yarn products.` : ""} {comapiesState[0]?.customerCount ? `In FY24, it served over ${getValueOrNA(comapiesState[0]?.customerCount)} customers, including prominent names like Welspun, Premco Global, and Page.` : ""}</p>

              <h3>Core Strengths of {getValueOrNA(comapiesState[0]?.name)}</h3>
              <p><strong className='strongfontipo'>Established Clientele:</strong> {getValueOrNA(summaryState[0]?.coreStrengths)}</p>

              <h3>Limitations of {getValueOrNA(comapiesState[0]?.name)}</h3>
              <p><strong className='strongfontipo'>Regional Focus:</strong> {getValueOrNA(summaryState[0]?.limitations)}</p>
              <p><strong className='strongfontipo'>Dependence on Distribution Network:</strong> The company relies extensively on its distributors to market and sell its products. In FY24, nearly 94% of its revenue was generated through its distribution partners. Consequently, the loss of important distributors could harm the company's financial performance</p>
            </div>

            <Ipotable
              financialData={financialDataState}
              keyratios={keyratioState}
              ipoDetailsData={ipoDetailsDataState}
              subscriptionstatus={statusDataState}
              corpEnterprise={corpEnterpriseState}
              administration={adminState}
              financialPerformance={financialPerfState}
              valuations={valuationsState}
            />
            <IpoRecommendation />
            <IpoComment />
            <UpcomingIPOs />
          </div>
          <div className="foooterpagesaupdate">
            <FooterForAllPage />
          </div>
        </div>
      )}
    </>
  );
};

export default IpoDetails;