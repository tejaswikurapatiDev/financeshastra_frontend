import React from 'react'
import Goalplannersubscribe from '../Goalplannersubscribe/Goalplannersubscribe'
import Investgoalcalculate from '../Investgoalcalculate/Investgoalcalculate'
import './Goalplannerforallcalculator.css'
import Navbar from '../../Navbar/Navbar'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'

function Goalplannerforallcalculator() {
  return (
    <div>
    <div className='plannergoalallcontainer'>
        <Navbar/>
          <h2 className='allplannergoal'>Set Investment Goals using the Goal Planner</h2>
      <p className='allplannergoalpara'>
        Successful investors categorize their short-term and long-term goals and invest <br/>accordingly to achieve them. Plan for your financial goals with the help of our goal planner.
      </p>
      <div className="plannergoalallcontaincalculator">
      <div className='ordercalculatorinvestsubscribe'>
        <Goalplannersubscribe/>
      </div>
      <div  className='ordercalculatorinvest'>
        <Investgoalcalculate/>
      </div>
      </div>

    </div>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  )
}

export default Goalplannerforallcalculator