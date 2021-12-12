import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import cookie from 'react-cookies';
const NavBar = () =>{
    let url = window.location.href;
    console.log(url);
    //if Cookie is set render Logout Button
    let navLogin = null;
    const handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
    }
    if(cookie.load('cookie')){
        console.log("Able to read cookie");
        navLogin = (
            <ul >
                    <li><Link className="NavLink" to="/" onClick = {handleLogout}>Logout</Link></li>
            </ul>
        );
    }else{
        //Else display login button
        console.log("Not Able to read cookie");
        navLogin = (
            <ul style={{ listStyle:'none'}}>
                    <li><Link className="NavLink" to="/">Login</Link></li>
            </ul>
        )
    }
    let redirectVar = null;

    return(
        <div className="Navbar" style={{width:'100%'}}>
            {redirectVar}
            <nav>
                <div style={{ width:'100%', display:'flex', flexDirection:'row', alignItems:'stretch'}}>
                <div>
                        <Link className="Logo" to="/"  >Stock Suggestion Engine</Link>
                    </div>
                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'row'}}>                     
                        <li ><Link className="NavLink" to="/dashboard">Dashboard</Link></li>
                        <li ><Link className="NavLink" to="/selection">Selection</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
    )
}

export default NavBar;