const express = require('express');
const app = express();
const path = require('path');
//const mongoose = require('mongoose');
const PORT = 3000;
const userController = require('./Controllers/UserController')
//const cookieParser = require('cookie-parser');

// DB Link:
// postgres://zebscooa:TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF@rajje.db.elephantsql.com/zebscooa

app.use(express.static('client'));
app.use(express.json());
//app.use(cookieParser());

//set cookie
// app.get('/', cookieController.setCookie, (req, res) => {
//   return res.status(200).send('cookieTest')
// })

//** Post Route **//
app.post('/', userController.createUser, (req, res, next) => {
  res.status(200).json({ msg: 'Successfully created User!' });
});

//** Get All Users Route **//
app.get('/allusers', userController.getUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

//** Get My Profile Route **//
app.get('/myprofile', userController.getMyProfile, (req, res, next) => {
  res.status(200).json(res.locals.user)
})


//** 404 handler **//
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//** Global error handler **//

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });