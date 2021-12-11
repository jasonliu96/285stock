import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Selection = () => {

  const [data, setData] = useState([{}]);
  const [type, setType] = useState('Please Choose An Investment Type.')
  const [tag, setTag] = useState([])
  // useEffect( ()=>{
  //     fetch('/ethical').then(
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
          method: 'post',
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
          <h1>Selection</h1>
                <div>
                    <label style={{display:'block', padding:10}}>
                        Enter An Amount to Invest: 
                    <input style={{display:'block'}} type='text' placeholder='Enter an Amount'/>
                    </label>
                </div>
                <div onChange={onChangeHandler}>
                    <label style={{display:'block', padding:10}}>
                        Select an Investment Strategy:
                        <div style={{display:'block'}}>
                            <input type='radio' value='ETHICAL' name='investmentType' /> Ethical
                            <input type='radio' value='GROWTH' name='investmentType' /> Growth
                            <input type='radio' value='INDEX' name='investmentType' /> Index
                            <input type='radio' value='QUALITY' name='investmentType' /> Quality
                            <input type='radio' value='VALUE' name='investmentType' /> Value
                        </div>
                    </label>
                </div>
                <p>Investment Type:{type}</p>
      
          
          
      </div>
  )
}
export default Selection