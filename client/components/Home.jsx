import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card'
// import {useNavigate} from 'react-router-dom';

// console.log('db', db)
const images = ['https://ca.slack-edge.com/T055WQP2AKD-U05743SBJ49-3029c0804602-512', 'https://ca.slack-edge.com/T055WQP2AKD-U056LRGNYMN-7b4e277dfe45-512', 'https://ca.slack-edge.com/T055WQP2AKD-U055X5J2EHH-6e6b845277f7-512', 'https://ca.slack-edge.com/T055WQP2AKD-U055QJ30J7Q-560713a99eb2-512','https://ca.slack-edge.com/T055WQP2AKD-U056BDV8G15-ff1c49daf954-512', 'https://ca.slack-edge.com/T055WQP2AKD-U05617FPT0C-a8fa23c00eab-512'];

const Home = () => {
  const [lastDirection, setLastDirection] = useState();
  const [db, setDb] = useState([]);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  useEffect(() => {
    fetch('http://localhost:8080/allusers', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response pre json', response);
        return response.json();
      })
      .then((data) => {
        console.log('backend data', data);
        setDb(data);
      })
      .catch((err) => {
        console.log('ERR', err);
      });
  }, []);

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Pair Up</h1>
      <div className='cardContainer'>
        {db.map((character) => (
          <TinderCard
            className='swipe'
            key={character.userid}
            onSwipe={(dir) => swiped(dir, character.firstname)}
            // onCardLeftScreen={() => outOfFrame(character.firstname)}
          >
            <div style={{ backgroundImage: 'url(' + images[Math.floor(Math.random()*images.length)] + ')' }} className='card'>
              <h3>{character.firstname} {character.lastname}</h3>
              <h3>location:{character.location}</h3>
              <h3>yrs of experience:{character.experience}</h3>
              <h3>favorite languages: {character.languages}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  );
};



export default Home;