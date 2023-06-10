import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </BrowserRouter>
);