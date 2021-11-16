import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing'
import Login from './Components/Login/Login'
import NavBar from './Components/NavBar'
import Dashboard from './Components/Dashboard/Dashboard';

class App extends React.Component{
  render(){
    return(
  <Router>
    {<NavBar/>}
    <Routes>
      <Route path = "test" element ={<Home/>}/>
      <Route path = "" element = {<Landing/>}/>
      <Route path = "login" element = {<Login/>}/>
      <Route path = "dash" element = {<Dashboard/>}/>
    </Routes>
  </Router>
    )
  }
}

function Home(){
  return(
      <h1>hello</h1>
  );
}

export default App;