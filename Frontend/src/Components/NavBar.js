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
            <ul className="NavbarRight">
                    <li><Link className="NavLinkRight" to="/" onClick = {handleLogout}>Logout</Link></li>
            </ul>
        );
    }else{
        //Else display login button
        navLogin = (
            <ul className="NavbarRight">
                    <li><Link className="NavLinkRight" to="/">Log In</Link></li>
                    <li><Link className="NavLinkRight" to="/signup">Sign Up</Link></li>
            </ul>
        )
    }

    return(
        <div>
            {cookie.load('cookie')?(
            <div>
                <nav className= "Navbar">
                <div className="Container">
                    <div className ="Brand" style = {{display:'flex', flexDirection:'row',  alignItems: 'center', justifyContent: 'center'}}>
                        <AiOutlineStock fontSize="1.5em"/>
                        <Link className="Logo" style={{width:'auto'}} to="/dashboard"  > SSE </Link>
                    </div>
                    <ul className= "NavbarList">                     
                        <li className="NavbarItem"><Link className="NavLink" to="/dashboard">Dashboard</Link></li>
                        <li className="NavbarItem"><Link className="NavLink" to="/selection">Selection</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
            </div>
            ):(
            <div>
                <nav className= "Navbar">
                <div className="Container">
                <div className ="Brand" style = {{display:'flex', flexDirection:'row',  alignItems: 'center', justifyContent: 'center'}}>
                        <AiOutlineStock fontSize="1.5em"/>
                        <Link className="Logo" onClick={ (event) => event.preventDefault() } style={{width:'auto'}} to="/"  > SSE </Link>
                    </div>
                    {navLogin}
                </div>
            </nav>
            </div>)}
        </div>
    )
}

export default NavBar;