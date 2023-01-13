const connection = require('../config/database');
const getHomePage = (req, res) => {
    // let users = [];
    // connection.query(
    //     'SELECT * FROM Users u',
    //     function(err, results, fields) {
    //         users = results;
    //         console.log("users: ", users); // results contains rows returned by server
    //         res.send(JSON.stringify(users));
    //     }
    //   );
    return res.render('home.ejs');
}
const getName = (req, res) => {
    res.render('sample.ejs');
}
const postCreateUsers = async (req, res) => {
    let { email, name, city } = req.body;
    let [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city)
        VALUES(?, ?, ?)`, [email, name, city]
    )
    res.send('insert for succeed');
}
const getCreate = (req, res) => {
    res.render('create.ejs');
}
module.exports = {
    getHomePage, getName, postCreateUsers, getCreate
}