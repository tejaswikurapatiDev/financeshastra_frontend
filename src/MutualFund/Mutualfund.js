import React from 'react'

import Mutualxray from './MutualFund10years/MutualFund10years'
import { MutualCandleStickChart } from './MutualCandleStickChart/MutualCandleStickChart'

function Mutualfund() {
  return (
    <div>
      <MutualCandleStickChart/>
   
      <Mutualxray/>
    </div>
  )
}

export default Mutualfund
