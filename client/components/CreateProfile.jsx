//Create a profile page. Add attributes and characteristics: name, years of experience, languages, etc.?
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
// import LanguageOptions from './LanguagesOptions';

const choiceOfLanguages = [
  { label: 'Javascript', value: 'Javascript' },
  { label: 'Python', value: 'Python' },
  { label: 'Java', value: 'Java' },
  { label: 'Typescript', value: 'Typescript' },
  { label: 'SQL', value: 'SQL' },
  { label: 'Mongoose', value: 'Mongoose' },
];

const CreateProfile = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [languages, setLanguages] = useState('');


  const handleSubmit = (e) => {
    //prevents the default on submit behavior
    e.preventDefault();
    const data = { firstName, lastName, location, experience, languages };



    fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        // 'Accept': 'application.json',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        response.json();
        console.log('this is my fetch response', response)
      })
      .catch(err => { console.log('ERR', err) })


    // try{
    //   await axios.patch('/createprofile', { data })
    //   next();
    // } catch (err){
    //  next(err);
    // }
    console.log(data);
  };

  return (


    <form className='create_form' onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type='text' value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }}
        /></label>

      <label>
        Last Name:
        <input type='text' value={lastName}
          onChange={(e) => { setLastName(e.target.value) }}
        />
      </label>

      <label>
        Location:
        <input
          type='text'
          value={location}
          placeholder='e.g. Queens, New York'
          onChange={(e) => { setLocation(e.target.value) }}
        />
      </label>

      <label>
        Years of experience:
        <input type="number" value={experience} placeholder='e.g. 2' onChange={(e) => { setExperience(e.target.value) }} />
      </label>

      {/* <label>
          Pick your favorite languages:
          <select multiple = {true} value={languages} onChange={(e) => {setLanguages(e.target.value)}}>

            <option  value="Javascript" >Javascript/</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label> */}
      <div className="App">
        <Select
          options={choiceOfLanguages}
          isMulti
          onChange={(opt) => { setLanguages(opt) }}
        />
      </div>
      <button type='submit'>Submit Profile</button>
    </form>


  )
};



///example of react dropdown 

export default CreateProfile;