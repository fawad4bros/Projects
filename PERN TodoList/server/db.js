/* Connecting the database with the Server: Using the pg library that we install*/
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    database: "pernstack",
    port: 5432
});
module.exports = pool;