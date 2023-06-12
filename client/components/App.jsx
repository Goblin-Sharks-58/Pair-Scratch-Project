import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    NavLink,
    BrowserRouter as Router, Link, Routes,
} from "react-router-dom";
import '../styles.scss';
import CreateProfile from './CreateProfile';
import MyProfile from './MyProfile'
import Home from './Home'

const App = () => {
    return (
      <Router>
          <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/createprofile">Create a Profile</Link></li>
                <li><Link to="/myprofile">My Profile</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path='/createprofile' element = {<CreateProfile />}/>
            <Route path='/myprofile' element = {<MyProfile />}/>
            <Route path='/' element = {<Home />}/>
        </Routes>
      </Router>
  
       

        
        
    )
};

export default App;