const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  
    connectionString: connectionString,
    /*
    host: 'localhost',
    database: 'image_search',
    port: 5432,
    */
})
pool.connect()

module.exports = pool;