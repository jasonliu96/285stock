import React from 'react';
import {Navigate} from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './NavBar';
import cookie from 'react-cookies';
const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center'
}
const Landing = () => {
    return(
        <div style={style}> 
            <Navbar/>
            {cookie.load('cookie')?<Navigate to ="/dashboard"/>:null}
            <h1>STONK SUGGEST</h1>
            <Login/>
        </div>
    )
}

export default Landing;