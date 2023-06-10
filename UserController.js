const { Client, Pool } = require('pg')

const pg_URI = 'postgres://zebscooa:TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF@rajje.db.elephantsql.com/zebscooa';

// const client = new Client({
//   host: 'rajje.db.elephantsql.com',
//   port: 5334,
//   database: 'zebscooa',
//   user: 'zebscooa',
//   password: 'TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF',
// });

const pool = new Pool({
  connectionString: pg_URI
})

// Tables Created in Database Already:

// User Table:
// ** UserID (Primary Key)
// ** First Name
// ** Last Name
// ** Location

// Language Table:
// ** LanguageID (Primary Key)
// ** Language

// User Language Table:
// ** UserID (Foreign Key)
// ** LanguageID (Foreign Key)
const userController = {

    createUser: async (req, res, next) => {
      
      let client;
      try {

        try {
          client = await pool.connect();
          console.log('connected!')
        } catch(error) {
          console.log('error connecting, tell me why: ', error)
          next(error)
        }

        const { firstName, lastName, location } = req.body;
        console.log('firstName', firstName)
        
        const queryString = `
          INSERT INTO Users (lastName, firstName, location)
          VALUES ($1, $2, $3);
        `;
        
        const values = [firstName, lastName, location];

        const result = await client.query(queryString, values);
        console.log('result of adding entry: ', result);
        return next();

      } catch (err) {
          return next({
            log: `Error in userController.createUser:', ${err}`,
            message: {err: 'Error occured in userController.createUser'}
          });
      } finally {
        if (client) client.release();
      }
    }
};


module.exports = userController;