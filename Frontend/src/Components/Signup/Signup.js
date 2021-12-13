import React, {useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router';
import Navbar from '../NavBar';

//signup
const Signup = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [flag, setFlag] = useState(false)
    const submitSignup = (e) => {
        //make a post request with the user data

        axios.defaults.withCredentials = true

        axios({
            url: '/signup',
            method: 'post',
            data:{'username': username, 'password': password}
        })
        .then((res) => {
            if(res.status===200){
                setFlag(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const style = {
        height: '1vh',
        width: '100%',
        textAlign: 'center'
    }
        return(
            <div>
            <Navbar/>
            {(flag)?<Navigate to="/dashboard"/>:null}
            <div className="Signup">
            <div className="container">
                
                <div className="SignupForm" style={style}>
                    <div className="main-div">
                        <div className="panel">
                            <h2>Sign Up</h2>
                        </div>
                            <div className="FormItem">
                            <label><h3>Hi there! My name is</h3></label>
                                <input onChange = {e=>setUsername(e.target.value)} type="text" className="form-control" name="firstname"  />
                            </div>
                            <div className="FormItem">
                            <label><h3>And here's my <strong>password:</strong></h3></label>
                                <input onChange = {e=>setPassword(e.target.value)} type="password" className="form-control" name="password"  />
                            </div>
                            <button onClick = {submitSignup} className="SignupButton">Sign me up!</button>                 
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }

export default Signup;