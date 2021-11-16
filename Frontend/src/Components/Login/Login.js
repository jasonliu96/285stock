import React, { useState } from 'react';
// import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

const Login = () => {
    const [ username, password ] = useState(0);
    return(
        <div>
            <h1>Login</h1>
            <div className="form-group">
                <input onChange = {changeHandler} type="text" className="form-control" name="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <input onChange = {changeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
            </div>
            <button onClick = {submitLogin} className="btn btn-primary">Login</button>
            <Link to='/'>Return Home</Link>
        </div>
    )
}
const changeHandler = () => {
    
}

const submitLogin = (e) => {
            //prevent page from refresh
            e.preventDefault();
            const data = {
                username : this.state.username,
                password : this.state.password
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/login',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true
                        })
                    }else{
                        this.setState({
                            authFlag : false,
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                    this.setState({
                        errorToggle : true,
                    })
                });
}
export default Login;
// //Define a Login Component
// class Login extends Component{
//     //call the constructor method
//     constructor(props){
//         //Call the constrictor of Super class i.e The Component
//         super(props);
//         //maintain the state required for this component
//         this.state = {
//             username : "",
//             password : "",
//             authFlag : false,
//             errorToggle : false,
//         }
//         //Bind the handlers to this class
//         this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
//         this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
//         this.submitLogin = this.submitLogin.bind(this);
//     }
//     //Call the Will Mount to set the auth Flag to false
//     componentWillMount(){
//         this.setState({
//             authFlag : false,
//             errorToggle : false,
//         })
//     }
//     //username change handler to update state variable with the text entered by the user
//     usernameChangeHandler = (e) => {
//         this.setState({
//             username : e.target.value
//         })
//     }
//     //password change handler to update state variable with the text entered by the user
//     passwordChangeHandler = (e) => {
//         this.setState({
//             password : e.target.value
//         })
//     }
//     //submit Login handler to send a request to the node backend
//     submitLogin = (e) => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         const data = {
//             username : this.state.username,
//             password : this.state.password
//         }
//         //set the with credentials to true
//         axios.defaults.withCredentials = true;
//         //make a post request with the user data
//         axios.post('http://localhost:3001/login',data)
//             .then(response => {
//                 console.log("Status Code : ",response.status);
//                 if(response.status === 200){
//                     this.setState({
//                         authFlag : true
//                     })
//                 }else{
//                     this.setState({
//                         authFlag : false,
//                     })
//                 }
//             })
//             .catch((error)=>{
//                 console.log(error);
//                 this.setState({
//                     errorToggle : true,
//                 })
//             });
//     }

//     render(){
//         //redirect based on successful login
//         // let redirectVar = null;
//         // if(cookie.load('cookie')){
//         //     redirectVar = <Redirect to= "/home"/>
//         // }
//         return(
//             <div>
//                 {/* {redirectVar} */}
//             <div className="container">
                
//                 <div className="login-form">
//                     <div className="main-div">
//                         <div className="panel">
//                             <h2>Admin Login</h2>
//                             <p>Please enter your username and password</p>
//                         </div>
                        
//                             <div className="form-group">
//                                 <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username"/>
//                             </div>
//                             <div className="form-group">
//                                 <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
//                             </div>
//                             <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>                 
//                     </div>
//                 </div>
//                 <div className="loginError" style={{display:'flex', justifyContent:'center', color:'red'}}>{this.state.errorToggle&&<p>Your Login Credentials are Incorrect</p> }</div>
//             </div>
//             </div>
//         )
//     }
// }
//export Login Component
