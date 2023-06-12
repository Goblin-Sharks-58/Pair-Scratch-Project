/* MOVE POOL CONNECTION HERE TO USE AS INITIAL MIDDLEWARE EVERYWHER */

const { Pool } = require('pg')

const pg_URI = 'postgres://zebscooa:TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF@rajje.db.elephantsql.com/zebscooa';

const pool = new Pool({
  connectionString: pg_URI
})

const connectToDatabase = async (req, res, next) => {

  try {
    const client = await pool.connect();
    console.log('Connected!');

    res.locals.dbClient = client; // persists connection through middleware
    res.locals.dbRelease = () => client.release(); // ends connection

    next();

  } catch (error) {
    console.log('error connecting, tell me why: ', error)
    next(error);
  }
};

module.exports = connectToDatabase;