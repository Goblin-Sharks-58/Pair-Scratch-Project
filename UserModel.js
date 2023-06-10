import { Client } from 'pg'
 
const client = new Client({
  host: 'rajje.db.elephantsql.com',
  port: 5334,
  database: 'zebscooa',
  user: 'zebscooa',
  password: 'TElFom3o4Mk2vb6rqEoTlJvgosRCKfnF',
});

await client.connect()