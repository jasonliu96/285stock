import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Cell, Legend, Pie, ResponsiveContainer, Sector } from 'recharts';

const StockDistribution = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState({})
  const [portvalue, setPortValue] = useState(0);
  axios.defaults.withCredentials = true

  useEffect( ()=>{
    axios({
      url: '/distribution',
      method: "get",
  })
  .then((res) => {
    console.log(res.data)
    setData(res.data)
    setPortValue(res.data.total)
  })
  .catch((err)=>{
    console.log(err)
  })
  }, [])
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#BB8FCE', '#E74C3C', '#F08080'];
  //Call Backend -> data input = name: stock, value=total distribution amount //mv, price = closing price, shares

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, price } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Market Value: $${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Distribution ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  return(
      <div>
                  <h3>Stock Distribution</h3>
        { (data.data === undefined)? (<p>loading</p>)
        :
        (
        <div style={{width:900, height:600, display:'flex', flexDirection:'row'}}>
      <div style={{width:600, height:400}}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            isAnimationActive={false}
            data={data.data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            onMouseEnter={(_,index)=> setActiveIndex(index)}
            fill="#8884d8"
          >
              {data.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
            <Legend payload={
                data.data.map(
                (item, index) => ({
                    id: item.name,
                    type: "square",
                    value: `${item.name} ($${item.price})`,
                    color: colors[index % colors.length]
                }))}/>
        </PieChart>
      </ResponsiveContainer>
      </div>
        <div className="StockList">
        <div className="StockTitle">
            <p>Stocks</p>
        </div>
        <p>${portvalue}</p>
        {(data.data.map((stock, key) => (
        <div className="row" key={key} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <li>{stock.name}</li>
        <li>shares: {stock.shares}</li>
        </div>
        <div>
        <li>${stock.price}</li>
        </div>
        </div>
        )))
        }
        </div>
        </div>)}
      </div>
  )
}
export default StockDistribution