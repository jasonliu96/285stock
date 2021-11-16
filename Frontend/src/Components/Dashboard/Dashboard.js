import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

const Dashboard = () => {
    return(
            <div>
            <h1>Dashboard Page</h1>
            <Link to='/'>Return Home</Link>
            </div>
    )
}

export default Dashboard