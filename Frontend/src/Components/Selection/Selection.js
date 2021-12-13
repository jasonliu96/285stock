import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Navbar from '../NavBar'
import NavBar from '../NavBar';

const Selection = () => {

    const [type, setType] = useState('')
    const [secondaryType, setSecondary] = useState('')
    const [amount, setAmount] = useState();
    const [flag, setFlag] = useState(false);
    const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center',
        padding: 10,
    }
    const formStyle= {
        padding:10
    }
    const handleSubmit = (e) => {
        axios({
            url: '/selection',
            method: 'post',
            data:{'type': type, 'amount': amount}
        })
        .then((res)=> {
            if(res.status===200){
                setFlag(true)
            }
            else {
                console.log(res)
            }
        })
        .catch((err)=> console.log(err))
    }
    return(
        <div>
        <Navbar/>
        
        {flag?<Navigate to ="/dashboard"/>:null}
        <div> 
            <h1> Select an Input Strategy </h1>
            <div className="SelectionForm" style={formStyle}>
                <div className="AmountText">
                    <label>
                    Please Enter An Amount:
                    <input type="number" name="amount" onChange={e=>setAmount(e.target.value)}/>
                    </label>
                </div>
                <div className="InvestmentStrategyRadio">
                    <label>
                        Select an Investment Strategy:
                        <div onChange={e=>setType(e.target.value)}> 
                            <input type='radio' value='ETHICAL' name='investmentType' /> Ethical
                            <input type='radio' value='GROWTH' name='investmentType' /> Growth
                            <input type='radio' value='INDEX' name='investmentType' /> Index
                            <input type='radio' value='QUALITY' name='investmentType' /> Quality
                            <input type='radio' value='VALUE' name='investmentType' /> Value
                        </div>
                    </label>
                </div>
                {(type !=='')?
                    (<div className="InvestmentStrategyRadio">
                    <label>
                        Select Secondary Investment Strategy (Optional)
                        <div onChange={e=>setSecondary(e.target.value)}> 
                            <input type='radio' value='ETHICAL' name='investmentType2' /> Ethical
                            <input type='radio' value='GROWTH' name='investmentType2' /> Growth
                            <input type='radio' value='INDEX' name='investmentType2' /> Index
                            <input type='radio' value='QUALITY' name='investmentType2' /> Quality
                            <input type='radio' value='VALUE' name='investmentType2' /> Value
                            <input type='radio' value='NONE' name='investmentType2' /> None

                        </div>
                    </label>
                </div>):null
                }
                <button 
                    onClick = {handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
        </div>
    )
}
export default Selection