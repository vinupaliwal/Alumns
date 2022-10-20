import React, { useContext } from 'react'
import Home from './pages/home/Home'
import {BrowserRouter as Router,Routes,Route,redirect} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { AuthContext } from './context/AuthContext';


const App = () => {
  const {user} = useContext(AuthContext);
  return (
    <>
     <Router>
        <Routes>
            <Route exact path="/" element={user?<Home/>:<Login/>}/>
            <Route path="/login" element={user?<redirect to="/"/>:<Login/>}/>
            <Route path="/register" element={user?<redirect to="/login"/>:<Register/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>   
     </Router>
    </>
  )
}

export default App