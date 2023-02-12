const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDservice');
const User = require('../models/user');


const getHomePage = async (req, res) => {
    let results = [];
    return res.render('home.ejs', { listUsers: results });
}
const getName = (req, res) => {
    res.render('sample.ejs');
}
const postCreateUsers = async (req, res) => {
    let { email, name, city } = req.body;// req.body get data from clients
    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users(email, name, city)
    //     VALUES(?, ?, ?)`, [email, name, city]
    // )
    User.create({
        name, email, city
    });
    res.redirect('/');
}
const getCreate = (req, res) => {
    res.render('create.ejs');
}
// req.params lay id
const getUpdate = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('edit.ejs', { userEdit: user });
}
const postUpdateUsers = async (req, res) => {
    let { userId, email, name, city } = req.body;
    await updateUserById(email, name, city, userId);
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userEdit: user });
}
const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect('/');
}
module.exports = {
    getHomePage, getName, postCreateUsers, getCreate, getUpdate,
    postUpdateUsers, postDeleteUser, postHandleRemoveUser
}