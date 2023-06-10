import { Client } from 'pg'

const client = new Client({
  host: 'rajje.db.elephantsql.com',
  port: 5334,
  database: 'zebscooa',
  user: 'zebscooa',
  password: 'TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF',
});

await client.connect();

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

      try {

        await client.connect();

        const { firstName, lastName, location } = req.body;
        
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
        await client.end();
      }
    }

      

//       Student.create({firstName, lastName, age})
//         .then(studentDoc => {
//           res.locals.student = studentDoc;
//           return next();
//         })
//         .catch(err => {
//           return next({
//             log: `Error in userController.createUser:', ${err}`,
//             message: {err: 'Error occured in userController.createUser'}
//           });
//         });
//     },
// }

  client.query(query, (err, results) => {
    if (err){
      return next(err);
    }
    res.locals.people = results.rows;
    //console.log(res.locals.people);
    //console.log(res.locals.people);
    return next();
  });
  // console.log(res.locals.people);
  //return next();
};


module.exports = userController;