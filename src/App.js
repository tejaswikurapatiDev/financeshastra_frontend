// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Market from "./Market/Market";
import GoldETF from "./GoldETF/GoldETF";
import Stocktable from "./StockList/StockList";
import ProfitLossTable from "./ProfitLossTable/ProfitLossTable";
import BalanceSheet from "./BalanceSheet/BalanceSheet";
import Header from "./header/header";
import Overview from "./StockOverview/Overview";

import Smallcap from "./Smallcapstock/Smallcapstock";
import Midcap from "./Midcapstock/Midcapstock";
import Largecap from "./Largecapstock/Largecapstock";
import NiftyStocks from "./Nifty50stock/Nifty50stock";
import Highstock from "./Highstock/Highstock";
import Beststock from "./Beststock/Beststock";
import Netify500 from "./NiftyStocksTable/NiftyStocksTable";
import Portfolio from "./Portfoilo/Portfoliomanager/Portfoliomanager";
import NetWorthStocksDashboard from "./Portfoilo/NetWorthStocksDashboard/NetWorthStocksDashboard";
import PortfolioAccountStock from "./Portfoilo/PortfolioAccountStock/PortfolioAccountStock";
import AccountStockfundamental from "./Portfoilo/AccountStockfundamental/AccountStockfundamental";
import AccountStockalert from "./Portfoilo/AccountStockalerts/AccountStockalerts";
import AccountStockreturn from "./Portfoilo/AccountStockreturn/AccountStockreturn";
import Portfoliodonut from "./Portfoilo/Portfoliodonut/Portfoliodonut";
import OverviewPortfolioManager from "./Portfoilo/OverviewPortfoliograph/OverviewPortfoliograph";
import PortfolioStocksector from "./Portfoilo/PortfolioStocksector/PortfolioStocksector";
import PortfolioStockmcap from "./Portfoilo/PortfolioStockmcap/PortfolioStockmcap";
import AddTransactionstock from "./Portfoilo/AddTransactionstock/AddTransactionstock";
import Deletepopupstock from "./Portfoilo/Deletepopupstock/Deletepopupstock";

import UpdateTransaction from "./Portfoilo/UpdateTransactionstock/UpdateTransactionstock";
import Mutualnone from "./Portfoilo/Mutualnone/Mutualnone";
import Mutualtypefund from "./Portfoilo/Mutualtypefund/Mutualtypefund";
import Mutualsector from "./Portfoilo/Mutualsector/Mutualsector";
import MutualAccountStock from "./Portfoilo/Mutualtransaction/Mutualtransaction";
import OverviewMutual from "./Portfoilo/Mutualoverview/Mutualoverview";
import Accountmutualperformance from "./Portfoilo/Mutualperformance/Mutualperformance";

import StockWatchlist from "./Portfoilo/StockWatchlist/StockWatchlistnone";


import SubscriptionPlans from "./Subscription/PricingTablehalfyear/PricingTablehalfyear";
import SubscriptionannualPlans from "./Subscription/Subscriptionannualplan/Subscriptionannualplan";

import TopRatedFunds from "./MutualFund/TopRatedFunds/TopRatedFunds";
import TopRatedFundsdirect from "./MutualFund/TopRatedFundsdirect/TopRatedFundsdirect";
import GoldWatchportall from "./Portfoilo/Goldwatchlistall/Goldwatchlistall";
import Portfoliogoldaccount from "./Portfoilo/Portfoliogoldaccount/Portfoliogoldaccount";

