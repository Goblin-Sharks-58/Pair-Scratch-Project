//Component to pull up another person's profile for review. Accept button. Reject button.
import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';

const MyProfile = () => {
  const userID = 1;
  const myLocation = useLocation();
  const resultObj = {};
  fetch('http://localhost:8080', {
    headers: {
      // 'Accept': 'application.json',
      'Content-Type': 'application/json'
      //'Content-Type':'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(userID),
  })
    .then(response => {
      response.json();
      const { firstName, lastName, location, experience, languages } = response;
      resultObj = Object.assign({},{ firstName, lastName, location, experience, languages });
    })
    .catch(err => { console.log('ERR', err) })

  return (
    <>
      <h1>hello</h1>
      <div>
        {resultObj}
      </div>
    </>

  )
}

export default MyProfile;