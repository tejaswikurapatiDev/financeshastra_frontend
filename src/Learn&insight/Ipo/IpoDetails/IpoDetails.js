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

const override = {
  display: "block",
  textAlign: "center",
};

const IpoDetails = () => {


  const [isLoading, setisLoading] = useState(true)
  const [comapiesState, setCompaniesData] = useState([])
  const [financialDataState, setFinancialData] = useState([])
  const [governanceState, setGovernance] = useState([])
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
    priceBandMin:"",
    purpose: "",
    refundDate: "",
    sharesOffered: ""
  }])
  const [keyratioState, setkeyRatioData] = useState([])
  const [summaryState, setSummary] = useState([])
  const [metricsDataState, setmetrics] = useState([])
  const [statusDataState, setStatusData] = useState([])


  useEffect(() => {

    const fetchIPO_detailscompanies = async () => {
      setisLoading(true)
      const url = `${API_BASE_URL}/ipodetails/companies`
      const options = {
        method: "GET",
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      const companies = data?.data?.companies;

      if (!Array.isArray(companies)) {
        console.warn("No companies array found in response");
        return;
      }
      const companiesData = companies.map((e) => ({
        activeYarnVarieties: e.active_yarn_varieties,
        customerYount: e.customer_count,
        description: e.description,
        establishedYear: e.established_year,
        industry: e.industry,
        name: e.name,
        totalYarnVarieties: e.total_yarn_varieties
      }))
      setCompaniesData(companiesData)

      const financials = data?.data?.financials;

      if (!Array.isArray(financials)) {
        console.warn("No financials array found in response");
        return;
      }

      const financialData = financials.map((e) => ({
        financialId: e.financial_id,
        ebit: e.ebit,
        fiscalYear: e.fiscal_year,
        netWorth: e.net_worth,
        pat: e.pat,
        revenue: e.revenue,
        totalDebt: e.total_debt
      }))
      setFinancialData(financialData)

      const governance = data?.data?.governance;

      if (!Array.isArray(governance)) {
        console.warn("No governance array found in response");
        return;
      }

      const governanceData = governance.map((e) => ({
        consistentAccountingPolicy: e.consistent_accounting_policy,
        founders_ownership: e.founders_ownership,
        leadershipExperience: e.leadership_experience,
        promoterSharePledging: e.promoter_share_pledging,
        promoterStake: e.promoter_stake
      }))
      setGovernance(governanceData)

      const ipoDetails = data?.data?.ipoDetails;

      if (!Array.isArray(ipoDetails)) {
        console.warn("No ipoDetails array found in response");
        return;
      }
      const formatDate = (isoStr) => {
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
        faceValue: (e.face_value),
        freshIssue: (e.fresh_issue),
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
      }))
      setIPODetails(ipoDetailsData)

      const keyRatios = data?.data?.keyRatios;

      if (!Array.isArray(keyRatios)) {
        console.warn("No keyRatios array found in response");
        return;
      }
      const keyRatiosData = keyRatios.map((e) => ({
        debtToEquity: e.debt_to_equity,
        ebitMargin: e.ebit_margin,
        fiscalYear: e.fiscal_year,
        roce: e.roce,
        roe: e.roe,
        ratioId: e.ratio_id
      }))
      setkeyRatioData(keyRatiosData)

      const metrics = data?.data?.metrics;

      if (!Array.isArray(metrics)) {
        console.warn("No metrics array found in response");
        return;
      }

      const metricsData = metrics.map((e) => ({
        median_peer_pb: e.median_peer_pb,
        median_peer_pe: e.median_peer_pe,
        operating_earnings_yield: e.operating_earnings_yield,
        pb_ratio: e.pb_ratio,
        pe_ratio: e.pe_ratio,
        valuation_id: e.valuation_id
      }))
      setmetrics(metricsData)

      const status = data?.data?.status;

      if (!Array.isArray(status)) {
        console.warn("No status array found in response");
        return;
      }

      const statusData = status.map((e) => ({
        category: e.category,
        subscriptionTimes: e.subscription_times
      }))
      setStatusData(statusData)

      const summary = data?.data?.summary;

      if (!Array.isArray(summary)) {
        console.warn("No summary array found in response");
        return;
      }

      const summaryData = summary.map((e) => ({
        coreStrengths: e.core_strengths,
        limitations: e.limitations
      }))
      setSummary(summaryData)

      console.log("summaryData: ", summaryData[0].coreStrengths)

      /*console.log("statusData: ", statusData)
      
      console.log("metricsData: ", metricsData)

      console.log("keyRatiosData: ", keyRatiosData)

      console.log("ipoDetailsData: ", ipoDetailsData);

      console.log("governanceData: ", governanceData);

      console.log("financialData: ", financialData);
      
      console.log("companies: ", compniesData);*/
      setisLoading(false)

    }
    fetchIPO_detailscompanies()
  }, [])

  const ipoDetails = {
    title: "Sanathan Textiles IPO analysis",
    subtitle: "All you need to know about the Sanathan Textiles IPO",
    date: "17 Dec 2024",
    author: "Chandresh Tripathi",
    image: ipo1,
    details: [
      { label: "Opening Date", value: "19 Dec 2024" },
      { label: "Price band (₹)", value: "₹305 - 321" },
      { label: "Closing Date", value: "24-Dec-2024" },
      { label: "Face Value", value: "₹₹10" },
      { label: "Allotment Date", value: "24 Dec 2024" },
      { label: "No. of shares", value: "17,133,956" },
      { label: "Refunds Date", value: "26 Dec 2024" },
      { label: "Offer for sale (₹ cr)", value: "₹150" },
      { label: "Listing Date", value: "27 Dec 2024" },
      { label: "Fresh issue (₹ cr)", value: "₹400" },
      { label: "Lot Size", value: "46" },
      { label: "Offered to Public", value: "5,996,885" },
      { label: "Minimum Investment", value: "₹14,766.00" },
      { label: "Purpose of issue", value: "Repayment of debt and investment in subsidiary" },
    ],
    content: {
      nutshell: "Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over three financial years from FY22 to FY24. During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 8.3% annually.",
      companyOverview: "Sanathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18% of its revenue).",
      coreStrengths: "Sanathan Textiles has built enduring partnerships with well-known brands like Welspun India and has served over 1,500 customers.",
      limitations: "Sanathan Textiles derived 65% of its revenue from Gujarat, Maharashtra, and Punjab in FY24. Potential disruptions in these states may influence the company’s profitability.",
    },
  };

  const tableRows = [
    { label: "Opening Date", value: ipoDetailsDataState[0].openingDate },
    {
      label: "Price band (₹)",
      value: `₹${ipoDetailsDataState[0].priceBandMin} - ₹${ipoDetailsDataState[0].priceBandMax}`,
    },
    { label: "Closing Date", value: ipoDetailsDataState[0].closingDate },
    { label: "Face Value", value: `₹${ipoDetailsDataState[0].faceValue}` },
    { label: "Allotment Date", value: ipoDetailsDataState[0].allotmentDate },
    {
      label: "No. of Shares",
      value: ipoDetailsDataState[0].sharesOffered.toLocaleString("en-IN"),
    },
    { label: "Refunds Date", value: ipoDetailsDataState[0].refundDate },
    {
      label: "Offer for Sale (₹ cr)",
      value: `₹${ipoDetailsDataState[0].offerForSale}`,
    },
    { label: "Listing Date", value: ipoDetailsDataState[0].listingDate },
    {
      label: "Fresh Issue (₹ cr)",
      value: `₹${ipoDetailsDataState[0].freshIssue}`,
    },
    { label: "Lot Size", value: ipoDetailsDataState[0].lotSize },
    {
      label: "Offered to Public",
      value: ipoDetailsDataState[0].offerToPublic.toLocaleString("en-IN"),
    },
    {
      label: "Minimum Investment",
      value: `₹${parseFloat(ipoDetailsDataState[0].minInvest).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}`,
    },
    { label: "Purpose of Issue", value: ipoDetailsDataState[0].purpose },
  ];


  return (
    <>
    {
      isLoading ? <div className='loader-cont'><ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      loading={isLoading}
      speedMultiplier={1}
      color="green"
    /></div> : 
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
            <FaFacebookF className="shareIcon" />
            <FaTwitter className="shareIcon" />
            <FaLinkedinIn className="shareIcon" />
            <FaWhatsapp className="shareIcon" />
            <FaEnvelope className="shareIcon" />
          </div>
          <div>
            <img src={ipoDetails.image} alt="Sanathan Textiles IPO" className="ipoImage" /></div>
          <div><RecentIPOs /></div>
        </div>


        <h2 className="investgg-heading">Sanathan Textiles: Company Overview</h2>
        <p className="investgg-paragraph">
          Sanathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18%
          of its revenue). The company also produces technical textiles used in sectors such as automotive, healthcare, construction, sports, and
          protective clothing. As of September 30, 2024, it offered over 3,200 active yarn varieties and had the capability to produce a diverse
          portfolio of more than 14,000 yarn products. In FY24, it served over 1,500 customers, including prominent names like Welspun, Premco
          Global, and Page.
        </p>
        <h2 className="investgg-heading">Sanathan Textiles IPO details</h2>
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

          <h2 className="investgg-heading">Sanathan Textiles IPO in brief</h2>

          <p><strong className='strongfontipo'>Quality:</strong> Sanathan Textiles recorded an average ROE of 23.1% and ROCE of 21% over the three financial years from FY22 to FY24.</p>
          <p><strong className='strongfontipo'>Growth:</strong> During the fiscal years FY22 to FY24, its revenue fell by 3.6% per year, while its net profit dropped by 38.6% annually</p>
          <p><strong className='strongfontipo'>Valuation: </strong>The stock is valued at 20.2 times its earnings and 1.6 times its book value at the upper price band of ₹321.</p>
          <p><strong className='strongfontipo'>Overview:</strong> The company stands to gain from geopolitical tensions in Bangladesh, a key exporter to the US and EU, and the reduction in China’s apparel exports to the
            US, positioning Indian exporters as a viable alternative for the US, which accounted for 22% of global apparel imports in CY23. However, the highly competitive textile
            sector remains a challenge.</p>

          <h3>Sanathan Textiles: Company Overview</h3>
          <p>anathan Textiles specializes in the manufacturing and supply of polyester yarn (accounting for 77% of its revenue) and cotton yarn (18% of its revenue). The company
            also produces technical textiles used in sectors such as automotive, healthcare, construction, sports, and protective clothing. As of September 30, 2024, it offered over
            3,200 active yarn varieties and had the capability to produce a diverse portfolio of more than 14,000 yarn products. In FY24, it served over 1,500 customers, including
            prominent names like Welspun, Premco Global, and Page.</p>
          <h3>Core Strengths of Sanathan Textiles</h3>

          <p><strong className='strongfontipo'>Established Clientele:</strong>{summaryState[0].coreStrengths
          }</p>
          <h3>Limitations of Sanathan Textiles</h3>
          <p><strong className='strongfontipo'>Regional Focus:</strong> {summaryState[0].limitations}</p>
          <p><strong className='strongfontipo'>Dependence on Distribution Network:</strong> The company relies extensively on its distributors to market and sell its products. In FY24, nearly 94% of its revenue was
            generated through its distribution partners. Consequently, the loss of important distributors could harm the company’s financial performance</p>
        </div>

        <Ipotable financialData={financialDataState} keyratios={keyratioState} ipoDetailsData={ipoDetailsDataState}
          subscriptionstatus={statusDataState} />
        <IpoRecommendation />
        <IpoComment />
        <UpcomingIPOs />

      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
    }
    
    </>
  );
};

export default IpoDetails;