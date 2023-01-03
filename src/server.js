const express = require('express')
//import express from 'express';
const path = require('path')
require('dotenv').config()

// console.log(">>> check env: " , process.env);

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
//config template engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')
// config static file
app.use(express.static(path.join(__dirname,'public'))) 

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/name', (req, res) => {
  // res.send('<h1> My fullname is Nguyen Van Quyet & Nodemon</h1>')
  res.render('sample.ejs');
})

app.listen(port, hostname,() => {
  console.log(`Example app listening on port ${port}`)
})