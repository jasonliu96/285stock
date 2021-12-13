import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockGraph = () => {

  const [data, setData] = useState([{}]);
  const [type, setType] = useState('Please Choose An Investment Type.')
  const [portfolio, setPortfolio] = useState([])
  const [amount, setAmount] = useState(0);
  const [portvalue, setPortValue] = useState(0);

  const [flag, setFlag] = useState(false);
  axios.defaults.withCredentials = true

  useEffect( ()=>{
    axios({
      url: '/investment',
      method: "get",
  })
  .then((res) => {
    console.log(res.data)
      setData(res.data)
      setType(res.data.type)
      setPortfolio(res.data.portfolio)
      setAmount(res.data.amount)
      setPortValue(res.data.total)
      setFlag(false)
  })
  .catch((err)=>{
    setFlag(true)
    console.log(err)
  })
  }, [])
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#BB8FCE', '#E74C3C', '#F08080'];
  return(
      <div>
          <h3>Stock Graphs</h3>
          {
            (flag)?(
            <div>
              <p>Your portfolio is looking awfully empty . . .</p>
              <p>Get started a <Link to = '/selection'>HERE</Link></p>
              <img width="400" height="auto" src="/stonks.jpg" alt="if empty port"/>
            </div>
            ):
              (typeof data.data==='undefined') ? (
                <p>Loading . . .</p>
              ): (
                <div>
                  <div>
                    <p>Investment Strategy: {type}</p>
                    <p>Amount invested: {portvalue.toFixed(2)}</p>
                    <p>Balance: {(amount - portvalue).toFixed(2)}</p>
                    </div>
                  <div style={{width:600, height:400}}>
                  <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data.data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {portfolio.map((value, i) => (
                        <Line type="monotone" dataKey={value} key={i} stroke={colors[i]} activeDot={{ r: 4 }} dot={false}/>
                    ))}
                  </LineChart>
                </ResponsiveContainer>
                  </div>
                  </div>
              )}
          
      </div>
  )
}
export default StockGraph