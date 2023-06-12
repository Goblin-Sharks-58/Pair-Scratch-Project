import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const resultObj = {};
    fetch('http://localhost:8080', {
        headers: {
        // 'Accept': 'application.json',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(myLocation.response.userID),
    })
        .then(response => {
        response.json();
        const { firstName, lastName, location, experience, languages } = response;
        resultObj = Object.assign({},{ firstName, lastName, location, experience, languages });
        })
        .catch(err => { console.log('ERR', err) })
    
return (
  <h1>Home</h1>
)
};



export default Home;