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
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
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
      
    </Routes>
   
  );
}

export default App;
