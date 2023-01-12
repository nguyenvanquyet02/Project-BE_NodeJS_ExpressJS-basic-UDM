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
const postCreateUsers = (req, res) => {
    console.log("=====> req.body: ", req.body);
    res.send('Hello Nguyen Van quyet');
}
module.exports = {
    getHomePage, getName, postCreateUsers
}