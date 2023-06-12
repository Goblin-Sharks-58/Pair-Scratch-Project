import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';

const Home = () => {
    const [profile, setProfile] = useState([]);
    // let user;
    console.log('pre fetch');
    
    const showCard = () => {

      fetch('http://localhost:8080/allusers', {
        headers: {
        // 'Accept': 'application.json',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
        }
        // body: JSON.stringify(userID),
      })
        .then(response => response.json())
        .then(data => {
          // const { firstName, lastName, location, experience, languages } = data;
          const userIdx = Math.floor(Math.random() * data.length);
          
          console.log(userIdx);
          console.log('backend data', data);
          console.log(data[userIdx])
          setProfile(data)
          // setProfile(profile => ({
          //   ...profile,
          //   ...data
          // }));
          console.log('profile: ', profile);
          // return profile;
          // return user;
          // setProfile(data)
          // resultArr = resultArr.concat(firstName, lastName, location, experience, languages);
          // console.log('result array', resultArr);
        })
        .catch(err => { console.log('ERR', err) })
    
      console.log('profile: ', profile);
    }
   
  
  return (
    // <h1>{resultArr}</h1>
    <>
      <h1>test: {profile.map((prop) =>(
        <div onSubmit={showCard}>{prop.firstname}
        <button type='submit'>Get Another User</button>
        </div>
      ))}
        
      </h1>
      
    </>
  )
};



export default Home;