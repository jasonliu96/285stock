import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {

  const [data, setData] = useState([{}]);
  const [type, setType] = useState('Please Choose An Investment Type.')
  const [portfolio, setPortfolio] = useState([])
  const [amount, setAmount] = useState(0);
  useEffect( ()=>{
    axios({
      url: '/investment',
      method: "get",
  })
  .then((res) => {
    console.log(res.data)
      setData(res.data.data)
      setType(res.data.type)
      setPortfolio(res.data.portfolio)
      setAmount(res.data.amount)
  })
  .catch((err)=>{console.log(err)})
  }, [])
  // const onChangeHandler = (e) => {
  //     setType(e.target.value)
  //     axios({
  //         url: '/investment',
  //         method: "post",
  //         data:{'type':e.target.value}
  //     })
  //     .then((res) => {
  //         setData(res.data)
  //         setType(res.data.type)
  //         setTag(res.data.port)
  //         console.log(data)
  //     })
  //     .catch((err)=>{console.log('error')})
  // }
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return(
      <div>
          <h1>Portfolio</h1>
          {(typeof data==='undefined') ? (
              <p>Loading. . . </p>
          ): (
            <div>
              <div>
                <p>Investment Strategy: {type}</p>
                <p>Amount invested: {amount}</p>
                </div>
              <div style={{width:800, height:600}}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
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
export default Dashboard