import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import Navbar from '../NavBar';
import StockGraph from './StockGraph';
import StockDistribution  from './StockDistribution';
const Dashboard = () => {
  const [graphFlag, setGraphFlag] = useState(true)
  const [distFlag, setDistFlag] = useState(false)
  return(
      <div>
        <Navbar/>
          <h1>Portfolio</h1>
          <div style={{display:'flex', flexDirection:'row' }}>
            {<StockGraph/>}
            {<StockDistribution/>}
          </div>
      </div>
  )
}
export default Dashboard