import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    const [data, setData] = useState([{}])

    useEffect( ()=>{
        fetch("/test").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])
    return(
        <div>
            <h1>Landing</h1>
            {(typeof data.msg==='undefined') ? (
                <p>Loading. . . </p>
            ): (
                <p>{data.msg}</p>
            )}
            <Link to='/'>Return Home</Link>
        </div>
    )
}

export default Landing;