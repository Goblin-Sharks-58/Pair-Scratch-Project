const { Pool } = require('pg')

const pg_URI = 'postgres://zebscooa:TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF@rajje.db.elephantsql.com/zebscooa';

const pool = new Pool({
  connectionString: pg_URI
})

/*

QUERY: TRUNCATE TABLE table_name RESTART IDENTITY;
PURPOSE: Erases ALL data from table AND Resets the Auto Incrementing Index to 1 

*/

/*

SQL QUERY TO CREATE USERS TABLE
- SERIAL is an auto incrementing integer type, assigning a new unique ID
- NOT NULL assures every value must exist
- CONSTRAINT assures a user (first name, last name) can only exist once in the DataBase
  - Downside: People with identical names

CREATE TABLE Users (
  userID SERIAL PRIMARY KEY,  
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  experience INT NOT NULL,
  CONSTRAINT uc_names UNIQUE (firstName, lastName)
);

SQL QUERY TO CREATE LANGUAGES TABLE

CREATE TABLE Languages (
  languageID SERIAL PRIMARY KEY,
  language VARCHAR(255) NOT NULL UNIQUE
);

SQL Query used to create Junction Table

CREATE TABLE UserLanguages (
  UserID INT,
  LanguageID INT,
  PRIMARY KEY (UserID, LanguageID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (LanguageID) REFERENCES Languages(LanguageID)
);

*/

const userController = {

  getUsers: async (req, res, next) => {

    let client;

    try {
      try {
        client = await pool.connect();
        console.log('connected!');
      } catch (error) {
        console.log('error connecting, tell me why: ', error)
        return next(error);
      }
      //get all users 
      const queryStringUserID = `
      SELECT * FROM Users
      `;
      //join languages with users
      // const queryStringLanguages = `
      // SELECT UserID
      // FROM Users
      // INNER JOIN; 
      // `;

      // userid, firstname, lastname, location, experience are object keys in rows attribute of response
      const allUsersResponse = await client.query(queryStringUserID);

      // console.log('get users response: ', allUsersResponse.rows);


      // get their languages as array
      // and add it to that current object as 'languages'

      const { rows } = allUsersResponse;

      // iterate
      // for each object
      for (const userObject of rows) {

        // query that user
        const queryUserString = `
          SELECT * FROM users
          INNER JOIN userlanguages
          ON users.userid = userlanguages.userid
          INNER JOIN languages
          ON languages.languageid = userlanguages.languageid
          WHERE users.userid = $1;
         `;

        const valueID = [userObject.userid];
        const userLanguages = await client.query(queryUserString, valueID);
        // console.log('userLanguages Response Object', userLanguages.rows);

        for (const object of userLanguages.rows) {
          if (!userObject['languages']) userObject['languages'] = [object.language];
          else userObject['languages'].push(object.language);
        }

      }

      res.locals.users = rows;

      return next();


    } catch (err) {
      return next({
        log: `Error in userController.getUsers:', ${err}`,
        message: { err: 'Error occured in userController.getUsers' }
      });
    } finally {
      if (client) client.release();
    }

  },

  // Create User Middleware
  createUser: async (req, res, next) => {

    let client;
    try {

      try {
        client = await pool.connect();
        console.log('connected!');
      } catch (error) {
        console.log('error connecting, tell me why: ', error)
        return next(error)
      }

      const { firstName, lastName, location, experience, languages } = req.body;

      // console.log('languages object', languages)
      //convert object received into an array
      languages.forEach((obj, i) => languages[i] = obj.label); // get only languages 
      console.log('languages', languages);

      //// Inserting New User from Create Profile component

      /*  NOTE:

      Parameterized Queries ($1, $2, etc...) are recommended by SQL for Safety Reasons Template Literals do work, but there are some security risks, so SQL recommends assigning values via parameterized queries

      */

      const queryStringNew = `
          INSERT INTO Users (firstName, lastName, location, experience)
          VALUES ($1, $2, $3, $4);
        `;

      const valuesNew = [firstName, lastName, location, experience];
      await client.query(queryStringNew, valuesNew); // add data to SQL


      //// Query for the User ID after Creation
      const queryStringUserID = `
      SELECT UserID
      FROM Users
      WHERE firstName = $1 AND lastName = $2;
      `;
      const valuesID = [`${firstName}`, `${lastName}`];
      // const valuesID = ['Will', 'Sentance']; // testing string

      const userID = await client.query(queryStringUserID, valuesID); // Obtain ID of new User
      console.log('userID object', userID);
      console.log(`user ID for ${firstName} is: ${userID.rows[0].userid}`);


      //// Insert into Junction Table
      for (const language of languages) {

        // GET List of Languages that Exist
        const queryStringLanguages = `
        SELECT Language FROM Languages;
        `
        const languageDB = await client.query(queryStringLanguages);
        console.log('languageDB Response Object', languageDB);
        const languageDBObj = {}; // list of the current languages w/ index as value
        languageDB.rows.forEach((lang, idx) => languageDBObj[lang.language] = idx + 1);
        console.log('languageDB: ', languageDBObj, 'length: ', Object.keys(languageDBObj).length);

        let languageID;

        if (languageDBObj[language]) {
          console.log(languageDBObj[language])
          languageID = languageDBObj[language];

        } else {

          console.log('no language in database currently')

          // INSERT New Language and Get New ID
          const queryStringNewLang = `
          INSERT INTO Languages (Language)
          VALUES ($1)
          RETURNING LanguageID;
          `;

          const currLang = [`${language}`];
          languageID = await client.query(queryStringNewLang, currLang); // response object
          languageID = languageID.rows[0].languageid; // only language id val
          console.log('languageid from query string', languageID);

        };

        console.log('language id before junction', languageID);

        const queryStringJunction = `
        INSERT INTO UserLanguages (userid, languageid)
        VALUES ($1, $2);
        `;
        const junctionValues = [userID.rows[0].userid, languageID];

        const junctionResult = await client.query(queryStringJunction, junctionValues);
        console.log('result of junction: ', junctionResult);


      }

      return next();

    } catch (err) {
      return next({
        log: `Error in userController.createUser:', ${err}`,
        message: { err: 'Error occured in userController.createUser' }
      });
    } finally {
      if (client) client.release();
    }
  }
};


module.exports = userController;