import PaymentForm from "./Subscription/Paymentmethodsubscribe/Paymentmethodsubscribe";
import StockWatchportall from "./Portfoilo/StockWatchlistall/StockWatchlistall";
import StockWatchsectormcap from "./Portfoilo/StockWatchlistmcap/StockWatchlistmcap";
import StockWatchsectorlist from "./Portfoilo/StockWatchlistsector/StockWatchlistsector";
import MutualWatchlist from "./Portfoilo/Mutualfundwatchlistportfolio/Mutualfundwatchlistportfolio";
import MutualWatchtypefundlist from "./Portfoilo/Mutualfundwtchlisttypefund/Mutualfundwtchlisttypefund";
import MutualWatchsectorlist from "./Portfoilo/Mutualsectorportwatchlist/Mutualsectorportwatchlist";
import MutualWatchportall from "./Portfoilo/Mutualwatchportall/Mutualwatchportall";
import ElitepaymentForm from "./Subscription/Elitepaymentsubscribe/Elitepaymentsubscribe";
import Eliteplanhalfyear from "./Subscription/Eliteplanhalfyear/Eliteplanhalfyear";
import LocalPaymentPremiumForm from "./Subscription/Localpaymentpremium/Localpaymentpremium";
import LocalhalfPremiumForm from "./Subscription/Premiumlocalhalf/Premiumlocalhalf";
import ElitePaymentPremiumForm from "./Subscription/Elitelocalannualpayment/Elitelocalannualpayment";
import ElitePaymenthalfForm from "./Subscription/Elitelocalhalfpayment/Elitelocalhalfpayment";
import UpiPaymentFormpremium from "./Subscription/Upiannualpremium/Upiannualpremium";
import Upihalfyearpremium from "./Subscription/Upihalfyearpremium/Upihalfyearpremium";
import UpiPaymentFormelite from "./Subscription/Upiannualelite/Upiannualelite";
import UpihalfyearFormelite from "./Subscription/Upihalfyearelite/Upihalfyearelite";
import Premiumplanhalfyear from "./Subscription/Premiumplanhalfyear/Premiumplanhalfyear";
import Mutualfund from "./MutualFund/Mutualfund";
import Bestsmallcapregular from "./MutualFund/Bestsmallcapregular/Bestsmallcapregular";
import Bestsmallcapdirect from "./MutualFund/Bestsmallcapdirect/Bestsmallcapdirect";
import MutualFundsSipCalculator from "./MutualFund/MutualFundsSipCalculator/MutualFundsSipCalculator";

import RiskoMeter from "./MutualFund/RiskoMutualDashboard/RiskoMutualDashboard";
import Flexregular from "./MutualFund/fundDataregularflex/fundDataregularflex";
import Flexdirect from "./MutualFund/Flexdirect/Flexdirect";
import Fundscreenerregular from "./MutualFund/Fundscreenerregular/Fundscreenerregular";
import Fundscreenerdirect from "./MutualFund/Fundscreenerdirect/Fundscreenerdirect";
import Bestgrowthregular from "./MutualFund/Bestgrowthregular/Bestgrowthregular";
import Etfregular from "./MutualFund/Etfregular/Etfregular";
import Etfdirect from "./MutualFund/Etfdirect/Etfdirect";
import Bestgrowthdirect from "./MutualFund/Bestgrowthdirect/Bestgrowthdirect";
import StockNewsComponent from "./Learn&insight/StockNewsComponent/StockNewsComponent";

import ScreenerStockList from "./Stocks/ScreenerStockList/ScreenerStockList";
import ScreenerStockvaluation from "./Stocks/Stockvaluation/Stockvaluation";
import ScreenerStockincome from "./Stocks/Stockincome/Stockincome";

import EarningsInsightLearn from './Learn&insight/Quaterlyearning/EarningsInsightLearn/EarningsInsightLearn';
import BlogsComponent from "./Learn&insight/Bolgs/Blogscomponent/Blogscomponent";
import BlogFilter from "./Learn&insight/Bolgs/Blogsfilter/Blogsfilter";
import Bloginvestment from "./Learn&insight/Bolgs/Blogsinvestment/Blogsinvestment";
import Blogpmscard from "./Learn&insight/Bolgs/Pmsblogcard/Pmsblogcard";
import Learncard from "./Learn&insight/Learnall/Learncard/Learncard";
import Learncardaftersignup from "./Learn&insight/Learnall/Learncardaftersignup/Learncardaftersignup";
import LearnCourseDetails from "./Learn&insight/Learnall/Learncoursedetail/Learncoursedetail";
import StocknewsAdanigroup from "./Learn&insight/StocknewsAdanigroup/StocknewsAdanigroup";
import StockNewsCard from "./Learn&insight/StockNewsCard/StockNewsCard";
import ModulecourseDetails from "./Learn&insight/Learnall/Modulelearncourse/Modulelearncourse";
import IpoDetailsubscribe from "./Learn&insight/Ipo/IpoDetailsubscribe/IpoDetailsubscribe";
import IpoDetails from "./Learn&insight/Ipo/IpoDetails/IpoDetails";
import IpoComponent from "./Learn&insight/Ipo/IpoComponent/IpoComponent";
import UnlockscreenerStockList from "./Stocks/unlockscreenerstocklist/unlockscreenerstocklist";
import Nifty50screenerStockList from "./Stocks/Niftystock50/Niftystock50table";
import Quaterlygraphtop from "./Learn&insight/Quaterlyearning/Quaterlygraphtop/Quaterlygraphtop";
import QuaterelyOverview from "./Learn&insight/Quaterlyearning/Quaterlyearningoverview/Quaterlyearningoverview";
import QuaterlynewsList from "./Learn&insight/Quaterlyearning/Quaterlynews/Quaterlynews";
import QuarterlyEarningdetailreport from "./Learn&insight/Quaterlyearning/Quaterlyearningdetailreport/Quaterlyearningdetailreport";
import QuarterlyEarningdetailincome from "./Learn&insight/Quaterlyearning/Quaterlyearningincome/Quaterlyearningincome";
import Quarterlybalancesheet from "./Learn&insight/Quaterlyearning/Quaterlyearnbalancesheet/Quaterlyearnbalancesheet";
import QuarterlyCashflow from "./Learn&insight/Quaterlyearning/Quaterlycashflow/Quaterlycashflow";
import Quarterlyratio from "./Learn&insight/Quaterlyearning/Quaterlyratio/Quaterlyratio";
import Earninginsightheader from "./Learn&insight/Quaterlyearning/Earninginsightdetailheader/Earninginsightdetailheader";







