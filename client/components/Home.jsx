import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';

const Home = () => {
    const userID = 1;
    console.log('pre fetch');
    // const resultArr = [];
    fetch('http://localhost:8080/allusers', {
        headers: {
        // 'Accept': 'application.json',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
        }
        // body: JSON.stringify(userID),
    })
      .then(response => {
        console.log('response pre json', response);
        response.json()
        console.log('response post json');
      })
      .then(data => {
        // const { firstName, lastName, location, experience, languages } = data;
        console.log('backend data', data);
        // resultArr = resultArr.concat(firstName, lastName, location, experience, languages);
        // console.log('result array', resultArr);
      })
      .catch(err => { console.log('ERR', err) })
    
  return (
    // <h1>{resultArr}</h1>
    <h1>Home</h1>
  )
};



export default Home;