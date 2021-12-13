import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import cookie from 'react-cookies';
import { AiOutlineStock } from "react-icons/ai";
const NavBar = () =>{
    let url = window.location.href;
    console.log(url);
    //if Cookie is set render Logout Button
    let navLogin = null;
    const handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
    }
    if(cookie.load('cookie')){
        navLogin = (
            <div className="NavbarRight">
                <ul>
                    <li><Link to="/" onClick = {handleLogout}>Logout</Link></li>
                </ul>
            </div>
        );
    }else{
        //Else display login button 
        navLogin = (
            <div className="NavbarRight">
                <ul>
                        <li ><Link  to="/">Log In</Link></li>
                        <li ><Link  to="/signup">Sign Up</Link></li>
                </ul>
            </div>
        )
    }

    return(
        <div>
            {cookie.load('cookie')?(
            <div>
                <nav className= "Navbar">
                <div className="Container">
                    <div className ="NavbarLeft">
                        <div className ="Brand" >
                            <AiOutlineStock fontSize="1.5em"/>
                            <Link className="Logo" to="/dashboard"  > SSE </Link>                
                        </div>
                        <div className= "NavbarList">
                            <ul >                     
                                <li ><Link to="/dashboard">Dashboard</Link></li>
                                <li ><Link to="/selection">Selection</Link></li>
                            </ul>
                        </div>
                    </div>
                    {navLogin}
                </div>
            </nav>
            </div>
            ):(
            <div>
                <nav className= "Navbar">
                <div className="Container">
                    <div className ="Brand">
                        <AiOutlineStock fontSize="1.5em"/>
                        <Link onClick={ (event) => event.preventDefault() } to="/"  > SSE </Link>
                    </div>
                    {navLogin}
                </div>
            </nav>
            </div>)}
        </div>
    )
}

export default NavBar;