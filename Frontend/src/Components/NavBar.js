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
            <ul >
                    <li><Link to="/login" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
            </ul>
        );
    }else{
        //Else display login button
        console.log("Not Able to read cookie");
        navLogin = (
            <ul style={{ listStyle:'none'}}>
                    <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
        )
    }
    let redirectVar = null;

    return(
        <div style={{width:'100%'}}>
            {redirectVar}
            <nav >
                <div style={{ width:'100%', display:'flex', flexDirection:'row', alignItems:'stretch'}}>
                <div>
                        <a href="/">Stock Suggestion Engine</a>
                    </div>
                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'row'}}>                     
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/selection">Selection</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
    )
}

export default NavBar;