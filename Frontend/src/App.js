import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing'
import Login from './Components/Login/Login'
import NavBar from './Components/NavBar'
import Selection from './Components/Selection/Selection'
import Dashboard from './Components/Dashboard/Dashboard';

class App extends React.Component{
  render(){
    return(
  <Router>
    {<NavBar/>}
    <Routes>
      <Route path = "" element ={<Landing/>}/>
      <Route path = "login" element = {<Login/>}/>
      <Route path = "dashboard" element = {<Dashboard/>}/>
      <Route path = "selection" element = {<Selection/>}/>
    </Routes>
  </Router>
    )
  }
}


export default App;