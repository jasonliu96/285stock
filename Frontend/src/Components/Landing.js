import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Landing = () => {
    const [data, setData] = useState([{}]);
    const [type, setType] = useState('Loading ...')
    useEffect( ()=>{
        fetch("/ethical").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    const onChangeHandler = (e) => {
        setType(e.target.value)
        axios({
            url: '/investment',
            method: "post",
            data:{'type':e.target.value}
        })
        .then((res) => {
            setData(res.data)
        })
        .catch((err)=>{console.log('error')})
        console.log(e.target.value)
    }
    return(
        <div>
            <h1>Landing</h1>
            {(typeof data.type==='undefined') ? (
                <div onChange={onChangeHandler}>
                <input type="radio" value="ETHICAL" name="investmentType" /> Ethical
                <input type="radio" value="GROWTH" name="investmentType" /> Growth
                <input type="radio" value="INDEX" name="investmentType" /> Index
                <input type="radio" value="QUALITY" name="investmentType" /> Quality
                <input type="radio" value="VALUE" name="investmentType" /> Value
                </div>
            ): (
            <div>
                <div onChange={onChangeHandler}>
                <input type="radio" value="ETHICAL" name="investmentType" /> Ethical
                <input type="radio" value="GROWTH" name="investmentType" /> Growth
                <input type="radio" value="INDEX" name="investmentType" /> Index
                <input type="radio" value="QUALITY" name="investmentType" /> Quality
                <input type="radio" value="VALUE" name="investmentType" /> Value
                </div>
                <p>Investment Type:{type}</p>
                </div>
            )}
            {(typeof data.ethical==='undefined') ? (
                <p>Loading. . . </p>
            ): (
                <p>{data.ethical}</p>
            )}
            <Link to='/'>Return Home</Link>
        </div>
    )
}

export default Landing;