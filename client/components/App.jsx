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

const App = () => {
    return (
        <Router>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/createprofile">Create a Profile</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path='/createprofile' element = {<CreateProfile />}/>
        </Routes>
        </Router>
        
    )
};

export default App;