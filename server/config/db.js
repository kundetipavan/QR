const mysql2 = require('mysql2');
require('dotenv').config();

const connection = new mysql2.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
 });

connection.connect((err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("database is connected successfully")
  }
})

module.exports = connection;

