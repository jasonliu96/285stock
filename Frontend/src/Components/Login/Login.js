import React, { useState } from 'react';
// import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        //make a post request with the user data
        // axios({
        //     url: '/selection',
        //     method: 'post',
        //     data:{'username': username, 'password': password}
        // })
        console.log(username)
    }
    const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center'
}
    return(
        <div style={style}>
            <h1>Login</h1>
            <div className="form-group">
                <input onChange = {e => setUsername(e.target.value)} type="text" placeholder="Username"/>
            </div>
            <div className="form-group">
                <input onChange = {e=>setPassword(e.target.value)} type="password" placeholder="Password"/>
            </div>
            <button onClick = {submitLogin} className="btn btn-primary">Login</button>
        </div>
    )
}
export default Login;

