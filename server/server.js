const express = require('express');
const app = express();
const path = require('path');
//const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const PORT = 3000;
const userController = require('../UserController')


// DB Link:
// postgres://zebscooa:TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF@rajje.db.elephantsql.com/zebscooa

//app.use(bodyParser);

app.use(express.static('client'));
app.use(express.json());


app.post('/', userController.createUser, (req, res) => {
    res.status(200).json({msg: 'Successfully created User!'});
});


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
    // console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });