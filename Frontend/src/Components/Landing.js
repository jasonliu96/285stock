import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './NavBar'
const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center'
}
const Landing = () => {
    return(
        <div style={style}>
            {<Navbar/>}
            <h1>STONK SUGGEST</h1>
            <Login/>
        </div>
    )
}

export default Landing;