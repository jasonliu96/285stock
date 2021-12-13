import React, {useState, useEffect } from 'react';
import Navbar from '../NavBar';
import StockGraph from './StockGraph';
import StockDistribution  from './StockDistribution';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
const Dashboard = () => {
  return(
      <div>
        <Navbar/>
        <div className="Dashboard">
        {(!cookie.load('cookie'))?<Navigate to ="/"/>:null}
          <h1>Portfolio</h1>
          <div style={{display:'flex', flexDirection:'row'}}>
            {<StockGraph/>}
            {<StockDistribution className ="StockDistribution"/>}
          </div>
        </div>
      </div>
  )
}
export default Dashboard