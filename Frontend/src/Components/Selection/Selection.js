import React, { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Navbar from '../NavBar';
import cookie from 'react-cookies';

const Selection = () => {

    const [type, setType] = useState('')
    const [secondaryType, setSecondary] = useState('NONE')
    const [amount, setAmount] = useState();
    const [flag, setFlag] = useState(false);
    const types = ['ETHICAL', 'GROWTH', 'INDEX', 'QUALITY', 'VALUE']
    const formStyle= {
        padding:10
    }
    const handleSubmit = (e) => {
        axios({
            url: '/selection',
            method: 'post',
            data:{'type': type, 'amount': amount, 'secondType':secondaryType}
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
        {(!cookie.load('cookie'))?<Navigate to ="/"/>:null}
        {flag?<Navigate to ="/dashboard"/>:null}
        <div className="SelectionPage">
        <h1> Investment Strategies </h1>
        <div className="SelectionPageItem"> 
            <div className="SelectionForm" style={formStyle}>
                <h2>Select a Strategy</h2>
                <div className="AmountText">
                    <label>
                    Please Enter An Amount:
                    <input type="number" name="amount" onChange={e=>setAmount(e.target.value)}/>
                    </label>
                </div>
                <div className="InvestmentStrategyRadio">
                    <label>
                        Select an Investment Strategy:
                        <div onChange={e=>setType(e.target.value)} style={{display:'flex', flexDirection:'row'}}> 
                        {
                            (types.map((key, value) => (
                                <div key ={key}><input type='radio' value={key} name='investmentType' /> {key}<span class="checkmark"></span></div>
                            )))
                        }
                        </div>
                    </label>
                </div>
                {(type !=='')?
                    (<div className="InvestmentStrategyRadio">
                    <label>
                        Select Secondary Investment Strategy (Optional)
                        <div onChange={e=>setSecondary(e.target.value)} style={{display:'flex', flexDirection:'row'}}> 
                        <div ><input type='radio' value='NONE' name='investmentType2' />NONE</div>
                        {   
                            (types.filter((k)=>k!==type).map((key, value) => (
                                <div key ={key}><input type='radio' value={key} name='investmentType2' /> {key}<span class="checkmark"></span></div>
                            )))
                        }
                        </div>
                    </label>
                </div>):null
                }
                <button 
                    onClick = {handleSubmit} className="SubmitButton">
                    Submit
                </button>
            </div>
            <div style={{width:'40%', maxWidth:400}}>
                <h2>Details</h2>
                <h3>Ethical</h3>
                <p>Socially responsible investing (SRI) or ethical investing, is any investment strategy which seeks to consider both financial return and social/environmental good.</p>
                <h3>Growth</h3>
                <p>Growth investing is a style of investment strategy focused on capital appreciation. Invest in companies that exhibit signs of above-average growth.</p>
                <h3>Index</h3>
                <p>Invest in Index Funds or Exchange-Traded Funds.</p>
                <h3>Quality</h3>
                <p>Quality investing is an investment strategy based on a set of clearly defined fundamental criteria that seeks to identify companies with outstanding quality characteristics.</p>
                <h3>Value</h3>
                <p>Value investing is an investment paradigm that involves buying securities that appear underpriced by some form of fundamental analysis.</p>
            </div>
        </div>
        </div>
        </div>
    )
}
export default Selection