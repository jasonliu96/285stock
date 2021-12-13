import React, {useState, useEffect } from 'react';
import Navbar from '../NavBar';
import StockGraph from './StockGraph';
import StockDistribution  from './StockDistribution';
const Dashboard = () => {
  return(
      <div>
        <Navbar/>
          <h1>Portfolio</h1>
          <div style={{display:'flex', flexDirection:'row'}}>
            {<StockGraph/>}
            {<StockDistribution/>}
          </div>
      </div>
  )
}
export default Dashboard