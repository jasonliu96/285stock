import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {

  const [data, setData] = useState([{}]);
  const [type, setType] = useState('Please Choose An Investment Type.')
  const [tag, setTag] = useState([])
  // useEffect( ()=>{
  //     fetch("/ethical").then(
  //         res => res.json()
  //     ).then(
  //         data => {
  //             setData(data)
  //             console.log(data)
  //         }
  //     )
  // }, [])
  const onChangeHandler = (e) => {
      setType(e.target.value)
      axios({
          url: '/investment',
          method: "post",
          data:{'type':e.target.value}
      })
      .then((res) => {
          setData(res.data)
          setType(res.data.type)
          setTag(res.data.port)
          console.log(data)
      })
      .catch((err)=>{console.log('error')})
  }
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return(
      <div>
          <h1>Dashboard</h1>
      
              <div onChange={onChangeHandler}>
              <input type="radio" value="ETHICAL" name="investmentType" /> Ethical
              <input type="radio" value="GROWTH" name="investmentType" /> Growth
              <input type="radio" value="INDEX" name="investmentType" /> Index
              <input type="radio" value="QUALITY" name="investmentType" /> Quality
              <input type="radio" value="VALUE" name="investmentType" /> Value
              </div>
              <p>Investment Type:{type}</p>
      
          
          {(typeof data.data==='undefined') ? (
              <p>Loading. . . </p>
          ): (
              <div style={{width:800, height:600}}>
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
                {tag.map((value, i) => (
                    <Line type="monotone" dataKey={value} key={i} stroke={colors[i]} activeDot={{ r: 1 }}/>
                ))}
              </LineChart>
            </ResponsiveContainer>
              </div>
          )}
          <Link to='/'>Return Home</Link>
      </div>
  )
}
export default Dashboard