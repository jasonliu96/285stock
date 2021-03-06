import React, { useState } from 'react';
// import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Navigate} from 'react-router-dom';
const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ flag, setFlag ] = useState(false);
    const [ errMessage, setEM ] = useState(false);
    const submitLogin = (e) => {
        //make a post request with the user data

        axios.defaults.withCredentials = true

        axios({
            url: '/login',
            method: 'post',
            data:{'username': username, 'password': password}
        })
        .then((res) => {
            if(res.status===200){
                setFlag(true)
            }
        })
        .catch((err) => {
            setEM(true)
            console.log(err)
        })
    }
    const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center'
    }
    return(
        <div style={style}>
            {flag?<Navigate to ="/dashboard"/>:null}
            <h1>Login</h1>
            <div className="form-group">
                <input onChange = {e => setUsername(e.target.value)} type="text" placeholder="Username"/>
            </div>
            <div className="form-group">
                <input onChange = {e=>setPassword(e.target.value)} type="password" placeholder="Password"/>
            </div>
            <button onClick = {submitLogin} className="SubmitButton">Login</button>
            {errMessage&&<p style={{color:'red'}}>Credentials did not match</p>}
        </div>
    )
}
export default Login;

