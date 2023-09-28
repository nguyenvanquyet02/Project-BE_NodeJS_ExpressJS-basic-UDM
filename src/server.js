require('dotenv').config()
const express = require('express')

//import express from 'express';
const configViewEngine = require('./config/viewEngine');
const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');
const connection = require('./config/database');
//mongodb driver
const { MongoClient } = require('mongodb');

//config file upload
app.use(fileUpload());
//config req.body giup lay data tu phia client
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies


//config template engine
configViewEngine(app);

app.use('/', webRoutes);//('tien to : duong link dung de phan biet hoac tao ra cac route')
app.use('/v1/api', apiRoutes);


const url = process.env.DB_HOST_WITH_DRIVER;
const client = new MongoClient(url);


(async () => {
  try {
    // mongoose
    await connection();

    // mongodb driver
    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(process.env.DB_NAME);
    // const collection = db.collection('customers');

    //write
    // collection.insertOne({ name: "mongodb driver" })
    // collection.insertOne({ address: "hp" });
    // collection.insertOne({ name: "new", email: "new@gmail.com" });
    // // read
    // let a = await collection.findOne({ name: "new" });
    // console.log('===> check a: ', a);


    app.listen(port, hostname, () => {
      console.log(`App listening on port ${port}`)
    })
  } catch (error) {
    console.log('====> ERROR: ', error);
  }
})();