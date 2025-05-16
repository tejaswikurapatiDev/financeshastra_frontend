import React from 'react';

import ShareholdingChart from '../Quaterlycirclechart/Quaterlycirclechart';
import './Quaterlyearningdetailreport.css'

const QuarterlyEarningdetailreport = () => {
    return (
        <div>
      <h2 className="earningheaderrpeer">Quarterly Earnings Report</h2>
      <p className="earningparaapeer">
      Consolidated Figures in ₹ Crores / <a style={{color:'#24b676'}}>View Standalone</a>
    </p>

        <div className="earnings-report">
            
            <table className="earnings-tablee">
                <thead>
                    <tr>
                        <th></th>
                        <th>2020</th>
                        <th>2021</th>
                        <th>2022</th>
                        <th>2023</th>
                        <th>2024</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {/* Quarterly Data Rows */}
                    <tr>
                        <td>Revenue (Cr.)</td>
                        <td>₹269,851</td><td>166</td><td>198</td><td>256</td><td>775</td>
                    </tr>
                    <tr>
                        <td>Net Profit (Cr.)</td>
                        <td>944</td><td>230</td><td>246</td><td>291</td><td>781</td>
                    </tr>
                    <tr>
                        <td>EPS</td>
                        <td>197</td><td>-64</td><td>-49</td><td>-35</td><td>-6</td>
                    </tr>
                    <tr>
                        <td>BVPS</td>
                        <td>17%</td><td>-38%</td><td>-25%</td><td>-14%</td><td>-1%</td>
                    </tr>
                    <tr>
                        <td>ROE</td>
                        <td>226</td><td>22</td><td>10</td><td>10</td><td>10</td>
                    </tr>
                    <tr>
                        <td>NIM</td>
                        <td>52</td><td>46</td><td>50</td><td>51</td><td>63</td>
                    </tr>
                  
                </tbody>
            </table>
            
            <div className="shareholding-sectionn">
                
              
                <div className="shareholding-historyy">
                    <h3>Shareholding History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Holders</th>
                                <th>Sep 23</th>
                                <th>Dec 23</th>
                                <th>Mar 24</th>
                                <th>Jun 24</th>
                                <th>Sep 24</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Promoters</td><td>57.49%</td><td>57.49%</td><td>57.54%</td><td>57.54%</td><td>57.51%</td>
                            </tr>
                            <tr>
                                <td>Foreign Institutions</td><td>10.72%</td><td>10.91%</td><td>11.09%</td><td>11.15%</td><td>10.71%</td>
                            </tr>
                            <tr>
                                <td>DII</td><td>24.93%</td><td>24.18%</td><td>23.99%</td><td>23.64%</td><td>24.1%</td>
                            </tr>
                            <tr>
                                <td>Public</td><td>7.41%</td><td>7.4%</td><td>7.37%</td><td>7.67%</td><td>7.67%</td>
                            </tr>
                            <tr>
                                <td>Others</td><td>0%</td><td>0.02%</td><td>0.01%</td><td>0%</td><td>0.01%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="shareholding-chart">
               
               <ShareholdingChart/> {/* Use CircleChart component */}
               
           </div>
            </div>
           
            </div>
          
        </div>
    );
};
export default QuarterlyEarningdetailreport;