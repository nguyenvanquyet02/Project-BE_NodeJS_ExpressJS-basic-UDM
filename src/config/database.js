//import mysql
const mysql = require('mysql2');
require('dotenv').config();
// test connection
// create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,// sd cu phap process.env can phai import thu vien require('dotenv').config()
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   });
  
const connection = mysql.createPool({
    host: process.env.DB_HOST,// sd cu phap process.env can phai import thu vien require('dotenv').config()
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
  
  module.exports = connection; //exports ra de co the su dung duoc nhieu noi