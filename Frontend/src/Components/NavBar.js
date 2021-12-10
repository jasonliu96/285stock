import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import cookie from 'react-cookies';
const NavBar = () =>{
    let url = window.location.href;
    console.log(url);
    //if Cookie is set render Logout Button
    let navLogin = null;
    if(cookie.load('cookie')){
        console.log("Able to read cookie");
        navLogin = (
            <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
            </ul>
        );
    }else{
        //Else display login button
        console.log("Not Able to read cookie");
        navLogin = (
            <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
        )
    }
    let redirectVar = null;

    return(
        <div>
            {redirectVar}
            <nav >
                <div>
                <div>
                        <a href="/land">Stock Suggestion Engine</a>
                    </div>
                    <ul className="nav navbar-nav">
                    
                            <li><Link to="/home">Home</Link></li>

                        
                            <li><Link to="/land">Dashboard</Link></li>
            
                    

                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
    )
}

export default NavBar;