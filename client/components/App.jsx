import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    NavLink,
    BrowserRouter as Router, Link, Routes,
} from "react-router-dom";
import './styles.scss';
const App = () => {
    return (
        <Router>
        
        <nav>
            <ul>
                <li><Link to="/">Login</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path='' />
        </Routes>
        
        </Router>
        
    )
};

export default App;