function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market/>} />
      <Route path="/gold" element={<GoldETF/>} />
      <Route path="/stock" element={<Stocktable/>} />
      <Route path="/header" element={<Header/>} />
      <Route path="/profitloss" element={<ProfitLossTable/>} />
      <Route path="/balance-sheet" element={<BalanceSheet/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/stockhandle" element={<Overview/>} />
      <Route path="/nifty" element={<Netify500/>} />
      <Route path="/smallcap" element={<Smallcap/>} />
      <Route path="/midcap" element={<Midcap/>} />
      <Route path="/largecap" element={<Largecap/>} />
      <Route path="/niftystock" element={<NiftyStocks/>} />
      <Route path="/highgrowth" element={<Highstock/>} />
      <Route path="/beststock" element={<Beststock/>} />
      <Route path="/portfolio" element={<Portfolio/>} />
      <Route path="/portfoliostock" element={<NetWorthStocksDashboard/>} />
      <Route path="/portfoliodonut" element={<Portfoliodonut/>} />
     <Route path="/portfoliostockaccount" element={<PortfolioAccountStock/>} />
      <Route path="/accountfund" element={<AccountStockfundamental/>} />
      <Route path="/accountalert" element={<AccountStockalert/>} />
      <Route path="/accountreturn" element={<AccountStockreturn/>} />
      <Route path="/overview" element={<OverviewPortfolioManager/>} />
      <Route path="/stocksector" element={<PortfolioStocksector/>} />
      <Route path="/stockmcap" element={<PortfolioStockmcap/>} />
      <Route path="/stockadd" element={<AddTransactionstock/>} />
      <Route path="/stockupdate" element={<UpdateTransaction/>} />
      <Route path="/stockdelete" element={<Deletepopupstock/>} />
      <Route path="/mutualsector" element={<Mutualsector/>} />
      <Route path="/mutualnone" element={<Mutualnone/>} />
      <Route path="/mutualtype" element={<Mutualtypefund/>} />
      <Route path="/mutualaccount" element={<MutualAccountStock/>} />
      <Route path="/mutualoverview" element={<OverviewMutual/>} />
      <Route path="/accountperformance" element={<Accountmutualperformance/>} />
      <Route path="/stockwatchlist" element={<StockWatchlist/>} />
      <Route path="/stockwatchlistsector" element={<StockWatchsectorlist/>} />
      <Route path="/stockwatchlistmcap" element={<StockWatchsectormcap/>} />
      <Route path="/stockwatchlistall" element={<StockWatchportall/>} />
      <Route path="/pricehalf" element={<SubscriptionPlans/>} />
      <Route path="/annualplan" element={<SubscriptionannualPlans/>} />
      <Route path="/mutualfund" element={<TopRatedFunds/>} />
      <Route path="/mutualfunddirect" element={<TopRatedFundsdirect/>} />
      <Route path="/goldWatchlistall" element={<GoldWatchportall/>} />
      <Route path="/portfoliogoldtoppage" element={<Portfoliogoldaccount />} />
     <Route path="/payment" element={<PaymentForm/>} />
      <Route path="/mutualwatchlist" element={<MutualWatchlist/>} />
      <Route path="/mutualwatchlisttype" element={<MutualWatchtypefundlist/>} />
      <Route path="/mutualwatchlistsector" element={<MutualWatchsectorlist/>} />
      <Route path="/mutualwatchlistall" element={<MutualWatchportall/>} />
      <Route path="/paymentform" element={<PaymentForm/>} />
      <Route path="/elitepaymentForm" element={<ElitepaymentForm/>} />
      <Route path="/eliteplanhalfyear" element={<Eliteplanhalfyear/> }/>
      <Route path="/localpaymentpremiumForm" element={<LocalPaymentPremiumForm/> }/>
      <Route path="/localhalfpremiumForm" element={<LocalhalfPremiumForm/> }/>
      <Route path="/elitePaymentPremiumForm" element={<ElitePaymentPremiumForm/> }/>
      <Route path="/elitePaymenthalfForm" element={<ElitePaymenthalfForm/> }/>
      <Route path="/upiPaymentFormpremium" element={<UpiPaymentFormpremium/> }/>
      <Route path="/upihalfyearpremium" element={<Upihalfyearpremium/>}/>
      <Route path="/upiPaymentFormelite" element={<UpiPaymentFormelite/>}/>
      <Route path="/upihalfyearFormelite" element={<UpihalfyearFormelite/>}/>
      <Route path="/premiumplanhalfyear" element={<Premiumplanhalfyear/> }/>
      <Route path="/mutualfundgrowth" element={<Mutualfund/> }/>
      <Route path="/bestsmallcapregular"element={<Bestsmallcapregular/> }/>
      <Route path="/bestsmallcapdirect"element={<Bestsmallcapdirect/> }/>
      <Route path="/sip"element={<MutualFundsSipCalculator/> }/>
      <Route path="/risk"element={<RiskoMeter/> }/>
      <Route path="/flexregular"element={<Flexregular/> }/>
      <Route path="/flexdirect"element={<Flexdirect/> }/>
      <Route path="/fundscreenerregular"element={<Fundscreenerregular/> }/>
      <Route path="/fundscreenerdirect"element={<Fundscreenerdirect/> }/>
      <Route path="/Bestgrowthregular"element={<Bestgrowthregular/> }/>
      <Route path="/Bestgrowthdirect"element={<Bestgrowthdirect/> }/>
      
      <Route path="/etfregular"element={<Etfregular/> }/>
      <Route path="/etfdirect"element={<Etfdirect/> }/>
      <Route path="/stockNewsComponent"element={<StockNewsComponent/> }/>
      <Route path="/stockScreenerlist"element={<ScreenerStockList/> }/>
      <Route path="/ScreenerStockvaluation"element={<ScreenerStockvaluation/> }/>
      <Route path="/IncomeStatement"element={<ScreenerStockincome/> }/>
   
      <Route path="/earningsInsightLearn"element={<EarningsInsightLearn/> }/>
      <Route path="/blogsComponent" element={<BlogsComponent/>} />
      <Route path="/blogFilter" element={<BlogFilter/>}/> 
      <Route path="/bloginvestment/:id" element={<Bloginvestment/>}/> 
      <Route path="/blogpmscard/:id" element={<Blogpmscard/>}/>
      <Route path="/learncard" element={< Learncard/>}/>
      <Route path="/learncardaftersignup" element={<Learncardaftersignup/>}/>
      <Route path="/learnCourseDetails" element={<LearnCourseDetails/>}/>
      <Route path="/stockNewsComponent" element={<StockNewsComponent/>} />
      <Route path="/stocknewsAdanigroup/:id" element={<StocknewsAdanigroup/>} />
      <Route path="/stockNewsCard/:id" element={<StockNewsCard/>} />
      <Route path="/modulecourseDetails" element={<ModulecourseDetails/>}/>
      <Route path="/ipoComponent" element={<IpoComponent/>}/>
      <Route path="/ipoDetails/:id" element={<IpoDetails/>}/>
      <Route path="/ipoDetailsubscribe" element={<IpoDetailsubscribe/>}/>
      <Route path="/unlockstockscreener" element={<UnlockscreenerStockList/>}/>
      <Route path="/nifty50screenerStockList" element={<Nifty50screenerStockList/>}/>
      
      <Route path="/earninginsightheader" element={<Earninginsightheader/>}/>
      <Route path="/quaterlygraphtop" element={<Quaterlygraphtop/>}/>
      <Route path="/earningsInsightLearn" element={<EarningsInsightLearn/>}/> 
      <Route path="/quaterelyOverview" element={<QuaterelyOverview/>}/>
      <Route path="/quaterlynewsList" element={<QuaterlynewsList/>}/>
      <Route path="/qquarterlyEarningsReport" element={<QuarterlyEarningdetailreport/>}/>
      <Route path="/quarterlyEarningdetailincome" element={<QuarterlyEarningdetailincome/>}/>
      <Route path="/quarterlybalancesheet" element={<Quarterlybalancesheet/>}/>
      <Route path="/quarterlyCashflow" element={<QuarterlyCashflow/>}/>
      <Route path="/quarterlyratio" element={<Quarterlyratio/>}/>
     


     

    



    
    
     






      
    </Routes>
   
  );
}

export default App;
