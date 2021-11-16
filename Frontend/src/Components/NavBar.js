import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/dash'>Dashboard</Link>
        </div>
    )
}

export default NavBar;