const { Pool } = require('pg');
require('dotenv').config();
const PG_URI = process.env.POSTGRESURL;
console.log("PG_URI:", PG_URI);

// create a new pool here using the connection string above
const pool = new Pool({
  host:'localhost',
  user:'postgres',
  password:'',
  database:'data-helpdesk',
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
  
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};