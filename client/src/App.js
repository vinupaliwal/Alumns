import React, { useContext, useState,useEffect } from 'react'
import Home from './pages/home/Home'
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from './pages/messenger/Messenger';
import { AuthContext } from './context/AuthContext';


const App = () => {  
  const {user} = useContext(AuthContext);
  return (
    <>
     <Router>
        <Routes>
            <Route exact path="/" element={user?<Home/>:<Login/>}/>
            <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
            <Route path="/register" element={user?<Navigate to="/login"/>:<Register/>}/>
            <Route path="/messenger" element= {<Messenger />}/> 
            <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>   
     </Router>
    </>
  )
}

export default App