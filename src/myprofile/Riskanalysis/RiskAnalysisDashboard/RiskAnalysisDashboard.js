import {React, useContext, useEffect, useState} from 'react';
import './RiskAnalysisDashboard.css';
import RiskProfileForm from '../RiskProfileForm/RiskProfileForm';
import {useNavigate} from "react-router-dom";
import Navbar from '../../../Navbar/Navbar';
import FooterForAllPage from '../../../FooterForAllPage/FooterForAllPage';
import { API_BASE_URL } from '../../../config';
import ProfileRiskReportInvestment from '../InvestmentGuide/InvestmentGuide';
import Cookies from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import AccountBar from '../../AccountBar';
import useSubscriptionStatus from '../../../Navbar/Hooks/useSubscriptionStatus';
const override = {
  display: "block",
  textAlign: "center",
};

const RiskAnalysisDashboard = () => {
    const navigate = useNavigate();
    const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
    const [datalenght, setlenght]= useState(0)
    const [isLoadingg, setisLoading]= useState(false)

   const fetchRiskProfile= async ()=>{
    
         const url= `${API_BASE_URL}/riskanalysis`
         const token= Cookies.get('jwtToken')
         setisLoading(true)
         const response= await fetch(url, {
           method: "GET",
           headers: {
             "Authorization": `Bearer ${token}`,
           }
         })
         console.log(response)
         if (response.ok=== true){
           const data= await response.json()
           console.log(data)
           setlenght(data.length)
           setisLoading(false)
         }
         
       }
   
  useEffect(()=>{
    fetchRiskProfile()
  }, [])

    return (
      <div>{isLoadingg ? <div className='loader-cont'><ClipLoader
                      cssOverride={override}
                      size={35}
                      data-testid="loader"
                      loading={isLoadingg}
                      speedMultiplier={1}
                      color="green"
                    /></div>
                  : 
                  <div>
                    
        <div className="riskreportprofile-container">
        <h1 className="profilepage-titlesession">Risk Profile Report</h1>   
      <AccountBar/>
      {datalenght === 0 ? <>
            <h3>Risk Analysis Dashboard</h3>
            <p>Your investment strategy and the returns you can expect are majorly dependent on your Risk Profile.</p>


           
           <div className='riskreportall'>
         
            <div className="riskreportprofile-factor">
            <h2>Risk Profile of a person is an inherent characteristic which depends on 2 factors</h2>
            <div className='riskheaderheader'>
         
                <h3>Risk taking ability</h3>
                <p>which is determined by your age, income, financial responsibilities etc</p>

                <h3>Risk Willingness</h3>
                <p>which depends on your beliefs, investing experience & knowledge, emotional reaction to loss or gains etc.</p>
                </div>
            </div>
            <div className="riskreportprofile-questions-section">
                <h2>Here are 18 simple questions that will let you know:</h2>
                <div className='riskheader'>
                <ul>
                    <li> 1. Your risk profile & best suited investment strategy</li>
                    <li> 2. Your ideal investment portfolio</li>
                    <li>3. Customised MoneyWorks4Me solution for you so as to maximise your returns in long-term.</li>
                </ul>
                </div>
            </div>
            </div>
            <div className="riskreportprofile-cta-section">
                <p><strong>Only 2 minutes stand between you and your ideal investment portfolio!<br/>
                Answer a few quick questions, and you're all set to start investing smart!</strong></p>
            </div>
            <RiskProfileForm/>
            </>: <ProfileRiskReportInvestment/>
      }
            {!isSubscribed && !isLoading && <div className="subscribe-footerrmanagealerttt">
      <h2 className="headingmanagealert">Subscribe Now!</h2>
        <h3>Choose a plan that aligns with your investment goals!</h3>
        <button 
  className="footer-subscribe-buttonmanage" 
  onClick={() => {
    navigate('/pricehalf', { replace: true }); 
    window.scrollTo(0, 0);
  }} 
>
  Subscribe
</button>


      </div>}
            
        </div>
        <Navbar/>
        <div className="foooterpagesaupdate">
      <FooterForAllPage />
      </div>
        </div>
                  }
        
      
        
        </div>
    );
};

export default RiskAnalysisDashboard;